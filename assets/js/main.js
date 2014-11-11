
$(function() {
    //scrollto on click
    $('nav a, .tickets-btn').on('click',function(){
        $('body').scrollTo($(this).attr('href'),{duration:'slow', offset : -50});
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
    $(window).scroll(function(){
        var now = Date.now();
        if (last < now - 50) {
            return;
        }
        last = now;
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
    });       
    
    //prizes slider
    window.mySwipe = new Swipe(document.getElementById('prize-slider'), {
      startSlide: 2,
      speed: 400,
      auto: 3000,
      continuous: true,
      disableScroll: false,
      stopPropagation: false,
      callback: function(index, elem) {},
      transitionEnd: function(index, elem) {}
    });

    //video
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('ytplayer', {
            events: {
                'onReady': onPlayerReady,
                onStateChange: function(e){
                    var id = 'bBjTM8UEYBE';
                    if(e.data === YT.PlayerState.ENDED){
                        player.loadVideoById(id);
                    }
                }
            },
            playerVars: {
                'controls': 0,           
                'showinfo': 0,
                'rel': 0,
                'loop': 1,
                'start': 18,
                'end': 150
            }
        });
        
    }
    function onPlayerReady() {
        player.playVideo();
        player.mute();
    }
});


