import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// GET /api/admin/waitlist - Get all waitlist entries (admin only)
export async function GET() {
  try {
    // Use service role key for admin operations
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    // Get all waitlist entries ordered by newest first
    const { data: waitlist, error } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching waitlist:", error);
      return NextResponse.json({ error: "Failed to fetch waitlist" }, { status: 500 });
    }

    return NextResponse.json({
      waitlist: waitlist || [],
      total: waitlist?.length || 0,
    });
  } catch (error) {
    console.error("Waitlist fetch error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
