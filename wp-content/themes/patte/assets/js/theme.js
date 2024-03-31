;
(function($) {
    "use strict";
    var pxl_scroll_top;
    var pxl_window_height;
    var pxl_window_width;
    var pxl_scroll_status = '';
    var pxl_last_scroll_top = 0;
    $(window).on('load', function() {
        pxl_window_width = $(window).width();
        pxl_window_height = $(window).height();
        $(".pxl-loader").addClass("is-loaded");
        patte_header_sticky();
        patte_scroll_to_top();
        patte_quantity_icon();
        patte_footer_fixed();
        patte_panel_anchor_toggle();
        patte_document_click();
        patte_product_single_variations_att();
        patte_smooth_scroll();
        patte_backtotop_indicator();
        patte_sidebar_position();
        cd_product();
    });

    $(window).on('resize', function() {
        pxl_window_width = $(window).width();
        pxl_window_height = $(window).height();
    });

    $(window).on('scroll', function() {
        pxl_scroll_top = $(window).scrollTop();
        pxl_window_height = $(window).height();
        pxl_window_width = $(window).width();
        if (pxl_scroll_top < pxl_last_scroll_top) {
            pxl_scroll_status = 'up';
        } else {
            pxl_scroll_status = 'down';
        }
        pxl_last_scroll_top = pxl_scroll_top;
        patte_header_sticky();
        patte_scroll_to_top();
        patte_footer_fixed();

        $('.page-section').each(function(i) {
            if ($(this).position().top <= pxl_scroll_top) {
                $('.pxl-header-elementor-main .pxl-menu-primary > li > a.page-active').removeClass('page-active');
                $('.pxl-header-elementor-sticky .pxl-nav-menu .pxl-menu-primary > li > a.page-active').removeClass('page-active');
            }
        });
    });

    $(document).ready(function() {
        var $patte_menu = $('.pxl-header-elementor-main');
        $patte_menu.find('.pxl-menu-primary li').each(function() {
            var $patte_submenu = $(this).find('> ul.sub-menu');
            if ($patte_submenu.length == 1) {
                $(this).hover(function() {
                    if ($patte_submenu.offset().left + $patte_submenu.width() > $(window).width()) {
                        $patte_submenu.addClass('pxl-sub-reverse');
                    } else if ($patte_submenu.offset().left < 0) {
                        $patte_submenu.addClass('pxl-sub-reverse');
                    }
                }, function() {
                    $patte_submenu.removeClass('pxl-sub-reverse');
                });
            }
        });
        // Sidebar page search not found
        $('.search-no-results').find('#pxl-content-area').removeClass('col-xl-9').addClass('pxl-content-area pxl-content-blog col-12 col-xl-8 col-lg-8');
        $('.search-no-results').find('#pxl-sidebar-area').removeClass('col-xl-3').addClass('pxl-sidebar-area pxl-sidebar-blog col-12 col-xl-4 col-lg-4');
        /* Start Menu Mobile */
        $('.pxl-header-menu li.menu-item-has-children, .pxl-nav-hidden li.menu-item-has-children, .pxl-menu-primary li.menu-item-has-children').append('<span class="pxl-menu-toggle"></span>');
        $('.pxl-menu-toggle').on('click', function() {
            if ($(this).hasClass('active')) {
                $(this).closest('ul').find('.pxl-menu-toggle.active').toggleClass('active');
                $(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
            } else {
                $(this).closest('ul').find('.pxl-menu-toggle.active').toggleClass('active');
                $(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
                $(this).toggleClass('active');
                $(this).parent().find('> .sub-menu').toggleClass('active');
                $(this).parent().find('> .sub-menu').slideToggle();
            }
        });
        $("#pxl-nav-mobile").on('click', function() {
            $(this).toggleClass('active');
            $('.pxl-header-menu').toggleClass('active');
        });

        $(".pxl-menu-close, .pxl-header-menu-backdrop").on('click', function() {
            $(this).parents('.pxl-header-main').find('.pxl-header-menu').removeClass('active');
            $('#pxl-nav-mobile').removeClass('active');
        });
        /* End Menu Mobile */

        /* Elementor Header */
        $('.pxl-type-header-clip > .elementor-container').append('<div class="pxl-header-shape"><span></span></div>');

        if ($('div').hasClass('px-header--transparent')) {
            $('#pxl-wapper').css({
                "position": "relative",
            });
        }

        /* Scroll To Top */
        $('.pxl-scroll-top').click(function() {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        /* Animate Time Delay */
        $('.pxl-grid-masonry').each(function() {
            var eltime = 100;
            var elt_inner = $(this).children().length;
            var _elt = elt_inner - 1;
            $(this).find('> .pxl-grid-item > .wow').each(function(index, obj) {
                $(this).css('animation-delay', eltime + 'ms');
                if (_elt === index) {
                    eltime = 100;
                    _elt = _elt + elt_inner;
                } else {
                    eltime = eltime + 60;
                }
            });
        });

        $('.pxl-item--text').each(function() {
            var pxl_time = 0;
            var pxl_item_inner = $(this).children().length;
            var _elt = pxl_item_inner - 1;
            $(this).find('> .pxl-text--slide > .wow').each(function(index, obj) {
                $(this).css('transition-delay', pxl_time + 'ms');
                if (_elt === index) {
                    pxl_time = 0;
                    _elt = _elt + pxl_item_inner;
                } else {
                    pxl_time = pxl_time + 80;
                }
            });
        });
        /* Remove <p></p> contact form 7 */
        $('.wp-row-ctf7 p').each(function() {
            $(this).contents().unwrap();
        });

        /* Nice Select */
        $('.pxl-nice-select, .woocommerce .woocommerce-ordering .orderby, #wp-block-archives-1, #wp-block-categories-1').each(function() {
            $(this).niceSelect();
        });
        $('.woocommerce div.product form.cart .variations select').each(function() {
            $(this).niceSelect();
        });

        /* Comment Form */
        $(".comment-respond .form-submit input.submit").remove();
        $('.comment-respond .form-submit').append('<button name="submit" type="submit" id="submit" class="submit" value="Post Comment">Post Comment</button>');

        /* Remove )*/
        $('.cat-item .pxl-count').each(function() {
            var text = $(this).text();
            text = text.replace(')', '');
            $(this).text(text);
        });

        /* Related Post - Slick Slider */
        const postSlider = $(".pxl-related-post .pxl-related-post-inner");
        postSlider
            .slick({
                dots: false,
                infinite: true,
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed: 2000,
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        dots: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }]
            });
        postSlider.on('wheel', (function(e) {
            e.preventDefault();
            if (e.originalEvent.deltaY < 0) {
                $(this).slick('slickNext');
            } else {
                $(this).slick('slickPrev');
            }
        }));
        /*Add round */
        $(".pxl-round").each(function() {
            $(this).append('<span class="pxl-item-round"></span>');
        });
        /* Custom Post */
        var dhi = 0;
        $(".pxl-item-single-post .pxl-post--navigation .nav--title").each(function() {
            var default_height = $(this).height();
            if (default_height > dhi) {
                dhi = default_height;
            }
        });
        $('.pxl-item-single-post .pxl-post--navigation .nav--line').css("height", dhi);
        $(window).resize(function() {
            var hi = 0;
            $(".pxl-item-single-post .pxl-post--navigation .nav--title").each(function() {
                var h = $(this).height();
                if (h > hi) {
                    hi = h;
                }
            });
            $('.pxl-item-single-post .pxl-post--navigation .nav--line').css("height", hi);
        });
        /* Custom Widget */
        $(".widget_calendar").each(function() {
            var $np = $(this).find(".wp-calendar-nav-prev a");
            var text_prev = $np.text().replace("«", "");
            $np.text(text_prev);

            var $nn = $(this).find(".wp-calendar-nav-next a");
            var text_next = $nn.text().replace("»", "");
            $nn.text(text_next);
        });

        /* Custom Service Page */
        $('.service .pxl-post--navigation').parents('#pxl-main').css('padding-bottom', 80 + 'px');

        /* Custom Shop Page */
        $('.woocommerce .woocommerce-summary-wrap.row.style1').parents('.product').addClass('pxl-product-page-style1');
        $('.woocommerce .woocommerce-summary-wrap.row.style2').parents('.product').addClass('pxl-product-page-style2');

        $(".woocommerce .pxl-wapper #pxl-main .pxl-content-product .woosc-quick-table").remove();
        $(".woocommerce ul.products li.product > .woosc-btn, .woocommerce ul.products li.product > .woosq-btn, .woocommerce ul.products li.product > .woosw-btn").remove();

        $('.add_to_cart_button').attr('title', 'Add To Cart');
        $('.product_type_grouped').attr('title', 'View Product');
        $('.product_type_external').attr('title', 'Shop Now');
        $('.woosw-btn').attr('title', 'Add To Wishlist');
        $('.woosq-btn').attr('title', 'Quick View');
        $('.woosc-btn').attr('title', 'Compare');
        $('.woocommerce .quantity, .woocommerce-page .quantity').attr('data-cursor', '-hidden');

        // Custom Add space in the end price currency
        var woocurrencySymbol = document.querySelectorAll('.woocommerce-Price-currencySymbol');
        woocurrencySymbol.forEach(function(el) {
            var string = el.innerText;
            el.innerText = '';
            var result = string.trim() + " ";
            el.innerHTML += result;
        });

        // Custom width nice select shop archive
        var woo_nice_select = document.querySelectorAll('.woocommerce .nice-select');
        woo_nice_select.forEach(function() {
            var default_width = $('.woocommerce .woocommerce-product-inner').width();
            $('.woocommerce .nice-select').css("min-width", default_width);
            $(window).resize(function() {
                var default_width = $('.woocommerce .woocommerce-product-inner').width();
                $('.woocommerce .nice-select').css("min-width", default_width);
            });
        });

        // Custom scroll flex control shop single
        $('.woocommerce .woocommerce-summary-wrap.row .flex-control-nav').each(function() {
            var count_nav_item = $(this).find('li').length;
            if (count_nav_item >= 5) {
                $(this).addClass('pxl-custom-scroll');
                var flex_width = $(this).parent().width();
                $(this).css("max-width", flex_width);
            }
        });

        var woo_tabs = $('.woocommerce .product.pxl-product-page-style2 .woocommerce-tabs.wc-tabs-wrapper').clone();
        $('.woocommerce .product.pxl-product-page-style2 .woocommerce-tabs.wc-tabs-wrapper').remove();
        $('.woocommerce .product.pxl-product-page-style2 .woocommerce-summary-wrap .woocommerce-gallery + div').append(woo_tabs);

        var woo_wooc_product_meta = $('.single-product #primary div.product .entry-summary .wooc-product-meta').clone();
        $('.single-product #primary div.product .entry-summary .wooc-product-meta').remove();
        if ($('.single-product #primary div.product form').hasClass('variations_form')) {
            $('.single-product #primary div.product form.cart').find(".woocommerce-variation-add-to-cart").append(woo_wooc_product_meta);
        } else {
            $('.single-product #primary div.product form.cart').append(woo_wooc_product_meta);
        }

        var woo_tabs_des = $('.woocommerce .product.pxl-product-page-style2 .woocommerce-tabs.wc-tabs-wrapper .woocommerce-Tabs-panel--description').clone();
        $('.woocommerce .product.pxl-product-page-style2 .woocommerce-tabs.wc-tabs-wrapper .woocommerce-Tabs-panel--description').remove();
        $('.woocommerce .product.pxl-product-page-style2 .woocommerce-tabs.wc-tabs-wrapper .wc-tabs .description_tab').append(woo_tabs_des);
        var woo_tabs_infor = $('.woocommerce .product.pxl-product-page-style2 .woocommerce-tabs.wc-tabs-wrapper .woocommerce-Tabs-panel--additional_information').clone();
        $('.woocommerce .product.pxl-product-page-style2 .woocommerce-tabs.wc-tabs-wrapper .woocommerce-Tabs-panel--additional_information').remove();
        $('.woocommerce .product.pxl-product-page-style2 .woocommerce-tabs.wc-tabs-wrapper .wc-tabs .additional_information_tab').append(woo_tabs_infor);
        var woo_tabs_feature = $('.woocommerce .product.pxl-product-page-style2 .woocommerce-tabs.wc-tabs-wrapper .woocommerce-Tabs-panel--tab-product-feature').clone();
        $('.woocommerce .product.pxl-product-page-style2 .woocommerce-tabs.wc-tabs-wrapper .woocommerce-Tabs-panel--tab-product-feature').remove();
        $('.woocommerce .product.pxl-product-page-style2 .woocommerce-tabs.wc-tabs-wrapper .wc-tabs .tab-product-feature_tab').append(woo_tabs_feature);
        var woo_tabs_review = $('.woocommerce .product.pxl-product-page-style2 .woocommerce-tabs.wc-tabs-wrapper .woocommerce-Tabs-panel--reviews').clone();
        $('.woocommerce .product.pxl-product-page-style2 .woocommerce-tabs.wc-tabs-wrapper .woocommerce-Tabs-panel--reviews').remove();
        $('.woocommerce .product.pxl-product-page-style2 .woocommerce-tabs.wc-tabs-wrapper .wc-tabs .reviews_tab').append(woo_tabs_review);

        /* Search Popup */
        $(".pxl-search-popup-button").on('click', function() {
            $('body').addClass('pxl-ov-hidden');
            $('#pxl-search-popup').addClass('active');
            $('#pxl-search-popup .search-field').focus();
        });
        $("#pxl-search-popup .pxl-item--overlay, #pxl-search-popup .pxl-item--close").on('click', function() {
            $('body').removeClass('pxl-ov-hidden');
            $('#pxl-search-popup').removeClass('active');
        });

        /* Lightbox Popup */
        $('.btn-video, .pxl-video-popup').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        $('a.light-box').on('click', function() {
            var $data_id_light_box = parseInt($(this).attr('data-id'));
            var prevDataId = $data_id_light_box - 1;
            var nextDataId = $data_id_light_box + 1;

            var next_prev_gallery = '<div class="pxl-next-prev-gallery elementor-lightbox-prevent-close"><button class="pxl-gallery-prev" data-url="" data-id="' + prevDataId + '"><i class="caseicon-angle-arrow-left"></i></button><button class="pxl-gallery-next" data-url="" data-id="' + nextDataId + '"><i class="caseicon-angle-arrow-right"></i></button></div>';
            var $currentElement = $(this);

            setTimeout(function() {
                $('.zoomIn .swiper').append(next_prev_gallery);

                var imgprev_url = $currentElement.parents('.pxl-grid-item').prev().find('a.light-box').attr('href');
                $('.pxl-gallery-prev').attr('data-url', imgprev_url);

                var imgnext_url = $currentElement.parents('.pxl-grid-item').next().find('a.light-box').attr('href');
                $('.pxl-gallery-next').attr('data-url', imgnext_url);
                if ($('.pxl-gallery-next').attr('data-url') > 6) {
                    $('.pxl-gallery-next').prop('disabled', true);
                    $('.pxl-gallery-next').css('cursor', 'not-allowed');
                }
                if ($('.pxl-gallery-prev').attr('data-url') < 1) {
                    $('.pxl-gallery-prev').prop('disabled', true);
                    $('.pxl-gallery-prev').css('cursor', 'not-allowed');
                }
            }, 1000);
        });

        var maxDataId = 0;

        $('.pxl-gallery-grid .pxl-grid-item a.light-box').each(function() {
            var dataId = parseInt($(this).attr('data-id'));
            if (dataId > maxDataId) {
                maxDataId = dataId;
            }
        });

        $(document).on('click', '.pxl-gallery-prev', function() {
            var dataId = parseInt($(this).attr('data-id'));
            $(this).attr('data-id', dataId - 1);
            $('.pxl-gallery-next').attr('data-id', dataId + 1);
            if (dataId <= 1) {
                $(this).prop('disabled', true);
                $(this).css('cursor', 'not-allowed');
            } else {
                $(this).prop('disabled', false);
                $(this).css('cursor', 'pointer');
            }
            if (dataId < parseInt(maxDataId - 1)) {
                $('.pxl-gallery-next').prop('disabled', false);
                $('.pxl-gallery-next').css('cursor', 'pointer');
            } else {
                $('.pxl-gallery-next').prop('disabled', true);
                $('.pxl-gallery-next').css('cursor', 'not-allowed');
            }
            var imgprev = $(this).attr('data-url');
            $('.zoomIn .elementor-lightbox-image').attr('src', imgprev);




            var targetLink = $('a.light-box[data-id="' + dataId + '"]').attr('href');
            $(this).attr('data-url', targetLink);
            var dataIdNext = dataId + 1;
            var targetLinkNext = $('a.light-box[data-id="' + dataIdNext + '"]').attr('href');
            $('.pxl-gallery-next').attr('data-url', targetLinkNext);

            var dataIdPrev = dataId - 1;
            var targetLinkPrev = $('a.light-box[data-id="' + dataIdPrev + '"]').attr('href');
            $('.pxl-gallery-prev').attr('data-url', targetLinkPrev);


        });

        $(document).on('click', '.pxl-gallery-next', function() {
            var dataId = parseInt($(this).attr('data-id'));
            $(this).attr('data-id', dataId + 1);
            $('.pxl-gallery-prev').attr('data-id', dataId - 1);

            if (dataId >= maxDataId) {
                $(this).prop('disabled', true);
                $(this).css('cursor', 'not-allowed');
            } else {
                $(this).prop('disabled', false);
                $(this).css('cursor', 'pointer');
            }
            if (dataId > 1 && dataId <= parseInt(maxDataId + 1)) {
                $('.pxl-gallery-prev').prop('disabled', false);
                $('.pxl-gallery-prev').css('cursor', 'pointer');
            } else {
                $('.pxl-gallery-prev').prop('disabled', true);
                $('.pxl-gallery-prev').css('cursor', 'not-allowed');
            }
            var imgnext = $(this).attr('data-url');
            $('.zoomIn .elementor-lightbox-image').attr('src', imgnext);



            var targetLink = $('a.light-box[data-id="' + dataId + '"]').attr('href');
            $(this).attr('data-url', targetLink);
            var dataIdPrev = dataId - 1;
            var targetLinkPrev = $('a.light-box[data-id="' + dataIdPrev + '"]').attr('href');
            $('.pxl-gallery-prev').attr('data-url', targetLinkPrev);

            var dataIdNext = dataId + 1;
            var targetLinkNext = $('a.light-box[data-id="' + dataIdNext + '"]').attr('href');
            $('.pxl-gallery-next').attr('data-url', targetLinkNext);
        });
        /* Showcase */
        $('.btn-hover').each(function() {
            $(this).hover(function() {
                $(this).parents('.item-feature').find('.btn-hover').removeClass('active');
                $(this).addClass('active');
            });
        });

        /* Hover Active Item */
        $('.pxl--widget-hover').each(function() {
            $(this).hover(function() {
                $(this).parents('.elementor-row').find('.pxl--widget-hover').removeClass('pxl--item-active');
                $(this).parents('.elementor-container').find('.pxl--widget-hover').removeClass('pxl--item-active');
                $(this).addClass('pxl--item-active');
            });
        });

        /* Login */

        $('.pxl-modal-close').on('click', function() {
            $(this).parent().removeClass('open').addClass('remove');
            $(this).parents('body').removeClass('ov-hidden');
        });
        $('.btn-sign-up').on('click', function() {
            $('.pxl-user-register').addClass('u-open').removeClass('u-close');
            $('.pxl-user-login').addClass('u-close').removeClass('u-open');
        });
        $('.btn-sign-in').on('click', function() {
            $('.pxl-user-register').addClass('u-close').removeClass('u-open');
            $('.pxl-user-login').addClass('u-open').removeClass('u-close');
        });
        $('.pxl-user-have-an-account').on('click', function() {
            $(this).parents('.pxl-modal-content').find('.pxl-user-register').addClass('u-close').removeClass('u-open');
            $(this).parents('.pxl-modal-content').find('.pxl-user-login').addClass('u-open').removeClass('u-close');
        });
        $('.h-btn-user').on('click', function() {
            $('.pxl-user-popup').addClass('open').removeClass('remove');
            $(this).find('.pxl-user-account').toggleClass('active');
        });

        /* Hover Button */
        $('.btn-plus-text').hover(function() {
            $(this).find('span').toggle(300);
        });

        /* Nav Logo */
        $(".pxl-nav-button").on('click', function() {
            $(this).toggleClass('active');
            $(this).parent().find('.pxl-nav-wrap').toggle(400);
        });

        function loopToggleClass(el, toggleClass) {
            el = $(el);
            let counter = 0;
            if (el.hasClass(toggleClass)) {
                waitFor(function() {
                    counter++;
                    return counter == 2;
                }, function() {
                    counter = 0;
                    el.removeClass(toggleClass);
                    loopToggleClass(el, toggleClass);
                }, 'Deactivate', 1000);
            } else {
                waitFor(function() {
                    counter++;
                    return counter == 3;
                }, function() {
                    counter = 0;
                    el.addClass(toggleClass);
                    loopToggleClass(el, toggleClass);
                }, 'Activate', 1000);
            }
        }

        function waitFor(condition, callback, message, time) {
            if (message == null || message == '' || typeof message == 'undefined') {
                message = 'Timeout';
            }
            if (time == null || time == '' || typeof time == 'undefined') {
                time = 100;
            }
            var cond = condition();
            if (cond) {
                callback();
            } else {
                setTimeout(function() {
                    waitFor(condition, callback, message, time);
                }, time);
            }
        }
        /* End Icon Bounce */

        /* Select Theme Style */
        $('.wpcf7-select').each(function() {
            var $this = $(this),
                numberOfOptions = $(this).children('option').length;

            $this.addClass('pxl-select-hidden');
            $this.wrap('<div class="pxl-select"></div>');
            $this.after('<div class="pxl-select-higthlight"></div>');

            var $styledSelect = $this.next('div.pxl-select-higthlight');
            $styledSelect.text($this.children('option').eq(0).text());

            var $list = $('<ul />', {
                'class': 'pxl-select-options'
            }).insertAfter($styledSelect);

            for (var i = 0; i < numberOfOptions; i++) {
                $('<li />', {
                    text: $this.children('option').eq(i).text(),
                    rel: $this.children('option').eq(i).val()
                }).appendTo($list);
            }

            var $listItems = $list.children('li');

            $styledSelect.click(function(e) {
                e.stopPropagation();
                $('div.pxl-select-higthlight.active').not(this).each(function() {
                    $(this).removeClass('active').next('ul.pxl-select-options').addClass('pxl-select-lists-hide');
                });
                $(this).toggleClass('active');
            });

            $listItems.click(function(e) {
                e.stopPropagation();
                $styledSelect.text($(this).text()).removeClass('active');
                $this.val($(this).attr('rel'));
            });

            $(document).click(function() {
                $styledSelect.removeClass('active');
            });

        });
        $('#pxl-sidebar-area select').each(function() {
            $(this).niceSelect();
        });

        /* Row Divider */
        $('.pxl-row-divider-angle-top').append('<svg class="pxl-row-angle" style="fill:#ffffff" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 100 100" version="1.1" preserveAspectRatio="none" height="130px"><path stroke="" stroke-width="0" d="M0 100 L100 0 L200 100"></path></svg>');

        /* Slider - Group align center */
        setTimeout(function() {
            $('.md-align-center').parents('.rs-parallax-wrap').addClass('pxl-group-center');
        }, 300);

        /* Start Icon Bounce */
        var boxEls = $('.el-bounce, .pxl-image-effect1');
        $.each(boxEls, function(boxIndex, boxEl) {
            loopToggleClass(boxEl, 'bounce-active');
        });


        setTimeout(() => {
            var wobbleElements = document.querySelectorAll('.pxl-wobble');

            wobbleElements.forEach(function(el) {

                el.addEventListener('mouseover', function() {

                    if (!el.classList.contains('animating') && !el.classList.contains('mouseover')) {

                        el.classList.add('animating', 'mouseover');

                        var letters = el.innerText.split('');

                        setTimeout(function() {
                            el.classList.remove('animating');
                        }, (letters.length + 1) * 50);

                        var animationName = el.dataset.animation;
                        if (!animationName) {
                            animationName = "pxl-jump";
                        }

                        el.innerText = '';

                        letters.forEach(function(letter) {
                            if (letter == " ") {
                                letter = "&nbsp;";
                            }
                            el.innerHTML += '<span class="letter">' + letter + '</span>';
                        });

                        var letterElements = el.querySelectorAll('.letter');
                        letterElements.forEach(function(letter, i) {
                            setTimeout(function() {
                                letter.classList.add(animationName);
                            }, 50 * i);
                        });

                    }

                });

                el.addEventListener('mouseout', function() {
                    el.classList.remove('mouseover');
                });
            });
        }, 100);

        /* Custom Color Menu One Page */
        $('.pxl-no-fc').each(function() {
            $('.pxl-no-fc .pxl-menu-primary > li > a').bind('click', function() {
                $('.pxl-menu-primary > li > a').addClass('pxl-nav-sec');
                $(this).removeClass('pxl-nav-sec');
            });
        });

    });

    function patte_panel_anchor_toggle() {
        'use strict';
        $(document).on('click', '.pxl-anchor.side-panel', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var target = $(this).attr('data-target');
            $(this).toggleClass('cliked');
            $(target).toggleClass('open');
            $('body').toggleClass('side-panel-open');
            $('.pxl-overlay-drop').toggleClass('panel-open');
            setTimeout(function() {
                $(document).find('.pxl-search-form input[name="s"]').focus();
                $(document).find('.search-form input[name="s"]').focus();
            }, 1000);

        });

        //* Menu Dropdown
        $('.pxl-menu-primary li').each(function() {
            var $submenu = $(this).find('> ul.sub-menu');
            if ($submenu.length == 1) {
                $(this).hover(function() {
                    if ($submenu.offset().left + $submenu.width() > $(window).width()) {
                        $submenu.addClass('back');
                    } else if ($submenu.offset().left < 0) {
                        $submenu.addClass('back');
                    }
                }, function() {
                    $submenu.removeClass('back');
                });
            }
        });
    }

    function patte_document_click() {
        $(document).on('click', function(e) {
            var target = $(e.target);
            var check = '.btn-nav-mobile';

            if (!(target.is(check)) && target.closest('.pxl-hidden-template').length <= 0 && $('body').hasClass('side-panel-open')) {
                $('.btn-nav-mobile').removeClass('cliked');
                $('.pxl-hidden-template').removeClass('open');
                $('body').removeClass('side-panel-open');
                $('.pxl-overlay-drop').removeClass('panel-open');
            }
        });
        $(document).on('click', '.pxl-close', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).closest('.pxl-hidden-template').toggleClass('open');
            $('.btn-nav-mobile').removeClass('cliked');
            $('body').toggleClass('side-panel-open');
        });
        $(document).on('click', '.pxl-close-drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('.pxl-overlay-drop').toggleClass('panel-open');
        });
    }

    function cd_product() {
        $('.pxl-countdown-product').each(function() {
            var _this = $(this);
            var count_down = $(this).find('> div').data("count-down");
            setInterval(function() {
                var startDateTime = new Date().getTime();
                var endDateTime = new Date(count_down).getTime();
                var distance = endDateTime - startDateTime;
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                var text_day = days !== 1 ? _this.attr('data-days') : _this.attr('data-day');
                var text_hour = hours !== 1 ? _this.attr('data-hours') : _this.attr('data-hour');
                var text_minu = minutes !== 1 ? _this.attr('data-minutes') : _this.attr('data-minute');
                var text_second = seconds !== 1 ? _this.attr('data-seconds') : _this.attr('data-second');
                days = days < 10 ? '0' + days : days;
                hours = hours < 10 ? '0' + hours : hours;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                seconds = seconds < 10 ? '0' + seconds : seconds;

                var arrDays = [];
                var daysString = days.toString();
                for (var i = 0; i < daysString.length; i++) {
                    arrDays += '<span>' + daysString[i] + '</span>';
                }

                var arrHours = [];
                var hoursString = hours.toString();
                for (var i = 0; i < hoursString.length; i++) {
                    arrHours += '<span>' + hoursString[i] + '</span>';
                }

                var arrMinutes = [];
                var minutesString = minutes.toString();
                for (var i = 0; i < minutesString.length; i++) {
                    arrMinutes += '<span>' + minutesString[i] + '</span>';
                }

                var arrSeconds = [];
                var secondsString = seconds.toString();
                for (var i = 0; i < secondsString.length; i++) {
                    arrSeconds += '<span>' + secondsString[i] + '</span>';
                }

                _this.html('' +
                    '<div class="countdown-item countdown-day"><div class="countdown-item-inner"><div class="countdown-amount">' + arrDays + ' </div><div class="countdown-period">' + text_day + '</div></div></div>' +
                    '<div class="countdown-item countdown-hour"><div class="countdown-item-inner"><div class="countdown-amount">' + arrHours + '</div><div class="countdown-period">' + text_hour + '</div></div></div>' +
                    '<div class="countdown-item countdown-minute"><div class="countdown-item-inner"><div class="countdown-amount">' + arrMinutes + '</div><div class="countdown-period">' + text_minu + '</div></div></div>' +
                    '<div class="countdown-item countdown-second"><div class="countdown-item-inner"><div class="countdown-amount">' + arrSeconds + '</div><div class="countdown-period">' + text_second + '</div></div></div>'
                );
                _this.addClass('done');
            }, 100);
        });
    }

    /* Header Sticky */
    function patte_header_sticky() {
        if ($('#pxl-header-elementor').hasClass('is-sticky')) {
            if (pxl_scroll_top > 100) {
                $('.pxl-header-elementor-sticky.pxl-sticky-stb').addClass('pxl-header-fixed');
            } else {
                $('.pxl-header-elementor-sticky.pxl-sticky-stb').removeClass('pxl-header-fixed');
            }

            if (pxl_scroll_status == 'up' && pxl_scroll_top > 100) {
                $('.pxl-header-elementor-sticky.pxl-sticky-stt').addClass('pxl-header-fixed');
            } else {
                $('.pxl-header-elementor-sticky.pxl-sticky-stt').removeClass('pxl-header-fixed');
            }
        }

        $('.pxl-header-elementor-sticky').parents('body').addClass('pxl-header-sticky');
    }

    /* Scroll To Top */
    function patte_scroll_to_top() {
        if (pxl_scroll_top < pxl_window_height) {
            $('.pxl-scroll-top').addClass('pxl-off').removeClass('pxl-on');
        }
        if (pxl_scroll_top > pxl_window_height) {
            $('.pxl-scroll-top').addClass('pxl-on').removeClass('pxl-off');
        }
    }

    /* Footer Fixed */
    function patte_footer_fixed() {
        setTimeout(function() {
            var h_footer = $('.pxl-footer-fixed #pxl-footer-elementor').outerHeight() - 1;
            $('.pxl-footer-fixed #pxl-main').css('margin-bottom', h_footer + 'px');
        }, 600);
    }

    /* ====================
     WooComerce Quantity
     ====================== */
    function patte_quantity_icon() {
        $('#pxl-main .quantity').append('<span class="quantity-icon"><i class="quantity-down caseicon-caret-arrow-down"></i><i class="quantity-up caseicon-caret-arrow-up"></i></span>');
        $('.quantity-up').on('click', function() {
            $(this).parents('.quantity').find('input[type="number"]').get(0).stepUp();
            $(this).parents('.woocommerce-cart-form').find('.actions .button').removeAttr('disabled');
        });
        $('.quantity-down').on('click', function() {
            $(this).parents('.quantity').find('input[type="number"]').get(0).stepDown();
            $(this).parents('.woocommerce-cart-form').find('.actions .button').removeAttr('disabled');
        });
        $('.woocommerce-cart-form .actions .button').removeAttr('disabled');
    }

    function patte_product_single_variations_att() {
        $(document).on('mousedown', '.pro-variation-select', function(e) {
            e.preventDefault();
            var $this_var = $(this).closest('.variations'),
                this_closest = $(this).closest('.pxl-variation-att-terms'),
                target_hidden = $this_var.find('#' + this_closest.attr('data-id'));
            var $this = $(this);
            if (!$this.hasClass('custom-vari-enabled'))
                return;
            var target = $this.attr('data-value');
            if (!target)
                return;
            target_hidden.val(target).change();
            this_closest.find('li.pxl-vari-item').removeClass('active');
            $this.parent('li').addClass('active');
        });
    }

    /* Custom Tab Carousel */
    function tabCarousel() {
        setTimeout(() => {
            $('.pxl-tab-carousel .pxl-item--content:not(:first-child)').css({
                "display": "none",
            });
        }, 1000);
    }

    /* Smooth Scroll */
    function patte_smooth_scroll() {
        if ($('body').hasClass('pxl-smooth-scroll')) {
            ! function(t, e) {
                "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t || self).Lenis = e()
            }(this, function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                function e(e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), Object.defineProperty(e, "prototype", {
                        writable: !1
                    }), e
                }

                function i() {
                    return i = Object.assign ? Object.assign.bind() : function(t) {
                        for (var e = 1; e < arguments.length; e++) {
                            var i = arguments[e];
                            for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o])
                        }
                        return t
                    }, i.apply(this, arguments)
                }

                function o(t, e) {
                    return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                        return t.__proto__ = e, t
                    }, o(t, e)
                }

                function n() {}
                n.prototype = {
                    on: function(t, e, i) {
                        var o = this.e || (this.e = {});
                        return (o[t] || (o[t] = [])).push({
                            fn: e,
                            ctx: i
                        }), this
                    },
                    once: function(t, e, i) {
                        var o = this;

                        function n() {
                            o.off(t, n), e.apply(i, arguments)
                        }
                        return n._ = e, this.on(t, n, i)
                    },
                    emit: function(t) {
                        for (var e = [].slice.call(arguments, 1), i = ((this.e || (this.e = {}))[t] || []).slice(), o = 0, n = i.length; o < n; o++) i[o].fn.apply(i[o].ctx, e);
                        return this
                    },
                    off: function(t, e) {
                        var i = this.e || (this.e = {}),
                            o = i[t],
                            n = [];
                        if (o && e)
                            for (var r = 0, s = o.length; r < s; r++) o[r].fn !== e && o[r].fn._ !== e && n.push(o[r]);
                        return n.length ? i[t] = n : delete i[t], this
                    }
                };
                var r = n;
                n.TinyEmitter = r, "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
                var s = function(t) {
                    var e = {
                        exports: {}
                    };
                    return function(t, e) {
                        t.exports = function() {
                            var t = 0;

                            function e(e) {
                                return "__private_" + t++ + "_" + e
                            }

                            function i(t, e) {
                                if (!Object.prototype.hasOwnProperty.call(t, e)) throw new TypeError("attempted to use private field on non-instance");
                                return t
                            }

                            function o() {}
                            o.prototype = {
                                on: function(t, e, i) {
                                    var o = this.e || (this.e = {});
                                    return (o[t] || (o[t] = [])).push({
                                        fn: e,
                                        ctx: i
                                    }), this
                                },
                                once: function(t, e, i) {
                                    var o = this;

                                    function n() {
                                        o.off(t, n), e.apply(i, arguments)
                                    }
                                    return n._ = e, this.on(t, n, i)
                                },
                                emit: function(t) {
                                    for (var e = [].slice.call(arguments, 1), i = ((this.e || (this.e = {}))[t] || []).slice(), o = 0, n = i.length; o < n; o++) i[o].fn.apply(i[o].ctx, e);
                                    return this
                                },
                                off: function(t, e) {
                                    var i = this.e || (this.e = {}),
                                        o = i[t],
                                        n = [];
                                    if (o && e)
                                        for (var r = 0, s = o.length; r < s; r++) o[r].fn !== e && o[r].fn._ !== e && n.push(o[r]);
                                    return n.length ? i[t] = n : delete i[t], this
                                }
                            };
                            var n = o;
                            n.TinyEmitter = o;
                            var r, s = "virtualscroll",
                                l = e("options"),
                                h = e("el"),
                                a = e("emitter"),
                                c = e("event"),
                                u = e("touchStart"),
                                d = e("bodyTouchAction");
                            return function() {
                                function t(t) {
                                    var e = this;
                                    Object.defineProperty(this, l, {
                                        writable: !0,
                                        value: void 0
                                    }), Object.defineProperty(this, h, {
                                        writable: !0,
                                        value: void 0
                                    }), Object.defineProperty(this, a, {
                                        writable: !0,
                                        value: void 0
                                    }), Object.defineProperty(this, c, {
                                        writable: !0,
                                        value: void 0
                                    }), Object.defineProperty(this, u, {
                                        writable: !0,
                                        value: void 0
                                    }), Object.defineProperty(this, d, {
                                        writable: !0,
                                        value: void 0
                                    }), this._onWheel = function(t) {
                                        var o = i(e, l)[l],
                                            n = i(e, c)[c];
                                        n.deltaX = t.wheelDeltaX || -1 * t.deltaX, n.deltaY = t.wheelDeltaY || -1 * t.deltaY, r.isFirefox && 1 === t.deltaMode && (n.deltaX *= o.firefoxMultiplier, n.deltaY *= o.firefoxMultiplier), n.deltaX *= o.mouseMultiplier, n.deltaY *= o.mouseMultiplier, e._notify(t)
                                    }, this._onMouseWheel = function(t) {
                                        var o = i(e, c)[c];
                                        o.deltaX = t.wheelDeltaX ? t.wheelDeltaX : 0, o.deltaY = t.wheelDeltaY ? t.wheelDeltaY : t.wheelDelta, e._notify(t)
                                    }, this._onTouchStart = function(t) {
                                        var o = t.targetTouches ? t.targetTouches[0] : t;
                                        i(e, u)[u].x = o.pageX, i(e, u)[u].y = o.pageY
                                    }, this._onTouchMove = function(t) {
                                        var o = i(e, l)[l];
                                        o.preventTouch && !t.target.classList.contains(o.unpreventTouchClass) && t.preventDefault();
                                        var n = i(e, c)[c],
                                            r = t.targetTouches ? t.targetTouches[0] : t;
                                        n.deltaX = (r.pageX - i(e, u)[u].x) * o.touchMultiplier, n.deltaY = (r.pageY - i(e, u)[u].y) * o.touchMultiplier, i(e, u)[u].x = r.pageX, i(e, u)[u].y = r.pageY, e._notify(t)
                                    }, this._onKeyDown = function(t) {
                                        var o = i(e, c)[c];
                                        o.deltaX = o.deltaY = 0;
                                        var n = window.innerHeight - 40;
                                        switch (t.keyCode) {
                                            case 37:
                                            case 38:
                                                o.deltaY = i(e, l)[l].keyStep;
                                                break;
                                            case 39:
                                            case 40:
                                                o.deltaY = -i(e, l)[l].keyStep;
                                                break;
                                            case 32:
                                                o.deltaY = n * (t.shiftKey ? 1 : -1);
                                                break;
                                            default:
                                                return
                                        }
                                        e._notify(t)
                                    }, i(this, h)[h] = window, t && t.el && (i(this, h)[h] = t.el, delete t.el), r || (r = {
                                        hasWheelEvent: "onwheel" in document,
                                        hasMouseWheelEvent: "onmousewheel" in document,
                                        hasTouch: "ontouchstart" in document,
                                        hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
                                        hasPointer: !!window.navigator.msPointerEnabled,
                                        hasKeyDown: "onkeydown" in document,
                                        isFirefox: navigator.userAgent.indexOf("Firefox") > -1
                                    }), i(this, l)[l] = Object.assign({
                                        mouseMultiplier: 1,
                                        touchMultiplier: 2,
                                        firefoxMultiplier: 15,
                                        keyStep: 120,
                                        preventTouch: !1,
                                        unpreventTouchClass: "vs-touchmove-allowed",
                                        useKeyboard: !0,
                                        useTouch: !0
                                    }, t), i(this, a)[a] = new n, i(this, c)[c] = {
                                        y: 0,
                                        x: 0,
                                        deltaX: 0,
                                        deltaY: 0
                                    }, i(this, u)[u] = {
                                        x: null,
                                        y: null
                                    }, i(this, d)[d] = null, void 0 !== i(this, l)[l].passive && (this.listenerOptions = {
                                        passive: i(this, l)[l].passive
                                    })
                                }
                                var e = t.prototype;
                                return e._notify = function(t) {
                                    var e = i(this, c)[c];
                                    e.x += e.deltaX, e.y += e.deltaY, i(this, a)[a].emit(s, {
                                        x: e.x,
                                        y: e.y,
                                        deltaX: e.deltaX,
                                        deltaY: e.deltaY,
                                        originalEvent: t
                                    })
                                }, e._bind = function() {
                                    r.hasWheelEvent && i(this, h)[h].addEventListener("wheel", this._onWheel, this.listenerOptions), r.hasMouseWheelEvent && i(this, h)[h].addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions), r.hasTouch && i(this, l)[l].useTouch && (i(this, h)[h].addEventListener("touchstart", this._onTouchStart, this.listenerOptions), i(this, h)[h].addEventListener("touchmove", this._onTouchMove, this.listenerOptions)), r.hasPointer && r.hasTouchWin && (i(this, d)[d] = document.body.style.msTouchAction, document.body.style.msTouchAction = "none", i(this, h)[h].addEventListener("MSPointerDown", this._onTouchStart, !0), i(this, h)[h].addEventListener("MSPointerMove", this._onTouchMove, !0)), r.hasKeyDown && i(this, l)[l].useKeyboard && document.addEventListener("keydown", this._onKeyDown)
                                }, e._unbind = function() {
                                    r.hasWheelEvent && i(this, h)[h].removeEventListener("wheel", this._onWheel), r.hasMouseWheelEvent && i(this, h)[h].removeEventListener("mousewheel", this._onMouseWheel), r.hasTouch && (i(this, h)[h].removeEventListener("touchstart", this._onTouchStart), i(this, h)[h].removeEventListener("touchmove", this._onTouchMove)), r.hasPointer && r.hasTouchWin && (document.body.style.msTouchAction = i(this, d)[d], i(this, h)[h].removeEventListener("MSPointerDown", this._onTouchStart, !0), i(this, h)[h].removeEventListener("MSPointerMove", this._onTouchMove, !0)), r.hasKeyDown && i(this, l)[l].useKeyboard && document.removeEventListener("keydown", this._onKeyDown)
                                }, e.on = function(t, e) {
                                    i(this, a)[a].on(s, t, e);
                                    var o = i(this, a)[a].e;
                                    o && o[s] && 1 === o[s].length && this._bind()
                                }, e.off = function(t, e) {
                                    i(this, a)[a].off(s, t, e);
                                    var o = i(this, a)[a].e;
                                    (!o[s] || o[s].length <= 0) && this._unbind()
                                }, e.destroy = function() {
                                    i(this, a)[a].off(), this._unbind()
                                }, t
                            }()
                        }()
                    }(e), e.exports
                }();

                function l(t, e) {
                    var i = t % e;
                    return (e > 0 && i < 0 || e < 0 && i > 0) && (i += e), i
                }
                var h = ["duration", "easing"],
                    a = /*#__PURE__*/ function() {
                        function t() {}
                        var o = t.prototype;
                        return o.to = function(t, e) {
                            var o = this,
                                n = void 0 === e ? {} : e,
                                r = n.duration,
                                s = void 0 === r ? 1 : r,
                                l = n.easing,
                                a = void 0 === l ? function(t) {
                                    return t
                                } : l,
                                c = function(t, e) {
                                    if (null == t) return {};
                                    var i, o, n = {},
                                        r = Object.keys(t);
                                    for (o = 0; o < r.length; o++) e.indexOf(i = r[o]) >= 0 || (n[i] = t[i]);
                                    return n
                                }(n, h);
                            this.target = t, this.fromKeys = i({}, c), this.toKeys = i({}, c), this.keys = Object.keys(i({}, c)), this.keys.forEach(function(e) {
                                o.fromKeys[e] = t[e]
                            }), this.duration = s, this.easing = a, this.currentTime = 0, this.isRunning = !0
                        }, o.stop = function() {
                            this.isRunning = !1
                        }, o.raf = function(t) {
                            var e = this;
                            if (this.isRunning) {
                                this.currentTime = Math.min(this.currentTime + t, this.duration);
                                var i = this.progress >= 1 ? 1 : this.easing(this.progress);
                                this.keys.forEach(function(t) {
                                    var o = e.fromKeys[t];
                                    e.target[t] = o + (e.toKeys[t] - o) * i
                                }), 1 === i && this.stop()
                            }
                        }, e(t, [{
                            key: "progress",
                            get: function() {
                                return this.currentTime / this.duration
                            }
                        }]), t
                    }(); /*#__PURE__*/
                return function(t) {
                    var i, n;

                    function r(e) {
                        var i, o, n, r, l = void 0 === e ? {} : e,
                            h = l.duration,
                            c = void 0 === h ? 1.2 : h,
                            u = l.easing,
                            d = void 0 === u ? function(t) {
                                return Math.min(1, 1.001 - Math.pow(2, -10 * t))
                            } : u,
                            p = l.smooth,
                            f = void 0 === p || p,
                            v = l.mouseMultiplier,
                            w = void 0 === v ? 1 : v,
                            y = l.smoothTouch,
                            m = void 0 !== y && y,
                            g = l.touchMultiplier,
                            b = void 0 === g ? 2 : g,
                            T = l.direction,
                            M = void 0 === T ? "vertical" : T,
                            S = l.gestureDirection,
                            _ = void 0 === S ? "vertical" : S,
                            O = l.infinite,
                            E = void 0 !== O && O,
                            W = l.wrapper,
                            x = void 0 === W ? window : W,
                            D = l.content,
                            N = void 0 === D ? document.body : D;
                        (r = t.call(this) || this).onWindowResize = function() {
                            r.wrapperWidth = window.innerWidth, r.wrapperHeight = window.innerHeight
                        }, r.onWrapperResize = function(t) {
                            var e = t[0];
                            if (e) {
                                var i = e.contentRect;
                                r.wrapperWidth = i.width, r.wrapperHeight = i.height
                            }
                        }, r.onContentResize = function(t) {
                            var e = t[0];
                            if (e) {
                                var i = e.contentRect;
                                r.contentWidth = i.width, r.contentHeight = i.height
                            }
                        }, r.onVirtualScroll = function(t) {
                            var e = t.deltaY,
                                i = t.deltaX,
                                o = t.originalEvent;
                            if (!("vertical" === r.gestureDirection && 0 === e || "horizontal" === r.gestureDirection && 0 === i)) {
                                var n = !!o.composedPath().find(function(t) {
                                    return t.hasAttribute && t.hasAttribute("data-lenis-prevent")
                                });
                                o.ctrlKey || n || (r.smooth = o.changedTouches ? r.smoothTouch : r.options.smooth, r.stopped ? o.preventDefault() : r.smooth && 4 !== o.buttons && (r.smooth && o.preventDefault(), r.targetScroll -= "both" === r.gestureDirection ? i + e : "horizontal" === r.gestureDirection ? i : e, r.scrollTo(r.targetScroll)))
                            }
                        }, r.onScroll = function(t) {
                            r.isScrolling && r.smooth || (r.targetScroll = r.scroll = r.lastScroll = r.wrapperNode[r.scrollProperty], r.notify())
                        }, window.lenisVersion = "0.2.28", r.options = {
                            duration: c,
                            easing: d,
                            smooth: f,
                            mouseMultiplier: w,
                            smoothTouch: m,
                            touchMultiplier: b,
                            direction: M,
                            gestureDirection: _,
                            infinite: E,
                            wrapper: x,
                            content: N
                        }, r.duration = c, r.easing = d, r.smooth = f, r.mouseMultiplier = w, r.smoothTouch = m, r.touchMultiplier = b, r.direction = M, r.gestureDirection = _, r.infinite = E, r.wrapperNode = x, r.contentNode = N, r.wrapperNode.addEventListener("scroll", r.onScroll), r.wrapperNode === window ? (r.wrapperNode.addEventListener("resize", r.onWindowResize), r.onWindowResize()) : (r.wrapperHeight = r.wrapperNode.offsetHeight, r.wrapperWidth = r.wrapperNode.offsetWidth, r.wrapperObserver = new ResizeObserver(r.onWrapperResize), r.wrapperObserver.observe(r.wrapperNode)), r.contentHeight = r.contentNode.offsetHeight, r.contentWidth = r.contentNode.offsetWidth, r.contentObserver = new ResizeObserver(r.onContentResize), r.contentObserver.observe(r.contentNode), r.targetScroll = r.scroll = r.lastScroll = r.wrapperNode[r.scrollProperty], r.animate = new a;
                        var P = (null == (i = navigator) || null == (o = i.userAgentData) ? void 0 : o.platform) || (null == (n = navigator) ? void 0 : n.platform) || "unknown";
                        return r.virtualScroll = new s({
                            el: r.wrapperNode,
                            firefoxMultiplier: 50,
                            mouseMultiplier: r.mouseMultiplier * (P.includes("Win") || P.includes("Linux") ? .84 : .4),
                            touchMultiplier: r.touchMultiplier,
                            passive: !1,
                            useKeyboard: !1,
                            useTouch: !0
                        }), r.virtualScroll.on(r.onVirtualScroll), r
                    }
                    n = t, (i = r).prototype = Object.create(n.prototype), i.prototype.constructor = i, o(i, n);
                    var h = r.prototype;
                    return h.start = function() {
                        var t = this.wrapperNode;
                        this.wrapperNode === window && (t = document.documentElement), t.classList.remove("lenis-stopped"), this.stopped = !1
                    }, h.stop = function() {
                        var t = this.wrapperNode;
                        this.wrapperNode === window && (t = document.documentElement), t.classList.add("lenis-stopped"), this.stopped = !0, this.animate.stop()
                    }, h.destroy = function() {
                        var t;
                        this.wrapperNode === window && this.wrapperNode.removeEventListener("resize", this.onWindowResize), this.wrapperNode.removeEventListener("scroll", this.onScroll), this.virtualScroll.destroy(), null == (t = this.wrapperObserver) || t.disconnect(), this.contentObserver.disconnect()
                    }, h.raf = function(t) {
                        var e = t - (this.now || 0);
                        this.now = t, !this.stopped && this.smooth && (this.lastScroll = this.scroll, this.animate.raf(.001 * e), this.scroll === this.targetScroll && (this.lastScroll = this.scroll), this.isScrolling && (this.setScroll(this.scroll), this.notify()), this.isScrolling = this.scroll !== this.targetScroll)
                    }, h.setScroll = function(t) {
                        var e = this.infinite ? l(t, this.limit) : t;
                        "horizontal" === this.direction ? this.wrapperNode.scrollTo(e, 0) : this.wrapperNode.scrollTo(0, e)
                    }, h.notify = function() {
                        var t = this.infinite ? l(this.scroll, this.limit) : this.scroll;
                        this.emit("scroll", {
                            scroll: t,
                            limit: this.limit,
                            velocity: this.velocity,
                            direction: 0 === this.velocity ? 0 : this.velocity > 0 ? 1 : -1,
                            progress: t / this.limit
                        })
                    }, h.scrollTo = function(t, e) {
                        var i = void 0 === e ? {} : e,
                            o = i.offset,
                            n = void 0 === o ? 0 : o,
                            r = i.immediate,
                            s = void 0 !== r && r,
                            l = i.duration,
                            h = void 0 === l ? this.duration : l,
                            a = i.easing,
                            c = void 0 === a ? this.easing : a;
                        if (null != t && !this.stopped) {
                            var u;
                            if ("number" == typeof t) u = t;
                            else if ("top" === t || "#top" === t) u = 0;
                            else if ("bottom" === t) u = this.limit;
                            else {
                                var d;
                                if ("string" == typeof t) d = document.querySelector(t);
                                else {
                                    if (null == t || !t.nodeType) return;
                                    d = t
                                }
                                if (!d) return;
                                var p = 0;
                                if (this.wrapperNode !== window) {
                                    var f = this.wrapperNode.getBoundingClientRect();
                                    p = "horizontal" === this.direction ? f.left : f.top
                                }
                                var v = d.getBoundingClientRect();
                                u = ("horizontal" === this.direction ? v.left : v.top) + this.scroll - p
                            }
                            u += n, this.targetScroll = this.infinite ? u : Math.max(0, Math.min(u, this.limit)), !this.smooth || s ? (this.animate.stop(), this.scroll = this.lastScroll = this.targetScroll, this.setScroll(this.targetScroll)) : this.animate.to(this, {
                                duration: h,
                                easing: c,
                                scroll: this.targetScroll
                            })
                        }
                    }, e(r, [{
                        key: "scrollProperty",
                        get: function() {
                            return this.wrapperNode === window ? "horizontal" === this.direction ? "scrollX" : "scrollY" : "horizontal" === this.direction ? "scrollLeft" : "scrollTop"
                        }
                    }, {
                        key: "limit",
                        get: function() {
                            return "horizontal" === this.direction ? this.contentWidth - this.wrapperWidth : this.contentHeight - this.wrapperHeight
                        }
                    }, {
                        key: "velocity",
                        get: function() {
                            return this.scroll - this.lastScroll
                        }
                    }]), r
                }(r)
            });

            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                mouseMultiplier: 1,
                smoothTouch: false,
                touchMultiplier: 2,
                infinite: false,
            })

            function raf(time) {
                lenis.raf(time)
                requestAnimationFrame(raf)
            }
            requestAnimationFrame(raf)
        }
    }

    /* Back To Top With Progress Indicator */
    function patte_backtotop_indicator() {
        var $isHome = $('body .pxl-scroll-top');
        if ($isHome.length) {
            var progressPath = document.querySelector('.pxl-progress-circle path');
            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
            progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
            var updateProgress = function() {
                var scroll = $(window).scrollTop();
                var height = $(document).height() - $(window).height();
                var progress = pathLength - (scroll * pathLength / height);
                progressPath.style.strokeDashoffset = progress;
            }
            updateProgress();
            $(window).scroll(updateProgress);
        }
    }

    function patte_sidebar_position() {
        var content_area_width = $("#pxl-content-main").width();
        $('.page-title--inner').css("max-width", content_area_width);

        if ($('div').hasClass('pxl-sidebar-left')) {
            var elem_title_inner = document.querySelector('.page-title--inner');
            if (pxl_window_width >= 992) {
                var sidebar_area_width = document.querySelector('#pxl-sidebar-area');
                if (sidebar_area_width) {
                    var w_sidebar_area = sidebar_area_width.offsetWidth;
                    var w_sidebar = getComputedStyle(sidebar_area_width);

                    w_sidebar_area += parseInt(w_sidebar.marginLeft) + parseInt(w_sidebar.marginRight);
                    elem_title_inner.style.transform = "translateX(" + (w_sidebar_area) + "px)";
                }
            } else if (pxl_window_width < 992) {
                elem_title_inner.style.removeProperty("transform");
            }
        }
    }

    $(document).ajaxComplete(function() {
        patte_quantity_icon();
    });

})(jQuery);