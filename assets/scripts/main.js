/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

    // Use this variable to set up the common and page specific functions. If you
    // rename this variable, you will also need to rename the namespace below.
    var Sage = {
        // All pages
        'common': {
            init: function() {
                $(document).on('ready', function() {

                    var $window = $(window),
                        $body = $('body'),
                        $document = $(document);

                    /**
                     * =======================================
                     * Function: Detect Mobile Device
                     * =======================================
                     */
                    // source: http://www.abeautifulsite.net/detecting-mobile-devices-with-javascript/
                    var isMobile = {
                        Android: function() {
                            return navigator.userAgent.match(/Android/i);
                        },
                        BlackBerry: function() {
                            return navigator.userAgent.match(/BlackBerry/i);
                        },
                        iOS: function() {
                            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                        },
                        Opera: function() {
                            return navigator.userAgent.match(/Opera Mini/i);
                        },
                        Windows: function() {
                            return navigator.userAgent.match(/IEMobile/i);
                        },
                        any: function() {
                            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                        },
                    };

                    /**
                     * =======================================
                     * Function: Resize Background
                     * =======================================
                     */
                    var resizeBackground = function() {

                        $('.section-background-video > video, .section-background-image > img, .two-cols-description-image > img').each(function(i, el) {

                            var $el = $(el),
                                $section = $el.parent(),
                                min_w = 300,
                                el_w = el.tagName === 'VIDEO' ? el.videoWidth : el.naturalWidth,
                                el_h = el.tagName === 'VIDEO' ? el.videoHeight : el.naturalHeight,
                                section_w = $section.outerWidth(),
                                section_h = $section.outerHeight(),
                                scale_w = section_w / el_w,
                                scale_h = section_h / el_h,
                                scale = scale_w > scale_h ? scale_w : scale_h,
                                new_el_w, new_el_h, offet_top, offet_left;

                            if (scale * el_w < min_w) {
                                scale = min_w / el_w;
                            }

                            new_el_w = scale * el_w;
                            new_el_h = scale * el_h;
                            offet_left = (new_el_w - section_w) / 2 * -1;
                            offet_top = (new_el_h - section_h) / 2 * -1;

                            $el.css('width', new_el_w);
                            $el.css('height', new_el_h);
                            $el.css('marginTop', offet_top);
                            $el.css('marginLeft', offet_left);
                        });

                    };
                    $body.on('pageStart', function() {
                        resizeBackground();
                    });

                    /**
                     * =======================================
                     * IE9 Placeholder
                     * =======================================
                     */
                    $('form').on('submit', function() {
                        $(this).find('[placeholder]').each(function() {
                            var $input = $(this);
                            if ($input.val() === $input.attr('placeholder')) {
                                $input.val('');
                            }
                        });
                    });

                    $('[placeholder]').on('focus', function() {
                        var $input = $(this);
                        if ($input.val() === $input.attr('placeholder')) {
                            $input.val('');
                            $input.removeClass('placeholder');
                        }
                    }).on('blur', function() {
                        var $input = $(this);
                        if ($input.val() === '' || $input.val() === $input.attr('placeholder')) {
                            $input.addClass('placeholder');
                            $input.val($input.attr('placeholder'));
                        }
                    }).blur();

                    /**
                     * =======================================
                     * Detect Mobile Device
                     * =======================================
                     */
                    if (isMobile.any()) {
                        // add identifier class to <body>
                        $body.addClass('mobile-device');
                        // remove all element with class "remove-on-mobile-device"
                        $('.remove-on-mobile-device').remove();
                    }

                    /* =======================================
                     * Resize Video Background
                     * =======================================
                     */
                    $window.on('resize', function() {
                        resizeBackground();
                    });

                    /* =======================================
                     * Owl Carousel Sliders
                     * =======================================
                     */
                    var $hero_slider = $('.section-slider'),
                        $testimonial_slider = $('.testimonial-slider');

                    if ($hero_slider.length > 0) {
                        $('.section-slider').owlCarousel({
                            loop: true,
                            margin: 0,
                            autoplayHoverPause: true,
                            autoplay: true,
                            nav: true,
                            navText: [
                                "<i class='fa fa-angle-left' aria-hidden='true'></i>",
                                "<i class='fa fa-angle-right' aria-hidden='true'></i>"
                            ],
                            responsive: {
                                0: {
                                    items: 1
                                }
                            }
                        });
                    }

                    if ($testimonial_slider.length > 0) {
                        $('.testimonial-slider').owlCarousel({
                            loop: true,
                            margin: 0,
                            autoplayHoverPause: true,
                            autoplay: true,
                            nav: false,
                            navText: [
                                "<i class='fa fa-angle-left' aria-hidden='true'></i>",
                                "<i class='fa fa-angle-right' aria-hidden='true'></i>"
                            ],
                            responsive: {
                                0: {
                                    items: 1
                                }
                            }
                        });
                    }
                    /* =======================================
                     * Video Embed Async Load
                     * =======================================
                     */
                    $body.on('pageStart', function() {
                        $('.video-async').each(function(i, el) {
                            var $el = $(el),
                                source = $el.data('source'),
                                video = $el.data('video'),
                                color = $el.data('color');

                            if (source === 'vimeo') {
                                $el.attr('src', '//player.vimeo.com/video/' + video + (color ? '?color=' + color : ''));
                            } else if (source === 'youtube') {
                                $el.attr('src', '//www.youtube.com/embed/' + video + '?rel=0');
                            }

                        });
                    });

                    /**
                     * =======================================
                     * Initiate Stellar JS
                     * =======================================
                     */
                    if ($.fn.stellar && !isMobile.any()) {
                        $.stellar({
                            responsive: true,
                            horizontalScrolling: false,
                            hideDistantElements: false,
                            verticalOffset: 0,
                            horizontalOffset: 0,
                        });
                    }

                    /**
                     * =======================================
                     * Numbers (Counter Up)
                     * =======================================
                     */
                    if ($.fn.counterUp) {
                        $('.counter-up').counterUp({
                            time: 1000,
                        });
                    }

                    /**
                     * =======================================
                     * Scroll Spy
                     * =======================================
                     */
                    var toggleHeaderFloating = function() {
                        // Floating Header
                        if ($window.scrollTop() > 80) {
                            $('.header-section').addClass('floating');
                        } else {
                            $('.header-section').removeClass('floating');
                        }
                    };

                    $window.on('scroll', toggleHeaderFloating);

                    /**
                     * =======================================
                     * One Page Navigation
                     * =======================================
                     */
                    if ($.fn.onePageNav) {
                        $('#header-nav').onePageNav({
                            scrollSpeed: 1000,
                            filter: ':not(.external)',
                            begin: function() {
                                $('#navigation').collapse('toggle');
                            },
                        });
                    }

                    /**
                     * =======================================
                     * Animations
                     * =======================================
                     */
                    if ($body.hasClass('enable-animations') && !isMobile.any()) {
                        var $elements = $('*[data-animation]');

                        $elements.each(function(i, el) {

                            var $el = $(el),
                                animationClass = $el.data('animation');

                            $el.addClass(animationClass);
                            $el.addClass('animated');
                            $el.addClass('wait-animation');

                            $el.one('inview', function() {
                                $el.removeClass('wait-animation');
                                $el.addClass('done-animation');
                            });
                        });
                    }

                    /**
                     * =======================================
                     * Google Maps
                     * =======================================
                     */
                    if (typeof Maplace === 'function' && $('#gmap')) {
                        new Maplace(gmap_options).Load();
                    }

                    /**
                     * =======================================
                     * Countdown
                     * =======================================
                     */
                    if ($.fn.countdown) {
                        $('.countdown').each(function(i, el) {
                            var $el = $(el),
                                date = $el.data('countdown'),
                                format = $el.html();

                            $el.countdown(date, function(e) {
                                $(el).html(e.strftime(format));
                            });
                            $el.show();
                        });
                    }



                    /* =======================================
                     * Preloader
                     * =======================================
                     */
                    if ($.fn.jpreLoader && $body.hasClass('enable-preloader')) {

                        $body.on('pageStart', function() {
                            $body.addClass('done-preloader');
                        });

                        $body.jpreLoader({
                            showSplash: false,
                            // autoClose : false,
                        }, function() {
                            $body.trigger('pageStart');
                        });

                    } else {
                        $body.trigger('pageStart');
                    }

                    $window.trigger('resize');
                    $window.trigger('scroll');

                });
            },
            finalize: function() {
                // JavaScript to be fired on all pages, after page specific JS is fired
            }
        },
        // Home page
        'home': {
            init: function() {
                // JavaScript to be fired on the home page
            },
            finalize: function() {
                // JavaScript to be fired on the home page, after the init JS
            }
        },
        // About us page, note the change from about-us to about_us.
        'about_us': {
            init: function() {
                // JavaScript to be fired on the about us page
            }
        }
    };

    // The routing fires all common scripts, followed by the page specific scripts.
    // Add additional events for more control over timing e.g. a finalize event
    var UTIL = {
        fire: function(func, funcname, args) {
            var fire;
            var namespace = Sage;
            funcname = (funcname === undefined) ? 'init' : funcname;
            fire = func !== '';
            fire = fire && namespace[func];
            fire = fire && typeof namespace[func][funcname] === 'function';

            if (fire) {
                namespace[func][funcname](args);
            }
        },
        loadEvents: function() {
            // Fire common init JS
            UTIL.fire('common');

            // Fire page-specific init JS, and then finalize JS
            $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
                UTIL.fire(classnm);
                UTIL.fire(classnm, 'finalize');
            });

            // Fire common finalize JS
            UTIL.fire('common', 'finalize');
        }
    };

    // Load Events
    $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
