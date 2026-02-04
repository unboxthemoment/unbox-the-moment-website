import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: marc@shipfa.st

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link
          href="/"
          className="btn btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">Privacy Policy for {config.appName}</h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: February 3, 2026

Thank you for visiting Unbox The Moment ("we," "us," or "our"). This Privacy Policy outlines how we collect, use, and protect your personal and non-personal information when you use our website located at https://unboxthemoment.com (the "Website").

By accessing or using the Website, you agree to the terms of this Privacy Policy. If you do not agree with the practices described in this policy, please do not use the Website.

1. Information We Collect

1.1 Personal Data

We collect the following personal information from you:

Name: We collect your name to personalize your experience, process your orders, and communicate with you effectively.

Email Address: We collect your email address to send you important information regarding your orders, order confirmations, shipping updates, customer support communications, and marketing communications (if you opt-in). You may unsubscribe from marketing emails at any time.

Shipping Address: We collect your shipping address to deliver your surprise boxes to the correct location. This includes street address, city, state, postal code, and country.

Payment Information: We collect payment details (credit card number, billing address, etc.) to process your orders securely. However, we do not store your full payment information on our servers. Payments are processed securely by trusted third-party payment processors (such as Stripe) that comply with industry security standards.

Phone Number: We may collect your phone number if you provide it for shipping or customer support purposes.

Account Information: If you create an account with us, we collect your account credentials and profile information.

1.2 Non-Personal Data

We may use web cookies, web beacons, and similar technologies to collect non-personal information such as:

- IP address
- Browser type and version
- Device information (type, operating system)
- Browsing patterns and pages visited
- Referring website addresses
- Time and date of visits
- Clickstream data

This information helps us to enhance your browsing experience, analyze trends, improve our services, and personalize content.

2. Purpose of Data Collection

We collect and use your personal data for the following purposes:

2.1 Order Processing
- Processing and fulfilling your orders
- Sending order confirmations and shipping notifications
- Managing returns and refunds
- Providing customer support

2.2 Communication
- Responding to your inquiries and requests
- Sending important updates about your orders
- Sending marketing communications (with your consent)
- Notifying you about changes to our services or policies

2.3 Service Improvement
- Analyzing usage patterns to improve our Website
- Personalizing your experience
- Developing new products and services
- Conducting research and analytics

2.4 Legal Compliance
- Complying with applicable laws and regulations
- Protecting our rights and preventing fraud
- Responding to legal requests

3. How We Share Your Information

3.1 Service Providers
We may share your information with trusted third-party service providers who assist us in operating our Website and conducting our business, including:

- Payment processors (e.g., Stripe) for payment processing
- Shipping carriers for order fulfillment
- Email service providers for communications
- Analytics providers for website analytics
- Customer support platforms

These service providers are contractually obligated to protect your information and use it only for the purposes we specify.

3.2 Legal Requirements
We may disclose your information if required by law, court order, or government regulation, or if we believe disclosure is necessary to:
- Protect our rights, property, or safety
- Protect the rights, property, or safety of our users or others
- Investigate fraud or security issues
- Comply with legal processes

3.3 Business Transfers
In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change in ownership or control of your personal information.

3.4 We Do Not Sell Your Data
We do not sell, trade, or rent your personal information to third parties for their marketing purposes.

4. Data Security

We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.

5. Your Rights and Choices

5.1 Access and Updates
You can access and update your personal information by logging into your account or contacting us at support@unboxthemoment.com.

5.2 Marketing Communications
You can opt-out of marketing emails by clicking the unsubscribe link in any marketing email or by contacting us directly. Please note that you may still receive transactional emails related to your orders.

5.3 Cookies
Most web browsers are set to accept cookies by default. You can choose to set your browser to refuse cookies or to alert you when cookies are being sent. However, some features of our Website may not function properly if cookies are disabled.

5.4 Account Deletion
You may request deletion of your account and personal information by contacting us at support@unboxthemoment.com. We will honor your request subject to our legal obligations to retain certain information for record-keeping purposes.

6. Data Retention

We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.

7. Children's Privacy

Unbox The Moment is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child under 13 has provided us with personal information, please contact us immediately at support@unboxthemoment.com, and we will take steps to delete such information.

8. Third-Party Links

Our Website may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read the privacy policies of any third-party websites you visit.

9. International Users

If you are accessing our Website from outside the United States, please note that your information may be transferred to, stored, and processed in the United States. By using our Website, you consent to the transfer of your information to the United States.

10. California Privacy Rights

If you are a California resident, you have certain rights under the California Consumer Privacy Act (CCPA), including:
- The right to know what personal information we collect
- The right to delete your personal information
- The right to opt-out of the sale of your personal information (we do not sell your information)
- The right to non-discrimination for exercising your privacy rights

To exercise these rights, please contact us at support@unboxthemoment.com.

11. Updates to the Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or for other operational, legal, or regulatory reasons. Any updates will be posted on this page with an updated "Last Updated" date. We may also notify you of significant changes via email or through a notice on our Website. Your continued use of our Website after such changes constitutes acceptance of the updated Privacy Policy.

12. Contact Information

If you have any questions, concerns, or requests related to this Privacy Policy, or if you wish to exercise your privacy rights, you can contact us at:

Email: support@unboxthemoment.com

We will respond to your inquiry within a reasonable timeframe.

By using Unbox The Moment, you consent to the terms of this Privacy Policy.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
