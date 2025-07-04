document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll) library
    AOS.init({
        duration: 800, // Animation duration
        easing: 'ease-out-quad', // Easing function
        once: true, // Whether animation should happen only once - while scrolling down
        mirror: false, // Whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // Defines which position of the element should trigger the animation
    });

    const sidebarNav = document.querySelector('.sidebar-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section-padding');
    const sidebar = document.querySelector('.sidebar');
    const backToTopBtn = document.getElementById('backToTopBtn');

    /**
     * Scrolls to the target section and updates the active navigation link.
     * @param {string} targetId - The ID of the section to scroll to (e.g., '#home').
     * @param {boolean} updateHash - Whether to update the browser's URL hash.
     */
    function scrollToSection(targetId, updateHash = true) {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Calculate offset considering the fixed sidebar on mobile
            const offset = window.innerWidth <= 767.98 ? (sidebar ? sidebar.offsetHeight : 0) : 0;
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });

            // Update active class for navigation links
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="${targetId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }

            // Update URL hash
            if (updateHash) {
                history.pushState(null, '', targetId);
            }
        }
    }

    // Event delegation for smooth scrolling on navigation link clicks
    sidebarNav.addEventListener('click', function(e) {
        const targetLink = e.target.closest('.nav-link');
        if (targetLink) {
            e.preventDefault(); // Prevent default jump behavior
            const targetId = targetLink.getAttribute('href');
            scrollToSection(targetId);
        }
    });

    // Intersection Observer for scroll-based active link updates
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px 0px -50% 0px', // When section is 50% from the bottom of the viewport
        threshold: 0 // As soon as any part of the section enters/exits
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                // Update active class
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
                // Update URL hash without smooth scrolling when observing
                if (window.location.hash !== `#${id}`) {
                    history.replaceState(null, '', `#${id}`);
                }
            }
        });
    }, observerOptions);

    // Observe each section
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Handle browser back/forward buttons (popstate event)
    window.addEventListener('popstate', function() {
        const hash = window.location.hash || '#home';
        scrollToSection(hash, false); // Don't update hash again to avoid history duplication
    });

    // Initial load: Set active link and scroll to section based on URL hash
    const initialHash = window.location.hash || '#home';
    const initialNavLink = document.querySelector(`.nav-link[href="${initialHash}"]`);
    if (initialNavLink) {
        initialNavLink.classList.add('active');
        scrollToSection(initialHash, false); // Don't update hash again
    } else {
        // Fallback to make 'Home' active if no hash or invalid hash
        navLinks[0].classList.add('active');
    }

    // Back to Top Button Logic
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
