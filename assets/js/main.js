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

var $window = $(window),
    isMobile = false;

function verifyMobile() {
    isMobile = $window.width() < 960;
}
verifyMobile();
$window.resize(debounce(verifyMobile, 1000, true));

$(function() {
    //scrollto on click
    $('nav a, .tickets-btn').on('click',function(){
        $('body').scrollTo($(this).attr('href'),{duration:'slow', offset: isMobile ? 0 : -48});
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
        var $window = $(window);
        var windowPos = $window.scrollTop() + (isMobile ? 0 : 51);
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
    }, 1000 / 10));

    //prizes slider
    $('#prize-slider').slick({
      centerMode: true,
      centerPadding: '50px',
      autoplay: false,
      slidesToShow: 1,
      responsive: [
        // {
        //   breakpoint: 768,
        //   settings: {
        //     arrows: true,
        //     centerMode: true,
        //     centerPadding: '40px',
        //     slidesToShow: 3
        //   }
        // },
        {
          breakpoint: 480,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '5px',
            slidesToShow: 1
          }
        }
      ]
    });

    //video
    setTimeout(function () {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        var player;
        window.onYouTubeIframeAPIReady = function () {
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
        };
    }, 500);
    function onPlayerReady(event) {      
        event.target.mute();            
        event.target.loadPlaylist(['g3RUMSr5hUI, m5dEzLdbBSE']);    
    }

    function fixupYoutubeHeight() {
        var $player = $('#ythack');
        $player.css({
            height: $player.width() * 9 / 16,
        });
        $player[0].height = $player.width() * 9 / 16;
        $('#video, #ythack').css({
            minHeight: 0,
        });
    }
    if (isMobile) {
        $('#video, #ythack').remove();
    } else {
        $(window).on('resize', debounce(fixupYoutubeHeight, 2000, true));
        fixupYoutubeHeight();
    }

    // accordion stuff
    $('.accordion-item').each(function (i, item) {
        var item = $(item),
            content = item.find('.accordion-content');
        content.height(0).addClass('animate')
        item.find('.accordion-title').click(function () {
            var desc = content[0],
                realHeight = desc.scrollHeight +'px';
            desc.style.height = realHeight === desc.style.height ? '0px' : realHeight;
        });
    });

});



