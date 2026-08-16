import { useState } from 'react';

const emptyAddress = {
  houseNo: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
  country: 'India',
  isDefault: false,
};

function Field({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-ink mb-1.5">{label}</label>
      <input
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink transition-colors disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
        {...props}
      />
    </div>
  );
}

export default function AddressForm({ initialValues, onSave, onCancel, submitLabel = 'Save Address' }) {
  const [values, setValues] = useState({ ...emptyAddress, ...initialValues });

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.houseNo.trim() || !values.addressLine1.trim() || !values.city.trim()) return;
    onSave(values);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 p-5 sm:p-6 space-y-4">
      <Field
        label="House No."
        required
        value={values.houseNo}
        onChange={set('houseNo')}
        placeholder="e.g. 297 C"
      />
      <Field
        label="Address Line 1"
        required
        value={values.addressLine1}
        onChange={set('addressLine1')}
        placeholder="Street, locality, village"
      />
      <Field
        label="Address Line 2"
        value={values.addressLine2}
        onChange={set('addressLine2')}
        placeholder="Landmark (optional)"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="City"
          required
          value={values.city}
          onChange={set('city')}
          placeholder="e.g. Ludhiana"
        />
        <Field
          label="State"
          required
          value={values.state}
          onChange={set('state')}
          placeholder="e.g. Punjab"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Pincode"
          required
          value={values.pincode}
          onChange={set('pincode')}
          placeholder="e.g. 141116"
          inputMode="numeric"
        />
        <Field label="Country" value={values.country} disabled />
      </div>

      <label className="flex items-center gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          checked={values.isDefault}
          onChange={(e) => setValues((v) => ({ ...v, isDefault: e.target.checked }))}
          className="h-4.5 w-4.5 rounded border-gray-400 accent-ink cursor-pointer"
        />
        <span className="text-sm text-ink">Set as default address</span>
      </label>

      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          className="px-6 py-3 rounded-full bg-ink hover:bg-black text-white text-sm font-semibold transition-colors cursor-pointer"
        >
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 rounded-full border border-gray-300 text-sm font-semibold text-ink hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
