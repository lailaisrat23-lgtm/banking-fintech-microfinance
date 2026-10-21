/**
 * dashboard.js
 * Demonstration dashboard interactions: transaction filtering and running totals.
 * All data is static and fictional.
 */

const TYPE_LABELS = {
    all: 'all transactions',
    in: 'incoming payments',
    out: 'outgoing payments',
    pending: 'pending payments'
};

function formatTaka(value) {
    try {
        return `BDT ${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value)}`;
    } catch (error) {
        return `BDT ${value.toFixed(0)}`;
    }
}

export function initDashboard(root = document) {
    const shell = root.querySelector('[data-dashboard]');
    if (!shell || shell.dataset.dashboardReady === 'true') {
        return;
    }
    shell.dataset.dashboardReady = 'true';

    const chips = Array.from(shell.querySelectorAll('[data-tx-filter]'));
    const rows = Array.from(shell.querySelectorAll('[data-tx-row]'));
    const count = shell.querySelector('[data-tx-count]');
    const totalNode = shell.querySelector('[data-tx-total]');
    const empty = shell.querySelector('[data-tx-empty]');

    if (!rows.length) {
        return;
    }

    let activeType = chips.find((chip) => chip.getAttribute('aria-pressed') === 'true')?.dataset.txFilter || 'all';

    const apply = () => {
        let visible = 0;
        let total = 0;

        rows.forEach((row) => {
            const matches = activeType === 'all' || row.dataset.type === activeType;
            row.hidden = !matches;
            if (matches) {
                visible += 1;
                total += Number.parseFloat(row.dataset.amount || '0');
            }
        });

        if (count) {
            count.textContent = `Showing ${visible} of ${rows.length} ${TYPE_LABELS[activeType] || 'transactions'}.`;
        }

        if (totalNode) {
            totalNode.textContent = formatTaka(total);
        }

        if (empty) {
            empty.hidden = visible !== 0;
        }
    };

    chips.forEach((chip) => {
        chip.addEventListener('click', () => {
            activeType = chip.dataset.txFilter || 'all';
            chips.forEach((other) => {
                other.setAttribute('aria-pressed', String(other === chip));
            });
            apply();
        });
    });

    apply();
}
