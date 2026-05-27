/**
 * CodeBlock Component - TSX/React style in Vanilla JS
 */

export function CodeBlock({
  language = 'javascript',
  code = '',
  className = ''
} = {}) {
  const element = document.createElement('div');
  element.className = `block my-5 ${className}`;

  // Helper to escape HTML characters
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  element.innerHTML = `
    <div class="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
      <div class="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-slate-100/80 dark:border-slate-800 dark:bg-slate-900 text-xs font-mono text-slate-500 dark:text-slate-400">
        <span>${language}</span>
        <button class="copy-btn hover:text-slate-800 dark:hover:text-white flex items-center gap-1 transition-all">
          <i data-lucide="copy" class="w-3.5 h-3.5"></i>
          <span>Copy</span>
        </button>
      </div>
      <pre class="p-4 bg-slate-950 text-slate-200 font-mono text-sm overflow-x-auto leading-relaxed"><code>${escapeHtml(code)}</code></pre>
    </div>
  `;

  // Bind Copy Action
  const copyBtn = element.querySelector('.copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(code).then(() => {
        const label = copyBtn.querySelector('span');
        label.textContent = 'Copied!';
        copyBtn.classList.add('text-emerald-500');
        setTimeout(() => {
          label.textContent = 'Copy';
          copyBtn.classList.remove('text-emerald-500');
        }, 2000);
      });
    });
  }

  // Trigger Lucide rendering
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    setTimeout(() => window.lucide.createIcons(), 0);
  }

  return element;
}
