/*
    This script is adapted from HTML5 UP's Phantom template's main.js.
    It integrates your dark mode toggle and scroll spy into Phantom's
    existing menu and wrapper behavior.
*/
(function($) {

    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper'),
        $header = $('#header'),
        $menu = $('#menu'),
        $main = $('#main'),
        $mobileMenuToggle = $('#mobile-menu-toggle'),
        $darkModeToggle = $('#dark-mode-toggle'),
        $overlay; // Declare overlay variable

    // Breakpoints.
    breakpoints({
        xlarge:   [ '1281px',   '1680px' ],
        large:    [ '981px',    '1280px' ],
        medium:   [ '737px',    '980px'  ],
        small:    [ '481px',    '736px'  ],
        xsmall:   [ null,       '480px'  ]
    });

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);

        // Initial scroll spy activation on load
        activateNavLink();
    });

    // Dark Mode Toggle
    $darkModeToggle.on('click', function() {
        $body.toggleClass('dark');
        var $icon = $(this).find('i');
        if ($body.hasClass('dark')) {
            $icon.removeClass('fa-moon').addClass('fa-sun');
        } else {
            $icon.removeClass('fa-sun').addClass('fa-moon');
        }
    });

    // Menu.
    $menu._toggle = $mobileMenuToggle; // Alias for internal use

    $menu._toggle.on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        $body.toggleClass('is-menu-visible');
    });

    $menu.on('click', 'a', function(event) {
        // Close menu on link click (only for hash links)
        if ($(this).attr('href').charAt(0) == '#') {
            event.preventDefault();
            event.stopPropagation();

            $body.removeClass('is-menu-visible');

            // Delay scroll to allow menu to close
            var href = $(this).attr('href');
            setTimeout(function() {
                var target = $(href);
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - ($header.outerHeight() + 20) // Adjust for sticky header
                    }, 'slow');
                }
            }, 300); // Match CSS transition duration for wrapper
        }
    });

    // Close menu on click outside.
    $wrapper.on('click touchend', function(event) {
        // If menu is visible and click is not on menu or toggle button
        if ($body.hasClass('is-menu-visible')) {
            if (!$(event.target).is($menu) && !$(event.target).is($menu.find('*')) &&
                !$(event.target).is($menu._toggle) && !$(event.target).is($menu._toggle.find('*'))) {
                $body.removeClass('is-menu-visible');
            }
        }
    });

    // Add an overlay to close menu on click/tap outside, mimicking Phantom's behavior.
    // This creates an element dynamically.
    if (!$('#overlay').length) {
        $overlay = $('<div id="overlay"></div>').appendTo($body);
    } else {
        $overlay = $('#overlay');
    }

    $overlay.on('click touchend', function() {
        if ($body.hasClass('is-menu-visible')) {
            $body.removeClass('is-menu-visible');
        }
    });


    // Scroll Spy: Highlight active section in the menu
    const sections = document.querySelectorAll('div#main section');
    const menuLinks = document.querySelectorAll('#menu ul li a');

    const activateNavLink = () => {
        let currentSectionId = '';
        const scrollY = window.pageYOffset;
        const headerHeight = $header.outerHeight(); // Get height of sticky header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            // Use headerHeight as offset for scroll spy
            if (scrollY >= sectionTop - headerHeight - 50 && scrollY < sectionTop + sectionHeight - headerHeight - 50) {
                currentSectionId = section.getAttribute('id');
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove('active');
            // Check if href exists and starts with # before comparing
            if (link.getAttribute('href') && link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    };

    $window.on('scroll', activateNavLink); // Use jQuery's on for consistency
    $window.on('load', activateNavLink);


})(jQuery);
