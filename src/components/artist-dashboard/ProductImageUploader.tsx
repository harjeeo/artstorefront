import { useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ImageUploadIcon, Delete02Icon } from '@hugeicons/core-free-icons';

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

interface ProductImageUploaderProps {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
}

export default function ProductImageUploader({ value, onChange }: ProductImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    onChange(await readAsDataUrl(file));
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      {value ? (
        <div className="relative w-48 h-48">
          <img src={value} alt="Product" className="h-full w-full rounded-xl object-cover border border-gray-200" />
          <button
            type="button"
            aria-label="Remove image"
            onClick={() => onChange(null)}
            className="absolute -top-2 -right-2 flex items-center justify-center h-8 w-8 rounded-full bg-ink text-white shadow-sm hover:bg-black transition-colors cursor-pointer"
          >
            <HugeiconsIcon icon={Delete02Icon} size={15} />
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute inset-x-0 bottom-0 py-1.5 rounded-b-xl bg-black/60 text-white text-xs font-semibold text-center cursor-pointer hover:bg-black/70 transition-colors"
          >
            Replace
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 w-48 h-48 rounded-xl border border-dashed border-gray-300 text-gray-400 hover:border-ink hover:text-ink transition-colors cursor-pointer"
        >
          <HugeiconsIcon icon={ImageUploadIcon} size={28} />
          <span className="text-sm font-medium">Upload image</span>
          <span className="text-xs text-gray-400">PNG or JPG</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files)}
      />
    </div>
  );
}
