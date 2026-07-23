/* =========================================================
   Farhan Ansari — Portfolio JavaScript
   Advanced animations, scroll interactions, and UX enhancements
   ========================================================= */

// Initialize Lucide icons
lucide.createIcons();

// ========== Preloader ==========
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.classList.add('loaded');
    }, 800);
});

// ========== Custom Cursor ==========
const initCursor = () => {
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');

    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    // Smooth follow for ring
    const animateRing = () => {
        const dx = mouseX - ringX;
        const dy = mouseY - ringY;
        ringX += dx * 0.2;
        ringY += dy * 0.2;
        ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
        requestAnimationFrame(animateRing);
    };
    animateRing();

    // Hover states
    const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
};

// ========== Scroll Progress Bar ==========
const updateScrollProgress = () => {
    const wrapper = document.getElementById('app-wrapper') || window;
    const scrollTop = wrapper.scrollTop || document.documentElement.scrollTop;
    const scrollHeight = (wrapper.scrollHeight || document.documentElement.scrollHeight) - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;

    const bar = document.getElementById('scroll-progress');
    if (bar) bar.style.width = `${progress}%`;
};

// ========== Scroll Reveal Animations ==========
const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((e, idx) => {
        if (e.isIntersecting) {
            setTimeout(() => {
                e.target.classList.add('visible');
            }, idx * 60);
            scrollObserver.unobserve(e.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .reveal-left, .reveal-right, .reveal-scale').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 6) * 0.08}s`;
    scrollObserver.observe(el);
});

// ========== Reassemble Hero Name Animation ==========
const initReassembleAnimation = () => {
    const nameEl = document.getElementById('hero-name');
    if (!nameEl) return;

    const text = nameEl.textContent.trim();
    if (!text) return;
    nameEl.innerHTML = '';
    nameEl.classList.remove('hero-text-glow');
    nameEl.style.opacity = '1';

    const chars = [...text];
    let assembledCount = 0;

    chars.forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? ' ' : char;
        span.className = 'char';
        span.style.color = '#ffffff';

        const dx = (Math.random() - 0.5) * 500;
        const dy = (Math.random() - 0.5) * 500;
        const dr = (Math.random() - 0.5) * 120;

        span.style.setProperty('--dx', `${dx}px`);
        span.style.setProperty('--dy', `${dy}px`);
        span.style.setProperty('--dr', `${dr}deg`);

        const delay = i * 0.05;
        span.style.transitionDelay = `${delay}s`;

        nameEl.appendChild(span);

        requestAnimationFrame(() => {
            setTimeout(() => {
                span.classList.add('assembled');
                setTimeout(() => {
                    assembledCount++;
                    if (assembledCount === chars.length) {
                        nameEl.textContent = text;
                        nameEl.classList.add('hero-text-glow');
                    }
                }, 850);
            }, 120);
        });
    });
};

// ========== Mobile Menu ==========
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileCloseBtn = document.getElementById('mobile-close-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileCloseBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        document.body.style.overflow = 'hidden';
    });

    mobileCloseBtn.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        document.body.style.overflow = 'auto';
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            document.body.style.overflow = 'auto';
        });
    });
}

// ========== Smooth Scroll ==========
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const targetId = a.getAttribute('href');
        if (targetId === '#') return;

        e.preventDefault();
        const target = document.querySelector(targetId);
        const wrapper = document.getElementById('app-wrapper');

        if (target && wrapper) {
            const navHeight = 72;
            const targetPosition = target.offsetTop - navHeight;

            wrapper.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== Scroll source helper ==========
const getScrollTop = () => {
    const wrapper = document.getElementById('app-wrapper');
    return wrapper ? wrapper.scrollTop : (window.scrollY || document.documentElement.scrollTop);
};

// ========== Dynamic Nav Background on Scroll ==========
const updateNavOnScroll = () => {
    const nav = document.querySelector('nav');
    const scrollY = getScrollTop();

    if (scrollY > 60) {
        nav.style.background = document.body.classList.contains('light-mode')
            ? 'rgba(255, 255, 255, 0.92)'
            : 'rgba(10, 10, 10, 0.88)';
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = document.body.classList.contains('light-mode')
            ? 'rgba(255, 255, 255, 0.4)'
            : 'rgba(10, 10, 10, 0.5)';
        nav.style.boxShadow = 'none';
    }
};

// ========== Active Nav Link on Scroll ==========
const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = getScrollTop();

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

// ========== Card Tilt Effect ==========
const initTiltCards = () => {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
};

// ========== Spotlight Effect ==========
const initSpotlight = () => {
    const spotlights = document.querySelectorAll('.spotlight');

    spotlights.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            el.style.setProperty('--mx', `${x}%`);
            el.style.setProperty('--my', `${y}%`);
        });
    });
};

// ========== Counter Animation ==========
const animateCounter = (el, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const suffix = el.dataset.suffix || '';

    const step = () => {
        current += increment;
        if (current < target) {
            el.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(step);
        } else {
            el.textContent = target + suffix;
        }
    };
    step();
};

const initCounters = () => {
    const counters = document.querySelectorAll('[data-counter]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.counter);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
};

// ========== Magnetic Buttons ==========
const initMagneticButtons = () => {
    const buttons = document.querySelectorAll('[data-magnetic]');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
};

// ========== Initialize Everything ==========
document.addEventListener('DOMContentLoaded', () => {
    initReassembleAnimation();
    initCursor();
    initTiltCards();
    initSpotlight();
    initCounters();
    initMagneticButtons();

    // Scroll listeners
    const wrapper = document.getElementById('app-wrapper');
    if (wrapper) {
        wrapper.addEventListener('scroll', () => {
            updateScrollProgress();
            updateNavOnScroll();
            updateActiveNavLink();
        });
    } else {
        window.addEventListener('scroll', () => {
            updateScrollProgress();
            updateNavOnScroll();
            updateActiveNavLink();
        });
    }
});
