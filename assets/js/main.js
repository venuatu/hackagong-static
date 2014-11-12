// https://github.com/jashkenas/underscore/blob/68100348881e55f8d7dc792982c8085a74331278/underscore.js#L773-L807
function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
        var last = Date.now() - timestamp;

        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function() {
        context = this;
        args = arguments;
        timestamp = Date.now();
        var callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
};

$(function() {
    //scrollto on click
    $('nav a, .tickets-btn').on('click',function(){
        $('body').scrollTo($(this).attr('href'),{duration:'slow', offset : -48});
        return false;
    });
    
    //change menu hover state on scroll
    var aChildren = $("nav li").children();
    var aArray = [];
    for (var i=0; i < aChildren.length; i++) {    
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    }
    var last = 0;
    $(window).scroll(debounce(function(){
        var windowPos = $(window).scrollTop() + 51;
        var windowHeight = $(window).height();
        var docHeight = $(document).height();

        for (var i=0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().top;
            var divHeight = $(theID).height();
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $("a[href='" + theID + "']").addClass("nav-active");
            } else {
                $("a[href='" + theID + "']").removeClass("nav-active");
            }
        }

        if(windowPos + windowHeight == docHeight) {
            if (!$("nav li:last-child a").hasClass("nav-active")) {
                var navActiveCurrent = $(".nav-active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
                $("nav li:last-child a").addClass("nav-active");
            }
        }
    }, 1000 / 30));

    //prizes slider
    $('#prize-slider').slick({
      centerMode: true,
      centerPadding: '50px',
      autoplay: true,
      slidesToShow: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });

    //video
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('ythack', {  
            playerVars: {
                'autoplay': 1, 
                'controls': 0,     
                'modestbranding': 1,      
                'showinfo': 0,
                'rel': 0,
                'enablejsapi': 1
            },
            events: {
                'onReady': onPlayerReady
              }        
        });
    }
    function onPlayerReady(event) {      
        event.target.mute();            
        event.target.loadPlaylist(['g3RUMSr5hUI, m5dEzLdbBSE']);    
    } 
    function fixupYoutubeHeight() {
        var $player = $('#ytplayer');
        $player.css({
            height: $player.width() * 9 / 16,
        });
        $('#video, #ytplayer').css({
            minHeight: 0,
        });
    }
    $(window).on('resize', debounce(fixupYoutubeHeight, 250));
    fixupYoutubeHeight();
});