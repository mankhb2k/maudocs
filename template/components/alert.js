/**
 * Alert Component - TSX/React style in Vanilla JS
 * Responsive to Tailwind CSS classes
 */

export function Alert({
  type = 'info',
  title = '',
  children = '',
  dismissible = false,
  onClose = null,
  className = '',
  icon = null
} = {}) {
  // Create outer container element
  const element = document.createElement('div');
  element.className = `block my-4 transition-all duration-300 ${className}`;

  // Configure theme styles & default icons based on type
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

  // Use custom icon if provided
  const finalIcon = icon || defaultIcon;

  // Build inside alert layout
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

  // Render children (supports String, HTMLElement or Array of nodes)
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

  // Bind close action if dismissible
  if (dismissible) {
    const closeBtn = element.querySelector('.close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        // Fade out animation
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

  // Trigger Lucide rendering
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    setTimeout(() => window.lucide.createIcons(), 0);
  }

  return element;
}
