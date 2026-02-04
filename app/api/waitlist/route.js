import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import config from "@/config";
import { sendWaitlistConfirmationEmail, sendWaitlistAdminNotification } from "@/libs/resend";

// POST /api/waitlist - Add email to waitlist
export async function POST(req) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase().trim();

    // Check if waitlist is active
    if (!config.waitlist?.isActive) {
      return NextResponse.json(
        { error: "Waitlist is no longer active. You can now purchase directly!" },
        { status: 400 }
      );
    }

    // Use service role key to bypass RLS for public waitlist signups
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    // Insert email into waitlist table
    const { error } = await supabase.from("waitlist").insert({
      email: normalizedEmail,
    });

    // Handle duplicate email error (Postgres unique constraint violation)
    if (error) {
      if (error.code === "23505") {
        // Email already exists - this is fine, just return success
        return NextResponse.json({
          success: true,
          message: config.waitlist?.successMessage || "You're already on the waitlist!",
          alreadyExists: true,
        });
      }

      console.error("Waitlist signup error:", error);
      return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }

    console.log(`New waitlist signup: ${normalizedEmail}`);

    // Send confirmation email (don't block the response if it fails)
    try {
      await sendWaitlistConfirmationEmail(normalizedEmail);
      console.log(`Waitlist confirmation email sent to: ${normalizedEmail}`);
    } catch (emailError) {
      // Log error but don't fail the signup
      console.error(`Failed to send confirmation email to ${normalizedEmail}:`, emailError);
    }

    // Send admin notification email (don't block the response if it fails)
    try {
      await sendWaitlistAdminNotification(normalizedEmail);
      console.log(`Waitlist admin notification email sent`);
    } catch (adminEmailError) {
      // Log error but don't fail the signup
      console.error(`Failed to send admin notification email:`, adminEmailError);
    }

    return NextResponse.json({
      success: true,
      message: config.waitlist?.successMessage || "You're on the list! We'll notify you when we launch.",
    });
  } catch (error) {
    console.error("Waitlist signup error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

// GET /api/waitlist - Get waitlist count (for admin or display)
export async function GET() {
  try {
    // Use service role key to bypass RLS
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    const { count, error } = await supabase.from("waitlist").select("*", { count: "exact", head: true });

    if (error) {
      console.error("Waitlist count error:", error);
      return NextResponse.json({ error: "Could not fetch waitlist count" }, { status: 500 });
    }

    return NextResponse.json({
      count: count || 0,
      isActive: config.waitlist?.isActive || false,
    });
  } catch (error) {
    console.error("Waitlist count error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
