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

    // Example: Store in Supabase (uncomment when ready)
    // const supabase = await createClient();
    // const { error } = await supabase
    //   .from("email_subscribers")
    //   .insert({
    //     email,
    //     source: "popup",
    //     discount_code: "WELCOME10",
    //     created_at: new Date().toISOString()
    //   });
    //
    // if (error && error.code !== "23505") { // Ignore duplicate email errors
    //   throw error;
    // }

    // Example: Send welcome email via Resend (uncomment when ready)
    // if (process.env.RESEND_API_KEY) {
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   await resend.emails.send({
    //     from: "Unbox The Moment <hello@unboxthemoment.com>",
    //     to: email,
    //     subject: "Welcome! Here's your 10% discount",
    //     html: `
    //       <h1>Welcome to Unbox The Moment!</h1>
    //       <p>Thank you for joining our community.</p>
    //       <p>Use code <strong>WELCOME10</strong> at checkout for 10% off your first order.</p>
    //     `,
    //   });
    // }

    // For now, just log and return success
    console.log(`New email subscriber: ${email}`);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed!",
        discountCode: "WELCOME10",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Email capture error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
