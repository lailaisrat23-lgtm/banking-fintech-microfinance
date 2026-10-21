/**
 * tabs.js
 * Accessible tab list with roving focus (automatic activation).
 *
 * Markup contract:
 *   <div data-tabs>
 *     <div class="tabs__list" role="tablist" aria-label="…">
 *       <button class="tab" role="tab" aria-selected="true" aria-controls="panel-a" id="tab-a">…</button>
 *     </div>
 *     <div class="tab-panel" role="tabpanel" id="panel-a" aria-labelledby="tab-a">…</div>
 *   </div>
 */

export function initTabs(root = document) {
    root.querySelectorAll('[data-tabs]').forEach((group) => {
        if (group.dataset.tabsReady === 'true') {
            return;
        }
        group.dataset.tabsReady = 'true';

        const tabs = Array.from(group.querySelectorAll('[role="tab"]'));
        if (!tabs.length) {
            return;
        }

        const panels = tabs
            .map((tab) => document.getElementById(tab.getAttribute('aria-controls') || ''))
            .filter(Boolean);

        const activate = (tab, moveFocus = true) => {
            tabs.forEach((item) => {
                const selected = item === tab;
                item.setAttribute('aria-selected', String(selected));
                item.tabIndex = selected ? 0 : -1;
            });

            panels.forEach((panel) => {
                panel.hidden = panel.id !== tab.getAttribute('aria-controls');
            });

            if (moveFocus) {
                tab.focus();
            }
        };

        tabs.forEach((tab, index) => {
            tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1;
            const panel = document.getElementById(tab.getAttribute('aria-controls') || '');
            if (panel) {
                panel.hidden = tab.getAttribute('aria-selected') !== 'true';
            }

            tab.addEventListener('click', () => activate(tab, false));

            tab.addEventListener('keydown', (event) => {
                const current = tabs.indexOf(tab);
                let next = null;

                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                    next = tabs[(current + 1) % tabs.length];
                } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                    next = tabs[(current - 1 + tabs.length) % tabs.length];
                } else if (event.key === 'Home') {
                    next = tabs[0];
                } else if (event.key === 'End') {
                    next = tabs[tabs.length - 1];
                }

                if (next) {
                    event.preventDefault();
                    activate(next);
                }
            });

            if (!tab.id) {
                tab.id = `tab-${group.dataset.tabs || 'group'}-${index}`;
            }
        });
    });
}
