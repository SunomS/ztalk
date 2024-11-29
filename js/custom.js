$(document).ready(function () {
    // Navbar Scroll Behavior
    $(window).scroll(function () {
        const position = $(this).scrollTop();
        if (position >= 100) {
            $('.nav-menu').addClass('costum-navbar');
        } else {
            $('.nav-menu').removeClass('costum-navbar');
        }
    });

    // GSAP Timeline Animation
    let tl = gsap.timeline({ paused: true });
    tl.set(".cir", {
        scale: 0,
        transformOrigin: "center"
    })
        .set("#logo", {
            scale: 0.27,
            transformOrigin: "center",
            opacity: 0
        })
        .to(".cir", {
            ease: "back.out(3)",
            duration: 4,
            scale: gsap.utils.distribute({
                base: 1,
                amount: 3,
                from: "end"
            }),
            stagger: { each: 0.4 }
        })
        .to("#logo", {
            scale: 0.3,
            transformOrigin: "center",
            opacity: 1,
            duration: 3
        }, "-=1.5")
        .to("#support-text", {
            opacity: 1,
            duration: 2
        }, "-=1");

    // Restart the animation on logo click
    $("#logo").on("click", function () {
        tl.restart();
    });
    tl.play();

    // Smooth scroll for anchor links
    $('a.smoothScroll').on('click', function (event) {
        if (this.hash !== '') {
            event.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000);
        }
    });

    // Slider Initialization
    for (let i = 1; i <= $('.slider__slide').length; i++) {
        $('.slider__indicators').append(`<div class="slider__indicator" data-slide="${i}"></div>`);
    }
    setTimeout(function () {
        $('.slider__wrap').addClass('slider__wrap--hacked');
    }, 1000);
    function goToSlide(number) {
        $('.slider__slide').removeClass('slider__slide--active');
        $(`.slider__slide[data-slide=${number}]`).addClass('slider__slide--active');
    }
    $('.slider__next, .go-to-next').on('click', function () {
        let currentSlide = Number($('.slider__slide--active').data('slide'));
        const totalSlides = $('.slider__slide').length;
        currentSlide = (currentSlide % totalSlides) + 1;
        goToSlide(currentSlide);
    });

    // Auto-hover effect for cards
    const cards = $(".info .card");
    let currentIndex = 0;
    function autoHover() {
        cards.removeClass("hovered");
        $(cards[currentIndex]).addClass("hovered");
        currentIndex = (currentIndex + 1) % cards.length;
    }
    autoHover();
    setInterval(autoHover, 2000);

    // clock
    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const hoursRotation = (hours % 12) * 30 + (minutes / 2);
        const minutesRotation = minutes * 6;
        const secondsRotation = seconds * 6;
        $('.hand.hours').css('transform', `rotate(${hoursRotation}deg)`);
        $('.hand.minutes').css('transform', `rotate(${minutesRotation}deg)`);
        $('.hand.seconds').css('transform', `rotate(${secondsRotation}deg)`);
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Open the modal when "Book A Meeting" is clicked
    $('#bookMeetingBtn').on('click', function(event) {
        event.preventDefault(); 
        $('#calendlyModal').fadeIn(); 
    });

    $('.close').on('click', function() {
        $('#calendlyModal').fadeOut(); 
    });
    
    $(window).on('click', function(event) {
        if ($(event.target).is('#calendlyModal')) {
            $('#calendlyModal').fadeOut(); 
        }
    });
});
