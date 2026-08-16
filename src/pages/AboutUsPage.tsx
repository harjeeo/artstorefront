import LegalPageLayout from '../components/LegalPageLayout';

export default function AboutUsPage() {
  return (
    <LegalPageLayout
      title="About Us"
      updatedOn="August 16, 2026"
      intro="Artisan is a marketplace built to keep commerce human — connecting independent artists and small creators with people who care about where their things come from. This is placeholder text for demonstration purposes only."
      sections={[
        {
          heading: 'Our Story',
          body: (
            <p>
              Artisan started with a simple idea: shopping should feel personal again. In a world of mass
              production, we wanted to build a home for handmade, original, and one-of-a-kind goods — a place
              where every purchase supports a real person's craft, not just a supply chain.
            </p>
          ),
        },
        {
          heading: 'What We Do',
          body: (
            <p>
              We connect thousands of independent artists, makers, and small creators with buyers looking for
              something authentic — from hand-thrown ceramics and custom jewelry to wall art, home decor, and
              thoughtful gifts. Every listing on Artisan is made, curated, or customized by the seller behind it.
            </p>
          ),
        },
        {
          heading: 'Our Values',
          body: (
            <ul className="list-disc pl-5 space-y-1">
              <li>Support independent creators and small businesses</li>
              <li>Champion original, handmade, and sustainable goods</li>
              <li>Keep the marketplace fair, transparent, and human</li>
              <li>Build trust between buyers and sellers</li>
            </ul>
          ),
        },
        {
          heading: 'By the Numbers',
          body: (
            <p>
              Today, Artisan is home to a growing community of independent sellers shipping handmade and custom
              goods worldwide. These figures are placeholder statistics for demonstration purposes.
            </p>
          ),
        },
        {
          heading: 'Join Our Community',
          body: (
            <p>
              Whether you're here to shop or to sell, we're glad you're part of Artisan. If you're a maker
              looking to open your own shop, visit our "Sell on Artisan" page to get started.
            </p>
          ),
        },
      ]}
    />
  );
}
