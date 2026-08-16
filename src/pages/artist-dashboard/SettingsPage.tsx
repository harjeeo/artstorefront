import { useState } from 'react';

export default function SettingsPage() {
  const [shopName, setShopName] = useState('WonkyStitching');
  const [email, setEmail] = useState('connor@wonkystitching.com');
  const [bio, setBio] = useState('Hand embroidered custom tees, made to order in the UK.');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-6">Settings</h1>

      <form onSubmit={handleSave} className="max-w-lg space-y-5">
        <div>
          <label className="block text-sm font-semibold text-ink mb-1.5">Shop Name</label>
          <input
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink mb-1.5">Shop Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink transition-colors resize-none"
          />
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-ink hover:bg-black text-white font-semibold text-sm transition-colors cursor-pointer"
          >
            Save Changes
          </button>
          {saved && <span className="text-sm text-green-600 font-medium">Saved!</span>}
        </div>
      </form>
    </div>
  );
}
