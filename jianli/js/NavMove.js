
(function () {

    var NavLi = $(".menu li");
    var Content = $(".js-container");
    var Move = $(".navmove");

    var length = Content.length;
    var index = 0;
    var onOff = true;
    var flag;
    var prevWidth;

    var $left;
    var $width;
    NavMove();
    $('.menu').each(function () {
        NavLi.mouseenter(function () {
            index = $(this).index();
            $left = $(this).offset().left;
            $width = $(this).width();

            NavLi.mousemove(function () {
                Move.css({
                    'left': $left,
                    'width': $width
                });
            });

            NavLi.click(function () {
                Move.css({
                    'left': $left,
                    'width': $width
                });
                flag = $left;
                prevWidth = $width;
            })

            NavLi.mouseout(function () {
                Move.css({
                    'left': flag,
                    'width': prevWidth
                });
            });
        });
    });

    NavLi.click(function () {
        onOff = false;
        index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        var navOffsetTop = Content.eq(index).offset().top - 50;
        $('body,html').animate({
            scrollTop: navOffsetTop
        }, 500, function () {
            onOff = true;
        });
    });

    function NavMove() {
        var _Lindex = $(".menu li.active").index();
        var MoveLeft = NavLi.eq(_Lindex).offset().left;
        var MoveWidth = NavLi.eq(_Lindex).width();
        Move.css({
            'left': MoveLeft,
            'width': MoveWidth
        })
        flag = MoveLeft;
        prevWidth = MoveWidth;
    }

    $(window).scroll(function () {
        var Nav = $(".nav");
        var scrollTopY = $(window).scrollTop();
        scrollTopY > Content.eq(0).offset().top - 51 ? Nav.addClass('fixed') : Nav.removeClass('fixed');  //瀵艰埅缃《
        if (onOff) {
            for (var i = 0; i < length; i++) {
                if (scrollTopY < Content.eq(i).offset().top - 50) {
                    index = i - 1;
                    if (index < 0) {
                        index = 0;
                        NavLi.removeClass('active');
                    } else {
                        NavLi.eq(index).addClass('active').siblings().removeClass('active');
                        NavMove();
                    }
                    break;
                } else {
                    index = i;
                    NavLi.eq(index).addClass('active').siblings().removeClass('active');
                    NavMove();
                }
            }
        }
    });
    $(window).resize(function () {
        NavMove();
    });
})();