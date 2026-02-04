import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendWaitlistLaunchEmail } from "@/libs/resend";

// POST /api/admin/waitlist/notify - Send launch notifications to all waitlist members
export async function POST() {
  try {
    // Use service role key for admin operations
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    // Get all waitlist entries that haven't been notified yet
    const { data: pendingNotifications, error: fetchError } = await supabase
      .from("waitlist")
      .select("*")
      .is("notified_at", null)
      .order("created_at", { ascending: true });

    if (fetchError) {
      console.error("Error fetching waitlist:", fetchError);
      return NextResponse.json({ error: "Failed to fetch waitlist entries" }, { status: 500 });
    }

    if (!pendingNotifications || pendingNotifications.length === 0) {
      return NextResponse.json({
        success: true,
        sent: 0,
        message: "No pending notifications to send",
      });
    }

    let sentCount = 0;
    let failedCount = 0;
    const errors = [];

    // Send emails to each pending waitlist member
    for (const entry of pendingNotifications) {
      try {
        await sendWaitlistLaunchEmail(entry.email);

        // Update the notified_at timestamp
        const { error: updateError } = await supabase
          .from("waitlist")
          .update({ notified_at: new Date().toISOString() })
          .eq("id", entry.id);

        if (updateError) {
          console.error(`Failed to update notified_at for ${entry.email}:`, updateError);
        }

        sentCount++;
      } catch (emailError) {
        console.error(`Failed to send email to ${entry.email}:`, emailError);
        failedCount++;
        errors.push({ email: entry.email, error: emailError.message });
      }

      // Add a small delay between emails to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return NextResponse.json({
      success: true,
      sent: sentCount,
      failed: failedCount,
      total: pendingNotifications.length,
      ...(errors.length > 0 && { errors }),
    });
  } catch (error) {
    console.error("Notification send error:", error);
    return NextResponse.json({ error: "Something went wrong while sending notifications" }, { status: 500 });
  }
}
