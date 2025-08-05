document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const mainContent = document.querySelector('main');
    const overlay = document.getElementById('overlay');

    if (hamburger && navMenu && mainContent && overlay) {
        const toggleMenu = () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            mainContent.classList.toggle('blurred');
            overlay.classList.toggle('active');
        };
        hamburger.addEventListener('click', toggleMenu);

        // Close menu when a link is clicked on mobile
        navMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link') && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });

        // Close menu when clicking outside
        overlay.addEventListener('click', toggleMenu);
    }

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    if (header) {
        const handleHeaderScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        };
        window.addEventListener('scroll', handleHeaderScroll);
        handleHeaderScroll();
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    const wasActive = item.classList.contains('active');
                    // Close all items
                    faqItems.forEach(i => i.classList.remove('active'));
                    // Toggle the clicked item
                    if (!wasActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // --- Scroll To Top Button ---
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        const handleScrollToTopVisibility = () => {
            scrollToTopBtn.classList.toggle('visible', window.scrollY > 300);
        };
        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        window.addEventListener('scroll', handleScrollToTopVisibility);
        handleScrollToTopVisibility();
    }

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = parseInt(entry.target.dataset.delay || 0, 10);
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => {
            if (!el.classList.contains('slide-left') && !el.classList.contains('slide-right') && !el.classList.contains('zoom-in')) {
                el.classList.add('fade-in');
            }
            revealObserver.observe(el);
        });
    }

    // --- Counter Animation ---
    const counterNumbers = document.querySelectorAll('.counter-number');
    if (counterNumbers.length > 0) {
        const animateCounter = (counterElement) => {
            const target = +counterElement.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counterElement.innerText = Math.ceil(current).toLocaleString('bn-BD');
                    requestAnimationFrame(updateCounter);
                } else {
                    counterElement.innerText = target.toLocaleString('bn-BD');
                }
            };
            requestAnimationFrame(updateCounter);
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.8 });

        counterNumbers.forEach(counter => counterObserver.observe(counter));
    }

    // --- Contact Form Submission Simulation ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = 'পাঠানো হচ্ছে... <i class="fas fa-spinner fa-spin"></i>';
            submitButton.disabled = true;

            setTimeout(() => {
                alert('আপনার বার্তা সফলভাবে পাঠানো হয়েছে! আমি শীঘ্রই যোগাযোগ করব।');
                contactForm.reset();
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // --- Hacker Typewriter Animation for Hero Title ---
    const heroTitleElement = document.querySelector('.hero-title-new.hacker-effect');
    if (heroTitleElement) {
        const originalText = heroTitleElement.textContent;
        heroTitleElement.textContent = ''; // Clear text initially
        let charIndex = 0;
        const chars = "!<>-_\\/[]{}—=+*^?#$";

        const typeCharacter = () => {
            if (charIndex < originalText.length) {
                let currentText = originalText.substring(0, charIndex);
                let randomChars = '';
                for (let k = 0; k < 3; k++) {
                    randomChars += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                heroTitleElement.textContent = currentText + randomChars;

                setTimeout(() => {
                    heroTitleElement.textContent = currentText + originalText.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeCharacter, 60); // Speed of typing
                }, 80); // Duration of glitch
            } else {
                heroTitleElement.textContent = originalText; // Ensure final text is correct
            }
        };

        // Start typing animation when the element is in view
        const heroTitleObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeCharacter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        heroTitleObserver.observe(heroTitleElement);
    }
});