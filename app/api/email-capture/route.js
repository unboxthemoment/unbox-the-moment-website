import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    // Here you can integrate with your email service
    // Options: Resend, Mailchimp, ConvertKit, Supabase, etc.

    // For now, just log and return success
    // You can integrate with Supabase, Resend, Mailchimp, etc. here
    console.log(`New email subscriber: ${email}`);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email capture error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
