// Simple console test script
console.log('=== DROPDOWN NAVIGATION TEST ===');

// Check if nav-page elements exist
const navLinks = document.querySelectorAll('.nav-page');
console.log(`Found ${navLinks.length} .nav-page links`);

// Check if setView function exists
console.log('setView function exists:', typeof window.setView === 'function');

// Test each link
navLinks.forEach((link, index) => {
    const pageName = link.dataset.page;
    const section = document.getElementById(pageName);
    const status = section ? '✅' : '❌';
    console.log(`${status} Link #${index + 1}: "${link.textContent.trim()}" → ${pageName}`);
});

// Check if event listeners are attached
console.log('\n=== Testing Event Listeners ===');
if (navLinks.length > 0) {
    console.log('Try clicking the first link manually to test...');
    console.log('Or run: document.querySelector(".nav-page").click()');
}
