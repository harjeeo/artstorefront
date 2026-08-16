import LegalPageLayout from '../components/LegalPageLayout';

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      updatedOn="August 16, 2026"
      intro="At Artisan, we value your privacy. This Privacy Policy explains what information we collect, how we use it, and the choices you have. This is placeholder text and does not constitute a legal document."
      sections={[
        {
          heading: '1. Information We Collect',
          body: (
            <p>
              We collect information you provide directly, such as your name, email address, shipping address,
              and payment details when you create an account or place an order. We also collect usage data,
              including pages visited, products viewed, and search queries, to improve your experience.
            </p>
          ),
        },
        {
          heading: '2. How We Use Your Information',
          body: (
            <ul className="list-disc pl-5 space-y-1">
              <li>To process and fulfil your orders</li>
              <li>To personalize product recommendations and search results</li>
              <li>To send order updates, promotional offers, and service notifications</li>
              <li>To detect and prevent fraud or unauthorized activity</li>
              <li>To improve our website, app, and customer support</li>
            </ul>
          ),
        },
        {
          heading: '3. Cookies & Tracking',
          body: (
            <p>
              We use cookies and similar technologies to remember your preferences, keep you signed in, and
              understand how you interact with our platform. You can control cookie preferences through your
              browser settings at any time.
            </p>
          ),
        },
        {
          heading: '4. Sharing of Information',
          body: (
            <p>
              We share your information with sellers to fulfil orders, with payment processors to complete
              transactions, and with logistics partners for delivery. We do not sell your personal information
              to third parties for their own marketing purposes.
            </p>
          ),
        },
        {
          heading: '5. Data Security',
          body: (
            <p>
              We implement industry-standard security measures to protect your data, including encryption in
              transit and access controls. However, no method of transmission over the internet is completely
              secure, and we cannot guarantee absolute security.
            </p>
          ),
        },
        {
          heading: '6. Your Choices & Rights',
          body: (
            <p>
              You may access, update, or delete your account information at any time through your account
              settings. You may also opt out of marketing communications by adjusting your notification
              preferences or using the unsubscribe link in our emails.
            </p>
          ),
        },
        {
          heading: '7. Children’s Privacy',
          body: (
            <p>
              Artisan is not directed at children under 13, and we do not knowingly collect personal information
              from children. If you believe a child has provided us with personal data, please contact us so we
              can remove it.
            </p>
          ),
        },
        {
          heading: '8. Contact Us',
          body: (
            <p>
              For questions about this Privacy Policy or how your data is handled, please contact our support
              team through the Help Centre. This page is placeholder content for demonstration purposes only.
            </p>
          ),
        },
      ]}
    />
  );
}
