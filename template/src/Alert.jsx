import { useState } from 'preact/hooks';

export default function Alert({ 
  type = 'info', 
  title = '', 
  dismissible = false, 
  className = '', 
  icon = null, 
  children 
}) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  let border = 'border-blue-100 dark:border-blue-900/30';
  let bg = 'bg-blue-50/40 dark:bg-blue-950/10';
  let text = 'text-blue-900 dark:text-blue-200';
  let iconColor = 'text-blue-600 dark:text-blue-400';
  let defaultIcon = 'info';

  // Handle boolean conversions when attributes are passed from Web Component
  const isDismissible = dismissible === true || dismissible === 'true' || dismissible === '';

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

  // Re-run Lucide icons after rendering
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    setTimeout(() => window.lucide.createIcons(), 0);
  }

  return (
    <div className={`block my-4 transition-all duration-300 ${className}`}>
      <div className={`relative flex gap-3 p-4 rounded-xl border ${border} ${bg} ${text}`}>
        <i data-lucide={finalIcon} className={`w-5 h-5 ${iconColor} shrink-0 mt-0.5`}></i>
        <div className="text-sm flex-1">
          {title && <span className="font-semibold block mb-0.5">{title}</span>}
          <div className="leading-relaxed content-area">
            {typeof children === 'string' ? (
              <span dangerouslySetInnerHTML={{ __html: children }} />
            ) : (
              children
            )}
          </div>
        </div>
        {isDismissible && (
          <button 
            onClick={() => setVisible(false)}
            className="close-btn p-1 -mt-1 -mr-1 rounded-lg text-current hover:bg-black/5 dark:hover:bg-white/5 opacity-60 hover:opacity-100 self-start transition-all" 
            aria-label="Close Alert"
          >
            <i data-lucide="x" className="w-4 h-4"></i>
          </button>
        )}
      </div>
    </div>
  );
}
