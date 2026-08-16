import LegalPageLayout from '../components/LegalPageLayout';

export default function ShippingPolicyPage() {
  return (
    <LegalPageLayout
      title="Shipping & Delivery Policy"
      updatedOn="August 16, 2026"
      intro="Here's what to expect once you place an order on Artisan — from processing to delivery at your doorstep. This is placeholder text and does not constitute a legal document."
      sections={[
        {
          heading: '1. Order Processing Time',
          body: (
            <p>
              Most orders are processed by the seller within 1–3 business days. Made-to-order and personalized
              items may take 5–10 business days to craft before they are shipped, as noted on the individual
              product page.
            </p>
          ),
        },
        {
          heading: '2. Shipping Methods & Timelines',
          body: (
            <ul className="list-disc pl-5 space-y-1">
              <li>Standard Shipping: 5–8 business days</li>
              <li>Express Shipping: 2–4 business days</li>
              <li>International Shipping: 10–20 business days, depending on destination</li>
            </ul>
          ),
        },
        {
          heading: '3. Shipping Charges',
          body: (
            <p>
              Shipping charges are calculated at checkout based on the delivery address, order weight, and
              selected shipping method. Orders above ₹2,000 may qualify for free standard shipping, shown
              automatically in your cart when eligible.
            </p>
          ),
        },
        {
          heading: '4. Order Tracking',
          body: (
            <p>
              Once your order ships, you'll receive a tracking link via email and SMS. You can also track your
              order anytime from Account &gt; Orders &gt; Order Details.
            </p>
          ),
        },
        {
          heading: '5. Delivery Attempts',
          body: (
            <p>
              Our delivery partners typically make up to 3 delivery attempts. If delivery is unsuccessful after
              3 attempts, the order may be returned to the seller, and you will be contacted regarding a
              reshipment or refund.
            </p>
          ),
        },
        {
          heading: '6. Delays',
          body: (
            <p>
              While we work hard to meet estimated delivery timelines, delays may occasionally occur due to
              weather, courier disruptions, customs processing (for international orders), or high-demand
              periods such as festive sales.
            </p>
          ),
        },
        {
          heading: '7. Undeliverable Areas',
          body: (
            <p>
              Some remote pin codes may have limited courier serviceability. If we're unable to deliver to your
              address, you will be notified before the order is shipped and offered a full refund.
            </p>
          ),
        },
        {
          heading: '8. Contact Us',
          body: (
            <p>
              For shipping-related questions, please reach out through the Help Centre. This page is placeholder
              content for demonstration purposes only.
            </p>
          ),
        },
      ]}
    />
  );
}
