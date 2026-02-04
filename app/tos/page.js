import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
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
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">Terms and Conditions for {config.appName}</h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: February 3, 2026

Welcome to Unbox The Moment!

These Terms of Service ("Terms") govern your use of the Unbox The Moment website at https://unboxthemoment.com ("Website") and the services provided by Unbox The Moment ("we," "us," or "our"). By accessing or using our Website and services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Website or services.

1. Description of Services

Unbox The Moment is a curated surprise box service that delivers thoughtfully assembled boxes containing activities, treats, conversation starters, and other items designed to create meaningful moments and connections. We offer boxes for various occasions including:

- Couple's Edition: Curated experiences for couples
- Family Edition: Activities and treats for families (2-5 people)
- Girls Night Edition: Everything needed for memorable nights with friends (2-5 people)
- Self Care Edition: Personal relaxation and wellness experiences

Each box is available in different tiers (Essential, Premium, Luxury) with varying contents and price points.

2. Product Information

2.1 Product Descriptions
We strive to provide accurate descriptions of our products. However, the exact contents of each surprise box may vary, as boxes are curated with care and may include seasonal or limited-availability items. We reserve the right to substitute items of equal or greater value.

2.2 Pricing
All prices are listed in U.S. dollars and are subject to change without notice. Prices do not include applicable taxes or shipping fees, which will be calculated at checkout.

2.3 Availability
Products are subject to availability. We reserve the right to limit quantities and to discontinue any product at any time.

3. Orders and Payment

3.1 Order Acceptance
Your order is an offer to purchase products from us. We reserve the right to accept or reject your order for any reason, including product availability, errors in pricing or product information, or suspected fraud.

3.2 Payment
Payment must be received before we ship your order. We accept major credit cards and other payment methods as displayed at checkout. All payments are processed securely through third-party payment processors.

3.3 Shipping
We ship to addresses within the United States. Shipping times are estimates and not guaranteed. Your surprise box will ship soon after your order is placed. Estimated delivery times are provided at checkout but may vary due to factors beyond our control.

4. Returns and Refunds

4.1 Refund Policy
We offer a full refund within 7 days of purchase if you are not satisfied with your order. To request a refund, please contact us at support@unboxthemoment.com with your order details.

4.2 Return Conditions
To be eligible for a refund, the product must be unused and in its original packaging. Refunds will be processed to the original payment method within 5-10 business days after we receive and inspect the returned item.

4.3 Damaged or Defective Items
If you receive a damaged or defective item, please contact us immediately at support@unboxthemoment.com with photos and your order number. We will work with you to resolve the issue, which may include replacement or refund.

5. User Accounts

5.1 Account Creation
You may be required to create an account to place orders. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.

5.2 Account Information
You agree to provide accurate, current, and complete information when creating an account or placing an order. You must promptly update your account information if it changes.

6. User Conduct

You agree not to:
- Use our Website for any unlawful purpose
- Attempt to gain unauthorized access to our systems
- Interfere with or disrupt our Website or servers
- Use automated systems to access our Website without permission
- Copy, reproduce, or resell our products or content without authorization

7. Intellectual Property

All content on our Website, including text, graphics, logos, images, and software, is the property of Unbox The Moment or its licensors and is protected by copyright and other intellectual property laws. You may not use our content without our express written permission.

8. User Data and Privacy

We collect and store user data, including name, email, payment information, and shipping addresses, as necessary to provide our services. For details on how we handle your data, please refer to our Privacy Policy at https://unboxthemoment.com/privacy-policy.

9. Non-Personal Data Collection

We use web cookies and similar technologies to collect non-personal data for the purpose of improving our services and user experience, analyzing trends, and personalizing content.

10. Limitation of Liability

TO THE MAXIMUM EXTENT PERMITTED BY LAW, UNBOX THE MOMENT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE OF OUR WEBSITE OR PRODUCTS.

11. Disclaimer of Warranties

OUR WEBSITE AND PRODUCTS ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.

12. Governing Law

These Terms are governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of our Website shall be resolved in the courts of the United States.

13. Changes to Terms

We may update these Terms from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any updates will be posted on this page with an updated "Last Updated" date. We may also notify you of significant changes via email. Your continued use of our Website after such changes constitutes acceptance of the updated Terms.

14. Contact Information

If you have any questions or concerns regarding these Terms of Service, please contact us at:

Email: support@unboxthemoment.com

Thank you for choosing Unbox The Moment!`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
