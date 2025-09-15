document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".testimonial-slider", {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-paginationn",
      clickable: true,
    },
    effect: "slide",
  });

  // Forzar la actualización del Swiper después de la carga completa de la página
  window.addEventListener("load", () => {
    swiper.update();
  });
});