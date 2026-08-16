import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon, PencilEdit02Icon, Delete02Icon, Location01Icon } from '@hugeicons/core-free-icons';
import DashboardEmptyState from '../../components/dashboard/DashboardEmptyState';
import AddressForm, { type AddressFormValues } from '../../components/checkout/AddressForm';
import { savedAddresses, formatAddressLines } from '../../data/checkoutData';

export default function AddressPage() {
  const [addresses, setAddresses] = useState(savedAddresses);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const startAdd = () => {
    setEditingId(null);
    setShowForm(true);
  };

  const startEdit = (id: string) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleRemove = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSave = (values: AddressFormValues) => {
    setAddresses((prev) => {
      let next = editingId
        ? prev.map((a) => (a.id === editingId ? { ...a, ...values } : a))
        : [...prev, { id: `addr-${Date.now()}`, ...values }];

      if (values.isDefault) {
        const targetId = editingId ?? next[next.length - 1].id;
        next = next.map((a) => ({ ...a, isDefault: a.id === targetId }));
      }
      return next;
    });
    setShowForm(false);
  };

  const editingAddress = addresses.find((a) => a.id === editingId);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink">Your Address</h1>
        {!showForm && (
          <button
            type="button"
            onClick={startAdd}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-ink hover:bg-black text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Add Address
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-6">
          <AddressForm
            initialValues={editingAddress}
            submitLabel={editingId ? 'Update Address' : 'Save Address'}
            onSave={handleSave}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {addresses.length === 0 ? (
        <DashboardEmptyState
          icon={Location01Icon}
          title="No saved addresses"
          description="Add an address to speed up checkout next time."
        />
      ) : (
        <div className="space-y-3">
          {addresses.map((addr) => {
            const { title, line1, line2, line3 } = formatAddressLines(addr);
            return (
              <div
                key={addr.id}
                className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 px-5 py-4"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-ink">{title}</span>
                    {addr.isDefault && (
                      <span className="px-2 py-0.5 rounded-full bg-ink text-white text-[10px] font-semibold tracking-wide">
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{line1}</p>
                  {line2 && <p className="text-sm text-gray-600">{line2}</p>}
                  <p className="text-sm text-gray-600">{line3}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    aria-label={`Edit ${title}`}
                    onClick={() => startEdit(addr.id)}
                    className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100 text-gray-500 hover:text-ink transition-colors cursor-pointer"
                  >
                    <HugeiconsIcon icon={PencilEdit02Icon} size={17} />
                  </button>
                  <button
                    type="button"
                    aria-label={`Remove ${title}`}
                    onClick={() => handleRemove(addr.id)}
                    className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <HugeiconsIcon icon={Delete02Icon} size={17} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
