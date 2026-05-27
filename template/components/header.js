/**
 * Header Component - TSX/React style in Vanilla JS
 * Responsive to Tailwind CSS classes
 */

export function Header({
  title = 'DevDocs',
  logo = 'book-open',
  githubUrl = 'https://github.com',
  searchPlaceholder = 'Tìm kiếm tài liệu...',
  onSearch = null,
  className = ''
} = {}) {
  // Create outer header element
  const element = document.createElement('header');
  element.className = `sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80 transition-colors duration-200 ${className}`;

  // Process title: If it starts with "DevDocs", format it with the brand color span
  let titleHtml = title;
  if (title === 'DevDocs') {
    titleHtml = `Dev<span class="text-brand-600 dark:text-brand-400">Docs</span>`;
  }

  // Build the inner HTML template
  element.innerHTML = `
    <div class="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      
      <!-- Logo & Hamburger Menu (Mobile Only) -->
      <div class="flex items-center gap-3">
        <button id="mobile-sidebar-toggle" class="p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 md:hidden transition-colors" aria-label="Toggle navigation">
          <i data-lucide="menu" class="w-6 h-6"></i>
        </button>
        <a href="#" class="flex items-center gap-2.5 font-bold text-lg tracking-tight text-slate-900 dark:text-white">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <i data-lucide="${logo}" class="w-4.5 h-4.5"></i>
          </div>
          <span>${titleHtml}</span>
        </a>
      </div>

      <!-- Search Bar -->
      <div class="hidden sm:flex flex-1 max-w-md relative">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <i data-lucide="search" class="h-4 w-4 text-slate-400"></i>
        </div>
        <input type="text" id="search-input" placeholder="${searchPlaceholder}" class="w-full rounded-full border border-slate-200 bg-slate-50/50 py-1.5 pl-9 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900 transition-all">
        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
          <kbd class="hidden md:inline-block rounded border border-slate-200 bg-white px-1.5 font-mono text-[10px] font-medium text-slate-400 dark:border-slate-800 dark:bg-slate-900">Ctrl K</kbd>
        </div>
      </div>

      <!-- Actions (Theme Toggle, Social Links) -->
      <div class="flex items-center gap-2">
        <!-- Theme Toggle -->
        <button id="theme-toggle" class="p-2.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-all" aria-label="Toggle dark mode">
          <i id="theme-toggle-dark-icon" data-lucide="moon" class="w-5 h-5 hidden"></i>
          <i id="theme-toggle-light-icon" data-lucide="sun" class="w-5 h-5 hidden"></i>
        </button>

        <!-- GitHub -->
        ${githubUrl ? `
        <a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="p-2.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-all" aria-label="GitHub">
          <i data-lucide="github" class="w-5 h-5"></i>
        </a>` : ''}
      </div>
    </div>
  `;

  // Bind Hamburger Toggle Event (dispatches a custom event to document scope)
  const toggleBtn = element.querySelector('#mobile-sidebar-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('toggle-sidebar', { detail: { open: true } }));
    });
  }

  // Bind Search functionality
  const searchInput = element.querySelector('#search-input');
  if (searchInput && typeof onSearch === 'function') {
    searchInput.addEventListener('input', (e) => {
      onSearch(e.target.value);
    });
  }

  // Ctrl+K Shortcut to focus search bar
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
      }
    }
  });

  // Self-contained Dark Mode / Light Mode logic
  const themeBtn = element.querySelector('#theme-toggle');
  const darkIcon = element.querySelector('#theme-toggle-dark-icon');
  const lightIcon = element.querySelector('#theme-toggle-light-icon');

  function updateIcons() {
    if (document.documentElement.classList.contains('dark')) {
      darkIcon.classList.add('hidden');
      lightIcon.classList.remove('hidden');
    } else {
      lightIcon.classList.add('hidden');
      darkIcon.classList.remove('hidden');
    }
  }

  // Initialize theme status on render
  if (localStorage.getItem('color-theme') === 'dark' || 
      (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateIcons();

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      }
      updateIcons();
      // Dispatch a theme change event for other components (like charts/mermaid) to listen to
      document.dispatchEvent(new CustomEvent('theme-change', { 
        detail: { theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light' } 
      }));
    });
  }

  // Trigger Lucide rendering
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    setTimeout(() => window.lucide.createIcons(), 0);
  }

  return element;
}
