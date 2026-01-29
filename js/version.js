/**
 * MediaKids Academy - Auto Cache Busting System
 * 
 * This system automatically adds timestamps to CSS/JS files to prevent caching issues.
 * 
 * HOW IT WORKS:
 * 1. Each HTML page loads version.js with a dynamic timestamp (Date.now())
 *    Example: <script>document.write('<script src="js/version.js?v=' + Date.now() + '"><\/script>');</script>
 * 2. This ensures version.js is never cached and always loads fresh
 * 3. version.js then updates all other CSS/JS files with BUILD_VERSION
 * 
 * BEFORE DEPLOYING:
 * Run: .\update-version.ps1
 * This updates BUILD_VERSION to current timestamp, ensuring all users get fresh files.
 * 
 * ADDING NEW PAGES:
 * Use the dynamic loader pattern in new HTML pages:
 * <script>document.write('<script src="[path]/js/version.js?v=' + Date.now() + '"><\/script>');</script>
 */

(function () {
    'use strict';

    // Build timestamp - update this when deploying new versions
    // Format: YYYYMMDDHHMM (Year-Month-Day-Hour-Minute)
    // Run: .\update-version.ps1 to update automatically
    const BUILD_VERSION = '202601300328';

    // Export for reference
    window.SITE_VERSION = BUILD_VERSION;

    // Function to update all stylesheet and script links with cache-busting parameter
    function applyCacheBusting() {
        // Update stylesheets
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href.includes('style.css') || href.includes('.css')) && !href.includes('cdn') && !href.includes('unpkg') && !href.includes('googleapis') && !href.includes('cdnjs')) {
                const newHref = updateVersionParam(href, BUILD_VERSION);
                if (newHref !== href) {
                    link.setAttribute('href', newHref);
                }
            }
        });

        // Update scripts
        document.querySelectorAll('script[src]').forEach(script => {
            const src = script.getAttribute('src');
            if (src && (src.includes('script.js') || src.includes('components.js') || src.includes('version.js')) && !src.includes('cdn') && !src.includes('unpkg')) {
                const newSrc = updateVersionParam(src, BUILD_VERSION);
                if (newSrc !== src) {
                    script.setAttribute('src', newSrc);
                }
            }
        });
    }

    // Helper function to update or add version parameter
    function updateVersionParam(url, version) {
        const urlObj = new URL(url, window.location.href);
        urlObj.searchParams.set('v', version);

        // Return relative path if original was relative
        if (!url.startsWith('http') && !url.startsWith('//')) {
            return url.split('?')[0] + '?' + urlObj.searchParams.toString();
        }
        return urlObj.href;
    }

    // Run on DOM ready (for dynamically loaded content)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyCacheBusting);
    } else {
        applyCacheBusting();
    }
})();
