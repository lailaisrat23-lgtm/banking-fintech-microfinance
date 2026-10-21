/**
 * calculator.js
 * Client-side loan repayment estimator.
 *
 * Standard amortisation:
 *   payment = P * i / (1 - (1 + i)^-n)     (i = periodic rate, n = number of payments)
 *   payment = P / n                          (when i = 0)
 */

const FREQUENCIES = {
    monthly: { perYear: 12, label: 'monthly' },
    fortnightly: { perYear: 26, label: 'fortnightly' },
    weekly: { perYear: 52, label: 'weekly' }
};

const LIMITS = {
    amount: { min: 1000, max: 5000000 },
    rate: { min: 0, max: 40 },
    term: { min: 1, max: 120 }
};

function formatNumber(value, decimals = 0) {
    try {
        return new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value);
    } catch (error) {
        return value.toFixed(decimals);
    }
}

function formatTaka(value, decimals = 0) {
    return `BDT ${formatNumber(value, decimals)}`;
}

function parseNumber(input) {
    const raw = input.value.trim().replace(/,/g, '');
    if (raw === '') {
        return Number.NaN;
    }
    return Number(raw);
}

function setError(field, message) {
    const errorNode = field.querySelector('[data-error-for]');
    const input = field.querySelector('input');
    if (errorNode) {
        errorNode.textContent = message;
        errorNode.hidden = !message;
    }
    if (input) {
        input.setAttribute('aria-invalid', String(Boolean(message)));
    }
}

function readFrequency(form) {
    const checked = form.querySelector('input[name="calc-frequency"]:checked');
    return checked && FREQUENCIES[checked.value] ? checked.value : 'monthly';
}

function buildSchedule(amount, periodicRate, periods, payment) {
    const rows = [];
    let balance = amount;

    for (let index = 1; index <= periods; index += 1) {
        const interestPart = periodicRate === 0 ? 0 : balance * periodicRate;
        const principalPart = Math.min(payment - interestPart, balance);
        balance = Math.max(0, balance - principalPart);
        rows.push({
            period: index,
            payment,
            interest: interestPart,
            principal: principalPart,
            balance
        });
    }

    return rows;
}

export function initCalculator(root = document) {
    const form = root.querySelector('[data-calculator-form]');
    if (!form || form.dataset.calcReady === 'true') {
        return;
    }
    form.dataset.calcReady = 'true';

    const wrapper = form.closest('[data-calculator]') || document;
    const amountField = form.querySelector('[data-field="amount"]');
    const rateField = form.querySelector('[data-field="rate"]');
    const termField = form.querySelector('[data-field="term"]');

    const output = {
        payment: wrapper.querySelector('[data-result="payment"]'),
        total: wrapper.querySelector('[data-result="total"]'),
        interest: wrapper.querySelector('[data-result="interest"]'),
        periods: wrapper.querySelector('[data-result="periods"]'),
        summary: wrapper.querySelector('[data-calc-summary]'),
        schedule: wrapper.querySelector('[data-calc-schedule]')
    };

    const update = (announce) => {
        const amount = parseNumber(amountField.querySelector('input'));
        const rate = parseNumber(rateField.querySelector('input'));
        const term = parseNumber(termField.querySelector('input'));
        const frequencyKey = readFrequency(form);
        const frequency = FREQUENCIES[frequencyKey];

        let valid = true;

        if (!Number.isFinite(amount) || amount < LIMITS.amount.min || amount > LIMITS.amount.max) {
            setError(amountField, `Enter a loan amount between ${formatTaka(LIMITS.amount.min)} and ${formatTaka(LIMITS.amount.max)}.`);
            valid = false;
        } else {
            setError(amountField, '');
        }

        if (!Number.isFinite(rate) || rate < LIMITS.rate.min || rate > LIMITS.rate.max) {
            setError(rateField, 'Enter an annual interest rate between 0% and 40%.');
            valid = false;
        } else {
            setError(rateField, '');
        }

        if (!Number.isFinite(term) || term < LIMITS.term.min || term > LIMITS.term.max) {
            setError(termField, 'Enter a loan term between 1 and 120 months.');
            valid = false;
        } else {
            setError(termField, '');
        }

        if (!valid) {
            if (output.summary) {
                output.summary.textContent = 'Correct the highlighted fields to see an estimate.';
            }
            if (announce && output.payment) {
                output.payment.textContent = '—';
                output.total.textContent = '—';
                output.interest.textContent = '—';
            }
            return;
        }

        const periods = Math.max(1, Math.round((term * frequency.perYear) / 12));
        const periodicRate = rate / 100 / frequency.perYear;
        const payment = periodicRate === 0
            ? amount / periods
            : (amount * periodicRate) / (1 - Math.pow(1 + periodicRate, -periods));
        const total = payment * periods;
        const interest = rate === 0 ? 0 : total - amount;

        if (output.payment) {
            output.payment.textContent = formatTaka(Math.round(payment));
        }
        if (output.total) {
            output.total.textContent = formatTaka(Math.round(total));
        }
        if (output.interest) {
            output.interest.textContent = formatTaka(Math.round(interest));
        }
        if (output.periods) {
            output.periods.textContent = `${formatNumber(periods)} ${frequency.label} instalments`;
        }
        if (output.summary) {
            output.summary.textContent = `An illustrative ${formatTaka(amount)} loan at ${formatNumber(rate, rate % 1 === 0 ? 0 : 1)}% per year over ${formatNumber(term)} months would need about ${formatTaka(Math.round(payment))} per instalment, ${frequency.label}, with an estimated total repayment of ${formatTaka(Math.round(total))}.`;
        }

        if (output.schedule) {
            const rows = buildSchedule(amount, periodicRate, periods, payment);
            const preview = rows.length > 4 ? [...rows.slice(0, 3), rows[rows.length - 1]] : rows;
            output.schedule.replaceChildren();

            preview.forEach((row, index) => {
                const tr = document.createElement('tr');

                if (index === 3 && rows.length > 4) {
                    const gap = document.createElement('tr');
                    const gapCell = document.createElement('td');
                    gapCell.colSpan = 5;
                    gapCell.className = 'muted';
                    gapCell.textContent = '… intermediate instalments omitted …';
                    output.schedule.appendChild(gap);
                }

                const cells = [
                    formatNumber(row.period),
                    formatTaka(Math.round(row.payment)),
                    formatTaka(Math.round(row.interest)),
                    formatTaka(Math.round(row.principal)),
                    formatTaka(Math.round(row.balance))
                ];

                cells.forEach((value, cellIndex) => {
                    const cell = document.createElement(cellIndex === 0 ? 'th' : 'td');
                    if (cellIndex === 0) {
                        cell.scope = 'row';
                    } else {
                        cell.className = 'num';
                    }
                    cell.textContent = value;
                    tr.appendChild(cell);
                });

                output.schedule.appendChild(tr);
            });
        }
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        update(true);
    });

    form.addEventListener('reset', () => {
        window.setTimeout(() => update(false), 0);
    });

    let timer = null;
    const scheduleUpdate = () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => update(false), 220);
    };

    form.querySelectorAll('input').forEach((input) => {
        input.addEventListener('input', scheduleUpdate);
        input.addEventListener('change', scheduleUpdate);
    });

    update(false);
}
