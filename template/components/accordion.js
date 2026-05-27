/**
 * Accordion Component - TSX/React style in Vanilla JS
 */

export function Accordion({
  title = 'Xem thêm',
  children = '',
  className = ''
} = {}) {
  const element = document.createElement('div');
  element.className = `block my-3 ${className}`;

  element.innerHTML = `
    <details class="group border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 transition-all">
      <summary class="flex justify-between items-center font-medium cursor-pointer p-4 select-none list-none text-sm text-slate-900 dark:text-white">
        <span>${title}</span>
        <span class="transition group-open:rotate-180 text-slate-400">
          <i data-lucide="chevron-down" class="w-4 h-4"></i>
        </span>
      </summary>
      <div class="px-4 pb-4 pt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/50 mt-1 content-area">
      </div>
    </details>
  `;

  // Render children
  const contentArea = element.querySelector('.content-area');
  if (typeof children === 'string') {
    contentArea.innerHTML = children;
  } else if (children instanceof HTMLElement) {
    contentArea.appendChild(children);
  } else if (Array.isArray(children)) {
    children.forEach(child => {
      if (child instanceof HTMLElement) {
        contentArea.appendChild(child);
      } else {
        contentArea.appendChild(document.createTextNode(String(child)));
      }
    });
  }

  // Trigger Lucide rendering
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    setTimeout(() => window.lucide.createIcons(), 0);
  }

  return element;
}
