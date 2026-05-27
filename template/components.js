/**
 * DevDocs Standalone Web Components & JS Functional Helpers
 * Works offline (file://) and online via CDN without CORS restrictions.
 */

(function() {
  'use strict';

  // ==========================================
  // 1. Alert Component Builder
  // ==========================================
  function Alert({
    type = 'info',
    title = '',
    children = '',
    dismissible = false,
    onClose = null,
    className = '',
    icon = null
  } = {}) {
    const element = document.createElement('div');
    element.className = `block my-4 transition-all duration-300 ${className}`;

    let border = 'border-blue-100 dark:border-blue-900/30';
    let bg = 'bg-blue-50/40 dark:bg-blue-950/10';
    let text = 'text-blue-900 dark:text-blue-200';
    let iconColor = 'text-blue-600 dark:text-blue-400';
    let defaultIcon = 'info';

    switch (type) {
      case 'warning':
        border = 'border-amber-100 dark:border-amber-900/30';
        bg = 'bg-amber-50/40 dark:bg-amber-950/10';
        text = 'text-amber-900 dark:text-amber-200';
        iconColor = 'text-amber-600 dark:text-amber-400';
        defaultIcon = 'alert-triangle';
        break;
      case 'success':
        border = 'border-emerald-100 dark:border-emerald-900/30';
        bg = 'bg-emerald-50/40 dark:bg-emerald-950/10';
        text = 'text-emerald-900 dark:text-emerald-200';
        iconColor = 'text-emerald-600 dark:text-emerald-400';
        defaultIcon = 'check-circle-2';
        break;
      case 'danger':
      case 'error':
        border = 'border-red-100 dark:border-red-900/30';
        bg = 'bg-red-50/40 dark:bg-red-950/10';
        text = 'text-red-900 dark:text-red-200';
        iconColor = 'text-red-600 dark:text-red-400';
        defaultIcon = 'x-circle';
        break;
    }

    const finalIcon = icon || defaultIcon;

    element.innerHTML = `
      <div class="relative flex gap-3 p-4 rounded-xl border ${border} ${bg} ${text}">
        <i data-lucide="${finalIcon}" class="w-5 h-5 ${iconColor} shrink-0 mt-0.5"></i>
        <div class="text-sm flex-1">
          ${title ? `<span class="font-semibold block mb-0.5">${title}</span>` : ''}
          <div class="leading-relaxed content-area"></div>
        </div>
        ${
          dismissible
            ? `<button class="close-btn p-1 -mt-1 -mr-1 rounded-lg text-current hover:bg-black/5 dark:hover:bg-white/5 opacity-60 hover:opacity-100 self-start transition-all" aria-label="Close Alert">
                <i data-lucide="x" class="w-4 h-4"></i>
               </button>`
            : ''
        }
      </div>
    `;

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

    if (dismissible) {
      const closeBtn = element.querySelector('.close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          element.style.opacity = '0';
          element.style.transform = 'scale(0.95)';
          
          setTimeout(() => {
            element.remove();
            if (typeof onClose === 'function') {
              onClose();
            }
          }, 200);
        });
      }
    }

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      setTimeout(() => window.lucide.createIcons(), 0);
    }

    return element;
  }

  // ==========================================
  // 2. Accordion Component Builder
  // ==========================================
  function Accordion({
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

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      setTimeout(() => window.lucide.createIcons(), 0);
    }

    return element;
  }

  // ==========================================
  // 3. CodeBlock Component Builder
  // ==========================================
  function CodeBlock({
    language = 'javascript',
    code = '',
    className = ''
  } = {}) {
    const element = document.createElement('div');
    element.className = `block my-5 ${className}`;

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

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      setTimeout(() => window.lucide.createIcons(), 0);
    }

    return element;
  }

  // Expose components globally on window.DevDocs
  window.DevDocs = { Alert, Accordion, CodeBlock };

  // ==========================================
  // 4. Custom Elements Registration
  // ==========================================
  
  // <docs-alert>
  class DocsAlert extends HTMLElement {
    connectedCallback() {
      const type = this.getAttribute('type') || 'info';
      const title = this.getAttribute('title') || '';
      const dismissible = this.hasAttribute('dismissible') || this.getAttribute('dismissible') === 'true';
      const className = this.getAttribute('class') || '';
      
      const fragment = document.createDocumentFragment();
      while (this.firstChild) {
        fragment.appendChild(this.firstChild);
      }
      
      const alertEl = Alert({
        type,
        title,
        dismissible,
        className,
        children: Array.from(fragment.childNodes)
      });
      
      this.appendChild(alertEl);
    }
  }
  if (!customElements.get('docs-alert')) {
    customElements.define('docs-alert', DocsAlert);
  }

  // <docs-accordion>
  class DocsAccordion extends HTMLElement {
    connectedCallback() {
      const title = this.getAttribute('title') || 'Xem thêm';
      const className = this.getAttribute('class') || '';
      
      const fragment = document.createDocumentFragment();
      while (this.firstChild) {
        fragment.appendChild(this.firstChild);
      }
      
      const accordionEl = Accordion({
        title,
        className,
        children: Array.from(fragment.childNodes)
      });
      
      this.appendChild(accordionEl);
    }
  }
  if (!customElements.get('docs-accordion')) {
    customElements.define('docs-accordion', DocsAccordion);
  }

  // <docs-code-block>
  class DocsCodeBlock extends HTMLElement {
    connectedCallback() {
      const language = this.getAttribute('language') || 'javascript';
      const code = this.getAttribute('code') || '';
      const className = this.getAttribute('class') || '';
      
      const codeBlockEl = CodeBlock({
        language,
        code,
        className
      });
      
      this.appendChild(codeBlockEl);
    }
  }
  if (!customElements.get('docs-code-block')) {
    customElements.define('docs-code-block', DocsCodeBlock);
  }

})();
