import { useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon, StarIcon, ImageUploadIcon } from '@hugeicons/core-free-icons';
import { useProductReviews } from '../../context/ProductReviewsContext';

const REVIEW_TAGS = ['Product Quality', 'Color', 'Material', 'Fit', 'Value For Money'];
const MAX_PHOTOS = 4;

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

interface WriteReviewModalProps {
  onClose: () => void;
}

export default function WriteReviewModal({ onClose }: WriteReviewModalProps) {
  const { addReview } = useProductReviews();
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleTag = (tag: string) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    const remaining = MAX_PHOTOS - photos.length;
    const selected = Array.from(files).slice(0, remaining);
    const dataUrls = await Promise.all(selected.map(readAsDataUrl));
    setPhotos((prev) => [...prev, ...dataUrls]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !text.trim()) return;
    addReview({
      name: 'You',
      rating,
      text: text.trim(),
      tags: tags.length > 0 ? tags : undefined,
      images: photos.length > 0 ? photos : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Write a review"
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-7"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-ink">Write a Review</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-ink mb-1.5">Your Rating</label>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  aria-label={`${i + 1} star`}
                  className="cursor-pointer"
                >
                  <HugeiconsIcon
                    icon={StarIcon}
                    size={26}
                    className={i < rating ? 'text-brand fill-brand' : 'text-gray-300'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              What did you like? (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {REVIEW_TAGS.map((tag) => {
                const active = tags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    aria-pressed={active}
                    className={`px-3.5 py-1.5 rounded-full border text-sm font-medium cursor-pointer transition-colors ${
                      active
                        ? 'bg-ink text-white border-ink'
                        : 'border-gray-300 text-ink hover:border-ink'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-1.5">Your Review</label>
            <textarea
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="Share your experience with this product..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Add Photos (optional)
            </label>
            <div className="flex flex-wrap gap-3">
              {photos.map((src, i) => (
                <div key={i} className="relative h-20 w-20 shrink-0">
                  <img src={src} alt="" className="h-full w-full rounded-lg object-cover" />
                  <button
                    type="button"
                    aria-label="Remove photo"
                    onClick={() => removePhoto(i)}
                    className="absolute -top-2 -right-2 flex items-center justify-center h-6 w-6 rounded-full bg-ink text-white shadow-sm cursor-pointer"
                  >
                    <HugeiconsIcon icon={Cancel01Icon} size={12} />
                  </button>
                </div>
              ))}
              {photos.length < MAX_PHOTOS && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center h-20 w-20 rounded-lg border border-dashed border-gray-300 text-gray-400 hover:border-ink hover:text-ink transition-colors cursor-pointer shrink-0"
                >
                  <HugeiconsIcon icon={ImageUploadIcon} size={22} />
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <p className="text-xs text-gray-500 mt-2">Up to {MAX_PHOTOS} photos</p>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center w-full py-3.5 rounded-full bg-ink hover:bg-black text-white font-semibold text-sm transition-colors cursor-pointer"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
