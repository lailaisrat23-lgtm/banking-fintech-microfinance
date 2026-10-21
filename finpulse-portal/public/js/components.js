/**
 * components.js
 * Shared HTML fragment loader.
 *
 * Mounts:
 *   <div data-component="header" data-active="services"></div>
 *
 * Page content and card collections are authored directly in HTML.
 */

const DEFAULT_COMPONENT_BASE = '../../../resources/views/components/';

const FALLBACK_NAV = [
    { key: 'home', label: 'Home', href: 'home.html' },
    { key: 'services', label: 'Services', href: 'services.html' },
    { key: 'solutions', label: 'Solutions', href: 'business-solutions.html' },
    { key: 'calculator', label: 'Calculator', href: 'loan-calculator.html' },
    { key: 'dashboard', label: 'Dashboard', href: 'dashboard-demo.html' },
    { key: 'about', label: 'About', href: 'about.html' },
    { key: 'contact', label: 'Contact', href: 'contact.html' }
];

const cache = new Map();

function metaContent(name, fallback) {
    const tag = document.querySelector(`meta[name="${name}"]`);
    return tag && tag.content ? tag.content : fallback;
}

function baseUrl(path) {
    try {
        return new URL(path, document.baseURI);
    } catch (error) {
        return null;
    }
}

const componentBase = baseUrl(metaContent('components-base', DEFAULT_COMPONENT_BASE));

async function fetchText(url) {
    if (cache.has(url)) {
        return cache.get(url);
    }
    // Fragments change while the static site is edited; never reuse a cached
    // copy so a half-written file cannot be served from the browser cache.
    const request = fetch(url, { credentials: 'same-origin', cache: 'no-store' }).then((response) => {
        if (!response.ok) {
            throw new Error(`Request for ${url} failed with status ${response.status}`);
        }
        return response.text();
    });
    cache.set(url, request);
    try {
        return await request;
    } catch (error) {
        cache.delete(url);
        throw error;
    }
}

/**
 * A fragment written to disk while the page was loading can arrive truncated.
 * Compare opening and closing counts of the root element to spot that case.
 */
function isCompleteFragment(html) {
    const markup = html.trim();
    const root = markup.match(/^<([a-z][a-z0-9-]*)\b/i);
    if (!root) {
        return false;
    }
    const tag = root[1];
    const opens = (markup.match(new RegExp(`<${tag}\\b`, 'gi')) || []).length;
    const closes = (markup.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
    return opens === closes;
}

async function fetchFragment(url) {
    const html = await fetchText(url);
    if (isCompleteFragment(html)) {
        return html;
    }

    cache.delete(url);
    const retryUrl = new URL(url);
    retryUrl.searchParams.set('v', String(Date.now()));
    const retry = await fetchText(retryUrl.href);
    if (!isCompleteFragment(retry)) {
        throw new Error(`The fragment ${url} arrived incomplete`);
    }
    return retry;
}

function camelCase(name) {
    return name.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}

function readProps(element) {
    const props = {};
    Array.from(element.attributes).forEach((attribute) => {
        if (attribute.name.startsWith('data-')) {
            props[camelCase(attribute.name.slice(5))] = attribute.value;
        }
    });
    return props;
}

function hideIfEmpty(element) {
    if (!element.textContent.trim() && !element.hasAttribute('data-keep-empty')) {
        element.hidden = true;
    }
}

/* -------------------------------------------------------------------------
   Static fragments
   ------------------------------------------------------------------------- */

function buildFallbackHeader(mount) {
    const wrapper = document.createElement('div');
    wrapper.className = 'site-header-fallback';
    wrapper.setAttribute('role', 'status');

    const message = document.createElement('p');
    message.className = 'container';
    message.textContent = 'The shared navigation could not be loaded. These links still work:';
    wrapper.appendChild(message);

    const nav = document.createElement('nav');
    nav.className = 'container';
    nav.setAttribute('aria-label', 'Fallback navigation');
    const list = document.createElement('ul');
    list.className = 'cluster';

    FALLBACK_NAV.forEach((item) => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.label;
        if (mount.dataset.active === item.key) {
            link.setAttribute('aria-current', 'page');
        }
        li.appendChild(link);
        list.appendChild(li);
    });

    nav.appendChild(list);
    wrapper.appendChild(nav);
    return wrapper;
}

function applyComponentProps(mount, props) {
    mount.querySelectorAll('[data-prop]').forEach((node) => {
        const value = props[node.dataset.prop];
        if (value !== undefined) {
            node.textContent = value;
        }
        hideIfEmpty(node);
    });

    mount.querySelectorAll('[data-prop-href]').forEach((node) => {
        const value = props[node.dataset.propHref];
        if (value) {
            node.setAttribute('href', value);
        } else {
            node.hidden = true;
        }
    });

    mount.querySelectorAll('[data-prop-src]').forEach((node) => {
        const value = props[node.dataset.propSrc];
        if (value) {
            node.setAttribute('src', value);
        }
    });
}

function renderBreadcrumbs(mount, props) {
    const trail = (props.trail || '').split('|').map((part) => part.trim()).filter(Boolean);
    const list = mount.querySelector('[data-breadcrumb-list]');
    if (!list || !trail.length) {
        if (list) {
            list.remove();
        }
        return;
    }

    trail.forEach((entry, index) => {
        const [label, href] = entry.split(':').map((piece) => piece.trim());
        const item = document.createElement('li');
        const isLast = index === trail.length - 1;

        if (href && !isLast) {
            const link = document.createElement('a');
            link.href = href;
            link.textContent = label;
            item.appendChild(link);
        } else {
            const span = document.createElement('span');
            span.textContent = label;
            span.setAttribute('aria-current', 'page');
            item.appendChild(span);
        }

        list.appendChild(item);
    });
}

function setHeadingLevel(mount, level) {
    const parsed = Number.parseInt(level, 10);
    if (!Number.isFinite(parsed) || parsed < 2 || parsed > 6) {
        return;
    }
    const heading = mount.querySelector('h2[data-prop="title"]');
    if (!heading) {
        return;
    }
    const replacement = document.createElement(`h${parsed}`);
    Array.from(heading.attributes).forEach((attribute) => {
        replacement.setAttribute(attribute.name, attribute.value);
    });
    replacement.textContent = heading.textContent;
    heading.replaceWith(replacement);
}

async function mountComponent(mount) {
    const name = mount.dataset.component;
    const props = readProps(mount);

    try {
        const html = await fetchFragment(new URL(`${name}.html`, componentBase).href);
        mount.innerHTML = html;
        mount.dataset.loaded = 'true';
        mount.hidden = false;

        if (name === 'header') {
            mount.querySelectorAll('[data-nav]').forEach((link) => {
                if (link.dataset.nav === props.active) {
                    link.setAttribute('aria-current', 'page');
                }
            });
        }

        if (name === 'breadcrumbs') {
            renderBreadcrumbs(mount, props);
        }

        if (name === 'section-heading') {
            applyComponentProps(mount, props);
            setHeadingLevel(mount, props.level);
            const heading = mount.querySelector('[data-prop="title"]');
            if (heading && props.id) {
                heading.id = props.id;
            }
            const wrapper = mount.querySelector('.section-head');
            if (wrapper) {
                if (props.align === 'center') {
                    wrapper.classList.add('section-head--center');
                }
                if (props.size === 'wide') {
                    wrapper.classList.add('section-head--wide');
                }
            }
        }

        if (name === 'cta-section') {
            applyComponentProps(mount, {
                title: props.title || 'Ready to explore FinPulse?',
                text: props.text || '',
                primaryLabel: props.primaryLabel || 'Contact the demo team',
                primaryHref: props.primaryHref || 'contact.html',
                secondaryLabel: props.secondaryLabel || '',
                secondaryHref: props.secondaryHref || ''
            });
        }

        if (name === 'statistics' || name === 'section-heading') {
            applyComponentProps(mount, props);
        }

        if (name === 'button') {
            const button = mount.querySelector('.btn');
            if (button) {
                button.hidden = false;
                if (props.variant) {
                    button.classList.add(`btn--${props.variant}`);
                }
                if (props.size) {
                    button.classList.add(`btn--${props.size}`);
                }
                if (props.block === 'true') {
                    button.classList.add('btn--block');
                }
                button.textContent = props.label || 'Continue';
                button.setAttribute('href', props.href || '#');
            }
        }

        if (name === 'footer') {
            const year = mount.querySelector('[data-current-year]');
            if (year) {
                year.textContent = String(new Date().getFullYear());
            }
        }
    } catch (error) {
        console.error(`[FinPulse] component "${name}" failed:`, error);
        if (name === 'header') {
            mount.replaceChildren(buildFallbackHeader(mount));
        } else {
            // Skip a section that cannot load rather than showing an error notice.
            mount.replaceChildren();
            mount.hidden = true;
        }
    }
}

/* -------------------------------------------------------------------------
   Public API
   ------------------------------------------------------------------------- */

export async function loadComponents() {
    const mounts = Array.from(document.querySelectorAll('[data-component]'));
    await Promise.all(mounts.map((mount) => mountComponent(mount)));
}


