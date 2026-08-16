import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon, PencilEdit02Icon, Delete02Icon, Location01Icon } from '@hugeicons/core-free-icons';
import DashboardEmptyState from '../../components/dashboard/DashboardEmptyState';
import { savedAddresses } from '../../data/checkoutData';

function Field({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-ink mb-1.5">{label}</label>
      <input
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink transition-colors"
        {...props}
      />
    </div>
  );
}

export default function AddressPage() {
  const [addresses, setAddresses] = useState(savedAddresses);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ label: '', line1: '', line2: '' });

  const startAdd = () => {
    setForm({ label: '', line1: '', line2: '' });
    setEditingId(null);
    setShowForm(true);
  };

  const startEdit = (addr) => {
    setForm({ label: addr.label, line1: addr.line1, line2: addr.line2 });
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleRemove = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.label.trim() || !form.line1.trim()) return;

    if (editingId) {
      setAddresses((prev) => prev.map((a) => (a.id === editingId ? { ...a, ...form } : a)));
    } else {
      setAddresses((prev) => [...prev, { id: `addr-${Date.now()}`, isDefault: false, ...form }]);
    }
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink">Your Address</h1>
        <button
          type="button"
          onClick={startAdd}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-ink hover:bg-black text-white text-sm font-semibold transition-colors cursor-pointer"
        >
          <HugeiconsIcon icon={PlusSignIcon} size={16} />
          Add Address
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-200 p-5 space-y-4 mb-6 max-w-lg"
        >
          <Field
            label="Label"
            value={form.label}
            onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
            placeholder="e.g. Home, Office"
          />
          <Field
            label="Address line 1"
            value={form.line1}
            onChange={(e) => setForm((f) => ({ ...f, line1: e.target.value }))}
            placeholder="House no., street, area"
          />
          <Field
            label="Address line 2"
            value={form.line2}
            onChange={(e) => setForm((f) => ({ ...f, line2: e.target.value }))}
            placeholder="City, State, PIN, Country"
          />
          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-ink hover:bg-black text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              {editingId ? 'Update address' : 'Save address'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-ink hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {addresses.length === 0 ? (
        <DashboardEmptyState
          icon={Location01Icon}
          title="No saved addresses"
          description="Add an address to speed up checkout next time."
        />
      ) : (
        <div className="space-y-3">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 px-5 py-4"
            >
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-ink">{addr.label}</span>
                  {addr.isDefault && (
                    <span className="px-2 py-0.5 rounded-full bg-ink text-white text-[10px] font-semibold tracking-wide">
                      DEFAULT
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{addr.line1}</p>
                <p className="text-sm text-gray-600">{addr.line2}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  aria-label={`Edit ${addr.label}`}
                  onClick={() => startEdit(addr)}
                  className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100 text-gray-500 hover:text-ink transition-colors cursor-pointer"
                >
                  <HugeiconsIcon icon={PencilEdit02Icon} size={17} />
                </button>
                <button
                  type="button"
                  aria-label={`Remove ${addr.label}`}
                  onClick={() => handleRemove(addr.id)}
                  className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <HugeiconsIcon icon={Delete02Icon} size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
