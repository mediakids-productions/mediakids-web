// Detect base path for nested folders
let basePath = '';
const path = window.location.pathname;

// Level 3 deep: ../../../
if (path.includes('/schools/central-area/') ||
    path.includes('/schools/north-area/') ||
    path.includes('/schools/esan-area/') ||
    path.includes('/curriculum/sem1/ecd/') ||
    path.includes('/curriculum/sem2/ecd/')) {
    basePath = '../../../';
}
// Level 2 deep: ../../
else if (path.includes('/curriculum/sem1/') ||
    path.includes('/curriculum/sem2/') ||
    path.includes('/blogs/top-10-myths/') ||
    path.includes('/teach-and-earn/apply/')) {
    basePath = '../../';
}
// Level 1 deep: ../
else if (path.includes('/about/') ||
    path.includes('/programs/') ||
    path.includes('/schools/') ||
    path.includes('/jobs/') ||
    path.includes('/faq/') ||
    path.includes('/contact/') ||
    path.includes('/curriculum/') ||
    path.includes('/activity/') ||
    path.includes('/apply-now/') ||
    path.includes('/hr/') ||
    path.includes('/story/') ||
    path.includes('/curriculum-consultants/') ||
    path.includes('/thai-consultants/') ||
    path.includes('/mission-vision/') ||
    path.includes('/ecd-program/') ||
    path.includes('/mep-program/') ||
    path.includes('/iep-program/') ||
    path.includes('/english-camps/') ||
    path.includes('/mediakids-awards/') ||
    path.includes('/summer-camp-canada/') ||
    path.includes('/teach-and-earn/') ||
    path.includes('/about/') ||
    path.includes('/programs/') ||
    path.includes('/blogs/')) {
    basePath = '../';
}


const headerHTML = `
    <header id="main-header" class="fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out h-[88px] bg-white/90 backdrop-blur-md border-b border-transparent">
        <nav id="nav-container" class="container mx-auto px-6 flex justify-between items-stretch transition-all duration-300 relative z-50 h-full">
            <a href="${basePath}" class="nav-logo menu-close-trigger flex items-center space-x-3 py-4 relative z-50">
                <img id="logo-image" src="${basePath}assets/images/icons/logo.png" alt="MediaKids Academy Logo" class="h-10 w-auto" loading="lazy" />
                <span class="text-3xl font-bold accent-text">
                    MediaKids<span class="text-gray-800"> Academy</span>
                </span>
            </a>

            <div class="hidden lg:flex items-stretch h-full relative z-50">
                <div class="group-trigger h-full flex items-center px-5" data-menu="about">
                    <a href="${basePath}about/" class="nav-link flex items-center h-full w-full justify-center">
                        About Us <i class="fas fa-chevron-down text-xs ml-2 transition-transform duration-300"></i>
                    </a>
                </div>

                <div class="group-trigger h-full flex items-center px-5" data-menu="programs">
                    <a href="${basePath}programs/" class="nav-link flex items-center h-full w-full justify-center">
                        Programs <i class="fas fa-chevron-down text-xs ml-2 transition-transform duration-300"></i>
                    </a>
                </div>

                <div class="group-trigger h-full flex items-center px-5" data-menu="schools">
                    <a href="${basePath}schools/" class="nav-link flex items-center h-full w-full justify-center">
                        Schools <i class="fas fa-chevron-down text-xs ml-2 transition-transform duration-300"></i>
                    </a>
                </div>



                <div class="menu-close-trigger flex items-center h-full px-5">
                    <a href="${basePath}faq/" class="nav-page nav-link flex items-center h-full w-full justify-center">FAQ</a>
                </div>
                <div class="menu-close-trigger flex items-center h-full px-5">
                    <a href="${basePath}jobs/" class="nav-link nav-page flex items-center h-full w-full justify-center">Jobs</a>
                </div>
                <div class="menu-close-trigger flex items-center h-full px-5">
                    <a href="${basePath}curriculum/" class="nav-link nav-page flex items-center h-full w-full justify-center">Curriculum</a>
                </div>
            </div>

            <div class="menu-close-trigger hidden lg:flex items-center h-full relative z-50 ml-4 flex-shrink-0">
                <a href="${basePath}apply-now/" class="btn-primary px-6 py-2 rounded-full nav-page ml-4">
                    Apply Now
                </a>
            </div>

            <button id="mobile-menu-button" class="lg:hidden text-gray-800 focus:outline-none relative z-50">
                <i class="fas fa-bars text-2xl"></i>
            </button>
        </nav>

        <!-- SINGLE MEGA MENU CONTAINER (ABSOLUTE TO TOP OF HEADER) -->
        <div id="mega-menu-container">
            <!-- Content: About Us -->
            <div id="mm-content-about" class="mm-section">
                <div class="container mx-auto px-6">
                    <div class="grid grid-cols-12 gap-8">
                        <div class="col-span-3 mm-col">
                            <span class="mm-header">Organization</span>
                            <a href="${basePath}story/" class="mm-link nav-page">MediaKids Story</a>
                            <a href="${basePath}mission-vision/" class="mm-link nav-page">Mission & Vision</a>
                            <a href="${basePath}blogs/" class="mm-link nav-page">Blogs</a>
                            <a href="${basePath}contact/" class="mm-link nav-page">Contact Us</a>
                        </div>
                        <div class="col-span-3 border-l border-gray-100 pl-8 mm-col">
                            <span class="mm-header">Our Teams</span>
                            <a href="${basePath}hr/" class="mm-link nav-page">Human Resources</a>
                            <a href="${basePath}curriculum-consultants/" class="mm-link nav-page">Curriculum Consultants</a>
                            <a href="${basePath}thai-consultants/" class="mm-link nav-page">Thai Consultants</a>
                        </div>
                        <div class="col-span-6 border-l border-gray-100 pl-12 mm-col flex flex-col justify-center">
                            <span class="mm-header mb-4">Who We Are</span>
                            <div class="flex items-center text-blue-600">
                                <i class="fas fa-users text-5xl mr-4"></i>
                                <div>
                                    <p class="text-lg font-bold">Teaching Excellence Since 2001</p>
                                    <p class="text-sm text-gray-500">Empowering teachers and transforming education in Thailand.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Programs -->
            <div id="mm-content-programs" class="mm-section">
                <div class="container mx-auto px-6">
                    <div class="grid grid-cols-12 gap-8">
                        <div class="col-span-3 mm-col">
                            <span class="mm-header">Academic Programs</span>
                            <a href="${basePath}ecd-program/" class="mm-link nav-page">ECD Program</a>
                            <a href="${basePath}iep-program/" class="mm-link nav-page">IEP Program</a>
                            <a href="${basePath}mep-program/" class="mm-link nav-page">IP / EP / MEP Program</a>
                        </div>
                        <div class="col-span-3 border-l border-gray-100 pl-8 mm-col">
                            <span class="mm-header">Activities</span>
                            <a href="${basePath}english-camps/" class="mm-link nav-page">English Camps</a>
                            <a href="${basePath}mediakids-awards/" class="mm-link nav-page">MediaKids Awards</a>
                            <a href="${basePath}summer-camp-canada/" class="mm-link nav-page">Summer Camp in Canada</a>
                        </div>
                        <div class="col-span-6 border-l border-gray-100 pl-8 mm-col">
                            <span class="mm-header">Highlights</span>
                            <div class="grid grid-cols-2 gap-6 mt-4">
                                <a href="${basePath}english-camps/" class="group/img block nav-page">
                                    <div class="overflow-hidden rounded-lg shadow-sm h-32 mb-3">
                                        <img src="${basePath}assets/images/camps/camps1.webp" class="w-full h-full object-cover transform transition-transform duration-500 group-hover/img:scale-110">
                                    </div>
                                    <span class="text-sm font-semibold text-gray-800 group-hover/img:text-blue-600">English Camps</span>
                                </a>
                                <a href="${basePath}mediakids-awards/" class="group/img block nav-page">
                                    <div class="overflow-hidden rounded-lg shadow-sm h-32 mb-3">
                                        <img src="${basePath}assets/images/mediakids-awards/mkaannounce1.webp" class="w-full h-full object-cover transform transition-transform duration-500 group-hover/img:scale-110">
                                    </div>
                                    <span class="text-sm font-semibold text-gray-800 group-hover/img:text-blue-600">MediaKids Awards</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Schools -->
            <div id="mm-content-schools" class="mm-section">
                <div class="container mx-auto px-6">
                    <div class="grid grid-cols-12 gap-8">
                        <div class="col-span-4 mm-col">
                            <span class="mm-header">Regions</span>
                            <a href="${basePath}schools/central-area/" class="mm-link nav-page">Central Area</a>
                            <a href="${basePath}schools/north-area/" class="mm-link nav-page">North Area</a>
                            <a href="${basePath}schools/esan-area/" class="mm-link nav-page">Esan Area</a>
                        </div>
                        <div class="col-span-8 border-l border-gray-100 pl-12 mm-col flex flex-col justify-center">
                            <span class="mm-header mb-4">Our Coverage</span>
                            <div class="flex items-center text-blue-600">
                                <i class="fas fa-map-marked-alt text-5xl mr-4"></i>
                                <div>
                                    <p class="text-lg font-bold">Nationwide Network</p>
                                    <p class="text-sm text-gray-500">Connecting teachers with schools throughout Thailand.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </header>

    <!-- Mobile Menu Overlay (Full Screen) -->
    <div id="mobile-menu-overlay" class="mobile-menu-overlay">
        <div class="mobile-menu-panel">
            <!-- Header with Close Button -->
            <div class="mobile-menu-header">
                <a href="${basePath}" class="text-2xl font-bold text-blue-600">MediaKids<span class="text-gray-800"> Academy</span></a>
                <button id="mobile-menu-close" class="mobile-menu-close" aria-label="Close menu">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <!-- Menu Items -->
            <nav class="mobile-menu-nav">
                <!-- About Us -->
                <div class="mobile-accordion">
                    <button class="mobile-accordion-toggle">
                        <span>About Us</span>
                        <i class="fas fa-chevron-down mobile-accordion-icon"></i>
                    </button>
                    <div class="mobile-accordion-content">
                        <a href="${basePath}about/" class="mobile-menu-link nav-page">
                            <i class="fas fa-th-large"></i>Overview
                        </a>
                        <a href="${basePath}story/" class="mobile-menu-link nav-page">
                            <i class="fas fa-book-open"></i>MediaKids Story
                        </a>
                        <a href="${basePath}mission-vision/" class="mobile-menu-link nav-page">
                            <i class="fas fa-bullseye"></i>Mission & Vision
                        </a>
                        <a href="${basePath}blogs/" class="mobile-menu-link nav-page">
                            <i class="fas fa-pen-fancy"></i>Blogs
                        </a>
                        <a href="${basePath}contact/" class="mobile-menu-link nav-page">
                            <i class="fas fa-envelope"></i>Contact Us
                        </a>
                        <div class="mobile-menu-divider"></div>
                        <a href="${basePath}hr/" class="mobile-menu-link nav-page">
                            <i class="fas fa-users"></i>Human Resources
                        </a>
                        <a href="${basePath}curriculum-consultants/" class="mobile-menu-link nav-page">
                            <i class="fas fa-chalkboard-teacher"></i>Curriculum Consultants
                        </a>
                        <a href="${basePath}thai-consultants/" class="mobile-menu-link nav-page">
                            <i class="fas fa-headset"></i>Thai Consultants
                        </a>
                    </div>
                </div>

                <!-- Programs -->
                <div class="mobile-accordion">
                    <button class="mobile-accordion-toggle">
                        <span>Programs</span>
                        <i class="fas fa-chevron-down mobile-accordion-icon"></i>
                    </button>
                    <div class="mobile-accordion-content">
                        <a href="${basePath}programs/" class="mobile-menu-link nav-page">
                            <i class="fas fa-th-large"></i>All Programs
                        </a>
                        <a href="${basePath}ecd-program/" class="mobile-menu-link nav-page">
                            <i class="fas fa-child"></i>ECD Program
                        </a>
                        <a href="${basePath}iep-program/" class="mobile-menu-link nav-page">
                            <i class="fas fa-globe"></i>IEP Program
                        </a>
                        <a href="${basePath}mep-program/" class="mobile-menu-link nav-page">
                            <i class="fas fa-school"></i>IP / EP / MEP
                        </a>
                        <div class="mobile-menu-divider"></div>
                        <a href="${basePath}english-camps/" class="mobile-menu-link nav-page">
                            <i class="fas fa-campground"></i>English Camps
                        </a>
                        <a href="${basePath}mediakids-awards/" class="mobile-menu-link nav-page">
                            <i class="fas fa-trophy"></i>MediaKids Awards
                        </a>
                        <a href="${basePath}summer-camp-canada/" class="mobile-menu-link nav-page">
                            <i class="fas fa-leaf"></i>Summer Camp Canada
                        </a>
                    </div>
                </div>

                <!-- Schools -->
                <div class="mobile-accordion">
                    <button class="mobile-accordion-toggle">
                        <span>Schools</span>
                        <i class="fas fa-chevron-down mobile-accordion-icon"></i>
                    </button>
                    <div class="mobile-accordion-content">
                        <a href="${basePath}schools/" class="mobile-menu-link nav-page">
                            <i class="fas fa-th-large"></i>All Regions
                        </a>
                        <a href="${basePath}schools/central-area/" class="mobile-menu-link nav-page">
                            <i class="fas fa-city"></i>Central Area
                        </a>
                        <a href="${basePath}schools/north-area/" class="mobile-menu-link nav-page">
                            <i class="fas fa-mountain"></i>North Area
                        </a>
                        <a href="${basePath}schools/esan-area/" class="mobile-menu-link nav-page">
                            <i class="fas fa-seedling"></i>Esan Area
                        </a>
                    </div>
                </div>

                <!-- Direct Links -->
                <a href="${basePath}faq/" class="mobile-menu-direct nav-page">
                    <i class="fas fa-question-circle"></i>FAQ
                </a>
                <a href="${basePath}jobs/" class="mobile-menu-direct nav-page">
                    <i class="fas fa-briefcase"></i>Jobs
                </a>
                <a href="${basePath}curriculum/" class="mobile-menu-direct nav-page">
                    <i class="fas fa-book"></i>Curriculum
                </a>
            </nav>

            <!-- Apply Now Button -->
            <div class="mobile-menu-footer">
                <a href="${basePath}jobs/" class="mobile-apply-btn nav-page">
                    <i class="fas fa-paper-plane"></i>Apply Now
                </a>
            </div>
        </div>
    </div>
`;

const footerHTML = `
    <footer class="bg-[#0A192F] text-white py-16 border-t border-gray-800">
        <div class="container mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div class="space-y-4">
                    <a href="${basePath}" class="nav-logo text-3xl font-bold text-blue-400 block mb-4">MediaKids<span class="text-white"> Academy</span></a>
                    <p class="text-gray-400 text-sm leading-relaxed">Empowering education in Thailand since 2001. Connecting passionate teachers with schools nationwide to create a brighter future.</p>
                    <div class="flex space-x-4 pt-2">
                        <a href="https://www.facebook.com/share/1DsygETo3J/?mibextid=wwXIfr" target="_blank" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://www.tiktok.com/@mediakidsacademy" target="_blank" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors"><i class="fab fa-tiktok"></i></a>
                    </div>
                </div>
                <div>
                    <h4 class="text-lg font-bold mb-6 border-b border-blue-500 inline-block pb-2">Quick Links</h4>
                    <ul class="space-y-3 text-gray-400">
                        <li><a href="${basePath}apply-now/" class="nav-page hover:text-blue-400 transition-colors">Apply Now</a></li>
                        <li><a href="${basePath}programs/#programs-ecd" class="nav-page hover:text-blue-400 transition-colors">Our Programs</a></li>
                        <li><a href="${basePath}schools/#schools-central-north" class="nav-page hover:text-blue-400 transition-colors">School Locations</a></li>
                        <li><a href="${basePath}about/#about-mediakids" class="nav-page hover:text-blue-400 transition-colors">About Us</a></li>
                        <li><a href="${basePath}faq/" class="nav-page hover:text-blue-400 transition-colors">FAQ</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-bold mb-6 border-b border-blue-500 inline-block pb-2">Contact Us</h4>
                    <ul class="space-y-4 text-gray-400">
                        <li class="flex items-start"><i class="fas fa-map-marker-alt mt-1 mr-3 text-blue-400"></i><span>40/470 Prueksa B Village, Liab Klongsam Road,<br>Klongluang, Pathumthani 12120, Thailand</span></li>
                        <li class="flex items-center"><i class="fas fa-phone-alt mr-3 text-blue-400"></i><a href="tel:+6628341897" class="hover:text-blue-400 transition-colors">(+66) 2834 1897</a></li>
                        <li class="flex items-center"><i class="fas fa-envelope mr-3 text-blue-400"></i><a href="mailto:hr@mediakidsacademy.com" class="hover:text-blue-400 transition-colors">hr@mediakidsacademy.com</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-bold mb-6 border-b border-blue-500 inline-block pb-2">Start Your Journey</h4>
                    <p class="text-gray-400 text-sm mb-4">Ready to teach in Thailand? Apply today and begin your adventure!</p>
                    <a href="${basePath}jobs/" class="nav-page inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center w-full">Apply Now</a>
                </div>
            </div>
            <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
                <p>&copy; 2024 Global Teach Thailand. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
`;

function loadComponents() {
    // 1. Inject HTML
    const headerContainer = document.getElementById('shared-header');
    const footerContainer = document.getElementById('shared-footer');
    if (headerContainer) headerContainer.innerHTML = headerHTML;
    if (footerContainer) footerContainer.innerHTML = footerHTML;

    // 2. Highlight Active Menu
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-page, .nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active-menu', 'text-blue-600');
        }
    });

    // 3. Load Analytics Script
    const analyticsScript = document.createElement('script');
    analyticsScript.src = basePath + 'js/analytics.js';
    analyticsScript.async = true;
    document.body.appendChild(analyticsScript);

    // 4. Dispatch Event (CRITICAL for script.js)
    console.log("Components loaded. Dispatching event...");
    document.dispatchEvent(new Event('componentsLoaded'));
}

// Run immediately
loadComponents();
