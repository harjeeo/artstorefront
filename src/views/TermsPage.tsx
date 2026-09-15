import LegalPageLayout from '../components/LegalPageLayout';

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      updatedOn="August 16, 2026"
      intro="Welcome to Artisan. These Terms & Conditions ('Terms') govern your access to and use of our website, mobile applications, and services. By creating an account, browsing, or placing an order on Artisan, you agree to be bound by these Terms. This is placeholder text and does not constitute a legal document."
      sections={[
        {
          heading: '1. Acceptance of Terms',
          body: (
            <p>
              By accessing or using Artisan, you confirm that you are at least 18 years of age, or accessing the
              service under the supervision of a parent or legal guardian, and that you agree to comply with these
              Terms and all applicable laws and regulations.
            </p>
          ),
        },
        {
          heading: '2. Account Registration',
          body: (
            <p>
              You may be required to create an account to access certain features, such as checkout, wishlist, and
              order tracking. You are responsible for maintaining the confidentiality of your account credentials
              and for all activities that occur under your account.
            </p>
          ),
        },
        {
          heading: '3. Products & Listings',
          body: (
            <p>
              Artisan is a marketplace that connects buyers with independent artists and small creators. Product
              descriptions, images, and pricing are provided by individual sellers and are believed to be accurate
              at the time of listing, but Artisan does not guarantee the completeness or accuracy of any listing.
            </p>
          ),
        },
        {
          heading: '4. Orders & Payments',
          body: (
            <p>
              All orders placed through Artisan are subject to acceptance and availability. Prices are listed in
              Indian Rupees (₹) unless otherwise stated and are inclusive of applicable taxes unless mentioned
              otherwise at checkout. Payment must be completed in full before an order is processed.
            </p>
          ),
        },
        {
          heading: '5. Intellectual Property',
          body: (
            <p>
              All content on Artisan, including logos, text, graphics, and design elements, is the property of
              Artisan, Inc. or its licensors and is protected by applicable intellectual property laws. Product
              images and descriptions remain the property of the respective sellers.
            </p>
          ),
        },
        {
          heading: '6. Limitation of Liability',
          body: (
            <p>
              Artisan shall not be liable for any indirect, incidental, or consequential damages arising out of
              your use of the platform, including but not limited to loss of data, revenue, or profits, to the
              maximum extent permitted by applicable law.
            </p>
          ),
        },
        {
          heading: '7. Changes to These Terms',
          body: (
            <p>
              We may update these Terms from time to time. Continued use of Artisan after changes are posted
              constitutes your acceptance of the revised Terms. We recommend reviewing this page periodically.
            </p>
          ),
        },
        {
          heading: '8. Contact Us',
          body: (
            <p>
              If you have questions about these Terms, please reach out to our support team through the Help
              Centre. This page is placeholder content for demonstration purposes only.
            </p>
          ),
        },
      ]}
    />
  );
}
