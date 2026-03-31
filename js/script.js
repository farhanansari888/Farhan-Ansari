
lucide.createIcons();

const defaultConfig = {
    theme_mode: 'dark', // 'light' or 'dark'
    hero_name: 'Farhan Ansari',
    hero_title: 'App Developer · Web Developer',
    about_text: "I'm a skilled developer proficient in both frontend and backend technologies, with a passion for crafting innovative apps and websites. From designing intuitive user interfaces to building robust server-side architectures, I bring ideas to life through code. Whether it's a responsive web application or a feature-rich mobile app, I enjoy turning complex problems into elegant solutions that deliver exceptional user experiences.",
    project1_title: 'Smart Tunnel VPN',
    project1_desc: 'A VPN app with SSH and V2ray support, built using Java and Android SDK. It features a sleek UI, multiple server options, and robust security measures for safe and private browsing on mobile devices.',
    project2_title: 'Dental Clinic Website',
    project2_desc: 'A modern dental clinic website built with React and Tailwind CSS. It features a clean design, responsive layout, and interactive elements to enhance user experience. The site includes appointment booking, service information, and patient testimonials.',
    project3_title: 'Ansa Fashion Design',
    project3_desc: 'A complete fashion designs collections website for showcase of new collections and designs. Built with React and Tailwind CSS, it features a sleek design, responsive layout, and interactive elements to enhance user experience. The site includes a gallery of designs, designer profiles, and a contact form for inquiries.'
};

async function onConfigChange(config) {
    const theme = config.theme_mode || defaultConfig.theme_mode;
    const body = document.getElementById('body-el');
    const wrapper = document.getElementById('app-wrapper');
    const navName = document.getElementById('nav-name');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const headings = document.querySelectorAll('h1, h2, h3');
    const icons = document.querySelectorAll('nav i, .project-card i');

    if (theme === 'light') {
        body.classList.remove('bg-[#060606]', 'text-gray-200');
        body.classList.add('bg-[#FAFAFA]', 'text-gray-800', 'light-mode');
        wrapper.classList.remove('bg-[#060606]');
        wrapper.classList.add('bg-[#FAFAFA]');
        navName.classList.remove('text-white');
        navName.classList.add('text-black');

        navLinks.forEach(l => {
            l.classList.remove('text-white');
            l.classList.add('text-black');
        });

        headings.forEach(h => {
            if (!h.closest('#contact')) {
                h.classList.remove('text-white');
                h.classList.add('text-black');
            }
        });

        document.querySelectorAll('.project-card [data-lucide]').forEach(icon => {
            icon.parentElement.classList.remove('bg-white/10', 'text-white');
            icon.parentElement.classList.add('bg-black/5', 'text-black', 'group-hover:bg-black', 'group-hover:text-white');
        });

    } else {
        body.classList.add('bg-[#060606]', 'text-gray-200');
        body.classList.remove('bg-[#FAFAFA]', 'text-gray-800', 'light-mode');
        wrapper.classList.add('bg-[#060606]');
        wrapper.classList.remove('bg-[#FAFAFA]');

        navName.classList.add('text-white');
        navName.classList.remove('text-black');

        navLinks.forEach(l => {
            l.classList.add('text-white');
            l.classList.remove('text-black');
        });

        headings.forEach(h => {
            if (!h.closest('#contact')) {
                h.classList.add('text-white');
                h.classList.remove('text-black');
            }
        });

        document.querySelectorAll('.project-card [data-lucide]').forEach(icon => {
            icon.parentElement.classList.add('bg-white/10', 'text-white');
            icon.parentElement.classList.remove('bg-black/5', 'text-black', 'group-hover:bg-black', 'group-hover:text-white');
        });
    }

    // Text Content Updates
    const nameEl = document.getElementById('hero-name');
    nameEl.textContent = config.hero_name || defaultConfig.hero_name;
    // Always ensure the glow class is present when just setting text
    nameEl.classList.add('hero-text-glow');

    document.getElementById('hero-title').textContent = config.hero_title || defaultConfig.hero_title;
    document.getElementById('about-text').textContent = config.about_text || defaultConfig.about_text;

    // Projects
    document.getElementById('project1-title').textContent = config.project1_title || defaultConfig.project1_title;
    document.getElementById('project1-desc').textContent = config.project1_desc || defaultConfig.project1_desc;
    document.getElementById('project2-title').textContent = config.project2_title || defaultConfig.project2_title;
    document.getElementById('project2-desc').textContent = config.project2_desc || defaultConfig.project2_desc;
    document.getElementById('project3-title').textContent = config.project3_title || defaultConfig.project3_title;
    document.getElementById('project3-desc').textContent = config.project3_desc || defaultConfig.project3_desc;
}

function mapToCapabilities(config) {
    const make = (key) => ({
        get: () => config[key] || defaultConfig[key],
        set: (v) => { config[key] = v; window.elementSdk.setConfig({ [key]: v }); }
    });
    return {
        recolorables: [],
        borderables: [],
        fontEditable: null,
        fontSizeable: null
    };
}

function mapToEditPanelValues(config) {
    return new Map([
        ['theme_mode', config.theme_mode || 'dark'],
        ['hero_name', config.hero_name || defaultConfig.hero_name],
        ['hero_title', config.hero_title || defaultConfig.hero_title],
        ['about_text', config.about_text || defaultConfig.about_text],
        ['project1_title', config.project1_title || defaultConfig.project1_title],
        ['project1_desc', config.project1_desc || defaultConfig.project1_desc],
        ['project2_title', config.project2_title || defaultConfig.project2_title],
        ['project2_desc', config.project2_desc || defaultConfig.project2_desc],
        ['project3_title', config.project3_title || defaultConfig.project3_title],
        ['project3_desc', config.project3_desc || defaultConfig.project3_desc]
    ]);
}

if (window.elementSdk && !window.sdkInitializedForAnimation) {
    window.elementSdk.init({ defaultConfig, onConfigChange, mapToCapabilities, mapToEditPanelValues });
    window.sdkInitializedForAnimation = true;
}

// Scroll animations with slight delay for dramatic effect
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            setTimeout(() => {
                e.target.classList.add('visible');
            }, 100);
            observer.unobserve(e.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 5) * 0.1}s`;
    observer.observe(el);
});

// Mobile menu toggle
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

// Reassemble Animation Logic
function initReassembleAnimation() {
    const nameEl = document.getElementById('hero-name');
    if (!nameEl) return;

    const text = nameEl.textContent.trim();
    if (!text) return;
    nameEl.innerHTML = '';

    // Temporarily remove glow to prevent text from being invisible in WebKit/Chrome during transform
    nameEl.classList.remove('hero-text-glow');
    nameEl.style.opacity = '1';

    const chars = [...text];
    let assembledCount = 0;

    chars.forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'char';

        // Force the span to inherit a visible color while animating
        span.style.color = '#ffffff';

        const dx = (Math.random() - 0.5) * 400; // -200 to 200px
        const dy = (Math.random() - 0.5) * 400; // -200 to 200px
        const dr = (Math.random() - 0.5) * 90;  // -45 to 45deg

        span.style.setProperty('--dx', `${dx}px`);
        span.style.setProperty('--dy', `${dy}px`);
        span.style.setProperty('--dr', `${dr}deg`);

        const delay = i * 0.04;
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
                }, 800);
            }, 100);
        });
    });
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    initReassembleAnimation();

    const nameEl = document.getElementById('hero-name');
    if (nameEl && window.MutationObserver) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Prevent infinite loops and only re-trigger if it's raw text
                    if (!nameEl.querySelector('.char') && nameEl.textContent.trim().length > 0) {
                        // optional: initReassembleAnimation();
                    }
                }
            });
        });
        observer.observe(nameEl, { childList: true });
    }
});

// Smooth scroll implementation
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const targetId = a.getAttribute('href');
        if (targetId === '#') return;

        e.preventDefault();

        const target = document.querySelector(targetId);
        const wrapper = document.getElementById('app-wrapper');

        if (target && wrapper) {
            const navHeight = 72;

            const targetPosition =
                target.offsetTop - navHeight;

            wrapper.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic nav background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = document.body.classList.contains('light-mode')
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(10, 10, 10, 0.85)';
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = document.body.classList.contains('light-mode')
            ? 'rgba(255, 255, 255, 0.4)'
            : 'rgba(10, 10, 10, 0.5)';
        nav.style.boxShadow = 'none';
    }
});