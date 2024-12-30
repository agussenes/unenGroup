document.addEventListener("scroll", function () {
    const navbarImg = document.querySelector("#logoNavbar");
    if (window.scrollY > 50) {
         navbarImg.style.width = '150px'
        navbarImg.style.transition = 'all 0.5s ease';
    } else {
        navbarImg.style.height = 'auto';
        navbarImg.style.width = '200px'
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    // URL actual
    const currentUrl = window.location.pathname;

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');

        if (linkPath === currentUrl) {
            navLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
        }
    });

    // Cerrar el menú hamburguesa al hacer clic en un enlace
    const navCollapse = document.querySelector('.navbar-collapse');
    const toggler = document.querySelector('.navbar-toggler');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992 && navCollapse.classList.contains('show')) {
                toggler.click(); // Simula el clic en el botón de toggle para cerrar el menú
            }
        });
    });
});


// Leer el parámetro "filter" de la URL
const urlParams = new URLSearchParams(window.location.search);
const filter = urlParams.get("filter");

if (filter) {
  // Aplicar lógica según el filtro
  if (filter === "terrenos") {
    console.log("Filtrando por terrenos...");
    // Aquí puedes mostrar solo terrenos
  } else if (filter === "locales") {
    console.log("Filtrando por locales...");
    // Aquí puedes mostrar solo locales
  }
} else {
  console.log("Mostrando todas las propiedades...");
  // Muestra todas las propiedades por defecto
}
