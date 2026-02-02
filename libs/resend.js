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
