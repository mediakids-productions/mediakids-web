// Detect base path for nested folders (e.g., /about/)
const basePath = window.location.pathname.includes('/about/') ||
    window.location.pathname.includes('/programs/') ||
    window.location.pathname.includes('/schools/') ||
    window.location.pathname.includes('/jobs/') ||
    window.location.pathname.includes('/faq/') ||
    window.location.pathname.includes('/contact/') ||
    window.location.pathname.includes('/curriculum/') ||
    window.location.pathname.includes('/activity/') ||
    window.location.pathname.includes('/apply-now/') ||
    window.location.pathname.includes('/hr/') ||
    window.location.pathname.includes('/story/') ||
    window.location.pathname.includes('/curriculum-consultants/') ||
    window.location.pathname.includes('/thai-consultants/') ||
    window.location.pathname.includes('/mission-vision/') ? '../' : '';

const headerHTML = `
    <header id="main-header" class="fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out h-[88px] bg-white/90 backdrop-blur-md border-b border-transparent">
        <nav id="nav-container" class="container mx-auto px-6 flex justify-between items-stretch transition-all duration-300 relative z-50 h-full">
            <a href="${basePath}index.html" class="nav-logo menu-close-trigger flex items-center space-x-3 py-4 relative z-50">
                <img id="logo-image" src="${basePath}assets/images/icons/google-drive-image-17.jpg" data-drive-src="${basePath}assets/images/icons/google-drive-image-1.jpg" alt="MediaKids Academy Logo" class="h-10 w-auto" loading="lazy" referrerpolicy="no-referrer" />
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
                            <a href="${basePath}programs/#programs-ecd" class="mm-link nav-page">ECD Program <span class="mm-sub-text">(3-6 Years)</span></a>
                            <a href="${basePath}programs/#programs-iep" class="mm-link nav-page">IEP Program <span class="mm-sub-text">(Intensive)</span></a>
                            <a href="${basePath}programs/#programs-ep-ip" class="mm-link nav-page">IP / EP / MEP Program</a>
                        </div>
                        <div class="col-span-3 border-l border-gray-100 pl-8 mm-col">
                            <span class="mm-header">Activities</span>
                            <a href="${basePath}programs/#programs-camp" class="mm-link nav-page">English Camps</a>
                            <a href="${basePath}programs/#programs-mk-awards" class="mm-link nav-page">MediaKids Awards</a>
                            <a href="${basePath}programs/#programs-summer-camp" class="mm-link nav-page">Summer Camp in Canada</a>
                        </div>
                        <div class="col-span-6 border-l border-gray-100 pl-8 mm-col">
                            <span class="mm-header">Highlights</span>
                            <div class="grid grid-cols-2 gap-6 mt-4">
                                <a href="${basePath}programs/#programs-camp" class="group/img block nav-page">
                                    <div class="overflow-hidden rounded-lg shadow-sm h-32 mb-3">
                                        <img src="${basePath}assets/images/programs/unsplash-image-38.jpg" class="w-full h-full object-cover transform transition-transform duration-500 group-hover/img:scale-110">
                                    </div>
                                    <span class="text-sm font-semibold text-gray-800 group-hover/img:text-blue-600">English Camps</span>
                                </a>
                                <a href="${basePath}programs/#programs-mk-awards" class="group/img block nav-page">
                                    <div class="overflow-hidden rounded-lg shadow-sm h-32 mb-3">
                                        <img src="${basePath}assets/images/posts/post-1.jpg" class="w-full h-full object-cover transform transition-transform duration-500 group-hover/img:scale-110">
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
                        <div class="col-span-3 mm-col">
                            <span class="mm-header">Regions</span>
                            <span class="mm-link text-gray-600 cursor-default">Central Area</span>
                            <span class="mm-link text-gray-600 cursor-default">North Area</span>
                            <span class="mm-link text-gray-600 cursor-default">Esan Area</span>
                        </div>
                        <div class="col-span-3 border-l border-gray-100 pl-8 mm-col">
                            <span class="mm-header">Coming Soon</span>
                            <p class="text-sm text-gray-500 mt-2">School pages are being updated. Check back soon for detailed information about each region.</p>
                        </div>
                        <div class="col-span-6 border-l border-gray-100 pl-12 mm-col flex flex-col justify-center">
                            <span class="mm-header mb-4">Our Coverage</span>
                            <div class="flex items-center text-blue-600">
                                <i class="fas fa-map-marked-alt text-5xl mr-4"></i>
                                <div>
                                    <p class="text-lg font-bold">Nationwide Network</p>
                                    <p class="text-sm text-gray-500">Partnering with over 50 schools across Thailand.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </header>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden lg:hidden px-6 pt-2 pb-4 space-y-2 bg-white border-t">
        <div>
            <button class="mobile-menu-toggle w-full flex justify-between items-center py-2 font-medium">
                <span>About Us</span>
                <i class="fas fa-chevron-down text-xs transform transition-transform duration-300"></i>
            </button>
            <div class="mobile-submenu hidden pl-4 mt-2 space-y-2 border-l-2 border-gray-100 ml-2">
                <a href="${basePath}story/" class="nav-page block py-1 text-gray-600">MediaKids Story</a>
                <a href="${basePath}mission-vision/" class="nav-page block py-1 text-gray-600">Mission & Vision</a>
                <a href="${basePath}hr/" class="nav-page block py-1 text-gray-500">Human Resources</a>
                <a href="${basePath}curriculum-consultants/" class="nav-page block py-1 text-gray-500">Curriculum Consultants</a>
                <a href="${basePath}thai-consultants/" class="nav-page block py-1 text-gray-500">Thai Consultants</a>
                <a href="${basePath}contact/" class="nav-page block py-1 text-gray-600">Contact Us</a>
            </div>
        </div>
        <div>
            <button class="mobile-menu-toggle w-full flex justify-between items-center py-2 font-medium">
                <span>Programs</span>
                <i class="fas fa-chevron-down text-xs transform transition-transform duration-300"></i>
            </button>
            <div class="mobile-submenu hidden pl-4 mt-2 space-y-2 border-l-2 border-gray-100 ml-2">
                <a href="${basePath}programs/#programs-ecd" class="nav-page block py-1 text-gray-600">ECD Program</a>
                <a href="${basePath}programs/#programs-iep" class="nav-page block py-1 text-gray-600">IEP Program</a>
                <a href="${basePath}programs/#programs-ep-ip" class="nav-page block py-1 text-gray-600">IP / EP / MEP</a>
                <div class="border-t border-gray-100 my-2 pt-2">
                    <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Activities</span>
                    <a href="${basePath}programs/#programs-camp" class="nav-page block py-1 text-gray-600">English Camps</a>
                    <a href="${basePath}programs/#programs-mk-awards" class="nav-page block py-1 text-gray-600">MediaKids Awards</a>
                    <a href="${basePath}programs/#programs-summer-camp" class="nav-page block py-1 text-gray-600">Summer Camp in Canada</a>
                </div>
            </div>
        </div>
        <div>
            <button class="mobile-menu-toggle w-full flex justify-between items-center py-2 font-medium">
                <span>Schools</span>
                <i class="fas fa-chevron-down text-xs transform transition-transform duration-300"></i>
            </button>
            <div class="mobile-submenu hidden pl-4 mt-2 space-y-2 border-l-2 border-gray-100 ml-2">
                <span class="block py-1 text-gray-500">Central Area</span>
                <span class="block py-1 text-gray-500">North Area</span>
                <span class="block py-1 text-gray-500">Esan Area</span>
                <span class="block py-1 text-gray-400 text-sm italic">Pages coming soon</span>
            </div>
        </div>



        <a href="${basePath}faq/" class="nav-page block py-2 font-medium">FAQ</a>
        <a href="${basePath}jobs/" class="block py-2 font-medium nav-page">Jobs</a>
        <a href="${basePath}curriculum/" class="block py-2 font-medium nav-page">Curriculum</a>
        <a href="${basePath}apply-now/" class="nav-page block mt-4 btn-primary text-center px-6 py-2 rounded-full">Apply Now</a>
    </div>
`;

const footerHTML = `
    <footer class="bg-[#0A192F] text-white py-16 border-t border-gray-800">
        <div class="container mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div class="space-y-4">
                    <a href="${basePath}index.html" class="nav-logo text-3xl font-bold text-blue-400 block mb-4">MediaKids<span class="text-white"> Academy</span></a>
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
                    <h4 class="text-lg font-bold mb-6 border-b border-blue-500 inline-block pb-2">Newsletter</h4>
                    <p class="text-gray-400 text-sm mb-4">Subscribe to get the latest teaching tips and news.</p>
                    <form class="flex flex-col space-y-3" onsubmit="event.preventDefault(); alert('Thanks for subscribing!');">
                        <input type="email" placeholder="Your email address" class="bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors">Subscribe</button>
                    </form>
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

    // 3. Dispatch Event (CRITICAL for script.js)
    console.log("Components loaded. Dispatching event...");
    document.dispatchEvent(new Event('componentsLoaded'));
}

// Run immediately
loadComponents();
