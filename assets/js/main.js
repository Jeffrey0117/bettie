$(document).ready(function () {


    $(document).ready(function () {

        function handleDropdown() {
            const winWidth = $(window).width();

            // Reset classes on resize change
            $('.dropdown').removeClass('active_lg active_sm');

            if (winWidth >= 992) {
                // DESKTOP: Hover behavior
                $('.dropdown').off('mouseenter mouseleave click');

                $('.dropdown').on('mouseenter', function () {
                    $(this).addClass('active_lg');
                });

                $('.dropdown').on('mouseleave', function () {
                    $(this).removeClass('active_lg');
                });

            } else {
                // MOBILE + TABLET: Click behavior
                $('.dropdown').off('mouseenter mouseleave');

                $('.dropdown').off('click').on('click', function (e) {
                    e.stopPropagation(); // Prevent body click closing immediately

                    // Close others
                    $('.dropdown').not(this).removeClass('active_sm');

                    // Toggle current
                    $(this).toggleClass('active_sm');
                });

                // Click outside closes dropdown
                $('body').off('click.dropdown').on('click.dropdown', function () {
                    $('.dropdown').removeClass('active_sm');
                });
            }
        }

        // Run on load
        handleDropdown();

        // Run on resize (with slight delay)
        let resizeTimer;
        $(window).on('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleDropdown, 150);
        });

    });

    // checkbox
    $('.checkbox').on('click', function (e) {
        $(this).toggleClass('active');
    });

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 200) {
            $('body').addClass('screen_up');
        } else {
            $('body').removeClass('screen_up');
        }
    });

    // got_to_top
    $('.got_to_top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    function checkScroll() {
        if ($(window).scrollTop() > 200) {
            $('.got_to_top').addClass('scrolled_up');
        } else {
            $('.got_to_top').removeClass('scrolled_up');
        }
    }

    // Run on scroll
    $(window).on('scroll', checkScroll);

    // Run on refresh / page load
    $(document).ready(checkScroll);


    // hamburgar_btn
    $('.hamburgar_btn').on('click', function () {
        $('body').toggleClass('menu_active');
        $(this).toggleClass('active');
    });



    // flatpickr js
    const isMobile = window.innerWidth <= 768;

    flatpickr("#selectDate", {
        dateFormat: "Y-m-d",
        monthSelectorType: isMobile ? "dropdown" : "static",
        yearSelectorType: isMobile ? "dropdown" : "static",
        disableMobile: false,
        static: !isMobile,
    });

    flatpickr("#selectDate2", {
        dateFormat: "Y-m-d",
        monthSelectorType: isMobile ? "dropdown" : "static",
        yearSelectorType: isMobile ? "dropdown" : "static",
        disableMobile: false,
        static: !isMobile,
    });


    // Hero slider
    swiper = new Swiper(".hero_slider", {
        slidesPerView: 1,
        loop: true,
        speed: 700,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper_button_next",
            prevEl: ".swiper_button_prev"
        }
    });

    // wedding_slider
    swiper = new Swiper(".wedding_slider", {
        slidesPerView: 1,
        loop: true,
        speed: 700,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });

    // bridal_slider
    swiper = new Swiper(".bridal_slider", {
        slidesPerView: 'auto',
        loop: true,
        speed: 700,
        rtl: true,

        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },

        navigation: {
            nextEl: ".wedding_dress .swiper_button_next",
            prevEl: ".wedding_dress .swiper_button_prev"
        },

        // 🔥 Mobile-first
        centeredSlides: true,

        breakpoints: {
            768: {
                centeredSlides: false
            }
        }
    });



    $(document).ready(function () {

        // Toggle dropdown
        $('.nav_tabs > button').on('click', function (e) {
            e.stopPropagation();
            $(this).siblings('.nav_tab_list').toggleClass('active');
            $(this).toggleClass('active');
        });

        // Click on dropdown item
        $('.nav_tab_list .nav_tab').on('click', function () {
            const tabId = $(this).attr('id');
            const tabText = $(this).text();

            // Update active nav
            $(this).addClass('active').siblings().removeClass('active');

            // Update selected text
            $('.selected_nav_text').text(tabText);

            // Switch tab content
            $('.tab_pane').hide();
            $('.tab_pane[data-tab-pane="' + tabId + '"]').show();

            // Close dropdown
            $(this).closest('.nav_tab_list').removeClass('active');
        });

        // Close dropdown when clicking outside
        $(document).on('click', function () {
            $('.nav_tab_list').removeClass('active');
            $('.nav_tabs > button').removeClass('active');
        });

    });

    // niceSelect
    $('.nice-select').niceSelect();

});

