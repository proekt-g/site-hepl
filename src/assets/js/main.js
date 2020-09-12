document.onreadystatechange = function () {
    if (document.readyState === "interactive") {
        if (document.body.clientWidth <= 1200) {
            document
                .querySelector(".welcome__inner")
                .insertAdjacentElement(
                    "afterbegin",
                    document.querySelector(".welcome__title")
                );
        }
    }
};
window.addEventListener("load", function () {
    const swiperTop = new Swiper(".slider__inner.swiper-container", {
        speed: 700,
        grabCursor: true,
        spaceBetween: 10,
        autoHeight: true,
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
    const swiperWelcome = new Swiper(".welcome__slider.swiper-container", {
        grabCursor: true,
        speed: 700,
        spaceBetween: 60,
        autoHeight: true,
        autoplay: {
            delay: 4000,
        },
        pagination: {
            el: ".welcome__pagination",
            clickable: true,
        },
    });
    const swiperTeam = new Swiper(".team__slider.swiper-container", {
        grabCursor: true,
        speed: 700,
        spaceBetween: 30,
        slidesPerView: "auto",
        pagination: {
            el: ".team__pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".team__arrow-next",
            prevEl: ".team__arrow-prev",
        },
        breakpoints: {
            769: {
                pagination: {
                    el: null,
                },
            },
        },
    });
    const phoneMask = IMask(document.querySelector(".input-number"), {
        mask: "+{38}(000)000-00-00",
    });
});
