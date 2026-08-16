import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { Notification03Icon } from '@hugeicons/core-free-icons';
import ArtistSidebar from './ArtistSidebar';

export default function ArtistDashboardLayout() {
  const [hasUnread] = useState(true);

  return (
    <div className="flex h-screen bg-[#faf9f7]">
      <ArtistSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-end h-16 shrink-0 px-6 border-b border-gray-200 bg-white">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <HugeiconsIcon icon={Notification03Icon} size={22} />
            {hasUnread && (
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-brand" />
            )}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
