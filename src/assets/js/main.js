// document.onreadystatechange = function() {
//     if (document.readyState === "interactive") {
//     }
// }
window.addEventListener("load", function () {
    const swiperTop = new Swiper(".slider__inner.swiper-container", {
        speed: 700,
        grabCursor: true,
        spaceBetween: 10,
        autoplay: {
            delay: 2500,
        },
        pagination: {
            el: ".slider__pagination",
            clickable: true,
        },
    });
    const swiperProffit = new Swiper(".proffit__inner.swiper-container", {
        slidesPerView: 1,
        spaceBetween: 68,
        grabCursor: true,
        pagination: {
            el: ".proffit__pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".proffit__arrow-next",
            prevEl: ".proffit__arrow-prev",
        },
        breakpoints: {
            501: {
                slidesPerView: "auto",
            },
        },
    });
});
