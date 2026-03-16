/**
 * ========================================
 * DUCTV Personal Portfolio - JavaScript
 * ========================================
 */

// Initialize EmailJS with the public key (must run before DOM events)
emailjs.init('Lj1GIgRAb3Fc7uBxB');

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. SPARKLE BACKGROUND EFFECT
    // ============================================================
    const sparkleContainer = document.querySelector('.sparkle-container');
    const sparkleCount = 50; // Number of sparkles

    function createSparkles() {
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.animationDelay = `${Math.random() * 5}s`;
            sparkle.style.animationDuration = `${2 + Math.random() * 3}s`;
            sparkleContainer.appendChild(sparkle);
        }
    }

    if (sparkleContainer) {
        createSparkles();
    }

    // ============================================================
    // 2. NAVIGATION ACTIVE STATE
    // ============================================================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.main-content section');
    const mainContent = document.querySelector('.main-content');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Intersection Observer to update active link on scroll
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = `#${entry.target.id}`;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === targetId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const observerOptions = {
        root: mainContent,
        rootMargin: '-40% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => {
        if (section) {
            observer.observe(section);
        }
    });


    // ============================================================
    // 3. CTA & SOCIAL LINKS
    // ============================================================
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            console.log('Download CV button clicked');
            window.location.href = 'assets/cv/CV_TranVuDuc.pdf';
        });
    }

    // "Let's Connect" banner button → smooth scroll to Contact section
    const letsConnectBtn = document.getElementById('letsConnectBtn');
    if (letsConnectBtn) {
        letsConnectBtn.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Social link clicked:', link.title);
            window.open(link.href, '_blank');
        });
    });


    // ============================================================
    // 4. ACCORDION FUNCTIONALITY - Education Section
    // ============================================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const panel = this.parentElement;
            const isOpen = panel.classList.contains('open');

            // Close all panels
            document.querySelectorAll('.accordion-panel').forEach(p => {
                p.classList.remove('open');
            });

            // Open clicked panel if it was closed
            if (!isOpen) {
                panel.classList.add('open');
            }
        });
    });

    // ============================================================
    // 4.5 FILTER TABS - Work Section
    // ============================================================
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInProject 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ============================================================
    // 5. FADE-IN & PARALLAX SCROLL ANIMATIONS
    // ============================================================
    const fadeSections = document.querySelectorAll('.fade-in-section');
    if (fadeSections.length) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { root: mainContent, threshold: 0.1 });

        fadeSections.forEach(sec => fadeObserver.observe(sec));
    }

    // simple parallax for banner backgrounds (just a transform on scroll)
    const parallaxBanners = document.querySelectorAll('.stats-banner');
    mainContent.addEventListener('scroll', () => {
        parallaxBanners.forEach(banner => {
            const speed = 0.3;
            const offset = mainContent.scrollTop - banner.offsetTop;
            banner.style.backgroundPositionY = `${offset * speed}px`;
        });
    });

    // ============================================================
    // 6. EMAILJS - CONTACT FORM SUBMISSION
    // ============================================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    /**
     * Validates that all required EmailJS template variables are non-empty.
     * Returns an error message string, or null if everything is valid.
     */
    const validateContactForm = (form) => {
        const fields = [
            { name: 'from_name',   label: 'Name' },
            { name: 'user_email',  label: 'Email' },
            { name: 'subject',     label: 'Subject' },
            { name: 'message',     label: 'Message' },
        ];

        for (const { name, label } of fields) {
            const value = form.elements[name]?.value.trim();
            if (!value) return `Please fill in the "${label}" field.`;
        }

        // Basic e-mail format check
        const emailValue = form.elements['user_email'].value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) return 'Please enter a valid email address.';

        return null;
    };

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const validationError = validateContactForm(contactForm);
            if (validationError) {
                alert(validationError);
                return;
            }

            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            emailjs
                .sendForm('service_oyhbvvo', 'template_w69jt7r', contactForm)
                .then(() => {
                    alert('Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error('EmailJS error:', error);
                    alert('Oops! Something went wrong. Please check your connection.');
                })
                .finally(() => {
                    // Restore button regardless of outcome
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'SEND MESSAGE';
                });
        });
    }

    // ============================================================
    // 7. CONSOLE LOG - INITIALIZATION
    // ============================================================
    console.log('%c✨ DucTV Portfolio Revamped & Loaded! ✨', 'color: #00aaff; font-size: 16px; font-weight: bold;');
    console.log('%cWelcome to the new vibe.', 'color: #ff00ff; font-size: 12px;');

});
