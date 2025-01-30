// Datos de Propiedades
const propiedades = [
    {
        id: 9,
        tipo: "local-oficina-cochera",
        titulo: "Departamento en Venta Nueva Córdoba - Uso Comercial",
        precio: "USD 85.000",
        localidad: "Nueva Córdoba",
        metrosCuadrados: 56.06,
        habitaciones: 2,
        banos: 1,
        petFriendly: true,
        imagenes: [
            "./images/propiedades/oficinas/oficina-usoComercial-Depa-Nva-Cba/frente.jpg",
            "./images/propiedades/oficinas/oficina-usoComercial-Depa-Nva-Cba/espera.jpg",
            "./images/propiedades/oficinas/oficina-usoComercial-Depa-Nva-Cba/espera2.jpg",
            "./images/propiedades/oficinas/oficina-usoComercial-Depa-Nva-Cba/livinEspera.jpg",
            "./images/propiedades/oficinas/oficina-usoComercial-Depa-Nva-Cba/bano.jpg",
            "./images/propiedades/oficinas/oficina-usoComercial-Depa-Nva-Cba/desdeAdentro.jpg",
            "./images/propiedades/oficinas/oficina-usoComercial-Depa-Nva-Cba/desdeAdentroOtraVista.jpg",
            "./images/propiedades/oficinas/oficina-usoComercial-Depa-Nva-Cba/desdeAdentroOtraVista2.jpg",
           "./images/propiedades/oficinas/oficina-usoComercial-Depa-Nva-Cba/desdeAdentroOtraVista3.jpg",
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-map-marker-alt"></i> Ubicación: Buenos Aires esq. Rondeau</li>
            <li><i class="fas fa-expand"></i> Superficie cubierta: 56.06 m²</li>
            <li><i class="fas fa-bed"></i> 2 Dormitorios</li>
            <li><i class="fas fa-bath"></i> 1 Baño</li>
            <li><i class="fas fa-chair"></i> Living</li>
            <li><i class="fas fa-utensils"></i> Cocina</li>
            <li><i class="fas fa-money-bill"></i> Expensas: $78.000</li>
            <li><i class="fas fa-shield-alt"></i> Seguridad y cámaras en ingreso</li>
        </ul>`
    },
    {
        id: 7,
        tipo: "venta",
        titulo: "Casa en Venta Potrerillo de Larreta",
        precio: "USD 450.000",
        localidad: "Potrerillo de Larreta",
        metrosCuadrados: 420,
        habitaciones: 4,
        banos: 4,
        petFriendly: true,
        imagenes: [
            "./images/propiedades/viviendas/venta-Casa-venta-Potrerillo-de-Larreta/frente.jpg",
            "./images/propiedades/viviendas/venta-Casa-venta-Potrerillo-de-Larreta/frenteDelejos.jpg",
            "./images/propiedades/viviendas/venta-Casa-venta-Potrerillo-de-Larreta/ghaleriaAsador.jpg",
            "./images/propiedades/viviendas/venta-Casa-venta-Potrerillo-de-Larreta/pileta.jpg",
            "./images/propiedades/viviendas/venta-Casa-venta-Potrerillo-de-Larreta/cocinaComedor.jpg",
            "./images/propiedades/viviendas/venta-Casa-venta-Potrerillo-de-Larreta/escaleras.jpg",
            "./images/propiedades/viviendas/venta-Casa-venta-Potrerillo-de-Larreta/habitacion.jpg",
            "./images/propiedades/viviendas/venta-Casa-venta-Potrerillo-de-Larreta/habitacionConBestidor.jpg",
            "./images/propiedades/viviendas/venta-Casa-venta-Potrerillo-de-Larreta/bestidor.jpg",
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-expand"></i> Superficie cubierta: 420 m²</li>
            <li><i class="fas fa-ruler-combined"></i> Superficie de terreno: 1800 m²</li>
            <li><i class="fas fa-couch"></i> Living / Comedor</li>
            <li><i class="fas fa-bed"></i> 4 Dormitorios (1 en suite)</li>
            <li><i class="fas fa-bath"></i> 4 Baños</li>
            <li><i class="fas fa-user-tie"></i> Dependencia de servicio</li>
            <li><i class="fas fa-car"></i> Cochera para 2 autos</li>
            <li><i class="fas fa-umbrella-beach"></i> Galería</li>
            <li><i class="fas fa-swimming-pool"></i> Piscina</li>
        </ul>`
    },
    {
        id: 4,
        tipo: "alquiler-temporario",
        titulo: "Alquiler Casa Villa Warcalde Temporario",
        precio: "Consultar disponibilidad y precio",
        localidad: "Villa Warcalde",
        metrosCuadrados: 250,
        habitaciones: 2,
        banos: 4,
        petFriendly: true,
        imagenes: [
            "./images/propiedades/viviendas/alquilerTemporario-Casa-Villa-Warcald/frente.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-Villa-Warcald/mesa.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-Villa-Warcald/cocina.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-Villa-Warcald/bano.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-Villa-Warcald/patioPileta.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-Villa-Warcald/patioo.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-Villa-Warcald/quincho-galeriaAsador.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-Villa-Warcald/sillones.jpg",
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-expand"></i> Superficie cubierta: 250 m²</li>
            <li><i class="fas fa-ruler-combined"></i> Superficie del terreno: 3000 m²</li>
            <li><i class="fas fa-couch"></i> Living / Comedor</li>
            <li><i class="fas fa-utensils"></i> Cocina integrada con desayunador</li>
            <li><i class="fas fa-bed"></i> 2 Dormitorios</li>
            <li><i class="fas fa-bath"></i> 4 Baños</li>
            <li><i class="fas fa-fire"></i> Quincho amplio para 12 personas con asador</li>
            <li><i class="fas fa-swimming-pool"></i> Piscina</li>
        </ul>`
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
                        <button class="btn btn-secondary" onclick="irPropiedades()">Ver todas</button>
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
                <button class="btn btn-secondary" data-bs-dismiss="modal" onclick="irPropiedades()">Ver todas</button>
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
    const url = new URL("propiedades.html#contacto", window.location.origin);
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
// function abrirVista360(id) {

//     const property = propiedades.find((prop) => prop.id === id);

//     if (property) {
       
//         document.getElementById("property360ModalTitle").innerText = property.titulo;

        
//         pannellum.viewer("pano360", {
//             type: "equirectangular",
//             panorama: property.vista360[0], 
//             autoLoad: true,
//             compass: true,
//             showZoomCtrl: true,
//             showFullscreenCtrl: true,
//         });

     
//         const modal = new bootstrap.Modal(document.getElementById("property360Modal"));
//         modal.show();
//     } else {
//         console.error("No se encontró la propiedad con ID:", id);
//     }
// }

function irPropiedades(){
    window.location.href = "propiedades.html";
}



