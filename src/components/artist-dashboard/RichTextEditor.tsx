import { useEffect, useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  LeftToRightListBulletIcon,
  LeftToRightListNumberIcon,
} from '@hugeicons/core-free-icons';

const tools = [
  { command: 'bold', icon: TextBoldIcon, label: 'Bold' },
  { command: 'italic', icon: TextItalicIcon, label: 'Italic' },
  { command: 'underline', icon: TextUnderlineIcon, label: 'Underline' },
  { command: 'insertUnorderedList', icon: LeftToRightListBulletIcon, label: 'Bullet list' },
  { command: 'insertOrderedList', icon: LeftToRightListNumberIcon, label: 'Numbered list' },
];

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  // Only sync external value in when it actually differs (e.g. reset),
  // so typing doesn't get clobbered by re-renders.
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const runCommand = (command: string) => {
    editorRef.current?.focus();
    document.execCommand(command);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const isEmpty = !value || value === '<br>';

  return (
    <div className="rounded-lg border border-gray-300 overflow-hidden focus-within:border-ink transition-colors">
      <div className="flex items-center gap-1 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
        {tools.map((tool) => (
          <button
            key={tool.command}
            type="button"
            title={tool.label}
            aria-label={tool.label}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => runCommand(tool.command)}
            className="flex items-center justify-center h-8 w-8 rounded-md text-gray-600 hover:bg-gray-200 hover:text-ink transition-colors cursor-pointer"
          >
            <HugeiconsIcon icon={tool.icon} size={16} />
          </button>
        ))}
      </div>

      <div className="relative">
        {isEmpty && placeholder && (
          <p className="pointer-events-none absolute left-4 top-3 text-sm text-gray-400">
            {placeholder}
          </p>
        )}
        <div
          ref={editorRef}
          contentEditable
          onInput={(e) => onChange(e.currentTarget.innerHTML)}
          className="min-h-[160px] px-4 py-3 text-sm text-ink focus:outline-none [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
          suppressContentEditableWarning
        />
      </div>
    </div>
  );
}
