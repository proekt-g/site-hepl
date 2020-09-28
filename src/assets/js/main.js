document.onreadystatechange = function () {
  if (document.readyState === "interactive") {
    if (document.body.clientWidth <= 1200) {
      document.querySelector(".welcome__inner").insertAdjacentElement("afterbegin", document.querySelector(".welcome__title"));
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

  if ((window.innerWidth > 0 ? window.innerWidth : screen.width) <= 1200) {
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
  }

  const request = new XMLHttpRequest();
  const url = "telegram.php";

  let $modalClose = document.querySelectorAll(".modal__close"),
    $input_number = document.querySelectorAll(".input--number"),
    $input = document.querySelectorAll(".input"),
    $problemConectTitle = document.querySelector(".problem__conect-title"),
    $costBox = document.querySelectorAll(".cost__box"),
    $footerMainButton = document.querySelector(".footer__main-button"),
    $calculatorStep_active = document.querySelector(".calculator__step--active"),
    $lastStep = document.querySelector("#last-step");

  let heightIndex = parseInt(getComputedStyle($calculatorStep_active).paddingTop) + parseInt(getComputedStyle($calculatorStep_active).paddingBottom),
    heightIndexBg = parseInt(getComputedStyle($lastStep).marginBottom) + parseInt(getComputedStyle($lastStep).marginTop) + $lastStep.offsetHeight,
    startHeightStep = document.querySelector("#last-step").offsetHeight;

  let exceptionsDeviceProblem, globalDevices, globalModel, topBgCalculator;

  let dataBasePhone = [
    {
      character: "Не работает камера",
      type: "Замена задней камеры",
      info: [
        { model: "5s", price: "300" },
        { model: "5c", price: "300" },
        { model: "6", price: "700" },
        { model: "6+", price: "700" },
        { model: "6s", price: "850" },
        { model: "6s+", price: "850" },
        { model: "SE", price: "850" },
        { model: "7", price: "1200" },
        { model: "7+", price: "2000" },
        { model: "8", price: "1300" },
        { model: "8+", price: "2100" },
        { model: "X", price: "2000" },
        { model: "XS", price: "2600" },
        { model: "XR", price: "2100" },
        { model: "XS Max", price: "2600" },
        { model: "11", price: "3100" },
        { model: "11 Pro", price: "3600" },
        { model: "11 Pro Max", price: "3600" },
        { model: "SE 2020", price: "2000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не работает камера",
      type: "Замена передней камеры",
      info: [
        { model: "5s", price: "300" },
        { model: "5c", price: "300" },
        { model: "6", price: "600" },
        { model: "6+", price: "600" },
        { model: "6s", price: "750" },
        { model: "6s+", price: "750" },
        { model: "SE", price: "750" },
        { model: "7", price: "850" },
        { model: "7+", price: "850" },
        { model: "8", price: "1000" },
        { model: "8+", price: "1000" },
        { model: "X", price: "1100" },
        { model: "XS", price: "1100" },
        { model: "XR", price: "1100" },
        { model: "XS Max", price: "1300" },
        { model: "11", price: "2300" },
        { model: "11 Pro", price: "2700" },
        { model: "11 Pro Max", price: "2900" },
        { model: "SE 2020", price: "2100" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не работает камера",
      type: "Ремонт платы",
      info: [
        { model: "5s", price: "от 300" },
        { model: "5c", price: "от 300" },
        { model: "6", price: "от 400" },
        { model: "6+", price: "от 400" },
        { model: "6s", price: "от 500" },
        { model: "6s+", price: "от 500" },
        { model: "SE", price: "от 500" },
        { model: "7", price: "от 600" },
        { model: "7+", price: "от 600" },
        { model: "8", price: "от 700" },
        { model: "8+", price: "от 700" },
        { model: "X", price: "от 1000" },
        { model: "XS", price: "от 1000" },
        { model: "XR", price: "от 1000" },
        { model: "XS Max", price: "от 1000" },
        { model: "11", price: "от 1500" },
        { model: "11 Pro", price: "от 1300" },
        { model: "11 Pro Max", price: "от1300" },
        { model: "SE 2020", price: "1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Проблема с кнопками",
      type: "Замена кнопки хом",
      info: [
        { model: "5s", price: "300" },
        { model: "5c", price: "300" },
        { model: "6", price: "400" },
        { model: "6+", price: "400" },
        { model: "6s", price: "550" },
        { model: "6s+", price: "550" },
        { model: "SE", price: "550" },
        { model: "7", price: "от 400" },
        { model: "7+", price: "от 400" },
        { model: "8", price: "от 500" },
        { model: "8+", price: "от 500" },
        { model: "X", price: "-" },
        { model: "XS", price: "-" },
        { model: "XR", price: "-" },
        { model: "XS Max", price: "-" },
        { model: "11", price: "-" },
        { model: "11 Pro", price: "-" },
        { model: "11 Pro Max", price: "-" },
        { model: "SE 2020", price: "от 1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Проблема с кнопками",
      type: "Замена кнопки вкючения",
      info: [
        { model: "5s", price: "300" },
        { model: "5c", price: "300" },
        { model: "6", price: "400" },
        { model: "6+", price: "400" },
        { model: "6s", price: "550" },
        { model: "6s+", price: "550" },
        { model: "SE", price: "550" },
        { model: "7", price: "700" },
        { model: "7+", price: "700" },
        { model: "8", price: "800" },
        { model: "8+", price: "800" },
        { model: "X", price: "800" },
        { model: "XS", price: "800" },
        { model: "XR", price: "1100" },
        { model: "XS Max", price: "1100" },
        { model: "11", price: "1500" },
        { model: "11 Pro", price: "1700" },
        { model: "11 Pro Max", price: "1700" },
        { model: "SE 2020", price: "1100" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Проблема с кнопками",
      type: "Замена кнопок громкости",
      info: [
        { model: "5s", price: "300" },
        { model: "5c", price: "300" },
        { model: "6", price: "400" },
        { model: "6+", price: "400" },
        { model: "6s", price: "550" },
        { model: "6s+", price: "550" },
        { model: "SE", price: "550" },
        { model: "7", price: "700" },
        { model: "7+", price: "700" },
        { model: "8", price: "800" },
        { model: "8+", price: "800" },
        { model: "X", price: "800" },
        { model: "XS", price: "800" },
        { model: "XR", price: "1100" },
        { model: "XS Max", price: "1100" },
        { model: "11", price: "1500" },
        { model: "11 Pro", price: "1700" },
        { model: "11 Pro Max", price: "1700" },
        { model: "SE 2020", price: "1100" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не работают наушники",
      type: "Замена разъема",
      info: [
        { model: "5s", price: "300" },
        { model: "5c", price: "300" },
        { model: "6", price: "550" },
        { model: "6+", price: "550" },
        { model: "6s", price: "700" },
        { model: "6s+", price: "700" },
        { model: "SE", price: "700" },
        { model: "7", price: "800" },
        { model: "7+", price: "800" },
        { model: "8", price: "850" },
        { model: "8+", price: "850" },
        { model: "X", price: "1000" },
        { model: "XS", price: "1000" },
        { model: "XR", price: "1000" },
        { model: "XS Max", price: "1300" },
        { model: "11", price: "2200" },
        { model: "11 Pro", price: "2500" },
        { model: "11 Pro Max", price: "2700" },
        { model: "SE 2020", price: "1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не работают наушники",
      type: "Ремонт платы",
      info: [
        { model: "5s", price: "от 300" },
        { model: "5c", price: "от 300" },
        { model: "6", price: "от 400" },
        { model: "6+", price: "от 400" },
        { model: "6s", price: "от 500" },
        { model: "6s+", price: "от 500" },
        { model: "SE", price: "от 500" },
        { model: "7", price: "от 700" },
        { model: "7+", price: "от 700" },
        { model: "8", price: "от 800" },
        { model: "8+", price: "от 800" },
        { model: "X", price: "от 1000" },
        { model: "XS", price: "от 1000" },
        { model: "XR", price: "от 1000" },
        { model: "XS Max", price: "от 1000" },
        { model: "11", price: "от 1500" },
        { model: "11 Pro", price: "от 1500" },
        { model: "11 Pro Max", price: "от 1500" },
        { model: "SE 2020", price: "от 1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Греется",
      type: "Диагностика",
      info: [
        { model: "5s", price: "бесплатно" },
        { model: "5c", price: "бесплатно" },
        { model: "6", price: "бесплатно" },
        { model: "6+", price: "бесплатно" },
        { model: "6s", price: "бесплатно" },
        { model: "6s+", price: "бесплатно" },
        { model: "SE", price: "бесплатно" },
        { model: "7", price: "бесплатно" },
        { model: "7+", price: "бесплатно" },
        { model: "8", price: "бесплатно" },
        { model: "8+", price: "бесплатно" },
        { model: "X", price: "бесплатно" },
        { model: "XS", price: "бесплатно" },
        { model: "XR", price: "бесплатно" },
        { model: "XS Max", price: "бесплатно" },
        { model: "11", price: "бесплатно" },
        { model: "11 Pro", price: "бесплатно" },
        { model: "11 Pro Max", price: "бесплатно" },
        { model: "SE 2020", price: "бесплатно" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Греется",
      type: "Ремонт платы",
      info: [
        { model: "5s", price: "от 300" },
        { model: "5c", price: "от 300" },
        { model: "6", price: "от 400" },
        { model: "6+", price: "от 400" },
        { model: "6s", price: "от 500" },
        { model: "6s+", price: "от 500" },
        { model: "SE", price: "от 500" },
        { model: "7", price: "от 700" },
        { model: "7+", price: "от 700" },
        { model: "8", price: "от 800" },
        { model: "8+", price: "от 800" },
        { model: "X", price: "от 1000" },
        { model: "XS", price: "от 1000" },
        { model: "XR", price: "от 1000" },
        { model: "XS Max", price: "от 1000" },
        { model: "11", price: "от 1500" },
        { model: "11 Pro", price: "от 1500" },
        { model: "11 Pro Max", price: "от 1500" },
        { model: "SE 2020", price: "от 1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не заряжается",
      type: "Замена аккумулятора",
      info: [
        { model: "5s", price: "350" },
        { model: "5c", price: "350" },
        { model: "6", price: "500" },
        { model: "6+", price: "500" },
        { model: "6s", price: "650" },
        { model: "6s+", price: "650" },
        { model: "SE", price: "650" },
        { model: "7", price: "650" },
        { model: "7+", price: "750" },
        { model: "8", price: "700" },
        { model: "8+", price: "800" },
        { model: "X", price: "1100" },
        { model: "XS", price: "1100" },
        { model: "XR", price: "1100" },
        { model: "XS Max", price: "1300" },
        { model: "11", price: "1900" },
        { model: "11 Pro", price: "2300" },
        { model: "11 Pro Max", price: "2500" },
        { model: "SE 2020", price: "1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не заряжается",
      type: "Замена разъема",
      info: [
        { model: "5s", price: "300" },
        { model: "5c", price: "300" },
        { model: "6", price: "550" },
        { model: "6+", price: "550" },
        { model: "6s", price: "700" },
        { model: "6s+", price: "700" },
        { model: "SE", price: "700" },
        { model: "7", price: "900" },
        { model: "7+", price: "900" },
        { model: "8", price: "950" },
        { model: "8+", price: "950" },
        { model: "X", price: "1000" },
        { model: "XS", price: "1000" },
        { model: "XR", price: "1000" },
        { model: "XS Max", price: "1300" },
        { model: "11", price: "2200" },
        { model: "11 Pro", price: "2500" },
        { model: "11 Pro Max", price: "2900" },
        { model: "SE 2020", price: "1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не заряжается",
      type: "Ремонт платы",
      info: [
        { model: "5s", price: "от 300" },
        { model: "5c", price: "от 300" },
        { model: "6", price: "от 400" },
        { model: "6+", price: "от 400" },
        { model: "6s", price: "от 500" },
        { model: "6s+", price: "от 500" },
        { model: "SE", price: "от 500" },
        { model: "7", price: "от 700" },
        { model: "7+", price: "от 700" },
        { model: "8", price: "от 800" },
        { model: "8+", price: "от 800" },
        { model: "X", price: "от 1000" },
        { model: "XS", price: "от 1000" },
        { model: "XR", price: "от 1000" },
        { model: "XS Max", price: "от 1000" },
        { model: "11", price: "от 1500" },
        { model: "11 Pro", price: "от 1500" },
        { model: "11 Pro Max", price: "от 1500" },
        { model: "SE 2020", price: "от 1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Проблема с динамиками",
      type: "Замена верхнего динамика",
      info: [
        { model: "5s", price: "300" },
        { model: "5c", price: "300" },
        { model: "6", price: "450" },
        { model: "6+", price: "450" },
        { model: "6s", price: "600" },
        { model: "6s+", price: "600" },
        { model: "SE", price: "600" },
        { model: "7", price: "400" },
        { model: "7+", price: "400" },
        { model: "8", price: "500" },
        { model: "8+", price: "500" },
        { model: "X", price: "450" },
        { model: "XS", price: "450" },
        { model: "XR", price: "450" },
        { model: "XS Max", price: "550" },
        { model: "11", price: "700" },
        { model: "11 Pro", price: "700" },
        { model: "11 Pro Max", price: "800" },
        { model: "SE 2020", price: "450" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Проблема с динамиками",
      type: "Замена нижнего динамика",
      info: [
        { model: "5s", price: "300" },
        { model: "5c", price: "300" },
        { model: "6", price: "450" },
        { model: "6+", price: "450" },
        { model: "6s", price: "600" },
        { model: "6s+", price: "600" },
        { model: "SE", price: "600" },
        { model: "7", price: "400" },
        { model: "7+", price: "400" },
        { model: "8", price: "500" },
        { model: "8+", price: "500" },
        { model: "X", price: "450" },
        { model: "XS", price: "450" },
        { model: "XR", price: "450" },
        { model: "XS Max", price: "550" },
        { model: "11", price: "700" },
        { model: "11 Pro", price: "700" },
        { model: "11 Pro Max", price: "800" },
        { model: "SE 2020", price: "450" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Проблема с динамиками",
      type: "Ремонт платы",
      info: [
        { model: "5s", price: "от 300" },
        { model: "5c", price: "от 300" },
        { model: "6", price: "от 400" },
        { model: "6+", price: "от 400" },
        { model: "6s", price: "от 500" },
        { model: "6s+", price: "от 500" },
        { model: "SE", price: "от 500" },
        { model: "7", price: "от 700" },
        { model: "7+", price: "от 700" },
        { model: "8", price: "от 800" },
        { model: "8+", price: "от 800" },
        { model: "X", price: "от 1000" },
        { model: "XS", price: "от 1000" },
        { model: "XR", price: "от 1000" },
        { model: "XS Max", price: "от 1000" },
        { model: "11", price: "от 1500" },
        { model: "11 Pro", price: "от 1500" },
        { model: "11 Pro Max", price: "от 1500" },
        { model: "SE 2020", price: "от 1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Нет сети",
      type: "Замена антены",
      info: [
        { model: "5s", price: "300" },
        { model: "5c", price: "300" },
        { model: "6", price: "550" },
        { model: "6+", price: "550" },
        { model: "6s", price: "700" },
        { model: "6s+", price: "700" },
        { model: "SE", price: "700" },
        { model: "7", price: "600" },
        { model: "7+", price: "600" },
        { model: "8", price: "700" },
        { model: "8+", price: "700" },
        { model: "X", price: "1000" },
        { model: "XS", price: "1000" },
        { model: "XR", price: "1000" },
        { model: "XS Max", price: "1300" },
        { model: "11", price: "1600" },
        { model: "11 Pro", price: "1800" },
        { model: "11 Pro Max", price: "1800" },
        { model: "SE 2020", price: "1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Нет сети",
      type: "Ремонт платы",
      info: [
        { model: "5s", price: "от 300" },
        { model: "5c", price: "от 300" },
        { model: "6", price: "от 400" },
        { model: "6+", price: "от 400" },
        { model: "6s", price: "от 500" },
        { model: "6s+", price: "от 500" },
        { model: "SE", price: "от 500" },
        { model: "7", price: "от 700" },
        { model: "7+", price: "от 700" },
        { model: "8", price: "от 800" },
        { model: "8+", price: "от 800" },
        { model: "X", price: "от 1000" },
        { model: "XS", price: "от 1000" },
        { model: "XR", price: "от 1000" },
        { model: "XS Max", price: "от 1000" },
        { model: "11", price: "от 1500" },
        { model: "11 Pro", price: "от 1500" },
        { model: "11 Pro Max", price: "от 1500" },
        { model: "SE 2020", price: "от 1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Попала влага",
      type: "Диагностика",
      info: [
        { model: "5s", price: "бесплатно" },
        { model: "5c", price: "бесплатно" },
        { model: "6", price: "бесплатно" },
        { model: "6+", price: "бесплатно" },
        { model: "6s", price: "бесплатно" },
        { model: "6s+", price: "бесплатно" },
        { model: "SE", price: "бесплатно" },
        { model: "7", price: "бесплатно" },
        { model: "7+", price: "бесплатно" },
        { model: "8", price: "бесплатно" },
        { model: "8+", price: "бесплатно" },
        { model: "X", price: "бесплатно" },
        { model: "XS", price: "бесплатно" },
        { model: "XR", price: "бесплатно" },
        { model: "XS Max", price: "бесплатно" },
        { model: "11", price: "бесплатно" },
        { model: "11 Pro", price: "бесплатно" },
        { model: "11 Pro Max", price: "бесплатно" },
        { model: "SE 2020", price: "бесплатно" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Попала влага",
      type: "Ремонт платы",
      info: [
        { model: "5s", price: "от 300" },
        { model: "5c", price: "от 300" },
        { model: "6", price: "от 400" },
        { model: "6+", price: "от 400" },
        { model: "6s", price: "от 500" },
        { model: "6s+", price: "от 500" },
        { model: "SE", price: "от 500" },
        { model: "7", price: "от 700" },
        { model: "7+", price: "от 700" },
        { model: "8", price: "от 800" },
        { model: "8+", price: "от 800" },
        { model: "X", price: "от 1000" },
        { model: "XS", price: "от 1000" },
        { model: "XR", price: "от 1000" },
        { model: "XS Max", price: "от 1000" },
        { model: "11", price: "от 1500" },
        { model: "11 Pro", price: "от 1500" },
        { model: "11 Pro Max", price: "от 1500" },
        { model: "SE 2020", price: "от 1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Просит iTunes или завис",
      type: "Перепрошивка",
      info: [
        { model: "5s", price: "200" },
        { model: "5c", price: "200" },
        { model: "6", price: "200" },
        { model: "6+", price: "200" },
        { model: "6s", price: "200" },
        { model: "6s+", price: "200" },
        { model: "SE", price: "200" },
        { model: "7", price: "200" },
        { model: "7+", price: "200" },
        { model: "8", price: "200" },
        { model: "8+", price: "200" },
        { model: "X", price: "200" },
        { model: "XS", price: "200" },
        { model: "XR", price: "200" },
        { model: "XS Max", price: "200" },
        { model: "11", price: "200" },
        { model: "11 Pro", price: "200" },
        { model: "11 Pro Max", price: "200" },
        { model: "SE 2020", price: "200" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Просит iTunes или завис",
      type: "Ремонт платы",
      info: [
        { model: "5s", price: "от 300" },
        { model: "5c", price: "от 300" },
        { model: "6", price: "от 400" },
        { model: "6+", price: "от 400" },
        { model: "6s", price: "от 500" },
        { model: "6s+", price: "от 500" },
        { model: "SE", price: "от 500" },
        { model: "7", price: "от 700" },
        { model: "7+", price: "от 700" },
        { model: "8", price: "от 800" },
        { model: "8+", price: "от 800" },
        { model: "X", price: "от 1000" },
        { model: "XS", price: "от 1000" },
        { model: "XR", price: "от 1000" },
        { model: "XS Max", price: "от 1000" },
        { model: "11", price: "от 1500" },
        { model: "11 Pro", price: "от 1500" },
        { model: "11 Pro Max", price: "от 1500" },
        { model: "SE 2020", price: "от 1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не помню пароль",
      type: "Перепрошивка",
      info: [
        { model: "5s", price: "200" },
        { model: "5c", price: "200" },
        { model: "6", price: "200" },
        { model: "6+", price: "200" },
        { model: "6s", price: "200" },
        { model: "6s+", price: "200" },
        { model: "SE", price: "200" },
        { model: "7", price: "200" },
        { model: "7+", price: "200" },
        { model: "8", price: "200" },
        { model: "8+", price: "200" },
        { model: "X", price: "200" },
        { model: "XS", price: "200" },
        { model: "XR", price: "200" },
        { model: "XS Max", price: "200" },
        { model: "11", price: "200" },
        { model: "11 Pro", price: "200" },
        { model: "11 Pro Max", price: "200" },
        { model: "SE 2020", price: "200" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Разбит дисплей",
      type: "Замена стекла диспея",
      info: [
        { model: "5s", price: "350" },
        { model: "5c", price: "350" },
        { model: "6", price: "650" },
        { model: "6+", price: "650" },
        { model: "6s", price: "800" },
        { model: "6s+", price: "800" },
        { model: "SE", price: "800" },
        { model: "7", price: "1000" },
        { model: "7+", price: "1300" },
        { model: "8", price: "1100" },
        { model: "8+", price: "1400" },
        { model: "X", price: "3000" },
        { model: "XS", price: "3000" },
        { model: "XR", price: "3000" },
        { model: "XS Max", price: "4200" },
        { model: "11", price: "4900" },
        { model: "11 Pro", price: "6900" },
        { model: "11 Pro Max", price: "7900" },
        { model: "SE 2020", price: "3000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Разбит дисплей",
      type: "Замена дисплея оригинал",
      info: [
        { model: "5s", price: "700" },
        { model: "5c", price: "700" },
        { model: "6", price: "1200" },
        { model: "6+", price: "1200" },
        { model: "6s", price: "1350" },
        { model: "6s+", price: "1350" },
        { model: "SE", price: "1350" },
        { model: "7", price: "1500" },
        { model: "7+", price: "1900" },
        { model: "8", price: "1600" },
        { model: "8+", price: "2000" },
        { model: "X", price: "4900" },
        { model: "XS", price: "4900" },
        { model: "XR", price: "3900" },
        { model: "XS Max", price: "6900" },
        { model: "11", price: "7500" },
        { model: "11 Pro", price: "12000" },
        { model: "11 Pro Max", price: "13000" },
        { model: "SE 2020", price: "3900" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Разбит дисплей",
      type: "Замена дисплея аналог",
      info: [
        { model: "5s", price: "550" },
        { model: "5c", price: "550" },
        { model: "6", price: "900" },
        { model: "6+", price: "900" },
        { model: "6s", price: "1050" },
        { model: "6s+", price: "1050" },
        { model: "SE", price: "1050" },
        { model: "7", price: "900" },
        { model: "7+", price: "1200" },
        { model: "8", price: "1000" },
        { model: "8+", price: "1300" },
        { model: "X", price: "3500" },
        { model: "XS", price: "3500" },
        { model: "XR", price: "2500" },
        { model: "XS Max", price: "4900" },
        { model: "11", price: "5500" },
        { model: "11 Pro", price: "8900" },
        { model: "11 Pro Max", price: "9900" },
        { model: "SE 2020", price: "2500" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не гаснет при разговоре",
      type: "Замена датчика приблежения",
      info: [
        { model: "5s", price: "300" },
        { model: "5c", price: "300" },
        { model: "6", price: "600" },
        { model: "6+", price: "600" },
        { model: "6s", price: "750" },
        { model: "6s+", price: "750" },
        { model: "SE", price: "750" },
        { model: "7", price: "500" },
        { model: "7+", price: "600" },
        { model: "8", price: "600" },
        { model: "8+", price: "700" },
        { model: "X", price: "1000" },
        { model: "XS", price: "1000" },
        { model: "XR", price: "1000" },
        { model: "XS Max", price: "1300" },
        { model: "11", price: "1900" },
        { model: "11 Pro", price: "2200" },
        { model: "11 Pro Max", price: "2500" },
        { model: "SE 2020", price: "1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не гаснет при разговоре",
      type: "Ремонт платы",
      info: [
        { model: "5s", price: "от 300" },
        { model: "5c", price: "от 300" },
        { model: "6", price: "от 400" },
        { model: "6+", price: "от 400" },
        { model: "6s", price: "от 500" },
        { model: "6s+", price: "от 500" },
        { model: "SE", price: "от 500" },
        { model: "7", price: "от 700" },
        { model: "7+", price: "от 700" },
        { model: "8", price: "от 800" },
        { model: "8+", price: "от 800" },
        { model: "X", price: "от 1000" },
        { model: "XS", price: "от 1000" },
        { model: "XR", price: "от 1000" },
        { model: "XS Max", price: "от 1000" },
        { model: "11", price: "от 1500" },
        { model: "11 Pro", price: "от 1500" },
        { model: "11 Pro Max", price: "от 1500" },
        { model: "SE 2020", price: "от 1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Нет изображения",
      type: "Замена дисплея оригинал",
      info: [
        { model: "5s", price: "700" },
        { model: "5c", price: "700" },
        { model: "6", price: "1200" },
        { model: "6+", price: "1200" },
        { model: "6s", price: "1350" },
        { model: "6s+", price: "1350" },
        { model: "SE", price: "1350" },
        { model: "7", price: "1500" },
        { model: "7+", price: "1900" },
        { model: "8", price: "1600" },
        { model: "8+", price: "2000" },
        { model: "X", price: "4900" },
        { model: "XS", price: "4900" },
        { model: "XR", price: "4900" },
        { model: "XS Max", price: "6900" },
        { model: "11", price: "7500" },
        { model: "11 Pro", price: "12000" },
        { model: "11 Pro Max", price: "13000" },
        { model: "SE 2020", price: "4900" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Нет изображения",
      type: "Замена дисплея аналог",
      info: [
        { model: "5s", price: "550" },
        { model: "5c", price: "550" },
        { model: "6", price: "900" },
        { model: "6+", price: "900" },
        { model: "6s", price: "1050" },
        { model: "6s+", price: "1050" },
        { model: "SE", price: "1050" },
        { model: "7", price: "900" },
        { model: "7+", price: "1200" },
        { model: "8", price: "1000" },
        { model: "8+", price: "1300" },
        { model: "X", price: "3500" },
        { model: "XS", price: "3500" },
        { model: "XR", price: "2500" },
        { model: "XS Max", price: "4900" },
        { model: "11", price: "5500" },
        { model: "11 Pro", price: "8900" },
        { model: "11 Pro Max", price: "9900" },
        { model: "SE 2020", price: "2500" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Нет изображения",
      type: "Ремонт платы",
      info: [
        { model: "5s", price: "от 300" },
        { model: "5c", price: "от 300" },
        { model: "6", price: "от 400" },
        { model: "6+", price: "от 400" },
        { model: "6s", price: "от 500" },
        { model: "6s+", price: "от 500" },
        { model: "SE", price: "от 500" },
        { model: "7", price: "от 700" },
        { model: "7+", price: "от 700" },
        { model: "8", price: "от 800" },
        { model: "8+", price: "от 800" },
        { model: "X", price: "от 1000" },
        { model: "XS", price: "от 1000" },
        { model: "XR", price: "от 1000" },
        { model: "XS Max", price: "от 1000" },
        { model: "11", price: "от 1500" },
        { model: "11 Pro", price: "от 1500" },
        { model: "11 Pro Max", price: "от 1500" },
        { model: "SE 2020", price: "от 1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Быстро разряжается",
      type: "Замена аккумулятора",
      info: [
        { model: "5s", price: "350" },
        { model: "5c", price: "350" },
        { model: "6", price: "500" },
        { model: "6+", price: "500" },
        { model: "6s", price: "650" },
        { model: "6s+", price: "650" },
        { model: "SE", price: "650" },
        { model: "7", price: "650" },
        { model: "7+", price: "750" },
        { model: "8", price: "700" },
        { model: "8+", price: "850" },
        { model: "X", price: "1000" },
        { model: "XS", price: "1000" },
        { model: "XR", price: "1000" },
        { model: "XS Max", price: "1300" },
        { model: "11", price: "1900" },
        { model: "11 Pro", price: "2300" },
        { model: "11 Pro Max", price: "2500" },
        { model: "SE 2020", price: "1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Быстро разряжается",
      type: "Ремонт платы",
      info: [
        { model: "5s", price: "от 300" },
        { model: "5c", price: "от 300" },
        { model: "6", price: "от 400" },
        { model: "6+", price: "от 400" },
        { model: "6s", price: "от 700" },
        { model: "6s+", price: "от 700" },
        { model: "SE", price: "от 700" },
        { model: "7", price: "от 700" },
        { model: "7+", price: "от 700" },
        { model: "8", price: "от 800" },
        { model: "8+", price: "от 800" },
        { model: "X", price: "от 1000" },
        { model: "XS", price: "от 1000" },
        { model: "XR", price: "от 1000" },
        { model: "XS Max", price: "от 1000" },
        { model: "11", price: "от 1500" },
        { model: "11 Pro", price: "от 1500" },
        { model: "11 Pro Max", price: "от 1500" },
        { model: "SE 2020", price: "от 1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не ловит Wi-Fi",
      type: "Замена антены",
      info: [
        { model: "5s", price: "300" },
        { model: "5c", price: "300" },
        { model: "6", price: "500" },
        { model: "6+", price: "500" },
        { model: "6s", price: "650" },
        { model: "6s+", price: "650" },
        { model: "SE", price: "650" },
        { model: "7", price: "750" },
        { model: "7+", price: "850" },
        { model: "8", price: "900" },
        { model: "8+", price: "900" },
        { model: "X", price: "1200" },
        { model: "XS", price: "1200" },
        { model: "XR", price: "1200" },
        { model: "XS Max", price: "1500" },
        { model: "11", price: "1600" },
        { model: "11 Pro", price: "1800" },
        { model: "11 Pro Max", price: "1800" },
        { model: "SE 2020", price: "1200" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не ловит Wi-Fi",
      type: "Ремонт платы",
      info: [
        { model: "5s", price: "от 300" },
        { model: "5c", price: "от 300" },
        { model: "6", price: "от 400" },
        { model: "6+", price: "от 400" },
        { model: "6s", price: "от 500" },
        { model: "6s+", price: "от 500" },
        { model: "SE", price: "от 700" },
        { model: "7", price: "от 700" },
        { model: "7+", price: "от 700" },
        { model: "8", price: "от 800" },
        { model: "8+", price: "от 800" },
        { model: "X", price: "от 1000" },
        { model: "XS", price: "от 1000" },
        { model: "XR", price: "от 1000" },
        { model: "XS Max", price: "от 1000" },
        { model: "11", price: "от 1500" },
        { model: "11 Pro", price: "от 1500" },
        { model: "11 Pro Max", price: "от 1500" },
        { model: "SE 2020", price: "от 1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не включается",
      type: "Замена аккумулятора",
      info: [
        { model: "5s", price: "350" },
        { model: "5c", price: "350" },
        { model: "6", price: "500" },
        { model: "6+", price: "500" },
        { model: "6s", price: "650" },
        { model: "6s+", price: "650" },
        { model: "SE", price: "650" },
        { model: "7", price: "650" },
        { model: "7+", price: "750" },
        { model: "8", price: "750" },
        { model: "8+", price: "850" },
        { model: "X", price: "1000" },
        { model: "XS", price: "1000" },
        { model: "XR", price: "1000" },
        { model: "XS Max", price: "1300" },
        { model: "11", price: "1900" },
        { model: "11 Pro", price: "2300" },
        { model: "11 Pro Max", price: "2500" },
        { model: "SE 2020", price: "1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не включается",
      type: "Замена разъема зарядки",
      info: [
        { model: "5s", price: "300" },
        { model: "5c", price: "300" },
        { model: "6", price: "550" },
        { model: "6+", price: "550" },
        { model: "6s", price: "700" },
        { model: "6s+", price: "700" },
        { model: "SE", price: "700" },
        { model: "7", price: "800" },
        { model: "7+", price: "800" },
        { model: "8", price: "900" },
        { model: "8+", price: "900" },
        { model: "X", price: "1000" },
        { model: "XS", price: "1000" },
        { model: "XR", price: "1000" },
        { model: "XS Max", price: "1300" },
        { model: "11", price: "2200" },
        { model: "11 Pro", price: "2500" },
        { model: "11 Pro Max", price: "2700" },
        { model: "SE 2020", price: "1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не включается",
      type: "Ремонт платы",
      info: [
        { model: "5s", price: "от 300" },
        { model: "5c", price: "от 300" },
        { model: "6", price: "от 400" },
        { model: "6+", price: "от 400" },
        { model: "6s", price: "от 500" },
        { model: "6s+", price: "от 500" },
        { model: "SE", price: "от 700" },
        { model: "7", price: "от 700" },
        { model: "7+", price: "от 700" },
        { model: "8", price: "от 800" },
        { model: "8+", price: "от 800" },
        { model: "X", price: "от 1000" },
        { model: "XS", price: "от 1000" },
        { model: "XR", price: "от 1000" },
        { model: "XS Max", price: "от 1000" },
        { model: "11", price: "от 1500" },
        { model: "11 Pro", price: "от 1500" },
        { model: "11 Pro Max", price: "от 1500" },
        { model: "SE 2020", price: "от 1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не включается",
      type: "Диагностика",
      info: [
        { model: "5s", price: "бесплатно" },
        { model: "5c", price: "бесплатно" },
        { model: "6", price: "бесплатно" },
        { model: "6+", price: "бесплатно" },
        { model: "6s", price: "бесплатно" },
        { model: "6s+", price: "бесплатно" },
        { model: "SE", price: "бесплатно" },
        { model: "7", price: "бесплатно" },
        { model: "7+", price: "бесплатно" },
        { model: "8", price: "бесплатно" },
        { model: "8+", price: "бесплатно" },
        { model: "X", price: "бесплатно" },
        { model: "XS", price: "бесплатно" },
        { model: "XR", price: "бесплатно" },
        { model: "XS Max", price: "бесплатно" },
        { model: "11", price: "бесплатно" },
        { model: "11 Pro", price: "бесплатно" },
        { model: "11 Pro Max", price: "бесплатно" },
        { model: "SE 2020", price: "бесплатно" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Разбитая задняя крышка",
      type: "Замена корпуса",
      info: [
        { model: "5s", price: "600" },
        { model: "5c", price: "600" },
        { model: "6", price: "800" },
        { model: "6+", price: "800" },
        { model: "6s", price: "950" },
        { model: "6s+", price: "950" },
        { model: "SE", price: "950" },
        { model: "7", price: "1450" },
        { model: "7+", price: "1600" },
        { model: "8", price: "1800" },
        { model: "8+", price: "2000" },
        { model: "X", price: "2000" },
        { model: "XS", price: "2000" },
        { model: "XR", price: "1800" },
        { model: "XS Max", price: "2500" },
        { model: "11", price: "4000" },
        { model: "11 Pro", price: "4500" },
        { model: "11 Pro Max", price: "5000" },
        { model: "SE 2020", price: "1800" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Разбитая задняя крышка",
      type: "Замена задняго стекла",
      info: [
        { model: "5s", price: "-" },
        { model: "5c", price: "-" },
        { model: "6", price: "-" },
        { model: "6+", price: "-" },
        { model: "6s", price: "-" },
        { model: "6s+", price: "-" },
        { model: "SE", price: "-" },
        { model: "7", price: "-" },
        { model: "7+", price: "-" },
        { model: "8", price: "1000" },
        { model: "8+", price: "1000" },
        { model: "X", price: "1600" },
        { model: "XS", price: "1600" },
        { model: "XR", price: "1600" },
        { model: "XS Max", price: "1800" },
        { model: "11", price: "2500" },
        { model: "11 Pro", price: "2800" },
        { model: "11 Pro Max", price: "2800" },
        { model: "SE 2020", price: "1600" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не работает вспышка",
      type: "Замена вспышки",
      info: [
        { model: "5s", price: "300" },
        { model: "5c", price: "300" },
        { model: "6", price: "400" },
        { model: "6+", price: "400" },
        { model: "6s", price: "550" },
        { model: "6s+", price: "550" },
        { model: "SE", price: "550" },
        { model: "7", price: "650" },
        { model: "7+", price: "650" },
        { model: "8", price: "750" },
        { model: "8+", price: "750" },
        { model: "X", price: "850" },
        { model: "XS", price: "850" },
        { model: "XR", price: "950" },
        { model: "XS Max", price: "950" },
        { model: "11", price: "1200" },
        { model: "11 Pro", price: "1500" },
        { model: "11 Pro Max", price: "1500" },
        { model: "SE 2020", price: "850" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не работает вспышка",
      type: "Ремонт платы",
      info: [
        { model: "5s", price: "от 300" },
        { model: "5c", price: "от 300" },
        { model: "6", price: "от 400" },
        { model: "6+", price: "от 400" },
        { model: "6s", price: "от 500" },
        { model: "6s+", price: "от 500" },
        { model: "SE", price: "от 700" },
        { model: "7", price: "от 700" },
        { model: "7+", price: "от 700" },
        { model: "8", price: "от 800" },
        { model: "8+", price: "от 800" },
        { model: "X", price: "от 1000" },
        { model: "XS", price: "от 1000" },
        { model: "XR", price: "от 1000" },
        { model: "XS Max", price: "от 1000" },
        { model: "11", price: "от 1500" },
        { model: "11 Pro", price: "от 1500" },
        { model: "11 Pro Max", price: "от 1500" },
        { model: "SE 2020", price: "от 1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не видит сим карту",
      type: "Замена разъема сим карты",
      info: [
        { model: "5s", price: "300" },
        { model: "5c", price: "300" },
        { model: "6", price: "600" },
        { model: "6+", price: "600" },
        { model: "6s", price: "750" },
        { model: "6s+", price: "750" },
        { model: "SE", price: "750" },
        { model: "7", price: "1100" },
        { model: "7+", price: "1100" },
        { model: "8", price: "1200" },
        { model: "8+", price: "1200" },
        { model: "X", price: "1500" },
        { model: "XS", price: "1500" },
        { model: "XR", price: "1500" },
        { model: "XS Max", price: "1800" },
        { model: "11", price: "2200" },
        { model: "11 Pro", price: "2900" },
        { model: "11 Pro Max", price: "2900" },
        { model: "SE 2020", price: "1500" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не видит сим карту",
      type: "Ремонт платы",
      info: [
        { model: "5s", price: "от 300" },
        { model: "5c", price: "от 300" },
        { model: "6", price: "от 400" },
        { model: "6+", price: "от 400" },
        { model: "6s", price: "от 500" },
        { model: "6s+", price: "от 500" },
        { model: "SE", price: "от 500" },
        { model: "7", price: "от 700" },
        { model: "7+", price: "от 700" },
        { model: "8", price: "от 800" },
        { model: "8+", price: "от 800" },
        { model: "X", price: "от 1000" },
        { model: "XS", price: "от 1000" },
        { model: "XR", price: "от 1000" },
        { model: "XS Max", price: "от 1000" },
        { model: "11", price: "от 1500" },
        { model: "11 Pro", price: "от 1500" },
        { model: "11 Pro Max", price: "от 1500" },
        { model: "SE 2020", price: "от 1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не хватает памяти",
      type: "Увеличение памяти",
      info: [
        { model: "5s", price: "от 700" },
        { model: "5c", price: "от 700" },
        { model: "6", price: "от 700" },
        { model: "6+", price: "от 700" },
        { model: "6s", price: "от 700" },
        { model: "6s+", price: "от 700" },
        { model: "SE", price: "от 700" },
        { model: "7", price: "от 1000" },
        { model: "7+", price: "от 1000" },
        { model: "8", price: "от 1300" },
        { model: "8+", price: "от 1300" },
        { model: "X", price: "от 1800" },
        { model: "XS", price: "от 1800" },
        { model: "XR", price: "от 1800" },
        { model: "XS Max", price: "от 2200" },
        { model: "11", price: "от 2500" },
        { model: "11 Pro", price: "от 3000" },
        { model: "11 Pro Max", price: "от 3000" },
        { model: "SE 2020", price: "от 1800" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не работает вибро",
      type: "Замена вибро",
      info: [
        { model: "5s", price: "250" },
        { model: "5c", price: "250" },
        { model: "6", price: "550" },
        { model: "6+", price: "550" },
        { model: "6s", price: "700" },
        { model: "6s+", price: "700" },
        { model: "SE", price: "700" },
        { model: "7", price: "550" },
        { model: "7+", price: "550" },
        { model: "8", price: "650" },
        { model: "8+", price: "650" },
        { model: "X", price: "1000" },
        { model: "XS", price: "1000" },
        { model: "XR", price: "1000" },
        { model: "XS Max", price: "1300" },
        { model: "11", price: "1500" },
        { model: "11 Pro", price: "1900" },
        { model: "11 Pro Max", price: "1900" },
        { model: "SE 2020", price: "1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не работает вибро",
      type: "Ремонт платы",
      info: [
        { model: "5s", price: "от 300" },
        { model: "5c", price: "от 300" },
        { model: "6", price: "от 400" },
        { model: "6+", price: "от 400" },
        { model: "6s", price: "от 500" },
        { model: "6s+", price: "от 500" },
        { model: "SE", price: "от 500" },
        { model: "7", price: "от 700" },
        { model: "7+", price: "от 700" },
        { model: "8", price: "от 800" },
        { model: "8+", price: "от 800" },
        { model: "X", price: "от 1000" },
        { model: "XS", price: "от 1000" },
        { model: "XR", price: "от 1000" },
        { model: "XS Max", price: "от 1000" },
        { model: "11", price: "от 1500" },
        { model: "11 Pro", price: "от 1500" },
        { model: "11 Pro Max", price: "от 1500" },
        { model: "SE 2020", price: "от 1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не работает PayPass",
      type: "Замена антенны",
      info: [
        { model: "5s", price: "-" },
        { model: "5c", price: "-" },
        { model: "6", price: "450" },
        { model: "6+", price: "450" },
        { model: "6s", price: "500" },
        { model: "6s+", price: "500" },
        { model: "SE", price: "500" },
        { model: "7", price: "650" },
        { model: "7+", price: "650" },
        { model: "8", price: "750" },
        { model: "8+", price: "750" },
        { model: "X", price: "950" },
        { model: "XS", price: "950" },
        { model: "XR", price: "950" },
        { model: "XS Max", price: "950" },
        { model: "11", price: "1200" },
        { model: "11 Pro", price: "1400" },
        { model: "11 Pro Max", price: "1400" },
        { model: "SE 2020", price: "от 1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      character: "Не работает PayPass",
      type: "Ремонт платы",
      info: [
        { model: "5s", price: "-" },
        { model: "5c", price: "-" },
        { model: "6", price: "от 400" },
        { model: "6+", price: "от 400" },
        { model: "6s", price: "от 450" },
        { model: "6s+", price: "от 450" },
        { model: "SE", price: "от 450" },
        { model: "7", price: "от 450" },
        { model: "7+", price: "от 450" },
        { model: "8", price: "от 500" },
        { model: "8+", price: "от 500" },
        { model: "X", price: "от 1000" },
        { model: "XS", price: "от 1000" },
        { model: "XR", price: "от 1000" },
        { model: "XS Max", price: "от 1000" },
        { model: "11", price: "от 1500" },
        { model: "11 Pro", price: "от 1500" },
        { model: "11 Pro Max", price: "от 1500" },
        { model: "SE 2020", price: "от 1000" },
      ],
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
  ];
  let dataBaseInfoPad = [
    {
      type: "Замена стекла дисплея",
      guarantee: "60",
      timing: "3 часа",
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      type: "Замена дисплея",
      guarantee: "60",
      timing: "4 часа",
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      type: "Замена аккумулятора",
      guarantee: "60",
      timing: "1 час",
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      type: "Замена разъема зарядки",
      guarantee: "60",
      timing: "1 час",
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      type: "Разблокировка iCloud",
      guarantee: "60",
      timing: "3 часа",
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      type: "Увеличение памяти",
      guarantee: "60",
      timing: "от 1 дня",
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
  ];
  let dataBaseInfoMac = [
    {
      type: "Замена стекла дисплея",
      guarantee: "60",
      timing: "3 часа",
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      type: "Замена дисплея",
      guarantee: "60",
      timing: "4 часа",
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      type: "Замена аккумулятора",
      guarantee: "60",
      timing: "1 час",
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      type: "Замена разъема зарядки",
      guarantee: "60",
      timing: "1 час",
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      type: "Разблокировка iCloud",
      guarantee: "60",
      timing: "3 часа",
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      type: "Увеличение памяти",
      guarantee: "60",
      timing: "от 1 дня",
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
  ];
  let dataBaseInfoWatch = [
    {
      type: "Замена аккумулятора",
      guarantee: "60",
      timing: "2 часа",
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      type: "Замена дисплейного модуля",
      guarantee: "60",
      timing: "от 3 часов",
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
    {
      type: "Чистка от воды",
      guarantee: "60",
      timing: "40 минут",
      text: "Оригинальный экран мы берем с другого оригинального iPad. Лучшее качество, гарантия на поломку.",
    },
  ];
  let dataBasePad = [
    {
      model: "2",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "800",
        },
        {
          type: "Замена дисплея",
          price: "900",
        },
        {
          type: "Замена аккумулятора",
          price: "900",
        },
        {
          type: "Замена разъема зарядки",
          price: "800",
        },
        {
          type: "Разблокировка iCloud",
          price: "800",
        },
        {
          type: "Увеличение памяти",
          price: "от 700",
        },
      ],
    },
    {
      model: "3",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "800",
        },
        {
          type: "Замена дисплея",
          price: "900",
        },
        {
          type: "Замена аккумулятора",
          price: "900",
        },
        {
          type: "Замена разъема зарядки",
          price: "800",
        },
        {
          type: "Разблокировка iCloud",
          price: "800",
        },
        {
          type: "Увеличение памяти",
          price: "от 700",
        },
      ],
    },
    {
      model: "4",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "800",
        },
        {
          type: "Замена дисплея",
          price: "900",
        },
        {
          type: "Замена аккумулятора",
          price: "900",
        },
        {
          type: "Замена разъема зарядки",
          price: "800",
        },
        {
          type: "Разблокировка iCloud",
          price: "800",
        },
        {
          type: "Увеличение памяти",
          price: "от 700",
        },
      ],
    },
    {
      model: "air",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "900",
        },
        {
          type: "Замена дисплея",
          price: "1800",
        },
        {
          type: "Замена аккумулятора",
          price: "1200",
        },
        {
          type: "Замена разъема зарядки",
          price: "900",
        },
        {
          type: "Разблокировка iCloud",
          price: "1400",
        },
        {
          type: "Увеличение памяти",
          price: "от 900",
        },
      ],
    },
    {
      model: "air 2",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "2000",
        },
        {
          type: "Замена дисплея",
          price: "3200",
        },
        {
          type: "Замена аккумулятора",
          price: "1200",
        },
        {
          type: "Замена разъема зарядки",
          price: "900",
        },
        {
          type: "Разблокировка iCloud",
          price: "1400",
        },
        {
          type: "Увеличение памяти",
          price: "от 900",
        },
      ],
    },
    {
      model: "air 2017",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "1800",
        },
        {
          type: "Замена дисплея",
          price: "2300",
        },
        {
          type: "Замена аккумулятора",
          price: "1400",
        },
        {
          type: "Замена разъема зарядки",
          price: "1000",
        },
        {
          type: "Разблокировка iCloud",
          price: "1800",
        },
        {
          type: "Увеличение памяти",
          price: "от 1200",
        },
      ],
    },
    {
      model: "air 2018",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "2000",
        },
        {
          type: "Замена дисплея",
          price: "2600",
        },
        {
          type: "Замена аккумулятора",
          price: "1400",
        },
        {
          type: "Замена разъема зарядки",
          price: "1000",
        },
        {
          type: "Разблокировка iCloud",
          price: "1800",
        },
        {
          type: "Увеличение памяти",
          price: "от 1200",
        },
      ],
    },
    {
      model: "mini 1",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "900",
        },
        {
          type: "Замена дисплея",
          price: "1200",
        },
        {
          type: "Замена аккумулятора",
          price: "900",
        },
        {
          type: "Замена разъема зарядки",
          price: "800",
        },
        {
          type: "Разблокировка iCloud",
          price: "1000",
        },
        {
          type: "Увеличение памяти",
          price: "от 700",
        },
      ],
    },
    {
      model: "mini 2",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "900",
        },
        {
          type: "Замена дисплея",
          price: "1200",
        },
        {
          type: "Замена аккумулятора",
          price: "900",
        },
        {
          type: "Замена разъема зарядки",
          price: "800",
        },
        {
          type: "Разблокировка iCloud",
          price: "1000",
        },
        {
          type: "Увеличение памяти",
          price: "от 700",
        },
      ],
    },
    {
      model: "mini 3",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "900",
        },
        {
          type: "Замена дисплея",
          price: "1200",
        },
        {
          type: "Замена аккумулятора",
          price: "900",
        },
        {
          type: "Замена разъема зарядки",
          price: "800",
        },
        {
          type: "Разблокировка iCloud",
          price: "1000",
        },
        {
          type: "Увеличение памяти",
          price: "от 700",
        },
      ],
    },
    {
      model: "mini 4",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "2000",
        },
        {
          type: "Замена дисплея",
          price: "3100",
        },
        {
          type: "Замена аккумулятора",
          price: "1200",
        },
        {
          type: "Замена разъема зарядки",
          price: "900",
        },
        {
          type: "Разблокировка iCloud",
          price: "1400",
        },
        {
          type: "Увеличение памяти",
          price: "от 900",
        },
      ],
    },
    {
      model: "pro 12.9 2015",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "2200",
        },
        {
          type: "Замена дисплея",
          price: "4000",
        },
        {
          type: "Замена аккумулятора",
          price: "1800",
        },
        {
          type: "Замена разъема зарядки",
          price: "1200",
        },
        {
          type: "Разблокировка iCloud",
          price: "2000",
        },
        {
          type: "Увеличение памяти",
          price: "от 1400",
        },
      ],
    },
    {
      model: "pro 12.9 2018",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "2400",
        },
        {
          type: "Замена дисплея",
          price: "4500",
        },
        {
          type: "Замена аккумулятора",
          price: "2000",
        },
        {
          type: "Замена разъема зарядки",
          price: "1200",
        },
        {
          type: "Разблокировка iCloud",
          price: "2000",
        },
        {
          type: "Увеличение памяти",
          price: "от 1400",
        },
      ],
    },
    {
      model: "pro 10.5",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "2200",
        },
        {
          type: "Замена дисплея",
          price: "5600",
        },
        {
          type: "Замена аккумулятора",
          price: "2000",
        },
        {
          type: "Замена разъема зарядки",
          price: "1200",
        },
        {
          type: "Разблокировка iCloud",
          price: "2000",
        },
        {
          type: "Увеличение памяти",
          price: "от 1400",
        },
      ],
    },
    {
      model: "pro 9.7",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "2000",
        },
        {
          type: "Замена дисплея",
          price: "4000",
        },
        {
          type: "Замена аккумулятора",
          price: "1800",
        },
        {
          type: "Замена разъема зарядки",
          price: "1200",
        },
        {
          type: "Разблокировка iCloud",
          price: "2000",
        },
        {
          type: "Увеличение памяти",
          price: "от 1400",
        },
      ],
    },
    {
      model: "pro 3 11.0",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "4500",
        },
        {
          type: "Замена дисплея",
          price: "12000",
        },
        {
          type: "Замена аккумулятора",
          price: "3000",
        },
        {
          type: "Замена разъема зарядки",
          price: "1400",
        },
        {
          type: "Увеличение памяти",
          price: "от 2000",
        },
      ],
    },
    {
      model: "pro 3 12.9",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "4800",
        },
        {
          type: "Замена дисплея",
          price: "14000",
        },
        {
          type: "Замена аккумулятора",
          price: "3200",
        },
        {
          type: "Замена разъема зарядки",
          price: "1400",
        },
        {
          type: "Увеличение памяти",
          price: "от 2000",
        },
      ],
    },
  ];
  let dataBaseMac = [
    {
      model: "2",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "800",
        },
        {
          type: "Замена дисплея",
          price: "900",
        },
        {
          type: "Замена аккумулятора",
          price: "900",
        },
        {
          type: "Замена разъема зарядки",
          price: "800",
        },
        {
          type: "Разблокировка iCloud",
          price: "800",
        },
        {
          type: "Увеличение памяти",
          price: "от 700",
        },
      ],
    },
    {
      model: "3",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "800",
        },
        {
          type: "Замена дисплея",
          price: "900",
        },
        {
          type: "Замена аккумулятора",
          price: "900",
        },
        {
          type: "Замена разъема зарядки",
          price: "800",
        },
        {
          type: "Разблокировка iCloud",
          price: "800",
        },
        {
          type: "Увеличение памяти",
          price: "от 700",
        },
      ],
    },
    {
      model: "4",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "800",
        },
        {
          type: "Замена дисплея",
          price: "900",
        },
        {
          type: "Замена аккумулятора",
          price: "900",
        },
        {
          type: "Замена разъема зарядки",
          price: "800",
        },
        {
          type: "Разблокировка iCloud",
          price: "800",
        },
        {
          type: "Увеличение памяти",
          price: "от 700",
        },
      ],
    },
    {
      model: "air",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "900",
        },
        {
          type: "Замена дисплея",
          price: "1800",
        },
        {
          type: "Замена аккумулятора",
          price: "1200",
        },
        {
          type: "Замена разъема зарядки",
          price: "900",
        },
        {
          type: "Разблокировка iCloud",
          price: "1400",
        },
        {
          type: "Увеличение памяти",
          price: "от 900",
        },
      ],
    },
    {
      model: "air 2",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "2000",
        },
        {
          type: "Замена дисплея",
          price: "3200",
        },
        {
          type: "Замена аккумулятора",
          price: "1200",
        },
        {
          type: "Замена разъема зарядки",
          price: "900",
        },
        {
          type: "Разблокировка iCloud",
          price: "1400",
        },
        {
          type: "Увеличение памяти",
          price: "от 900",
        },
      ],
    },
    {
      model: "air 2017",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "1800",
        },
        {
          type: "Замена дисплея",
          price: "2300",
        },
        {
          type: "Замена аккумулятора",
          price: "1400",
        },
        {
          type: "Замена разъема зарядки",
          price: "1000",
        },
        {
          type: "Разблокировка iCloud",
          price: "1800",
        },
        {
          type: "Увеличение памяти",
          price: "от 1200",
        },
      ],
    },
    {
      model: "air 2018",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "2000",
        },
        {
          type: "Замена дисплея",
          price: "2600",
        },
        {
          type: "Замена аккумулятора",
          price: "1400",
        },
        {
          type: "Замена разъема зарядки",
          price: "1000",
        },
        {
          type: "Разблокировка iCloud",
          price: "1800",
        },
        {
          type: "Увеличение памяти",
          price: "от 1200",
        },
      ],
    },
    {
      model: "mini 1",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "900",
        },
        {
          type: "Замена дисплея",
          price: "1200",
        },
        {
          type: "Замена аккумулятора",
          price: "900",
        },
        {
          type: "Замена разъема зарядки",
          price: "800",
        },
        {
          type: "Разблокировка iCloud",
          price: "1000",
        },
        {
          type: "Увеличение памяти",
          price: "от 700",
        },
      ],
    },
    {
      model: "mini 2",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "900",
        },
        {
          type: "Замена дисплея",
          price: "1200",
        },
        {
          type: "Замена аккумулятора",
          price: "900",
        },
        {
          type: "Замена разъема зарядки",
          price: "800",
        },
        {
          type: "Разблокировка iCloud",
          price: "1000",
        },
        {
          type: "Увеличение памяти",
          price: "от 700",
        },
      ],
    },
    {
      model: "mini 3",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "900",
        },
        {
          type: "Замена дисплея",
          price: "1200",
        },
        {
          type: "Замена аккумулятора",
          price: "900",
        },
        {
          type: "Замена разъема зарядки",
          price: "800",
        },
        {
          type: "Разблокировка iCloud",
          price: "1000",
        },
        {
          type: "Увеличение памяти",
          price: "от 700",
        },
      ],
    },
    {
      model: "mini 4",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "2000",
        },
        {
          type: "Замена дисплея",
          price: "3100",
        },
        {
          type: "Замена аккумулятора",
          price: "1200",
        },
        {
          type: "Замена разъема зарядки",
          price: "900",
        },
        {
          type: "Разблокировка iCloud",
          price: "1400",
        },
        {
          type: "Увеличение памяти",
          price: "от 900",
        },
      ],
    },
    {
      model: "pro 12.9 2015",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "2200",
        },
        {
          type: "Замена дисплея",
          price: "4000",
        },
        {
          type: "Замена аккумулятора",
          price: "1800",
        },
        {
          type: "Замена разъема зарядки",
          price: "1200",
        },
        {
          type: "Разблокировка iCloud",
          price: "2000",
        },
        {
          type: "Увеличение памяти",
          price: "от 1400",
        },
      ],
    },
    {
      model: "pro 12.9 2018",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "2400",
        },
        {
          type: "Замена дисплея",
          price: "4500",
        },
        {
          type: "Замена аккумулятора",
          price: "2000",
        },
        {
          type: "Замена разъема зарядки",
          price: "1200",
        },
        {
          type: "Разблокировка iCloud",
          price: "2000",
        },
        {
          type: "Увеличение памяти",
          price: "от 1400",
        },
      ],
    },
    {
      model: "pro 10.5",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "2200",
        },
        {
          type: "Замена дисплея",
          price: "5600",
        },
        {
          type: "Замена аккумулятора",
          price: "2000",
        },
        {
          type: "Замена разъема зарядки",
          price: "1200",
        },
        {
          type: "Разблокировка iCloud",
          price: "2000",
        },
        {
          type: "Увеличение памяти",
          price: "от 1400",
        },
      ],
    },
    {
      model: "pro 9.7",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "2000",
        },
        {
          type: "Замена дисплея",
          price: "4000",
        },
        {
          type: "Замена аккумулятора",
          price: "1800",
        },
        {
          type: "Замена разъема зарядки",
          price: "1200",
        },
        {
          type: "Разблокировка iCloud",
          price: "2000",
        },
        {
          type: "Увеличение памяти",
          price: "от 1400",
        },
      ],
    },
    {
      model: "pro 3 11.0",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "4500",
        },
        {
          type: "Замена дисплея",
          price: "12000",
        },
        {
          type: "Замена аккумулятора",
          price: "3000",
        },
        {
          type: "Замена разъема зарядки",
          price: "1400",
        },
        {
          type: "Увеличение памяти",
          price: "от 2000",
        },
      ],
    },
    {
      model: "pro 3 12.9",
      info: [
        {
          type: "Замена стекла дисплея",
          price: "4800",
        },
        {
          type: "Замена дисплея",
          price: "14000",
        },
        {
          type: "Замена аккумулятора",
          price: "3200",
        },
        {
          type: "Замена разъема зарядки",
          price: "1400",
        },
        {
          type: "Увеличение памяти",
          price: "от 2000",
        },
      ],
    },
  ];
  let dataBaseWatch = [
    {
      model: "s1 38",
      info: [
        {
          type: "Замена аккумулятора",
          price: "500",
        },
        {
          type: "Замена дисплейного модуля",
          price: "1200",
        },
        {
          type: "Чистка от воды",
          price: "500",
        },
      ],
    },
    {
      model: "s1 42",
      info: [
        {
          type: "Замена аккумулятора",
          price: "600",
        },
        {
          type: "Замена дисплейного модуля",
          price: "1200",
        },
        {
          type: "Чистка от воды",
          price: "500",
        },
      ],
    },
    {
      model: "s2 38",
      info: [
        {
          type: "Замена аккумулятора",
          price: "550",
        },
        {
          type: "Замена дисплейного модуля",
          price: "3000",
        },
        {
          type: "Чистка от воды",
          price: "500",
        },
      ],
    },
    {
      model: "s2 42",
      info: [
        {
          type: "Замена аккумулятора",
          price: "650",
        },
        {
          type: "Замена дисплейного модуля",
          price: "3000",
        },
        {
          type: "Чистка от воды",
          price: "500",
        },
      ],
    },
    {
      model: "s3 38",
      info: [
        {
          type: "Замена аккумулятора",
          price: "550",
        },
        {
          type: "Замена дисплейного модуля",
          price: "3400",
        },
        {
          type: "Чистка от воды",
          price: "500",
        },
      ],
    },
    {
      model: "s3 42",
      info: [
        {
          type: "Замена аккумулятора",
          price: "650",
        },
        {
          type: "Замена дисплейного модуля",
          price: "3400",
        },
        {
          type: "Чистка от воды",
          price: "500",
        },
      ],
    },
    {
      model: "s4 40",
      info: [
        {
          type: "Замена аккумулятора",
          price: "700",
        },
        {
          type: "Замена дисплейного модуля",
          price: "5000",
        },
        {
          type: "Чистка от воды",
          price: "500",
        },
      ],
    },
    {
      model: "s4 44",
      info: [
        {
          type: "Замена аккумулятора",
          price: "800",
        },
        {
          type: "Замена дисплейного модуля",
          price: "5000",
        },
        {
          type: "Чистка от воды",
          price: "500",
        },
      ],
    },
    {
      model: "s5 40",
      info: [
        {
          type: "Замена аккумулятора",
          price: "900",
        },
        {
          type: "Замена дисплейного модуля",
          price: "6000",
        },
        {
          type: "Чистка от воды",
          price: "500",
        },
      ],
    },
    {
      model: "s5 44",
      info: [
        {
          type: "Замена аккумулятора",
          price: "1000",
        },
        {
          type: "Замена дисплейного модуля",
          price: "6000",
        },
        {
          type: "Чистка от воды",
          price: "500",
        },
      ],
    },
  ];

  // /variables
  // ----------------------------------------------

  // universal function
  function ajaxRequest(request, url) {
    event.preventDefault();
    if (event.target.querySelector(".input--number").value.length === 17) {
      let params = "number=" + event.target.querySelector(".input--number").value;
      if (event.target.querySelector(".input--name") !== null) params += "&name=" + event.target.querySelector(".input--name").value;
      // if(event.target.querySelector(".calculator__input").)
      if (event.target.querySelector(".calculator__input") !== null) {
        document.querySelectorAll(".calculator__step-choise").forEach((item, index) => {
          // console.log(item.textContent);
          switch (index) {
            case 0:
              params += "&device=" + item.textContent;
              break;
            case 1:
              params += "&model=" + item.textContent;
              break;
            case 2:
              params += "&character=" + item.textContent;
              break;
            case 3:
              params += "&type=" + item.textContent;
              break;
          }
        });
      }
      request.open("POST", url, true);
      request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      request.addEventListener("readystatechange", ajaxReadyStateChange);
      request.send(params);
    } else {
      event.target.querySelector(".input--number").classList.add("input--err");
    }
  }
  function callModal(step) {
    // document.querySelector("body").classList.toggle("block");
    document.querySelector(`.modal-overlay--${step}`).classList.toggle(`modal-overlay--active`);
    document.querySelector(`.modal--${step}`).classList.toggle("modal--active");
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
  // function resizeWindow() {
  // let widthWindow =
  //     window.innerWidth > 0 ? window.innerWidth : screen.width;
  // $calculatorBg = ;
  // initCalculatorStep();
  // }
  function clickStepElement(element, node) {
    if (element.closest(".calculator__step-block").querySelector(`.calculator__step-block-${node}--active`) !== null)
      element
        .closest(".calculator__step-block")
        .querySelector(`.calculator__step-block-${node}--active`)
        .classList.remove(`calculator__step-block-${node}--active`);
    element.classList.toggle(`calculator__step-block-${node}--active`);
  }
  //  /universal function
  // ----------------------------------------------

  // event
  document.querySelector("body").addEventListener(
    "submit",
    function () {
      ajaxRequest(request, url);
    },
    false
  );
  document.querySelector("body").addEventListener("click", function (event) {
    let arrClassName = event.target.classList,
      $calculatorStepBlockBox = event.target.closest(".calculator__step-block-box"),
      $calculatorStepBlockTag = event.target.closest(".calculator__step-block-tag"),
      $calculatorStepBlockParagraph = event.target.closest(".calculator__step-block-paragraph"),
      $calculatorStepBlockCard = event.target.closest(".calculator__step-block-card");
    if (arrClassName.contains("modal-overlay--thank")) callModalThank();
    if (arrClassName.contains("modal-overlay--form")) callModalForm();
    if (event.target.closest(".button--calculator")) callCalculator();
    if (event.target.closest(".calculator__back")) closeCalculator();
    if ($calculatorStepBlockTag) {
      clickStepElement($calculatorStepBlockTag, "tag");
    }
    if ($calculatorStepBlockBox) {
      clickStepElement($calculatorStepBlockBox, "box");
    }
    if ($calculatorStepBlockParagraph) {
      clickStepElement($calculatorStepBlockParagraph, "paragraph");
    }
    if ($calculatorStepBlockCard) {
      clickStepElement($calculatorStepBlockCard, "card");
    }
    if (event.target.closest(".header__burger")) {
      event.target.closest(".header__burger").classList.toggle("header__burger--open");
      document.querySelector(".menu").classList.toggle("menu--open");
    }
    if (event.target.closest(".header__btn")) callModalForm();
    if (event.target.closest(".menu__button")) {
      document.querySelector(".header__burger").classList.toggle("header__burger--open");
      document.querySelector(".menu").classList.toggle("menu--open");
    }
    if (event.target.closest(".calculator__main-button")) {
      let checkCheckbox = false;
      // let calculatorStep = event.target.closest(".calculator__step");
      let skipStep = false;
      event.target
        .closest(".calculator__step")
        .querySelectorAll("input")
        .forEach((item) => {
          if (item.checked) {
            let labelText;
            event.target
              .closest(".calculator__step")
              .querySelectorAll("label")
              .forEach((label) => {
                if (item.id === label.getAttribute("for")) {
                  if (event.target.id !== "last-step-choise") {
                    event.target.closest(".calculator__step").querySelector(".calculator__step-choise").innerHTML = label.textContent.trim();
                    labelText = label.textContent.trim();
                  } else {
                    event.target.closest(".calculator__step").querySelector(".calculator__step-choise").innerHTML = label
                      .querySelector(".calculator__step-block-card-name")
                      .textContent.trim();
                    labelText = label.querySelector(".calculator__step-block-card-name").textContent.trim();
                  }
                }
              });

            // ***************
            if (event.target.closest("#first-step")) {
              globalDevices = labelText;
              document.querySelector(".calculator__step-block--tags").innerHTML = "";
              item.dataset.model.split("|").forEach((str, index) => {
                document.querySelector(".calculator__step-block--tags").innerHTML += `
              <label class="calculator__step-block-tag" for="step-two-${index + 1}">${labelText + " " + str}</label>
              <input class="calculator__input" type="radio" id="step-two-${index + 1}" name="step-two" />
              `;
              });
              if (item.dataset.exceptions) exceptionsDeviceProblem = item.dataset.exceptions;
            }
            if (event.target.closest("#second-step")) {
              globalModel = event.target.closest(".calculator__step").querySelector(".calculator__step-choise").textContent;
              if (document.querySelector(".calculator__step-choise").textContent === "iPhone") {
                document.querySelectorAll(".calculator__step-block-paragraph-text").forEach((node) => {
                  node.closest(".calculator__step-block-paragraph").classList.remove("calculator__step-block-paragraph--hidden");
                });
                exceptionsDeviceProblem.split("|").forEach((str) => {
                  let buffObj = {
                    model: "",
                    problem: "",
                  };
                  str.split(":").forEach((item, index) => {
                    if (index) buffObj.problem = item;
                    else buffObj.model = item;
                  });
                  if (buffObj.model === document.querySelector(".calculator__step-block-tag--active").textContent) {
                    document.querySelectorAll(".calculator__step-block-paragraph-text").forEach((node) => {
                      if (node.textContent === buffObj.problem)
                        node.closest(".calculator__step-block-paragraph").classList.add("calculator__step-block-paragraph--hidden");
                    });
                  }
                });
              } else {
                document.querySelector(".calculator__step-block--card").innerHTML = "";
                let deviceArrBuff = event.target.closest(".calculator__step").querySelector(".calculator__step-choise").textContent.split(" ");
                let model = event.target
                  .closest(".calculator__step")
                  .querySelector(".calculator__step-choise")
                  .textContent.replace(deviceArrBuff[0], "")
                  .trim();
                let cloneBase, cloneBaseInfo;
                switch (deviceArrBuff[0]) {
                  case "iPad":
                    cloneBase = dataBasePad;
                    cloneBaseInfo = dataBaseInfoPad;
                    break;
                  case "Apple":
                    model = model.replace("Watch", "").trim();
                    cloneBase = dataBaseWatch;
                    cloneBaseInfo = dataBaseInfoWatch;
                    break;
                  case "MacBook":
                    model = model.replace("Watch", "").trim();
                    cloneBase = dataBaseMac;
                    cloneBaseInfo = dataBaseInfoMac;
                    break;
                }
                cloneBase.forEach((item) => {
                  if (item.model === model) {
                    item.info.forEach((innerItem, index) => {
                      let baseInfoObj;
                      cloneBaseInfo.forEach((baseInfoElement) => {
                        if (baseInfoElement.type === innerItem.type) baseInfoObj = baseInfoElement;
                      });
                      document.querySelector(".calculator__step-block--card").innerHTML += `
                      <label class="calculator__step-block-card" for="step-four-${index}">
                        <div class="calculator__step-block-card-top">
                          <div class="calculator__step-block-card-name">${innerItem.type}</div>
                          <div class="calculator__step-block-card-price">${innerItem.price} грн.</div>
                        </div>
                        <div class="calculator__step-block-card-top">
                          <div class="calculator__step-block-card-time">Гарантия ${baseInfoObj.guarantee} дней.</div>
                          <div class="calculator__step-block-card-time">${baseInfoObj.timing}.</div>
                        </div>
                        <div class="calculator__step-block-card-text">
                          ${baseInfoObj.text}
                        </div>
                      </label>
                      <input class="calculator__input" type="radio" id="step-four-${index}" name="step-four" />
                      `;
                    });
                  }
                });

                skipStep = true;
              }
            }
            if (event.target.closest("#third-step")) {
              createCalculatorStepCard(item);
            }
            // ***************

            if (event.target.closest("#last-step-choise")) {
              setTimeout(function () {
                document.querySelector(".calculator").scrollTop = document.querySelector(".calculator").scrollHeight;
              }, 600);
            }

            event.target.closest(".calculator__step").style.height = "";
            event.target.closest(".calculator__step").classList.toggle("calculator__step--check");
            event.target.closest(".calculator__step").classList.toggle("calculator__step--active");

            if (skipStep) {
              event.target.closest(".calculator__step").nextElementSibling.classList.toggle("calculator__step--block");
              event.target.closest(".calculator__step").nextElementSibling.nextElementSibling.classList.toggle("calculator__step--active");
              initCalculatorStep();
            } else {
              event.target.closest(".calculator__step").nextElementSibling.classList.toggle("calculator__step--active");
              initCalculatorStep();
            }
            checkCheckbox = true;
          }
        });
      if (!checkCheckbox) {
        stepCalculatorErr(event.target.closest(".calculator__step").querySelectorAll(".calculator__step-block-box"), "box");
        stepCalculatorErr(event.target.closest(".calculator__step").querySelectorAll(".calculator__step-block-tag"), "tag");
        stepCalculatorErr(event.target.closest(".calculator__step").querySelectorAll(".calculator__step-block-paragraph"), "paragraph");
        stepCalculatorErr(event.target.closest(".calculator__step").querySelectorAll(".calculator__step-block-card"), "card");
      }
    }
    if (event.target.closest(".calculator__step-information-bottom-main-button"))
      event.target
        .closest(".calculator__step-information-bottom-main-button")
        .classList.add("calculator__step-information-bottom-main-button--active");
    if (event.target.closest(".calculator__step-finish-button")) closeCalculator();
    if (event.target.closest(".calculator__step-edit")) {
      document.getElementById("finish-title").textContent = document.getElementById("finish-title").dataset.good;
      if (document.querySelector(".calculator__step--active").classList.contains("calculator__step--last"))
        document.querySelector(".calculator__step--active").style.height = "0px";
      else document.querySelector(".calculator__step--active").style.height = startHeightStep + "px";
      document.querySelector(".calculator__step--active").classList.remove("calculator__step--active");
      checkNextStepCalculator(event.target.closest(".calculator__step").nextElementSibling);
      event.target.closest(".calculator__step").classList.remove("calculator__step--check");
      event.target.closest(".calculator__step").classList.add("calculator__step--active");
      initCalculatorStep();
      document.querySelector(".calculator__bg").style.top =
        document.querySelector(".calculator__step--active").getBoundingClientRect().top +
        document.querySelector(".calculator--active").scrollTop +
        "px";
      topBgCalculator =
        document.querySelector(".calculator__step--active").getBoundingClientRect().top +
        document.querySelector(".calculator--active").scrollTop +
        "px";
    }
    if (event.target.closest(".calculator__step-block-btn")) {
      document.getElementById("finish-title").textContent = document.getElementById("finish-title").dataset.oops;

      // event.target.closest(".calculator__step") = event.target.closest(".calculator__step");

      event.target.closest(".calculator__step").querySelector(".calculator__step-choise").innerHTML = "";
      event.target.closest(".calculator__step").style.height = "";
      event.target.closest(".calculator__step").classList.toggle("calculator__step--check");
      event.target.closest(".calculator__step").classList.toggle("calculator__step--active");

      event.target
        .closest(".calculator__step")
        .querySelectorAll("input")
        .forEach((item) => {
          item.checked = false;
        });

      // if (skipStep) {
      event.target.closest(".calculator__step").nextElementSibling.classList.toggle("calculator__step--block");
      event.target.closest(".calculator__step").nextElementSibling.nextElementSibling.classList.toggle("calculator__step--active");
      initCalculatorStep();
      // } else {
      // event.target.closest(".calculator__step").nextElementSibling.classList.toggle("calculator__step--active");
      // initCalculatorStep();
      // }
    }
  });

  function stepCalculatorErr(listItem, node) {
    listItem.forEach((item) => {
      item.classList.add(`calculator__step-block-${node}--err`);
    });
    setTimeout(() => {
      listItem.forEach((item) => {
        item.classList.remove(`calculator__step-block-${node}--err`);
      });
    }, 800);
  }
  // window.addEventListener("resize", resizeWindow, false);

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

  function createCalculatorStepCard(element) {
    document.querySelector(".calculator__step-block--card").innerHTML = "";
    element.dataset.type.split("|").forEach((str, index) => {
      let price,
        model,
        devices,
        text,
        removeElement = false,
        guarantee = element.dataset.guarantee.split("|")[index],
        timing = element.dataset.timing.split("|")[index];
      globalModel.split(" ").forEach((item, index) => {
        if (index) {
        } else devices = item;
      });
      model = globalModel.replace(devices, "").trim();
      // console.log(model);
      dataBasePhone.forEach((obj) => {
        console.log(obj.character);
        console.log(document.getElementById("#character").textContent);
        if (obj.type === str && obj.character === document.getElementById("#character").textContent) {
          text = obj.text;
          obj.info.forEach((objInner) => {
            if (objInner.model === model) {
              if (objInner.price === "-") removeElement = true;
              price = objInner.price;
            }
          });
        }
      });
      if (!removeElement) {
        document.querySelector(".calculator__step-block--card").innerHTML += `
        <label class="calculator__step-block-card" for="step-four-${index + 1}">
          <div class="calculator__step-block-card-top">
            <div class="calculator__step-block-card-name">${str}</div>
            <div class="calculator__step-block-card-price">${price} грн.</div>
          </div>
          <div class="calculator__step-block-card-top">
            <div class="calculator__step-block-card-time">Гарантия ${guarantee} дней.</div>
            <div class="calculator__step-block-card-time">${timing}.</div>
          </div>
          <div class="calculator__step-block-card-text">
            ${text}
          </div>
        </label>
        <input class="calculator__input" type="radio" id="step-four-${index + 1}" name="step-four" />
        `;
      }
    });
  }
  function checkNextStepCalculator(step) {
    if (step.classList.contains("calculator__step--check") || step.classList.contains("calculator__step--block")) {
      step.classList.remove("calculator__step--check");
      step.classList.remove("calculator__step--block");
      checkNextStepCalculator(step.nextElementSibling);
    }
  }
  function ajaxReadyStateChange() {
    if (request.readyState === 4 && request.status === 200) {
      if (request.responseText) {
        if (document.querySelector(".modal-overlay--form.modal-overlay--active") !== null) callModalForm();
        if (document.querySelector(".calculator__step-information-bottom-main-button--active") === null) callModalThank();
        else {
          document.querySelector(".calculator__step-inner").style.height = document.querySelector(".calculator__step-inner").offsetHeight + "px";
          setTimeout(function () {
            document.querySelector(".calculator__step-inner").classList.toggle("calculator__step-inner--hidden");
            setTimeout(function () {
              document.querySelector(".calculator__step-finish").classList.toggle("calculator__step-finish--visibility");
            }, 400);
          }, 50);
        }
        request.removeEventListener("readystatechange", ajaxReadyStateChange);
      } else {
        console.log("Ошибка при отправке формы!");
      }
    }
  }
  function initCalculatorStep() {
    let heightCalculatorStepActive = 0;

    document.querySelector(".calculator__step--active").childNodes.forEach(function (item, index) {
      if (item.nodeType !== 3) {
        var height = item.offsetHeight;
        var style = getComputedStyle(item);

        height += parseInt(style.marginTop) + parseInt(style.marginBottom) + parseInt(style.paddingTop) + parseInt(style.paddingBottom);
        heightCalculatorStepActive += height;
      }
    });
    document.querySelector(".calculator__step--active").style.height = heightCalculatorStepActive + heightIndex + "px";
    document.querySelector(".calculator__bg").style.height = document.querySelector(".calculator__step--active").style.height;

    if (document.querySelector(".calculator__step--active").previousElementSibling) {
      document.querySelector(".calculator__bg").style.top =
        Number(document.querySelector(".calculator__bg").style.top.replace("px", "")) + heightIndexBg + "px";
      topBgCalculator = Number(document.querySelector(".calculator__bg").style.top.replace("px", "")) + heightIndexBg + "px";
    } else {
      document.querySelector(".calculator__bg").style.top = document.querySelector(".calculator__step--active").getBoundingClientRect().top + "px";
      topBgCalculator = document.querySelector(".calculator__step--active").getBoundingClientRect().top + "px";
    }
  }
  function callCalculator() {
    let documentWidth = parseInt(document.documentElement.clientWidth);
    let windowsWidth = parseInt(window.innerWidth);
    let scrollbarWidth = windowsWidth - documentWidth;
    document.querySelector("body").style.paddingRight = scrollbarWidth + "px";
    document.querySelector(".header").style.paddingRight = scrollbarWidth + "px";
    document.querySelector(".calculator").classList.toggle("calculator--active");
    document.querySelector("body").classList.add("block");
  }
  function closeCalculator() {
    document.querySelector("body").style.paddingRight = "";
    document.querySelector(".header").style.paddingRight = "";
    document.querySelector(".calculator").classList.toggle("calculator--active");
    document.querySelector("body").classList.remove("block");
  }
  // /unique function
  // ----------------------------------------------

  // Page load
  $input_number.forEach(function (item) {
    let phoneMask = IMask(item, {
      mask: "+{38}(000)000-00-00",
    });
  });

  initCalculatorStep();

  setTimeout(function () {
    document.querySelector(".footer__map").insertAdjacentHTML(
      "afterbegin",
      // Google MAP
      `
            <iframe class="footer__map-google"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5130.119456237799!2d36.229858467139245!3d49.9914896451543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a0f1b32fff97%3A0x805bf3ae40fa3f28!2z0YPQuy4g0J_Rg9GI0LrQuNC90YHQutCw0Y8sIDEsINCl0LDRgNGM0LrQvtCyLCDQpdCw0YDRjNC60L7QstGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMLCA2MTAwMA!5e0!3m2!1sru!2sua!4v1599938276657!5m2!1sru!2sua"
                tabindex="0">
            </iframe>
            `
      // /Google MAP
    );
  }, 1500);
  // /Page load
});
