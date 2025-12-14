/**
 * MediaKids Analytics Helper
 * Google Analytics 4 Event Tracking Module
 */
(function () {
    'use strict';

    // Check if gtag is available
    if (typeof gtag !== 'function') {
        console.warn('Analytics: gtag not found');
        return;
    }

    const Analytics = {
        /**
         * Track CTA button clicks
         * @param {string} buttonName - Name of the button
         * @param {string} destination - Where the button leads to
         */
        trackCTAClick: function (buttonName, destination) {
            gtag('event', 'cta_click', {
                'event_category': 'engagement',
                'event_label': buttonName,
                'button_destination': destination
            });
        },

        /**
         * Track form submissions
         * @param {string} formName - Name of the form
         */
        trackFormSubmission: function (formName) {
            gtag('event', 'form_submission', {
                'event_category': 'conversion',
                'event_label': formName
            });
        },

        /**
         * Track outbound link clicks
         * @param {string} url - The URL clicked
         * @param {string} type - Type of link (social, map, document, external)
         */
        trackOutboundLink: function (url, type) {
            gtag('event', 'outbound_click', {
                'event_category': 'navigation',
                'event_label': url,
                'link_type': type
            });
        },

        /**
         * Track document downloads
         * @param {string} fileName - Name of the file
         */
        trackDownload: function (fileName) {
            gtag('event', 'file_download', {
                'event_category': 'engagement',
                'event_label': fileName
            });
        },

        /**
         * Track program interest
         * @param {string} programName - Name of the program
         */
        trackProgramView: function (programName) {
            gtag('event', 'program_view', {
                'event_category': 'interest',
                'event_label': programName
            });
        }
    };

    // ============================================
    // AUTO-TRACKING SETUP
    // ============================================

    // 1. Track all CTA button clicks
    function setupCTATracking() {
        document.addEventListener('click', function (e) {
            const target = e.target.closest('a, button');
            if (!target) return;

            // Check if it's a CTA button
            const isCTA = target.classList.contains('btn-primary') ||
                target.classList.contains('btn-secondary') ||
                target.textContent.toLowerCase().includes('apply') ||
                target.textContent.toLowerCase().includes('learn more') ||
                target.textContent.toLowerCase().includes('contact');

            if (isCTA) {
                const buttonText = target.textContent.trim().substring(0, 50);
                const destination = target.href || target.getAttribute('data-href') || 'unknown';
                Analytics.trackCTAClick(buttonText, destination);
            }
        });
    }

    // 2. Track outbound links
    function setupOutboundTracking() {
        document.addEventListener('click', function (e) {
            const link = e.target.closest('a[href]');
            if (!link) return;

            const href = link.href;
            const hostname = window.location.hostname;

            // Skip internal links
            if (href.includes(hostname) || href.startsWith('/') || href.startsWith('#')) {
                return;
            }

            // Determine link type
            let linkType = 'external';

            if (href.includes('facebook.com') || href.includes('fb.com')) {
                linkType = 'social_facebook';
            } else if (href.includes('instagram.com')) {
                linkType = 'social_instagram';
            } else if (href.includes('line.me') || href.includes('lin.ee')) {
                linkType = 'social_line';
            } else if (href.includes('youtube.com')) {
                linkType = 'social_youtube';
            } else if (href.includes('linkedin.com')) {
                linkType = 'social_linkedin';
            } else if (href.includes('google.com/maps') || href.includes('goo.gl/maps') || href.includes('maps.google')) {
                linkType = 'map';
            } else if (href.includes('tel:')) {
                linkType = 'phone';
            } else if (href.includes('mailto:')) {
                linkType = 'email';
            } else if (href.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar)$/i)) {
                linkType = 'document';
                const fileName = href.split('/').pop();
                Analytics.trackDownload(fileName);
            }

            Analytics.trackOutboundLink(href, linkType);
        });
    }

    // 3. Track scroll depth
    function setupScrollTracking() {
        const depths = [25, 50, 75, 100];
        const tracked = {};

        function getScrollPercent() {
            const h = document.documentElement;
            const b = document.body;
            const st = 'scrollTop';
            const sh = 'scrollHeight';
            return Math.round((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100);
        }

        let ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    const percent = getScrollPercent();

                    depths.forEach(function (depth) {
                        if (percent >= depth && !tracked[depth]) {
                            tracked[depth] = true;
                            gtag('event', 'scroll_depth', {
                                'event_category': 'engagement',
                                'event_label': depth + '%',
                                'scroll_depth_threshold': depth
                            });
                        }
                    });

                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // 4. Track program page views
    function trackProgramPageView() {
        const path = window.location.pathname;
        const programPages = {
            '/mep-program/': 'MEP Program',
            '/ecd-program/': 'ECD Program',
            '/iep-program/': 'IEP Program',
            '/teach-and-earn/': 'Teach and Earn',
            '/english-camps/': 'English Camps',
            '/summer-camp-canada/': 'Summer Camp Canada',
            '/jobs/': 'Job Listings'
        };

        for (const [pagePath, programName] of Object.entries(programPages)) {
            if (path.includes(pagePath)) {
                Analytics.trackProgramView(programName);
                break;
            }
        }
    }

    // 5. Track JotForm submissions
    function setupJotFormTracking() {
        window.addEventListener('message', function (e) {
            if (typeof e.data === 'object' && e.data.action === 'submission-completed') {
                Analytics.trackFormSubmission('JotForm Application');
            }
            // Alternative detection
            if (typeof e.data === 'string') {
                try {
                    const data = JSON.parse(e.data);
                    if (data.action === 'submission-completed' || data.action === 'formSubmitted') {
                        Analytics.trackFormSubmission('JotForm Application');
                    }
                } catch (err) { }
            }
        });
    }

    // Initialize all tracking
    function init() {
        setupCTATracking();
        setupOutboundTracking();
        setupScrollTracking();
        trackProgramPageView();
        setupJotFormTracking();

        // Track page load
        gtag('event', 'page_loaded', {
            'event_category': 'engagement',
            'page_path': window.location.pathname
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose Analytics for manual tracking
    window.MediaKidsAnalytics = Analytics;

})();
