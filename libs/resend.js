import { Resend } from "resend";
import config from "@/config";

// Lazy initialization - only check when actually sending emails
let resend = null;

function getResend() {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

/**
 * Sends an email using the provided parameters.
 *
 * @async
 * @param {Object} params - The parameters for sending the email.
 * @param {string | string[]} params.to - The recipient's email address or an array of email addresses.
 * @param {string} params.subject - The subject of the email.
 * @param {string} params.text - The plain text content of the email.
 * @param {string} params.html - The HTML content of the email.
 * @param {string} [params.replyTo] - The email address to set as the "Reply-To" address.
 * @returns {Promise<Object>} A Promise that resolves with the email sending result data.
 */
export const sendEmail = async ({ to, subject, text, html, replyTo }) => {
  const resendClient = getResend();
  const { data, error } = await resendClient.emails.send({
    from: config.resend.fromAdmin,
    to,
    subject,
    text,
    html,
    ...(replyTo && { replyTo }),
  });

  if (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }

  return data;
};

/**
 * Sends a confirmation email when someone joins the waitlist.
 *
 * @async
 * @param {string} email - The recipient's email address.
 * @returns {Promise<Object>} A Promise that resolves with the email sending result data.
 */
export const sendWaitlistConfirmationEmail = async (email) => {
  const siteUrl = `https://${config.domainName}`;

  return sendEmail({
    to: email,
    subject: "You're on the list! Welcome to Unbox The Moment",
    text: `
You're on the waitlist!

Thank you for signing up for Unbox The Moment. We're working hard to bring you curated surprise boxes designed for meaningful connections.

You'll be the first to know when we launch.

In the meantime, learn more about us at ${siteUrl}

We can't wait to help you create unforgettable moments!

Best,
The Unbox The Moment Team
    `.trim(),
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're on the list!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #faf8f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #D4AF37 0%, #B8962E 100%); padding: 40px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                You're on the list!
              </h1>
              <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                Thank you for joining our waitlist
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #1a1a1a; font-size: 16px; line-height: 1.6;">
                Thank you for signing up for <strong>Unbox The Moment</strong>!
              </p>
              
              <p style="margin: 0 0 20px; color: #5c564d; font-size: 16px; line-height: 1.6;">
                We're working hard to bring you curated surprise boxes designed for meaningful connections with the people you love.
              </p>
              
              <!-- What to expect box -->
              <table role="presentation" style="width: 100%; background-color: #f5f0eb; border-radius: 12px; margin: 0 0 20px;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="margin: 0; color: #5c564d; font-size: 15px; line-height: 1.6;">
                      You'll be the first to know when we launch.
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0; color: #5c564d; font-size: 16px; line-height: 1.6;">
                We can't wait to help you create unforgettable moments!
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f5f0eb; padding: 30px 40px; text-align: center;">
              <p style="margin: 0 0 10px; color: #1a1a1a; font-size: 16px; font-weight: 600;">
                Unbox The Moment
              </p>
              <p style="margin: 0; color: #5c564d; font-size: 14px;">
                Curated surprise boxes for meaningful connections
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  });
};

/**
 * Sends a launch notification email to a waitlist member.
 *
 * @async
 * @param {string} email - The recipient's email address.
 * @returns {Promise<Object>} A Promise that resolves with the email sending result data.
 */
export const sendWaitlistLaunchEmail = async (email) => {
  const shopUrl = `https://${config.domainName}/boxes`;

  return sendEmail({
    to: email,
    subject: "We're Live! Your Unbox The Moment Box Awaits",
    text: `
Great news! Unbox The Moment is now live!

You signed up for our waitlist, and we're excited to let you know that you can now shop our curated surprise boxes.

Visit ${shopUrl} to explore our collection and create your next unforgettable moment.

Thank you for your patience and for being part of our community from the beginning!

Best,
The Unbox The Moment Team
    `.trim(),
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We're Live!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #faf8f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #D4AF37 0%, #B8962E 100%); padding: 40px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                We're Live!
              </h1>
              <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                Curated surprise boxes, designed for connection
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #1a1a1a; font-size: 16px; line-height: 1.6;">
                Great news! <strong>Unbox The Moment</strong> is now live!
              </p>
              
              <p style="margin: 0 0 20px; color: #5c564d; font-size: 16px; line-height: 1.6;">
                You signed up for our waitlist, and we're excited to let you know that you can now shop our curated surprise boxes.
              </p>
              
              <p style="margin: 0 0 30px; color: #5c564d; font-size: 16px; line-height: 1.6;">
                Explore our collection and create your next unforgettable moment with friends, family, or that special someone.
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; margin: 0 0 30px;">
                <tr>
                  <td style="text-align: center;">
                    <a href="${shopUrl}" style="display: inline-block; background-color: #D4AF37; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                      Shop Now
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0; color: #5c564d; font-size: 16px; line-height: 1.6;">
                Thank you for your patience and for being part of our community from the beginning!
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f5f0eb; padding: 30px 40px; text-align: center;">
              <p style="margin: 0 0 10px; color: #1a1a1a; font-size: 16px; font-weight: 600;">
                Unbox The Moment
              </p>
              <p style="margin: 0; color: #5c564d; font-size: 14px;">
                Curated surprise boxes for meaningful connections
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  });
};

/**
 * Sends an admin notification email when someone joins the waitlist.
 *
 * @async
 * @param {string} email - The email address of the person who joined the waitlist.
 * @returns {Promise<Object>} A Promise that resolves with the email sending result data.
 */
export const sendWaitlistAdminNotification = async (email) => {
  const adminEmail = config.resend.customerServiceEmail || "unboxthemoment1@gmail.com";
  const signupDate = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Waitlist Signup - Unbox The Moment</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px; background: linear-gradient(135deg, #D4AF37, #F4D03F); padding: 20px; border-radius: 8px;">
          <h1 style="color: #fff; font-size: 28px; margin: 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">New Waitlist Signup!</h1>
        </div>

        <div style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
          <p style="margin: 0; font-size: 16px; color: #1e40af;">
            <strong>New signup received</strong><br>
            <span style="font-size: 14px; color: #6b7280;">${signupDate}</span>
          </p>
        </div>

        <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Signup Details</h2>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #3b82f6;">${email}</a></p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="https://${config.domainName}/admin/waitlist" style="display: inline-block; background: #1a1a1a; color: #fff; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: 500;">View Waitlist</a>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px;">
            This is an automated notification from Unbox The Moment
          </p>
        </div>
      </body>
    </html>
  `;

  const text = `
NEW WAITLIST SIGNUP!

Date: ${signupDate}

SIGNUP DETAILS
--------------
Email: ${email}

---
View Waitlist: https://${config.domainName}/admin/waitlist
  `;

  console.log("Sending waitlist admin notification email to:", adminEmail);

  return sendEmail({
    to: adminEmail,
    subject: `New Waitlist Signup: ${email}`,
    html,
    text,
  });
};
