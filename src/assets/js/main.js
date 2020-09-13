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
    // variables
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

    const request = new XMLHttpRequest();
    const url = "telegram.php";

    let $modalClose = document.querySelectorAll(".modal__close"),
        $input_number = document.querySelectorAll(".input--number"),
        $input = document.querySelectorAll(".input"),
        $problemConectTitle = document.querySelector(".problem__conect-title"),
        $costBox = document.querySelectorAll(".cost__box"),
        $footerMainButton = document.querySelector(".footer__main-button");
    // /variables
    // ----------------------------------------------

    // universal function
    function ajaxRequest(request, url) {
        event.preventDefault();
        if (event.target.querySelector(".input--number").value.length === 17) {
            let params =
                "number=" + event.target.querySelector(".input--number").value;
            if (event.target.querySelector(".input--name") !== null)
                params +=
                    "&name=" + event.target.querySelector(".input--name").value;
            request.open("POST", url, true);
            request.setRequestHeader(
                "Content-type",
                "application/x-www-form-urlencoded"
            );
            request.addEventListener("readystatechange", ajaxReadyStateChange);
            request.send(params);
        } else {
            event.target
                .querySelector(".input--number")
                .classList.add("input--err");
        }
    }
    function callModal(step) {
        document.querySelector("body").classList.toggle("block");
        document
            .querySelector(`.modal-overlay--${step}`)
            .classList.toggle(`modal-overlay--active`);
        document
            .querySelector(`.modal--${step}`)
            .classList.toggle("modal--active");
    }
    function callModalThank() {
        callModal("thank");
    }
    function callModalForm() {
        callModal("form");
    }
    function focusInput() {
        this.classList.remove("input--err");
    }
    //  /universal function
    // ----------------------------------------------

    // event
    document.querySelector("body").addEventListener(
        "submit",
        // ajaxRequest.bind(event.target, request, url),
        function () {
            ajaxRequest(request, url);
        },
        false
    );
    document.querySelector(
        "body",
        addEventListener("click", function () {
            let arrClassName = event.target.classList;
            if (arrClassName.contains("modal-overlay--thank")) callModalThank();
            if (arrClassName.contains("modal-overlay--form")) callModalForm();
        })
    );

    $modalClose.forEach(function (item, index) {
        if (index) item.addEventListener("click", callModalThank, false);
        else item.addEventListener("click", callModalForm, false);
    });
    $input.forEach(function (item) {
        item.addEventListener("focus", focusInput, false);
    });
    $problemConectTitle.addEventListener("click", callModalForm, false);
    $costBox.forEach(function (item) {
        item.addEventListener("click", callModalForm, false);
    });
    $footerMainButton.addEventListener("click", callModalForm, false);
    // /event
    // ----------------------------------------------

    // unique function
    function ajaxReadyStateChange() {
        if (request.readyState === 4 && request.status === 200) {
            if (request.responseText) {
                if (
                    document.querySelector(
                        ".modal-overlay--form.modal-overlay--active"
                    ) !== null
                )
                    callModalForm();
                callModalThank();
                request.removeEventListener(
                    "readystatechange",
                    ajaxReadyStateChange
                );
            } else {
                console.log("Ошибка при отправке формы!");
            }
        }
    }
    // /unique function
    // ----------------------------------------------

    // Page load
    $input_number.forEach(function (item) {
        let phoneMask = IMask(item, {
            mask: "+{38}(000)000-00-00",
        });
    });

    // callModal();
    setTimeout(function () {
        document.querySelector(".footer__map").insertAdjacentHTML(
            "afterbegin",
            // Google MAP
            `
            <iframe class="footer__map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5130.119456237799!2d36.229858467139245!3d49.9914896451543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a0f1b32fff97%3A0x805bf3ae40fa3f28!2z0YPQuy4g0J_Rg9GI0LrQuNC90YHQutCw0Y8sIDEsINCl0LDRgNGM0LrQvtCyLCDQpdCw0YDRjNC60L7QstGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMLCA2MTAwMA!5e0!3m2!1sru!2sua!4v1599938276657!5m2!1sru!2sua"
                tabindex="0">
            </iframe>
            `
            // /Google MAP
        );
    }, 1500);
    // /Page load
});
