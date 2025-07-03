// assets/js/main.js
document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle Logic
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    if (darkModeToggle) {
        // Initialize icon based on current state
        if (localStorage.getItem('darkMode') === 'enabled') {
            body.classList.add('dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>';
        }

        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark');
            if (body.classList.contains('dark')) {
                localStorage.setItem('darkMode', 'enabled');
                darkModeToggle.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>'; // Change icon to sun
            } else {
                localStorage.setItem('darkMode', 'disabled');
                darkModeToggle.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>'; // Change icon to moon
            }
        });
    }

    // Mobile Menu Toggle Logic
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay'); // Get the overlay

    if (mobileMenuToggle && menu && overlay) { // Check for overlay
        mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            body.classList.toggle('is-menu-visible');
        });

        overlay.addEventListener('click', () => {
            body.classList.remove('is-menu-visible');
        });

        menu.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', () => {
                if (body.classList.contains('is-menu-visible')) {
                    body.classList.remove('is-menu-visible');
                }
            });
        });
    }
});
