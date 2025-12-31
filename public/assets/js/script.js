// === CONFIGURATION ===
const config = {
    scrollBehavior: 'smooth',
    scrollOffset: 80
};

// === UTILITAIRES ===
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const scrollToSection = (sectionId) => {
    const section = $(`#${sectionId}`);
    if (!section) return;
    
    const yOffset = -config.scrollOffset;
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    
    window.scrollTo({
        top: y,
        behavior: config.scrollBehavior
    });
};

// === SIDEBAR NAVIGATION ===
const initSidebarNav = () => {
    const mobileMenuBtn = $('#mobile-menu-btn');
    const sidebar = $('#sidebar-nav');
    const overlay = $('#sidebar-overlay');
    
    if (!mobileMenuBtn || !sidebar || !overlay) return;

    // Toggle sidebar on mobile
    const toggleSidebar = () => {
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    };

    mobileMenuBtn.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // Close sidebar when clicking a nav link on mobile
    $$('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) { // lg breakpoint
                toggleSidebar();
            }
        });
    });
};

// === SCROLL BUTTONS ===
const initScrollButtons = () => {
    $$('.scroll-btn, button[data-scroll-to], .nav-link').forEach(btn => {
        const target = btn.getAttribute('data-scroll-to');
        if (!target) return;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection(target);
        });
    });
};

// === ACTIVE LINK HIGHLIGHT ===
const initActiveLinks = () => {
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                $$('.nav-link').forEach(link => {
                    link.classList.remove('bg-blue-50', 'text-blue-600');
                    if (link.getAttribute('data-scroll-to') === id) {
                        link.classList.add('bg-blue-50', 'text-blue-600');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    const sections = ['presentation', 'bts-sio', 'experiences', 'competences', 'formation', 'projets', 'certifications', 'veille', 'Épreuves'];
    sections.forEach(id => {
        const section = $(`#${id}`);
        if (section) observer.observe(section);
    });
};

// === TAB SWITCHER (générique pour certifications & épreuves) ===
const initTabSwitcher = (btnSelector, contentPrefix, activeClasses = ['bg-white', 'text-teal-800', 'font-bold']) => {
    const buttons = $$(btnSelector);
    if (buttons.length === 0) return;

    const switchTab = (button) => {
        const targetId = button.getAttribute(`data-${contentPrefix.includes('year') ? 'year' : 'epreuve'}`);
        
        buttons.forEach(btn => {
            btn.classList.remove(...activeClasses);
            btn.classList.add('text-gray-700');
        });
        button.classList.add(...activeClasses);
        button.classList.remove('text-gray-700');

        const pattern = contentPrefix.includes('year') ? 'certifications-year-' : 'epreuve-';
        $$(`[id^="${pattern}"]`).forEach(el => el.classList.add('hidden'));
        
        const targetContent = $(`#${contentPrefix}${targetId}`);
        if (targetContent) targetContent.classList.remove('hidden');
    };

    buttons.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn));
    });

    const initialBtn = buttons[0];
    if (initialBtn) switchTab(initialBtn);
};

// === INITIALISATION ===
document.addEventListener('DOMContentLoaded', () => {
    initSidebarNav();
    initScrollButtons();
    initActiveLinks();
    initTabSwitcher('.year-btn', 'certifications-year-');
    initTabSwitcher('.epreuves-btn', 'epreuve-');
});