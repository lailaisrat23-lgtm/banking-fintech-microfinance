/**
 * carousel.js
 * Scroll-snap carousel with accessible controls.
 *
 * Markup contract:
 *   <div class="carousel" data-carousel aria-label="Sample testimonials">
 *     <div class="carousel__viewport" data-carousel-viewport>
 *       <ul class="carousel__track" data-carousel-track>
 *         <li class="carousel__slide">…</li>
 *       </ul>
 *     </div>
 *     <div class="carousel__controls">
 *       <p class="carousel__status" data-carousel-status aria-live="polite"></p>
 *       <div class="carousel__buttons">
 *         <button data-carousel-prev type="button">…</button>
 *         <button data-carousel-next type="button">…</button>
 *       </div>
 *     </div>
 *   </div>
 *
 * Optional: an empty <ul class="carousel__dots" data-carousel-dots></ul>
 */

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initCarousels(root = document) {
    root.querySelectorAll('[data-carousel]').forEach((carousel) => {
        if (carousel.dataset.carouselReady === 'true') {
            return;
        }
        carousel.dataset.carouselReady = 'true';

        const viewport = carousel.querySelector('[data-carousel-viewport]');
        const slides = Array.from(carousel.querySelectorAll('.carousel__track > *'));
        const prev = carousel.querySelector('[data-carousel-prev]');
        const next = carousel.querySelector('[data-carousel-next]');
        const status = carousel.querySelector('[data-carousel-status]');
        const dotsHost = carousel.querySelector('[data-carousel-dots]');

        if (!viewport || slides.length < 2) {
            if (prev) {
                prev.hidden = true;
            }
            if (next) {
                next.hidden = true;
            }
            return;
        }

        const behavior = () => (prefersReducedMotion() ? 'auto' : 'smooth');

        const perView = () => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            if (!slideWidth) {
                return 1;
            }
            return Math.max(1, Math.round(viewport.clientWidth / slideWidth));
        };

        const currentIndex = () => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            if (!slideWidth) {
                return 0;
            }
            return Math.round(viewport.scrollLeft / slideWidth);
        };

        const maxIndex = () => Math.max(0, slides.length - perView());

        // The current position is tracked here rather than read back from
        // scrollLeft, so clicks made during a smooth scroll are not lost.
        let index = 0;

        const goTo = (target) => {
            index = Math.min(Math.max(target, 0), maxIndex());
            const slideWidth = slides[0].getBoundingClientRect().width;
            viewport.scrollTo({ left: index * slideWidth, behavior: behavior() });
            sync();
        };

        const renderDots = () => {
            if (!dotsHost) {
                return;
            }
            dotsHost.textContent = '';
            const pages = maxIndex() + 1;
            for (let page = 0; page < pages; page += 1) {
                const item = document.createElement('li');
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'carousel__dot';
                button.dataset.carouselDot = String(page);
                button.setAttribute('aria-label', `Go to slide ${page + 1} of ${pages}`);
                button.addEventListener('click', () => goTo(page));
                item.appendChild(button);
                dotsHost.appendChild(item);
            }
            sync();
        };

        const sync = () => {
            if (status) {
                const visible = perView();
                const first = index + 1;
                const last = Math.min(index + visible, slides.length);
                status.textContent = `Showing samples ${first}–${last} of ${slides.length}`;
            }
            if (dotsHost) {
                Array.from(dotsHost.querySelectorAll('[data-carousel-dot]')).forEach((dot) => {
                    dot.setAttribute('aria-current', String(Number(dot.dataset.carouselDot) === index));
                });
            }
            if (prev) {
                prev.disabled = index <= 0;
            }
            if (next) {
                next.disabled = index >= maxIndex();
            }
        };

        if (prev) {
            prev.addEventListener('click', () => goTo(index - 1));
        }
        if (next) {
            next.addEventListener('click', () => goTo(index + 1));
        }

        viewport.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                event.preventDefault();
                goTo(index + 1);
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                goTo(index - 1);
            }
        });

        let scrollTimer = null;
        viewport.addEventListener('scroll', () => {
            window.clearTimeout(scrollTimer);
            scrollTimer = window.setTimeout(() => {
                // Drags and trackpad swipes move the viewport directly, so the
                // tracked position follows the settled scroll offset.
                index = Math.min(currentIndex(), maxIndex());
                sync();
            }, 90);
        }, { passive: true });

        window.addEventListener('resize', () => {
            window.clearTimeout(scrollTimer);
            scrollTimer = window.setTimeout(() => {
                index = Math.min(index, maxIndex());
                renderDots();
            }, 150);
        });

        renderDots();
    });
}
