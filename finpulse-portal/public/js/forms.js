/**
 * forms.js
 * Client-side validation for demo forms. Nothing is submitted or stored.
 *
 * Contract:
 *   - inputs are wrapped in .field containers
 *   - each input has data-error-* messages and an associated error node with id "<input id>-error"
 *   - the form has [data-error-summary] and [data-form-status]
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function errorNodeFor(input) {
    return document.getElementById(`${input.id}-error`);
}

function messageFor(input) {
    const value = (input.value || '').trim();
    const required = input.hasAttribute('required');

    if (input.type === 'checkbox') {
        if (required && !input.checked) {
            return input.dataset.errorRequired || 'Please confirm this option to continue.';
        }
        return '';
    }

    if (!value) {
        return required ? (input.dataset.errorRequired || 'This field is required.') : '';
    }

    if (input.type === 'email' && !EMAIL_PATTERN.test(value)) {
        return input.dataset.errorEmail || 'Enter an email address in the format name@example.com.';
    }

    const minLength = Number.parseInt(input.getAttribute('minlength') || '', 10);
    if (Number.isFinite(minLength) && value.length < minLength) {
        return input.dataset.errorMinLength || `Use at least ${minLength} characters.`;
    }

    const maxLength = Number.parseInt(input.getAttribute('maxlength') || '', 10);
    if (Number.isFinite(maxLength) && value.length > maxLength) {
        return input.dataset.errorMaxLength || `Use no more than ${maxLength} characters.`;
    }

    if (input.tagName === 'SELECT' && required && !input.value) {
        return input.dataset.errorRequired || 'Choose an option from the list.';
    }

    return '';
}

function showError(input, message) {
    const node = errorNodeFor(input);
    if (node) {
        node.textContent = message;
        node.hidden = !message;
    }
    input.setAttribute('aria-invalid', String(Boolean(message)));

    const field = input.closest('.field') || input.closest('.checkbox');
    if (field) {
        field.classList.toggle('field--invalid', Boolean(message));
    }
}

export function initForms(root = document) {
    root.querySelectorAll('[data-validate-form]').forEach((form) => {
        if (form.dataset.formReady === 'true') {
            return;
        }
        form.dataset.formReady = 'true';

        const fields = Array.from(form.querySelectorAll('input, select, textarea')).filter((field) => field.type !== 'hidden');
        const summary = form.querySelector('[data-error-summary]');
        const summaryList = summary ? summary.querySelector('ul') : null;
        const status = form.querySelector('[data-form-status]');
        const formName = form.dataset.formName || 'demo';

        const clearSummary = () => {
            if (summary) {
                summary.hidden = true;
                if (summaryList) {
                    summaryList.textContent = '';
                }
            }
        };

        const buildSummary = (invalid) => {
            if (!summary || !summaryList) {
                invalid[0].focus();
                return;
            }

            summaryList.textContent = '';
            invalid.forEach((input) => {
                const label = form.querySelector(`label[for="${input.id}"]`);
                const item = document.createElement('li');
                const link = document.createElement('a');
                link.href = `#${input.id}`;
                const labelText = input.dataset.label
                    || (label ? label.textContent.replace('*', '').trim() : input.name);
                link.textContent = `${labelText}: ${messageFor(input)}`;
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    input.focus();
                });
                item.appendChild(link);
                summaryList.appendChild(item);
            });

            summary.hidden = false;
            summary.focus();
        };

        fields.forEach((input) => {
            input.addEventListener('blur', () => {
                if (input.value || input.hasAttribute('required')) {
                    showError(input, messageFor(input));
                }
            });

            input.addEventListener('input', () => {
                if (input.getAttribute('aria-invalid') === 'true') {
                    showError(input, messageFor(input));
                }
            });

            input.addEventListener('change', () => {
                if (input.getAttribute('aria-invalid') === 'true') {
                    showError(input, messageFor(input));
                }
            });
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (status) {
                status.hidden = true;
            }

            const invalid = [];
            fields.forEach((input) => {
                const message = messageFor(input);
                showError(input, message);
                if (message) {
                    invalid.push(input);
                }
            });

            if (invalid.length) {
                clearSummary();
                buildSummary(invalid);
                return;
            }

            clearSummary();

            if (status) {
                status.textContent = '';
                const heading = document.createElement('h2');
                heading.textContent = 'Demo submission received';

                const paragraph = document.createElement('p');
                paragraph.textContent = `Your ${formName} entry passed the browser checks. This is a static demonstration: nothing was sent, saved or turned into a support ticket, and no data left this page.`;

                const note = document.createElement('p');
                note.className = 'small';
                note.textContent = 'To continue exploring, use the navigation above or review the financial literacy section.';

                status.append(heading, paragraph, note);
                status.hidden = false;
                status.focus();
            }

            form.reset();
            fields.forEach((input) => {
                showError(input, '');
            });
        });
    });
}
