function initSite() {
    AOS.init({ duration: 800, once: true });

    // Header Scroll Effect
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mega Menu Logic
    const triggers = document.querySelectorAll('.group-trigger');
    const megaMenuContainer = document.getElementById('mega-menu-container');
    const navContainer = document.getElementById('nav-container');
    let activeMenu = null;
    let closeTimeout = null;
    let openTimeout = null; // New: delay before opening menu

    function openMenu(menuName) {
        if (closeTimeout) {
            clearTimeout(closeTimeout);
            closeTimeout = null;
        }

        // Remove closing class if it exists
        megaMenuContainer.classList.remove('nav-closing');

        const content = document.getElementById(`mm-content-${menuName}`);
        if (!content) return;

        megaMenuContainer.classList.add('active');
        document.body.classList.add('menu-open');

        // Manage active class on triggers for arrow rotation
        triggers.forEach(trigger => {
            if (trigger.dataset.menu === menuName) {
                trigger.classList.add('active');
            } else {
                trigger.classList.remove('active');
            }
        });

        if (activeMenu && activeMenu !== menuName) {
            const oldContent = document.getElementById(`mm-content-${activeMenu}`);
            if (oldContent) {
                oldContent.classList.remove('active-section', 'anim-entry');
            }
            content.classList.remove('anim-entry');
            content.classList.add('active-section');
        } else if (!activeMenu) {
            content.classList.add('anim-entry');
            content.classList.add('active-section');
        }

        const height = content.offsetHeight;
        megaMenuContainer.style.height = `${height}px`;
        activeMenu = menuName;
    }

    function closeMenu(immediate = false) {
        if (activeMenu) {
            const content = document.getElementById(`mm-content-${activeMenu}`);
            if (content) {
                content.classList.remove('active-section', 'anim-entry');
            }
        }

        // Remove active class from all triggers
        triggers.forEach(trigger => trigger.classList.remove('active'));

        if (immediate) {
            megaMenuContainer.classList.add('nav-closing');
            megaMenuContainer.classList.remove('active');
            setTimeout(() => {
                megaMenuContainer.style.height = '0px';
                megaMenuContainer.classList.remove('nav-closing');
            }, 500);
        } else {
            megaMenuContainer.classList.remove('active');
            megaMenuContainer.style.height = '0px';
        }

        document.body.classList.remove('menu-open');
        activeMenu = null;
    }

    triggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', () => {
            const menuName = trigger.dataset.menu;

            // Clear any pending toggle timers
            if (closeTimeout) {
                clearTimeout(closeTimeout);
                closeTimeout = null;
            }

            // If THIS menu is already open, don't do anything (prevents re-triggering)
            if (activeMenu === menuName) {
                if (openTimeout) {
                    clearTimeout(openTimeout);
                    openTimeout = null;
                }
                return;
            }

            // Clear any pending open timeout for other menus
            if (openTimeout) {
                clearTimeout(openTimeout);
                openTimeout = null;
            }

            // Apply delay for BOTH opening and switching 
            // to prevent accidental triggers when moving mouse diagonally
            openTimeout = setTimeout(() => {
                openMenu(menuName);
                openTimeout = null;
            }, 150); // Increased delay to 150ms for better stability
        });

        trigger.addEventListener('mouseleave', () => {
            // Clear open timeout if mouse leaves before delay completes
            if (openTimeout) {
                clearTimeout(openTimeout);
                openTimeout = null;
            }
        });
    });

    if (megaMenuContainer) {
        megaMenuContainer.addEventListener('mouseenter', () => {
            if (closeTimeout) {
                clearTimeout(closeTimeout);
                closeTimeout = null;
            }
        });
        megaMenuContainer.addEventListener('mouseleave', () => {
            closeTimeout = setTimeout(() => {
                closeMenu();
            }, 100);
        });
    }

    if (navContainer) {
        navContainer.addEventListener('mouseleave', () => {
            closeTimeout = setTimeout(() => {
                closeMenu();
            }, 100);
        });
    }

    const closeTriggers = document.querySelectorAll('.menu-close-trigger');
    closeTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', () => {
            closeMenu();
        });
    });

    // Mobile Menu Toggle - NEW OVERLAY SYSTEM
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    function openMobileMenu() {
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.add('active');
            document.body.classList.add('mobile-menu-open');
        }
    }

    function closeMobileMenu() {
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        }
    }

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking a link
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu-overlay a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Mobile Accordion Toggle
    const mobileAccordions = document.querySelectorAll('.mobile-accordion-toggle');
    mobileAccordions.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const accordion = toggle.parentElement;

            // Close other accordions
            document.querySelectorAll('.mobile-accordion.active').forEach(other => {
                if (other !== accordion) {
                    other.classList.remove('active');
                }
            });

            // Toggle current accordion
            accordion.classList.toggle('active');
        });
    });

    // Simple Slideshow Logic
    const slideshowImages = document.querySelectorAll('#hero-slideshow .slideshow-img');
    const slideshowContainer = document.getElementById('hero-slideshow');
    let currentImageIndex = 0;

    if (slideshowImages.length > 0) {
        // Wait for everything to load (including images) before showing the slideshow
        window.addEventListener('load', () => {
            // Ensure all images are loaded before starting slideshow
            const imagePromises = Array.from(slideshowImages).map(img => {
                if (img.complete) {
                    return Promise.resolve();
                }
                return new Promise((resolve) => {
                    img.addEventListener('load', resolve, { once: true });
                    img.addEventListener('error', resolve, { once: true }); // Continue even if image fails
                });
            });

            Promise.all(imagePromises).then(() => {
                // Small delay to ensure smooth transition
                setTimeout(() => {
                    // Reveal the slideshow container
                    if (slideshowContainer) {
                        slideshowContainer.classList.remove('opacity-0');
                    }

                    // Initialize first image
                    slideshowImages.forEach((img, index) => {
                        if (index === 0) {
                            img.classList.add('opacity-100', 'translate-x-0');
                            img.classList.remove('opacity-0', 'translate-x-full', '-translate-x-full');
                        } else {
                            img.classList.add('opacity-0', 'translate-x-full');
                            img.classList.remove('opacity-100', 'translate-x-0', '-translate-x-full');
                        }
                    });

                    // Start auto-rotation immediately so the first slide stays on screen the same duration as others
                    setInterval(() => {
                        const nextImageIndex = (currentImageIndex + 1) % slideshowImages.length;
                        const currentImage = slideshowImages[currentImageIndex];
                        const nextImage = slideshowImages[nextImageIndex];
                        currentImage.classList.remove('opacity-100', 'translate-x-0');
                        currentImage.classList.add('opacity-0', '-translate-x-full');
                        nextImage.classList.remove('opacity-0', 'translate-x-full');
                        nextImage.classList.add('opacity-100', 'translate-x-0');
                        setTimeout(() => {
                            currentImage.classList.remove('-translate-x-full');
                            currentImage.classList.add('translate-x-full');
                        }, 1000);
                        currentImageIndex = nextImageIndex;
                    }, 4000);
                }, 100);
            });
        });
    }

    // Counter Animation Logic
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const speed = 200;
        counter.innerText = '0';
        let count = 0;
        const updateCount = () => {
            const increment = target / speed;
            count += increment;
            if (count < target) {
                counter.innerText = Math.ceil(count).toLocaleString();
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCount();
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.counter').forEach(counter => {
        observer.observe(counter);
    });

    // Testimonial Slider Logic
    const testimonialSlider = document.getElementById('testimonial-final-slider');
    const testimonialCards = testimonialSlider ? testimonialSlider.querySelectorAll('.testimonial-card') : [];
    const prevBtn = document.getElementById('prev-testimonial-btn');
    const nextBtn = document.getElementById('next-testimonial-btn');
    const dotsContainer = document.getElementById('testimonial-dots-container');
    let currentTestimonialIndex = 0;

    if (testimonialCards.length > 0) {
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            testimonialCards.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = `w-3 h-3 rounded-full transition-colors duration-300 ${index === 0 ? 'bg-blue-600' : 'bg-gray-300 hover:bg-blue-400'}`;
                dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
                dot.addEventListener('click', () => showTestimonial(index));
                dotsContainer.appendChild(dot);
            });
        }

        function showTestimonial(index) {
            if (index < 0) index = testimonialCards.length - 1;
            if (index >= testimonialCards.length) index = 0;

            testimonialCards.forEach((card, i) => {
                if (i === index) {
                    card.classList.remove('opacity-0', 'invisible');
                    card.classList.add('opacity-100', 'visible', 'z-10');
                } else {
                    card.classList.add('opacity-0', 'invisible');
                    card.classList.remove('opacity-100', 'visible', 'z-10');
                }
            });

            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('button');
                dots.forEach((dot, i) => {
                    if (i === index) {
                        dot.classList.remove('bg-gray-300', 'hover:bg-blue-400');
                        dot.classList.add('bg-blue-600');
                    } else {
                        dot.classList.add('bg-gray-300', 'hover:bg-blue-400');
                        dot.classList.remove('bg-blue-600');
                    }
                });
            }
            currentTestimonialIndex = index;
        }

        if (prevBtn) prevBtn.addEventListener('click', () => showTestimonial(currentTestimonialIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => showTestimonial(currentTestimonialIndex + 1));
        showTestimonial(0);

        // Delay 3 seconds before starting auto-rotation
        setTimeout(() => {
            setInterval(() => {
                showTestimonial(currentTestimonialIndex + 1);
            }, 6000);
        }, 3000);
    }

    // Journey Tabs Logic
    const journeyTabs = document.querySelectorAll('.journey-tab');
    const journeyPanels = document.querySelectorAll('.journey-panel');

    if (journeyTabs.length > 0 && journeyPanels.length > 0) {
        function activateJourneyStep(step) {
            journeyTabs.forEach(tab => {
                const tabStep = tab.dataset.step;
                const numberCircle = tab.querySelector('.journey-number');

                if (tabStep === step) {
                    tab.classList.add('bg-white', 'shadow-lg', 'scale-105');
                    tab.classList.remove('hover:bg-white');
                    if (numberCircle) {
                        numberCircle.classList.remove('bg-gray-200', 'text-gray-600');
                        numberCircle.classList.add('bg-blue-600', 'text-white');
                    }
                } else {
                    tab.classList.remove('bg-white', 'shadow-lg', 'scale-105');
                    tab.classList.add('hover:bg-white');
                    if (numberCircle) {
                        numberCircle.classList.add('bg-gray-200', 'text-gray-600');
                        numberCircle.classList.remove('bg-blue-600', 'text-white');
                    }
                }
            });

            journeyPanels.forEach(panel => {
                if (panel.dataset.step === step) {
                    panel.classList.remove('opacity-0');
                    panel.classList.add('opacity-100', 'z-10');
                } else {
                    panel.classList.add('opacity-0');
                    panel.classList.remove('opacity-100', 'z-10');
                }
            });
        }

        journeyTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                activateJourneyStep(tab.dataset.step);
            });
        });
        activateJourneyStep('1');
    }

    // FAQ Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            faqQuestions.forEach(otherQuestion => {
                const otherAnswer = otherQuestion.nextElementSibling;
                const otherIcon = otherQuestion.querySelector('i');
                if (otherQuestion !== question && otherAnswer.style.maxHeight) {
                    otherAnswer.style.maxHeight = null;
                    otherIcon.classList.remove('rotate-180');
                }
            });
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                icon.classList.remove('rotate-180');
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.classList.add('rotate-180');
            }
        });
    });

    // Back to top logic
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Activity Page - Category Filter
    const activityTabs = document.querySelectorAll('.activity-tab');
    const activityCards = document.querySelectorAll('.activity-card');

    activityTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            activityTabs.forEach(t => {
                t.classList.remove('active', 'bg-blue-600', 'text-white');
                t.classList.add('bg-gray-200', 'text-gray-700');
            });
            tab.classList.add('active', 'bg-blue-600', 'text-white');
            tab.classList.remove('bg-gray-200', 'text-gray-700');

            activityCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.classList.remove('aos-animate');
                    setTimeout(() => card.classList.add('aos-animate'), 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Initialize logic
if (document.getElementById('mobile-menu-button')) {
    initSite();
} else {
    document.addEventListener('componentsLoaded', initSite);
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbwv8ekZILnxgsYBZz7j3TElRyV2aAJ1nuWECY9zDG2maOn4p5DM_kv9LFy8sf0y9ddV/exec';
const form = document.getElementById('contact-form-g-sheets');
const formWrapper = document.getElementById('contact-section-wrapper');
const thankYouMessage = document.getElementById('thank-you-message');
const honeypotField = form?.querySelector('[data-honeypot]');
const statusMessage = document.getElementById('contact-form-status');
const SUBMISSION_DELAY_MS = 2000;
const REQUEST_TIMEOUT_MS = 12000;
const sanitizeInput = (value = '') => value.replace(/[<>]/g, '').trim();
const isValidEmail = (email = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const buildFormDataFromEntries = (entries = []) => {
    const formData = new FormData();
    entries.forEach(([key, value]) => formData.append(key, value));
    return formData;
};
const buildUrlEncodedPayload = (entries = []) => {
    const params = new URLSearchParams();
    entries.forEach(([key, value]) => params.append(key, value));
    return params.toString();
};
const tryBeaconSubmit = (entries = []) => {
    if (typeof navigator === 'undefined' || typeof navigator.sendBeacon !== 'function') {
        return false;
    }
    const encodedBody = buildUrlEncodedPayload(entries);
    const beaconPayload = new Blob([encodedBody], { type: 'application/x-www-form-urlencoded' });
    return navigator.sendBeacon(scriptURL, beaconPayload);
};
const submitToSheets = async (entries = []) => {
    if (tryBeaconSubmit(entries)) {
        return true;
    }
    const controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS) : null;
    try {
        await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: buildFormDataFromEntries(entries),
            signal: controller?.signal
        });
        return true;
    } finally {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    }
};
let formInitTime = Date.now();

const showStatus = (type = 'info', message = '') => {
    if (!statusMessage || !message) return;
    statusMessage.textContent = message;
    statusMessage.classList.remove('hidden', 'text-red-500', 'text-green-600', 'text-gray-500');
    switch (type) {
        case 'success':
            statusMessage.classList.add('text-green-600');
            break;
        case 'error':
            statusMessage.classList.add('text-red-500');
            break;
        default:
            statusMessage.classList.add('text-gray-500');
    }
};

const hideStatus = () => {
    if (!statusMessage) return;
    statusMessage.textContent = '';
    statusMessage.classList.add('hidden');
    statusMessage.classList.remove('text-red-500', 'text-green-600', 'text-gray-500');
};

const setFormState = (isBusy, button) => {
    if (!button) return;
    if (!button.dataset.defaultLabel) {
        button.dataset.defaultLabel = button.textContent || 'Send Application';
    }
    if (isBusy) {
        form?.setAttribute('aria-busy', 'true');
        button.disabled = true;
        button.textContent = 'Sending...';
    } else {
        form?.removeAttribute('aria-busy');
        button.disabled = false;
        button.textContent = button.dataset.defaultLabel;
    }
};

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        hideStatus();
        setFormState(true, btn);
        showStatus('info', 'Sending your application securely...');

        if (honeypotField && honeypotField.value.trim() !== '') {
            alert('Your submission could not be validated. Please try again.');
            honeypotField.value = '';
            showStatus('error', 'Spam protection triggered. Please try again.');
            return setFormState(false, btn);
        }

        const elapsedTime = Date.now() - formInitTime;
        if (elapsedTime < SUBMISSION_DELAY_MS) {
            alert('Please take a moment to review your information before submitting.');
            showStatus('error', 'Please take a moment to review your information before submitting.');
            return setFormState(false, btn);
        }

        const rawFormData = new FormData(form);
        const sanitizedEntries = [];
        rawFormData.forEach((value, key) => {
            if (typeof value === 'string') {
                const cleaned = sanitizeInput(value);
                sanitizedEntries.push([key, cleaned]);
                const control = form.querySelector(`[name="${key}"]`);
                if (control && typeof control.value === 'string') {
                    control.value = cleaned;
                }
            } else {
                sanitizedEntries.push([key, value]);
            }
        });

        const emailValue = sanitizedEntries.find(([key]) => key === 'email')?.[1] || '';
        if (!isValidEmail(emailValue)) {
            alert('Please enter a valid email address.');
            showStatus('error', 'Please enter a valid email address.');
            return setFormState(false, btn);
        }
        try {
            await submitToSheets(sanitizedEntries);
            form.reset();
            formInitTime = Date.now();
            if (formWrapper && thankYouMessage) {
                formWrapper.classList.add('hidden');
                thankYouMessage.classList.remove('hidden');
            }
            showStatus('success', 'Your application has been sent. Please watch your inbox for our reply.');
        } catch (submissionError) {
            if (submissionError?.name === 'AbortError') {
                showStatus('error', 'Network timeout. Please try again in a moment.');
            } else {
                console.error('Submission Error:', submissionError);
                showStatus('error', 'Submission failed. Please try again or email us at mediakids.online@gmail.com');
            }
        }

        setFormState(false, btn);
    });
}
