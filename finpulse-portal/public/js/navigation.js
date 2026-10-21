/**
 * navigation.js
 * Mobile drawer, services disclosure menu, current-page state and focus handling.
 */

const MOBILE_QUERY = '(max-width: 1099px)';
const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

function isMobile() {
    return window.matchMedia(MOBILE_QUERY).matches;
}

export function initNavigation(root = document) {
    const header = root.querySelector('.site-header');
    if (!header || header.dataset.navReady === 'true') {
        return;
    }
    header.dataset.navReady = 'true';

    const toggle = header.querySelector('.nav-toggle');
    const nav = header.querySelector('.primary-nav');
    const disclosure = header.querySelector('[data-disclosure-button]');
    const submenu = header.querySelector('[data-disclosure-panel]');
    const backdrop = root.querySelector('[data-nav-backdrop]');

    if (!nav) {
        return;
    }

    let lastFocused = null;

    const focusableItems = () => Array.from(nav.querySelectorAll(FOCUSABLE)).filter((item) => item.offsetParent !== null);

    const closeDrawer = (restoreFocus = true) => {
        if (!nav.classList.contains('is-open')) {
            return;
        }
        nav.classList.remove('is-open');
        document.body.classList.remove('nav-open');
        if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
        }
        if (backdrop) {
            backdrop.hidden = true;
        }
        if (restoreFocus && lastFocused) {
            lastFocused.focus();
        }
    };

    const openDrawer = () => {
        lastFocused = document.activeElement;
        nav.classList.add('is-open');
        document.body.classList.add('nav-open');
        if (toggle) {
            toggle.setAttribute('aria-expanded', 'true');
        }
        if (backdrop) {
            backdrop.hidden = false;
        }
        const first = focusableItems()[0];
        if (first) {
            first.focus();
        }
    };

    if (toggle) {
        toggle.addEventListener('click', () => {
            if (nav.classList.contains('is-open')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });
    }

    if (backdrop) {
        backdrop.addEventListener('click', () => closeDrawer());
    }

    if (disclosure && submenu) {
        const closeSubmenu = () => {
            disclosure.setAttribute('aria-expanded', 'false');
            submenu.hidden = true;
        };

        disclosure.addEventListener('click', () => {
            const expanded = disclosure.getAttribute('aria-expanded') === 'true';
            if (expanded) {
                closeSubmenu();
            } else {
                disclosure.setAttribute('aria-expanded', 'true');
                submenu.hidden = false;
            }
        });

        document.addEventListener('click', (event) => {
            if (disclosure.getAttribute('aria-expanded') !== 'true') {
                return;
            }
            if (!header.contains(event.target)) {
                closeSubmenu();
            }
        });

        header.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && disclosure.getAttribute('aria-expanded') === 'true') {
                closeSubmenu();
                disclosure.focus();
            }
        });
    }

    nav.addEventListener('click', (event) => {
        const link = event.target.closest('a');
        if (link && isMobile()) {
            closeDrawer(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape' || !nav.classList.contains('is-open')) {
            return;
        }
        closeDrawer();
    });

    nav.addEventListener('keydown', (event) => {
        if (event.key !== 'Tab' || !isMobile() || !nav.classList.contains('is-open')) {
            return;
        }
        const items = focusableItems();
        if (!items.length) {
            return;
        }
        const first = items[0];
        const last = items[items.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const handleChange = (event) => {
        if (!event.matches) {
            closeDrawer(false);
            document.body.classList.remove('nav-open');
        }
    };

    if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', handleChange);
    } else if (typeof mediaQuery.addListener === 'function') {
        mediaQuery.addListener(handleChange);
    }
}
