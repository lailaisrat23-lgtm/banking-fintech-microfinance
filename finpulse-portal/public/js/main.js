/**
 * main.js
 * Boot sequence: shared fragments -> widget initialisers.
 * Feature modules are initialised exactly once.
 */

import { loadComponents } from './components.js';
import { initNavigation } from './navigation.js';
import { initTabs } from './tabs.js';
import { initAccordions } from './accordion.js';
import { initCarousels } from './carousel.js';
import { initFilters } from './filters.js';
import { initCalculator } from './calculator.js';
import { initForms } from './forms.js';
import { initDashboard } from './dashboard.js';

let started = false;

async function boot() {
    if (started) {
        return;
    }
    started = true;

    try {
        await loadComponents();
    } catch (error) {
        console.error('[FinPulse] Shared components failed to load:', error);
    }

    const initialisers = [
        initNavigation,
        initTabs,
        initAccordions,
        initCarousels,
        initFilters,
        initCalculator,
        initForms,
        initDashboard
    ];

    initialisers.forEach((initialise) => {
        try {
            initialise(document);
        } catch (error) {
            console.error('[FinPulse] A page interaction failed to start:', error);
        }
    });

    document.documentElement.classList.add('js-ready');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
    boot();
}
