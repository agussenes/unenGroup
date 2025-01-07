// Datos de Propiedades
const propiedades = [
    {
        id: 5,
        tipo: "alquiler",
        titulo: "Vivienda a Estrenar en La Deseada",
        precio: 2000,
        localidad: "La Deseada",
        metrosCuadrados: 80,
        habitaciones: 1,
        banos: 1,
        petFriendly: true,
        imagenes: [
            "./images/propiedades/viviendas/casa-La-Deseada-Alquiler/subidaCochera.jpg",
            "./images/propiedades/viviendas/casa-La-Deseada-Alquiler/frente.jpg",
            "./images/propiedades/viviendas/casa-La-Deseada-Alquiler/galeria.jpg",
            "./images/propiedades/viviendas/casa-La-Deseada-Alquiler/estar.jpg",
            "./images/propiedades/viviendas/casa-La-Deseada-Alquiler/cocina.jpg",
            "./images/propiedades/viviendas/casa-La-Deseada-Alquiler/pieza1.jpg",
            "./images/propiedades/viviendas/casa-La-Deseada-Alquiler/pieza2.jpg",
            "./images/propiedades/viviendas/casa-La-Deseada-Alquiler/patio.jpg"
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-couch"></i Completamente amoblada</li>
            <li><i class="fas fa-bed"></i> Dormitorio principal con baño en suite y vestidor</li>
            <li><i class="fas fa-tree"></i> / <i class="fas fa-swimming-pool"></i> Amplia galería y jardín con piscina</li>
            <li><i class="fas fa-car"></i> Cochera con asador</li>
        </ul>`,
        vista360: [
            "https://pannellum.org/images/alma.jpg"
        ],
    },
    {
        id: 9,
        tipo: "terreno",
        titulo: "Terreno ejemplo",
        precio: 80000,
        localidad: "Córdoba",
        metrosCuadrados: 250,
        habitaciones: 0,
        banos: 0,
        petFriendly: false,
        imagenes: [
            "./images/propiedades/terrenos/terrenoEjemplo2/terreno2.jpg",
            "./images/propiedades/terrenos/terrenoEjemplo2/terreno2.jpg"
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-paint-brush"></i> Living-comedor y cocina integrada</li>
            <li><i class="fas fa-bed"></i> 2 dormitorios</li>
            <li><i class="fas fa-map-marker-alt"></i> Excelente ubicación en el centro</li>
            <li><i class="fas fa-building"></i> Balcón con vista urbana</li>
        </ul>`,
        vista360: [
            "https://pannellum.org/images/alma.jpg"
        ],
    },
    {
        id: 11,
        tipo: "local-oficina",
        titulo: "Local 2",
        precio: 100000,
        localidad: "Córdoba",
        metrosCuadrados: 120,
        habitaciones: 1,
        banos: 1,
        petFriendly: true,
        imagenes: [
            "./images/propiedades/locales/localEjemplo2/localFrente.jpg",
            "./images/propiedades/locales/localEjemplo2/localFrente.jpg"
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-paint-brush"></i> Living-comedor y cocina integrada</li>
            <li><i class="fas fa-bed"></i> 2 dormitorios</li>
            <li><i class="fas fa-map-marker-alt"></i> Excelente ubicación en el centro</li>
            <li><i class="fas fa-building"></i> Balcón con vista urbana</li>
        </ul>`,
        vista360: [
            "https://pannellum.org/images/alma.jpg"
        ],
    }
];




// Función para inicializar Swiper
function initializeSwiper(id) {
    new Swiper(`#${id}`, {
        loop: true,
        pagination: {
            el: `.swiper-pagination`,
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });
}

function renderProperties(data) {
    const container = document.getElementById("propiedadesContainer");
    container.innerHTML = data
        .map(
            (prop) => `
        <div class="col-12 col-md-6 col-lg-4 d-flex flex-wrap g-3">
            <div class="card shadow d-flex flex-colum">
                <div class="swiper-container" id="swiper-${prop.id}">
                    <div class="swiper-wrapper">
                        ${prop.imagenes
                            .map(
                                (img) =>
                                    `<div class="swiper-slide"><img src="${img}" class="img-fluid" alt="${prop.titulo}"></div>`
                            )
                            .join("")}
                    </div>
                    <div class="botonesSwiperDes">
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                    <div class="swiper-pagination visores"></div>
                </div>
                <div class="card-body">
                    <div class="card-icons d-flex justify-content-between py-2">
                        <span><i class="fas fa-expand"></i> ${prop.metrosCuadrados} m²</span>
                        ${
                            prop.habitaciones > 0
                                ? `<span><i class="fas fa-bed"></i> ${prop.habitaciones}</span>`
                                : ""
                        }
                        ${
                            prop.banos > 0
                                ? `<span><i class="fas fa-bath"></i> ${prop.banos}</span>`
                                : ""
                        }
                        ${
                            prop.petFriendly
                                ? `<span><i class="fas fa-paw" style="color: #71C6D4;"></i> Pet-Friendly</span>`
                                : ""
                        }
                    </div>
                    <h5 class="card-title py-2">${prop.titulo}</h5>
                    <p class="card-text"><strong>Precio:</strong> $${prop.precio.toLocaleString()}</p>
                    <p class="card-text"><strong>Categoria:</strong> ${prop.tipo}</p>
                    <p class="card-text"><i class="fas fa-map-marker-alt"></i> Localidad: ${prop.localidad}</p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-info" onclick="viewPropertyDetails(${prop.id})">Ver más</button>
                        <button class="btn btn-secondary" onclick="abrirVista360(${prop.id})">Vista 360°</button>
                    </div>
                </div>
            </div>
        </div>`
        )
        .join("");

    data.forEach((prop) => initializeSwiper(`swiper-${prop.id}`));
}



// Ver detalles de la propiedad
function viewPropertyDetails(id) {
    const property = propiedades.find((prop) => prop.id === id);
    if (property) {
        const content = `
            <div class="swiper-container mb-4" id="modal-swiper-${property.id}">
                <div class="swiper-wrapper">
                    ${property.imagenes
                .map((img) => `<div class="swiper-slide"><img src="${img}" class="img-fluid" alt="${property.titulo}"></div>`)
                .join("")}
                </div>
                <div class="botonesSwiperDes">
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                 </div>
                <div class="pagination">
                     <div class="swiper-pagination"></div>
                    
                </div>
            </div>
            
            <div class="row text-center text-xl-start ">
            <h3 class="text-center">${property.titulo}</h3>
                <div class="col-xl-6 detalleProp">                    
                    <p><strong>Precio:</strong> $${property.precio.toLocaleString()}</p>
                    <p><strong>Categoría:</strong> ${property.tipo}</p>
                    <p ><strong>Localidad:</strong> ${property.localidad}</p>
                </div>
                <div class="col-xl-6">
                    
                    <p id="descripcionDetalle">${property.descripcion}</p>
                </div>
            </div>
            <div class="d-flex justify-content-center gap-3 mt-4">
                <button class="btn btn-secondary" data-bs-dismiss="modal" onclick="abrirVista360(${property.id})">Vista 360°</button>
                <button class="btn btn-secondary" onclick="goToContact('${property.titulo}')" data-bs-dismiss="modal">Me interesa</button>
            </div>
        `;
        document.getElementById("propertyDetailsContent").innerHTML = content;
        initializeSwiper(`modal-swiper-${property.id}`);
        new bootstrap.Modal(document.getElementById("propertyDetailsModal")).show();
    }
}


// Redirigir al Formulario de Contacto
function goToContact(propiedad) {
    const url = new URL("propiedades.html", window.location.origin);
    url.searchParams.set("propiedad", propiedad); // Añade la propiedad como parámetro en la URL
    window.location.href = url.toString(); // Redirige a la página con el parámetro
}

// Función para aplicar filtros
function applyFilters() {
    const tipo = document.getElementById("tipoPropiedad").value;
    const precioMaximo = document.getElementById("precioMaximo").value;
    const localidad = document.getElementById("localidad").value.toLowerCase();

    const filtered = propiedades.filter((prop) => {
        return (
            (tipo === "all" || prop.tipo === tipo) &&
            (!precioMaximo || prop.precio <= precioMaximo) &&
            (!localidad || prop.localidad.toLowerCase().includes(localidad))
        );
    });

    renderProperties(filtered);
}

// Obtén los parámetros de la URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return { tipo: params.get('tipo') || 'all' };
}

// Aplica los filtros iniciales según los parámetros de la URL
function applyInitialFilters() {
    const { tipo } = getQueryParams();
    const tipoDropdown = document.getElementById('tipoPropiedad');
    if (tipoDropdown && tipo !== 'all') {
        tipoDropdown.value = tipo;
    }

    const filtered = propiedades.filter((prop) => tipo === 'all' || prop.tipo === tipo);
    renderProperties(filtered);
}

// Ejecuta los filtros iniciales al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    applyInitialFilters();

    // Configurar filtros en tiempo real
    document.querySelectorAll("#filtros input, #filtros select").forEach((input) =>
        input.addEventListener("input", applyFilters)
    );
});


// Función para abrir Vista 360° en un modal
function abrirVista360(id) {

    const property = propiedades.find((prop) => prop.id === id);

    if (property) {
        // Configurar el título del modal
        document.getElementById("property360ModalTitle").innerText = property.titulo;

        // Inicializar Pannellum con la imagen correspondiente
        pannellum.viewer("pano360", {
            type: "equirectangular",
            panorama: property.vista360[0], // Cambia esto si tienes una URL específica para 360
            autoLoad: true,
            compass: true,
            showZoomCtrl: true,
            showFullscreenCtrl: true,
        });

        // Mostrar el modal
        const modal = new bootstrap.Modal(document.getElementById("property360Modal"));
        modal.show();
    } else {
        console.error("No se encontró la propiedad con ID:", id);
    }
}



