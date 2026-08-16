import { useState } from 'react';

export default function ProfilePage() {
  const [name, setName] = useState('Tanvir Kalsi');
  const [phone, setPhone] = useState('9876543210');
  const [saved, setSaved] = useState(false);
  const email = 'tanvirkalsi93@gmail.com';

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-6">Profile</h1>

      <form onSubmit={handleSave} className="max-w-lg space-y-5">
        <div>
          <label className="block text-sm font-semibold text-ink mb-1.5">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink mb-1.5">Email</label>
          <input
            value={email}
            disabled
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink mb-1.5">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink transition-colors"
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
