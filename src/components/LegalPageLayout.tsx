import type { ReactNode } from 'react';

interface LegalSection {
  heading: string;
  body: ReactNode;
}

interface LegalPageLayoutProps {
  title: string;
  updatedOn: string;
  intro?: string;
  sections: LegalSection[];
}

export default function LegalPageLayout({ title, updatedOn, intro, sections }: LegalPageLayoutProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-serif font-medium text-ink mb-2">{title}</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: {updatedOn}</p>

      {intro && <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-8">{intro}</p>}

      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold text-ink mb-2">{section.heading}</h2>
            <div className="text-sm sm:text-base text-gray-700 leading-relaxed space-y-3">{section.body}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
