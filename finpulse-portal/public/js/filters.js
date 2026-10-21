/**
 * filters.js
 * Chip and text-search filtering for rendered card grids.
 *
 * Markup contract:
 *   <div data-filters>
 *     <button class="chip" data-filter="retail" aria-pressed="false">Retail</button>
 *     <input type="search" data-filter-search>
 *     <p data-filter-count aria-live="polite"></p>
 *     <div data-filter-list>
 *       <article data-categories="retail online">…</article>
 *     </div>
 *     <p data-filter-empty hidden>No matches</p>
 *   </div>
 */

export function initFilters(root = document) {
    root.querySelectorAll('[data-filters]').forEach((group) => {
        if (group.dataset.filtersReady === 'true') {
            return;
        }
        group.dataset.filtersReady = 'true';

        const list = group.querySelector('[data-filter-list]');
        const chips = Array.from(group.querySelectorAll('[data-filter]'));
        const search = group.querySelector('[data-filter-search]');
        const count = group.querySelector('[data-filter-count]');
        const empty = group.querySelector('[data-filter-empty]');

        if (!list) {
            return;
        }

        const items = Array.from(list.querySelectorAll('[data-filter-item]'));
        if (!items.length) {
            if (count) {
                count.textContent = 'No items are available in this section.';
            }
            return;
        }

        let activeFilter = chips.find((chip) => chip.getAttribute('aria-pressed') === 'true')?.dataset.filter || 'all';
        let query = '';

        const apply = () => {
            let visible = 0;

            items.forEach((item) => {
                const categories = (item.dataset.categories || '').split(/\s+/).filter(Boolean);
                const matchesFilter = activeFilter === 'all' || categories.includes(activeFilter);
                const haystack = item.textContent.toLowerCase();
                const matchesQuery = !query || haystack.includes(query);

                const show = matchesFilter && matchesQuery;
                item.hidden = !show;
                if (show) {
                    visible += 1;
                }
            });

            if (count) {
                count.textContent = `${visible} of ${items.length} items shown`;
            }
            if (empty) {
                empty.hidden = visible !== 0;
            }
        };

        chips.forEach((chip) => {
            chip.addEventListener('click', () => {
                activeFilter = chip.dataset.filter || 'all';
                chips.forEach((other) => {
                    other.setAttribute('aria-pressed', String(other === chip));
                });
                apply();
            });
        });

        if (search) {
            search.addEventListener('input', () => {
                query = search.value.trim().toLowerCase();
                apply();
            });
            search.addEventListener('search', () => {
                query = search.value.trim().toLowerCase();
                apply();
            });
        }

        apply();
    });
}
