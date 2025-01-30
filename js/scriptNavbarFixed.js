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
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const navCollapse = document.querySelector('.navbar-collapse');
    const toggler = document.querySelector('.navbar-toggler');

    // Cerrar el menú hamburguesa al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Verificar si el clic ocurrió en el dropdown
            if (e.target.closest('.dropdown-menu') || e.target.closest('.dropdown-toggle')) {
                return; 
            }
            if (window.innerWidth <= 992 && navCollapse.classList.contains('show')) {
                toggler.click();
            }
        });
    });

    // Evitar que el menú hamburguesa se cierre al interactuar con el dropdown
    dropdownMenu.addEventListener('click', (e) => {
        e.stopPropagation(); 
    });

    // animacion sections 
    const sections = document.querySelectorAll("section");

    // Clase inicial para ocultar suavemente
    sections.forEach((section) => {
        section.style.visibility = "hidden"; 
        section.style.opacity = "0"; 
    });

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Asegura que la sección esté visible y aplica animación
                    entry.target.style.visibility = "visible";
                    entry.target.style.opacity = "1"; 
                    entry.target.classList.add("animate__animated", "animate__fadeInUp");

                    // Dejar de observar esta sección
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15, 
            rootMargin: "0px 0px -10% 0px",
        }
    );

    // Activar el Observer para secciones
    sections.forEach((section) => observer.observe(section));

    // Fallback para móviles en caso de que alguna sección quede sin renderizar
    window.addEventListener("resize", () => {
        if (window.innerWidth <= 768) {
            sections.forEach((section) => {
                if (section.style.visibility === "hidden") {
                    section.style.visibility = "visible";
                    section.style.opacity = "1";
                    section.classList.add("animate__animated", "animate__fadeInUp");
                }
            });
        }
    });

    // Forzar carga en scroll (en caso de problemas en móviles)
    window.addEventListener("scroll", () => {
        sections.forEach((section) => {
            if (
                section.getBoundingClientRect().top < window.innerHeight &&
                section.style.visibility === "hidden"
            ) {
                section.style.visibility = "visible";
                section.style.opacity = "1";
                section.classList.add("animate__animated", "animate__fadeInUp");
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

