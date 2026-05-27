/**
 * Sidebar Component - TSX/React style in Vanilla JS
 * Responsive to Tailwind CSS classes
 */

export function Sidebar({
  items = [],
  className = ''
} = {}) {
  // Create backdrop if it doesn't exist
  let backdrop = document.getElementById('sidebar-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'sidebar-backdrop';
    backdrop.className = 'fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm hidden md:hidden';
    document.body.appendChild(backdrop);
  }

  // Create aside element
  const element = document.createElement('aside');
  element.id = 'sidebar';
  element.className = `fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 dark:bg-slate-900 dark:border-slate-800 transform -translate-x-full md:translate-x-0 md:static md:z-0 md:h-[calc(100vh-4rem)] md:sticky md:top-16 transition-all duration-200 overflow-y-auto p-6 flex flex-col gap-6 ${className}`;

  // Build layout structure
  element.innerHTML = `
    <!-- Mobile Close Button & Search -->
    <div class="flex items-center justify-between md:hidden pb-2 border-b border-slate-100 dark:border-slate-800">
      <span class="font-bold text-slate-900 dark:text-white">Điều hướng</span>
      <button id="mobile-sidebar-close" class="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close sidebar">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
    </div>

    <div class="sm:hidden relative">
      <i data-lucide="search" class="absolute left-3 top-2.5 h-4 w-4 text-slate-400"></i>
      <input type="text" id="mobile-search-input" placeholder="Tìm kiếm..." class="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-4 text-sm focus:outline-none dark:border-slate-800 dark:bg-slate-900 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500">
    </div>

    <!-- Navigation Link Tree -->
    <nav class="flex-1 flex flex-col gap-6 text-sm">
    </nav>
  `;

  // Render navigation links dynamically
  const nav = element.querySelector('nav');
  
  // Keep track of all navigation anchors
  const navLinksMap = new Map();

  items.forEach(group => {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'flex flex-col gap-2';

    if (group.title) {
      const groupHeader = document.createElement('h3');
      groupHeader.className = 'font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] text-slate-400 dark:text-slate-500';
      groupHeader.textContent = group.title;
      groupDiv.appendChild(groupHeader);
    }

    const ul = document.createElement('ul');
    ul.className = 'flex flex-col gap-1 border-l border-slate-100 dark:border-slate-800 ml-1.5 pl-3';

    if (group.links) {
      group.links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href || '#';
        a.textContent = link.text;
        
        if (link.active) {
          a.className = 'nav-link block py-1.5 text-brand-600 dark:text-brand-400 font-medium -ml-3.5 pl-3.5 border-l-2 border-brand-600 dark:border-brand-400 transition-all';
        } else {
          a.className = 'nav-link block py-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-all';
        }

        li.appendChild(a);
        ul.appendChild(li);

        if (link.href) {
          navLinksMap.set(link.href, a);
        }
      });
    }

    groupDiv.appendChild(ul);
    nav.appendChild(groupDiv);
  });

  // Action methods to Open / Close sidebar drawer (mobile view)
  const openSidebar = () => {
    element.classList.remove('-translate-x-full');
    backdrop.classList.remove('hidden');
  };

  const closeSidebar = () => {
    element.classList.add('-translate-x-full');
    backdrop.classList.add('hidden');
  };

  // Bind close buttons
  const closeBtn = element.querySelector('#mobile-sidebar-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSidebar);
  }
  backdrop.addEventListener('click', closeSidebar);

  // Auto-close when clicking any nav link inside sidebar on mobile
  element.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
      closeSidebar();
    }
  });

  // Mobile search input binding
  const mobileSearch = element.querySelector('#mobile-search-input');
  if (mobileSearch) {
    mobileSearch.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      document.dispatchEvent(new CustomEvent('search-docs', { detail: { query: term } }));
    });
  }

  // Listen to Custom Event `toggle-sidebar` to control drawer visibility from header or outside
  document.addEventListener('toggle-sidebar', (e) => {
    if (e.detail?.open === true) {
      openSidebar();
    } else if (e.detail?.open === false) {
      closeSidebar();
    } else {
      // Toggle state
      if (element.classList.contains('-translate-x-full')) {
        openSidebar();
      } else {
        closeSidebar();
      }
    }
  });

  // Listen to navigation events to update active state programmatically
  document.addEventListener('active-link-change', (e) => {
    const targetHref = e.detail?.href;
    if (!targetHref) return;

    navLinksMap.forEach((linkNode, href) => {
      if (href === targetHref) {
        linkNode.className = 'nav-link block py-1.5 text-brand-600 dark:text-brand-400 font-medium -ml-3.5 pl-3.5 border-l-2 border-brand-600 dark:border-brand-400 transition-all';
      } else {
        linkNode.className = 'nav-link block py-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-all';
      }
    });
  });

  // Trigger Lucide rendering
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    setTimeout(() => window.lucide.createIcons(), 0);
  }

  return element;
}
