document.addEventListener("scroll", function () {
    const navbarImg = document.querySelector("#logoNavbar");
    if (window.scrollY > 50) {
        navbarImg.style.height = '38px';
        navbarImg.style.transition = 'all 0.5s ease';
    } else {
        navbarImg.style.height = '68px';
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
