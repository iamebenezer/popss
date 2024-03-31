;
(function($) {

    "use strict";

    $(document).ready(function() {

        $('.widget_product_search .search-field').find("input[type='text']").each(function(ev) {
            if (!$(this).val()) {
                $(this).attr("placeholder", "Search and Press Enter");
            }
        });

        $('.product-layout-list').parents('ul.products').addClass('products-list');
        $('.single_variation_wrap').addClass('clearfix');
        $('.woocommerce-variation-add-to-cart').addClass('clearfix');

        $('.cart-total-wrap').on('click', function() {
            $('.widget-cart-sidebar').toggleClass('open');
            $(this).toggleClass('cart-open');
            $('.site-overlay').toggleClass('open');
        });

        $('.site-overlay').on('click', function() {
            $(this).removeClass('open');
            $(this).parents('#page').find('.widget-cart-sidebar').removeClass('open');
        });

        $('.woocommerce-tab-heading').on('click', function() {
            $(this).toggleClass('open');
            $(this).parent().find('.woocommerce-tab-content').slideToggle('');
        });

        $('.site-menu-right .h-btn-cart, .mobile-menu-cart .h-btn-cart').on('click', function(e) {
            e.preventDefault();
            $(this).parents('#pxl-header-wrap').find('.widget_shopping_cart').toggleClass('open');
            $('.pxl-hidden-sidebar').removeClass('open');
            $('.pxl-search-popup').removeClass('open');
        });

        $('.woocommerce-add-to-cart a.button:not(".no-animate")').append('<i>+</i>');

        $('.woocommerce-add-to-cart a.button').on('click', function() {
            $(this).parents('.woocommerce-product-inner').addClass('cart-added');
        });

        $('.woocommerce-archive-layout .layout-grid').on('click', function() {
            $(this).addClass('active');
            $(this).parent().find('.layout-list').removeClass('active');
            $(this).parents('.site-main').find('ul.products').addClass('pxl-products-grid').removeClass('pxl-products-list');
        });
        $('.woocommerce-archive-layout .layout-list').on('click', function() {
            $(this).addClass('active');
            $(this).parent().find('.layout-grid').removeClass('active');
            $(this).parents('.site-main').find('ul.products').addClass('pxl-products-list').removeClass('pxl-products-grid');
        });

        $('.woocommerce-archive-layout .layout-list.active').parents('.site-main').find('ul.products').addClass('pxl-products-list').removeClass('pxl-products-grid');

        $('.woocommerce-sg-product-title h1').each(function() {
            $(this).replaceWith('<h5 class="' + $(this).attr('class') + '">' + $(this).html() + '</h5>');
        });
        $('.single-product .woocommerce-sg-product-price').each(function() {
            $(this).append($('.single-product .stock'));
        });
        $('.single_add_to_cart_button, .wooc-product-meta').wrapAll('<div class="pxl-button-and-meta"></div>');
        $('#tab-reviews .woocommerce-Reviews-title').text('Review');
        $('#tab-reviews #reply-title').text('Leave Your Review');
        $('#tab-reviews').addClass('container');
        $('#tab-reviews .woocommerce-Reviews').addClass('row');
        $('#tab-reviews #comments').addClass('col-xl-7 col-lg-6 col-md-12');
        $('#tab-reviews #review_form_wrapper').addClass('col-xl-5 col-lg-6 col-md-12');
        var ratingField = $('#tab-reviews .comment-form-rating');
        $('#tab-reviews .comment-form').prepend(ratingField);
        $('#tab-reviews form .comment-form-rating label').text('Select Rating:');
        $('#tab-reviews .comment-form-author #author').attr('placeholder', 'Full Name');
        $('#tab-reviews .comment-form-email #email').attr('placeholder', 'Email Address');
        $('#tab-reviews .comment-form-comment #comment').attr('placeholder', 'Review');
        $('#pxl-wgshopsingle-elementor').insertBefore('.woocommerce-tabs #tab-reviews');
        $(document).ready(function() {
            $('.count').each(function() {
                var text = $(this).text();
                var modifiedText = text.replace(/\((\d+)\)/g, '$1');
                $(this).text(modifiedText);
            });
        });

    });
    $('.pxl-product-carousel.layout-1 .pxl-swiper-slide').each(function() {
        var $ratingElement = $(this).find('.woocommerce-product-rating');
        var $productContent = $(this).find('.woocommerce-product-content');

        $ratingElement.appendTo($productContent);
    });
    $('.single-product .quantity').prepend('<label class="pxl-quantity-text">Quantity</label>');

    jQuery(document).ready(function($) {
        var woocommercePagination = $('.woocommerce-pagination');


        if (woocommercePagination.length > 0) {
            woocommercePagination.addClass('pxl-pagination-wrap');
            var pxlPaginationLinks = $('<div class="pxl-pagination-links"></div>');
            woocommercePagination.children().wrapAll(pxlPaginationLinks);
            var $linksToMove = $('.pxl-pagination-links a, .pxl-pagination-links span');
            $linksToMove.appendTo('.pxl-pagination-links');
            $('.pxl-pagination-links ul').remove();

        }

    });


})(jQuery);