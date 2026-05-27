import { useState } from 'preact/hooks';

export default function Accordion({ title = '', open = false, children }) {
  const isInitiallyOpen = open === true || open === 'true' || open === '';
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);

  // Re-run Lucide icons after rendering
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    setTimeout(() => window.lucide.createIcons(), 0);
  }

  return (
    <div className="border border-slate-200 dark:border-slate-800/80 rounded-xl overflow-hidden bg-white dark:bg-slate-900 transition-all duration-300 my-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <i
          data-lucide="chevron-down"
          className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform duration-300 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        ></i>
      </button>
      <div
        className={`transition-all duration-350 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1000px] border-t border-slate-100 dark:border-slate-800/40' : 'max-h-0'
        }`}
      >
        <div className="p-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed content-area">
          {typeof children === 'string' ? (
            <span dangerouslySetInnerHTML={{ __html: children }} />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}
