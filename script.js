// ========== THEME TOGGLE ==========

const root = document.documentElement;
const themeToggleBtn = document.querySelector('.theme-toggle');

// Decide initial theme
(function initTheme() {
    const storedTheme = localStorage.getItem('theme');
    let initialTheme = 'dark'; // default

    if (storedTheme === 'light' || storedTheme === 'dark') {
        initialTheme = storedTheme;
    } else if (window.matchMedia) {
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        if (prefersLight) initialTheme = 'light';
    }

    root.setAttribute('data-theme', initialTheme);
})();

function toggleTheme() {
    const currentTheme = root.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}

// ========== MOBILE NAV TOGGLE ==========

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('is-open', isOpen);
    });

    // Close mobile menu when a nav link is clicked
    navLinks.addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName.toLowerCase() === 'a' && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            navToggle.classList.remove('is-open');
        }
    });
}

// ========== SCROLL REVEAL ANIMATIONS ==========

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
        }
    );

    revealElements.forEach((el) => observer.observe(el));
} else {
    // Fallback: if IntersectionObserver not supported, just show everything
    revealElements.forEach((el) => el.classList.add('visible'));
}

// ========== SMOOTH SCROLL WITH OFFSET ==========

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const yOffset = -80; // navbar height
                const rect = target.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const targetY = rect.top + scrollTop + yOffset;

                window.scrollTo({
                    top: targetY,
                    behavior: 'smooth',
                });
            }
        }
    });
});
