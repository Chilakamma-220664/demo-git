$(document).ready(function() {
    
    // 1. Sticky Navigation Bar Logic
    var stickyNavTop = $('.nav-bar').offset().top;
    
    var stickyNav = function(){
        var scrollTop = $(window).scrollTop();
        if (scrollTop > stickyNavTop) { 
            $('.nav-bar').addClass('sticky');
        } else {
            $('.nav-bar').removeClass('sticky'); 
        }
    };

    // Run on scroll
    $(window).scroll(function() {
        stickyNav();
    });

    // 2. Custom jQuery Plugin: $.fn.scrollFX
    // Fades in elements as you scroll down
    $.fn.scrollFX = function(options) {
        var settings = $.extend({
            opacityTarget: 1,
            speed: 800
        }, options);

        return this.each(function() {
            var $elem = $(this);
            $elem.css('opacity', 0); // start invisible
            
            $(window).on('scroll', function() {
                var bottom_of_window = $(window).scrollTop() + $(window).height();
                var bottom_of_object = $elem.offset().top + $elem.outerHeight();
                
                // If element is in viewport, fade it in
                if(bottom_of_window > (bottom_of_object - 100)) {
                    $elem.animate({'opacity': settings.opacityTarget}, settings.speed);
                }
            });
        });
    };

});
