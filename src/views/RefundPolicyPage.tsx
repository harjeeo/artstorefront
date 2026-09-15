import LegalPageLayout from '../components/LegalPageLayout';

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      title="Refund & Cancellation Policy"
      updatedOn="August 16, 2026"
      intro="We want you to love what you buy from Artisan. This policy outlines when and how you can cancel an order or request a refund. This is placeholder text and does not constitute a legal document."
      sections={[
        {
          heading: '1. Order Cancellations',
          body: (
            <p>
              Orders can be cancelled free of charge within 2 hours of being placed, as long as the item has not
              already been shipped or is not a made-to-order / personalized product. Once an order has entered
              processing with the seller, cancellation may no longer be possible.
            </p>
          ),
        },
        {
          heading: '2. Eligibility for Returns',
          body: (
            <ul className="list-disc pl-5 space-y-1">
              <li>Item must be returned within 7 days of delivery</li>
              <li>Item must be unused, undamaged, and in its original packaging</li>
              <li>Personalized, custom-made, and perishable items are not eligible for return</li>
              <li>Original tags and invoice must be included with the return</li>
            </ul>
          ),
        },
        {
          heading: '3. How to Request a Refund',
          body: (
            <p>
              To request a refund or return, go to Account &gt; Orders, select the relevant order, and choose
              "Request Return / Refund." Our team will review your request within 24–48 hours and share the next
              steps, including pickup or drop-off instructions where applicable.
            </p>
          ),
        },
        {
          heading: '4. Refund Timelines',
          body: (
            <p>
              Once a returned item is received and inspected, refunds are processed within 5–7 business days to
              the original payment method. Depending on your bank or card issuer, it may take an additional 3–5
              business days for the refund to reflect in your account.
            </p>
          ),
        },
        {
          heading: '5. Damaged or Incorrect Items',
          body: (
            <p>
              If you receive a damaged, defective, or incorrect item, please contact us within 48 hours of
              delivery with photos of the product and packaging. We will arrange a free replacement or full
              refund, whichever you prefer.
            </p>
          ),
        },
        {
          heading: '6. Non-Refundable Situations',
          body: (
            <p>
              Refunds will not be issued for items damaged due to misuse after delivery, change of mind on
              custom or personalized orders, or returns initiated after the eligibility window has closed.
            </p>
          ),
        },
        {
          heading: '7. Contact Us',
          body: (
            <p>
              For any questions regarding cancellations or refunds, please reach out through the Help Centre.
              This page is placeholder content for demonstration purposes only.
            </p>
          ),
        },
      ]}
    />
  );
}
