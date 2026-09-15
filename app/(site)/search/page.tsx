import { Suspense } from 'react';
import SearchResultsPage from '@/views/SearchResultsPage';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SearchResultsPage />
    </Suspense>
  );
}
