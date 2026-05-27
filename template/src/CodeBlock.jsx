import { useState } from 'preact/hooks';

export default function CodeBlock({ language = 'plaintext', code = '' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Re-run Lucide icons after rendering
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    setTimeout(() => window.lucide.createIcons(), 0);
  }

  return (
    <div className="relative group my-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-200 font-mono text-sm shadow-md">
      {/* Code Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-900 bg-slate-900/60 text-xs text-slate-400 select-none">
        <span className="font-semibold uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 active:bg-slate-800 text-slate-350 hover:text-white transition-all focus:outline-none"
        >
          <i data-lucide={copied ? 'check' : 'copy'} className="w-3.5 h-3.5"></i>
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      
      {/* Code Area */}
      <pre className="p-4 overflow-x-auto m-0 leading-relaxed font-mono text-xs sm:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}
