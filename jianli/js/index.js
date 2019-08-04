//鐑涘厜鏁堟灉
var mouse = {
        X: 0,
        Y: 0,
        CX: 0,
        CY: 0
    },
    block = {
        X: mouse.X,
        Y: mouse.Y,
        CX: mouse.CX,
        CY: mouse.CY
    };
$('.show-box').on('mousemove', function (e) {
    mouse.X = (e.pageX - $(this).offset().left) - $('.show-box').width() / 2;
    mouse.Y = (e.pageY - $(this).offset().top) - $('.show-box').height() / 2
});
$('.show-box').on('mouseleave', function (e) {
    mouse.X = mouse.CX;
    mouse.Y = mouse.CY
});
setInterval(function () {
    block.CY += (mouse.Y - block.CY) / 12;
    block.CX += (mouse.X - block.CX) / 12;
    $('.show-box .circleLight').css('background', 'radial-gradient(circle at ' + mouse.X + 'px ' + mouse.Y + 'px, #FEFFFB, transparent)');
    $('.show-box').css('transform', 'scale(1.03) translate(' + (block.CX * 0.05) + 'px, ' + (block.CY * 0.05) + 'px) rotateX(' + (block.CY * 0.05) + 'deg) rotateY(' + (block.CX * 0.05) + 'deg)')
}, 30);

//鑱旂郴鏂瑰紡
var tips = $('.tips');
$('.list li').hover(
    function () {
        $(this).find(tips).show(30);
    }, function () {
        $(this).find(tips).hide();
    }
);
$('.list li a').click(function () {
    alert('phone:13183032674');
});

//瀵艰埅鏍�
var navBar = true;
$('.menu-btn').click(function () {
    if (navBar) {
        $('.menu').slideDown(300);
    } else {
        $('.menu').slideUp(300);
    }
    navBar = !navBar;
});
if ($(window).width() < 768) {
    $('.menu li').click(function () {
        $('.menu').slideUp(300);
    });
}

//GoTop
$(window).scroll(function () {
    $(window).scrollTop() > document.documentElement.clientHeight / 2 ? $('#GoUp').fadeIn() : $('#GoUp').fadeOut();
    $('.menu-fixed').hide();
});
$('#GoUp').click(function () {
    $('html,body').stop().animate({
        scrollTop: 0
    }, 500);
});

var UnU = false;
$('.logo').on('click', function () {
    if (UnU) {
        play();
    } else {
        $('#audio').get(0).pause();
        $(this).css('animation', 'none');
    }
    UnU = !UnU;
});

$('.logo').css('animation', 'music 5s infinite linear');
var musicUrl = 'https://m8.music.126.net/20190123232934/0f34155137e6ca232332bf65ca6f1fb2/ymusic/36dd/2955/b8d8/c11b9a875c2b3ae666a7314bb1a10e0e.mp3';
$('#audio').attr("src", musicUrl);

function play() {
    $('#audio').get(0).play();
    $('.logo').css('animation', 'music 5s infinite linear');
}


$(function () {
    var a_idx = 0;
    jQuery(document).ready(function ($) {
        $('body').click(function (e) {
            var font = ['你','好'];
            var $i = $('<span/>').text(font[a_idx]);
            a_idx = (a_idx + 1) % font.length;
            var x = e.pageX, y = e.pageY;
            $i.css({
                'z-index': 99999,
                'top': y - 20,
                'left': x,
                'position': 'absolute',
                'color': '#12A3EA',
                'font-weight': '700',
                'font-family': 'hyllh'
            });
            $('body').append($i);
            $i.animate(
                {'top': y - 180, 'opacity': 0},
                1500,
                function () {
                    $i.remove();
                }
            );
        });
    });
});
$('.show-box > h1,.show-box > h3,.show-box > p').addClass('animated fadeInUp');
$('.my-avatar,.headline,.flex-item,.say,.timeline,.contact-box').addClass('animated fadeIn');
$('.my-avatar,.headline,.flex-item,.say,.timeline,.contact-box').attr('data-wow-duration', '1s');
$('.view-box').addClass('animated bounceInRight');
$('.moveup').addClass('animated fadeInUp');
var item = $('.flex-wrap > .flex-item');
for (var i = 0; i < item.length; i++) {
    item.eq(i).attr('data-wow-delay', (i / 10) + 's');
}
$(window).load(function () {
    $('body').addClass('loaded');
    $('#loeder-wrapper').fadeOut(300);
    // setTimeout(function(){
    // 	$('.pv').fadeOut(300);
    // },6000);
    setTimeout(function () {
        play()
    }, 5000);
});
// ----- Variable declaration

var data = {
    dt: new Date(),
    hours: {
        el: document.querySelector('#hours'),
        val: 0
    },
    minutes: {
        el: document.querySelector('#minutes'),
        val: 0
    },
    seconds: {
        el: document.querySelector('#seconds'),
        val: 0
    },
    renderTime: 1000
};

// ----- Clock rendering logic

updateTime = () => {
    let hour   = data.dt.getHours();
    let minute = data.dt.getMinutes();
    let second = data.dt.getSeconds();

    data.hours.el.classList.add('moving');
    data.minutes.el.classList.add('moving');
    data.seconds.el.classList.add('moving');

    data.hours.val   = (hour == 0 && data.hours.val == 59 * 6 * 5) ? 360 : (hour * 6 * 5);
    data.minutes.val = (minute == 0 && data.minutes.val == 59 * 6) ? 360 : (minute * 6);
    data.seconds.val = (second == 0 && data.seconds.val == 59 * 6) ? 360 : (second * 6);

    data.hours.el.style.transform   = `translate(-50%, -75%) rotate(${data.hours.val}deg)`;
    data.minutes.el.style.transform = `translate(-50%, -75%) rotate(${data.minutes.val}deg)`;
    data.seconds.el.style.transform = `translate(-50%, -75%) rotate(${data.seconds.val}deg)`;

    data.dt.setSeconds(second + 1);
};

// ----- Clock execution

setInterval(() => {
    updateTime();
}, data.renderTime);

updateTime();

// ----- Events area

data.seconds.el.addEventListener('transitionend', () => {
    data.hours.el.classList.remove('moving');
    data.minutes.el.classList.remove('moving');
    data.seconds.el.classList.remove('moving');

    if (data.hours.val == 360) {
        data.hours.el.style.transform = 'translate(-50%, -75%) rotate(0deg)';
    }

    if (data.minutes.val == 360) {
        data.minutes.el.style.transform = 'translate(-50%, -75%) rotate(0deg)';
    }

    if (data.seconds.val == 360) {
        data.seconds.el.style.transform = 'translate(-50%, -75%) rotate(0deg)';
    }
});


