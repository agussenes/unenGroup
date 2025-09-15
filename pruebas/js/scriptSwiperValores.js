

document.addEventListener("DOMContentLoaded", () => {
    new Swiper("#swiper-valores", {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        slidesPerView: 1, // Mostrar un slider a la vez
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
});
