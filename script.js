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

// =================================================
// ========== ACHIEVEMENT IMAGE MODAL ===============
// =================================================

const achievementModal = document.getElementById("achievementModal");
const achievementModalImg = document.getElementById("achievementModalImg");
const achievementClose = achievementModal.querySelector(".close-modal");

document.querySelectorAll(".achievement-img").forEach(img => {
    img.addEventListener("click", () => {
        achievementModal.style.display = "flex";;
        achievementModalImg.src = img.src;
    });
});

achievementClose.addEventListener("click", () => {
    achievementModal.style.display = "none";
});

achievementModal.addEventListener("click", (e) => {
    if (e.target === achievementModal) {
        achievementModal.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       SINGLE CERTIFICATE MODAL (GLOBAL)
    ================================================= */

    const achievementModal = document.getElementById("achievementModal");
    const achievementModalImg = document.getElementById("achievementModalImg");
    const achievementClose = achievementModal.querySelector(".close-modal");

    function openSingleCert(src) {
        achievementModalImg.src = src;
        achievementModal.style.display = "flex";
        document.body.classList.add("modal-open");
    }

    function closeSingleCert() {
        achievementModal.style.display = "none";
        achievementModalImg.src = "";
        document.body.classList.remove("modal-open");
    }

    // Attach ONLY to standalone certificates
    document.querySelectorAll(".achievement-img").forEach(img => {
        if (img.closest(".multi-cert")) return;

        img.addEventListener("click", (e) => {
            e.stopPropagation();
            openSingleCert(img.src);
        });
    });

    achievementClose.addEventListener("click", closeSingleCert);

    achievementModal.addEventListener("click", (e) => {
        if (e.target === achievementModal) closeSingleCert();
    });

    /* =================================================
       MULTI CERTIFICATE MODAL
    ================================================= */

    const certGroups = {
        "ethical-hacking": [
            "certificates/ccall.jpg",
            "certificates/cci.jpg",
            "certificates/ccii.jpg",
            "certificates/cciii.jpg",
            "certificates/cciv.jpg",
            "certificates/ccv.jpg",
            "certificates/ccvi.jpg",
            "certificates/ccvii.jpg",
            "certificates/ccviii.jpg"
        ]
    };

    const multiCertModal = document.getElementById("multiCertModal");
    const multiCertGrid = document.getElementById("multiCertGrid");
    const multiCertClose = multiCertModal.querySelector(".close-modal");

    document.querySelectorAll(".multi-cert").forEach(card => {
        card.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            // 🔥 FORCE CLOSE SINGLE CERT (KEY FIX)
            closeSingleCert();

            const group = card.dataset.certGroup;
            const images = certGroups[group];
            if (!images) return;

            document.body.classList.add("modal-open");
            multiCertGrid.innerHTML = "";

            images.forEach(src => {
                const img = document.createElement("img");
                img.src = src;
                img.alt = "Certificate";

                // ✅ SAME GUI AS SINGLE CERT
                img.addEventListener("click", ev => {
                    ev.stopPropagation();
                    openSingleCert(src);
                });

                multiCertGrid.appendChild(img);
            });

            multiCertModal.style.display = "flex";
        });
    });

    function closeMultiCertModal() {
        multiCertModal.style.display = "none";
        multiCertGrid.innerHTML = "";
        document.body.classList.remove("modal-open");
    }

    multiCertClose.addEventListener("click", (e) => {
        e.stopPropagation();
        closeMultiCertModal();
    });

    multiCertModal.addEventListener("click", (e) => {
        if (e.target === multiCertModal) closeMultiCertModal();
    });

});
