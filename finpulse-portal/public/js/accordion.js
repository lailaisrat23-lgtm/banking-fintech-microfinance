/**
 * accordion.js
 * Keyboard-operable FAQ accordion built on buttons and panels.
 *
 * Markup contract:
 *   <div class="accordion" data-accordion>
 *     <div class="accordion__item">
 *       <h3 class="accordion__heading"><button class="accordion__trigger" aria-expanded="false">…</button></h3>
 *       <div class="accordion__panel">…</div>
 *     </div>
 *   </div>
 *
 * Missing ids are generated. Arrow keys, Home and End move between triggers.
 */

let counter = 0;

export function initAccordions(root = document) {
    root.querySelectorAll('[data-accordion]').forEach((accordion) => {
        if (accordion.dataset.accordionReady === 'true') {
            return;
        }
        accordion.dataset.accordionReady = 'true';

        const triggers = Array.from(accordion.querySelectorAll('.accordion__trigger'));
        if (!triggers.length) {
            return;
        }

        triggers.forEach((trigger) => {
            const item = trigger.closest('.accordion__item');
            const panel = item ? item.querySelector('.accordion__panel') : null;
            if (!panel) {
                return;
            }

            counter += 1;
            if (!panel.id) {
                panel.id = `accordion-panel-${counter}`;
            }
            if (!trigger.id) {
                trigger.id = `accordion-trigger-${counter}`;
            }

            trigger.setAttribute('aria-controls', panel.id);
            panel.setAttribute('role', 'region');
            panel.setAttribute('aria-labelledby', trigger.id);
            panel.dataset.accordionPanel = 'true';

            const initiallyOpen = trigger.getAttribute('aria-expanded') === 'true';
            trigger.setAttribute('aria-expanded', String(initiallyOpen));
            panel.hidden = !initiallyOpen;

            trigger.addEventListener('click', () => {
                const expanded = trigger.getAttribute('aria-expanded') === 'true';
                trigger.setAttribute('aria-expanded', String(!expanded));
                panel.hidden = expanded;
            });

            trigger.addEventListener('keydown', (event) => {
                const currentIndex = triggers.indexOf(trigger);
                let target = null;

                if (event.key === 'ArrowDown') {
                    target = triggers[(currentIndex + 1) % triggers.length];
                } else if (event.key === 'ArrowUp') {
                    target = triggers[(currentIndex - 1 + triggers.length) % triggers.length];
                } else if (event.key === 'Home') {
                    target = triggers[0];
                } else if (event.key === 'End') {
                    target = triggers[triggers.length - 1];
                }

                if (target) {
                    event.preventDefault();
                    target.focus();
                }
            });
        });
    });
}
