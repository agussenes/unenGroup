// Datos de Propiedades
const propiedades = [
    {
        id: 1,
        tipo: "venta",
        titulo: "Casa Moderna en Venta",
        precio: 150000,
        localidad: "Córdoba",
        imagenes: [
            "/images/pruebaPortadaCa3.jpg",
            "/images/carouselHome/CasaLD-01.jpeg",
            "/images/carouselHome/CasaLD-12.jpeg",
            "/images/carouselHome/CasaLD-00.jpeg"
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-bed"></i> 3 Habitaciones</li>
            <li><i class="fas fa-bath"></i> 2 Baños</li>
            <li><i class="fas fa-swimming-pool"></i> Piscina amplia</li>
            <li><i class="fas fa-car"></i> Cochera</li>
            <li><i class="fas fa-map-marker-alt"></i> Ubicación: Villa Belgrano</li>
            <li><i class="fas fa-paw"></i> Apto para mascotas</li>
        </ul>`
    },
    {
        id: 2,
        tipo: "alquiler",
        titulo: "Departamento en Alquiler",
        precio: 50000,
        localidad: "Buenos Aires",
        imagenes: [
            "/images/pruebaPortadaCa3.jpg",
            "/images/carouselHome/CasaLD-12.jpeg",
            "/images/carouselHome/CasaLD-00.jpeg"
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-bed"></i> 2 dormitorios y 1 baño completo</li>
            <li><i class="fas fa-paint-brush"></i> Living-comedor amplio y luminoso</li>
            <li><i class="fas fa-building"></i> Balcón con vista panorámica</li>
            <li><i class="fas fa-building"></i> Zona céntrica con acceso rápido a transporte</li>
        </ul>`
    },
    {
        id: 3,
        tipo: "alquiler-temporario",
        titulo: "Casa en Villa Belgrano",
        precio: 1200,
        localidad: "Villa Belgrano",
        imagenes: [
            "/images/pruebaPortadaCa3.jpg",
            "/images/carouselHome/CasaLD-01.jpeg",
            "/images/carouselHome/CasaLD-00.jpeg",
            "/images/carouselHome/CasaLD-12.jpeg"
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-paint-brush"></i>Living, comedor y cocina/comedor</li>
            <li><i class="fas fa-expand-arrows-alt"></i> Lavadero y escritorio pequeño</li>
            <li><i class="fas fa-bed"></i> Dormitorio principal en suite con vestidor y baño</li>
            <li><i class="fas fa-swimming-pool"></i> Amplio jardín con piscina apta para mascotas</li>
        </ul>`
    },
    {
        id: 4,
        tipo: "venta",
        titulo: "Departamento de Lujo",
        precio: 200000,
        localidad: "Rosario",
        imagenes: [
            "/images/pruebaPortadaCa3.jpg",
            "/images/carouselHome/CasaLD-01.jpeg",
            "/images/carouselHome/CasaLD-12.jpeg"
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-gem"></i> Departamento exclusivo en torre de lujo</li>
            <li><i class="fas fa-paint-brush"></i> Living-comedor con ventanales</li>
            <li><i class="fas fa-bed"></i> 3 dormitorios</li>
            <li><i class="fas fa-bath"></i> 2 baños</li>
            <li><i class="fas fa-building"></i> Acceso a amenities premium</li>
        </ul>`
    },
    {
        id: 5,
        tipo: "alquiler",
        titulo: "Vivienda a Estrenar en La Deseada",
        precio: 2000,
        localidad: "La Deseada",
        imagenes: [
            "/images/pruebaPortadaCa3.jpg",
            "/images/carouselHome/CasaLD-01.jpeg",
            "/images/carouselHome/CasaLD-12.jpeg",
            "/images/carouselHome/CasaLD-00.jpeg"
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-couch"></i Completamente amoblada</li>
            <li><i class="fas fa-bed"></i> Dormitorio principal con baño en suite y vestidor</li>
            <li><i class="fas fa-tree"></i> / <i class="fas fa-swimming-pool"></i> Amplia galería y jardín con piscina</li>
            <li><i class="fas fa-car"></i> Cochera con asador</li>
        </ul>`
    },
    {
        id: 6,
        tipo: "alquiler-temporario",
        titulo: "Villa Vacacional en Bariloche",
        precio: 2500,
        localidad: "Bariloche",
        imagenes: [
            "/images/pruebaPortadaCa3.jpg",
            "/images/carouselHome/CasaLD-12.jpeg",
            "/images/carouselHome/CasaLD-00.jpeg",
            "/images/carouselHome/CasaLD-01.jpeg"
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-binoculars"></i> Casa con vista panorámica</li>
            <li><i class="fas fa-bed"></i> 4 dormitorios y 3 baños</li>
            <li><i class="fas fa-tree"></i> Rodeada de naturaleza</li>
            <li><i class="fas fa-swimming-pool"></i> Piscina climatizada</li>
        </ul>`
    },
    {
        id: 7,
        tipo: "venta",
        titulo: "Casa Familiar en Salta",
        precio: 180000,
        localidad: "Salta",
        imagenes: [
            "/images/pruebaPortadaCa3.jpg",
            "/images/carouselHome/CasaLD-01.jpeg",
            "/images/carouselHome/CasaLD-12.jpeg"
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-bed"></i> 3 Habitaciones</li>
            <li><i class="fas fa-bath"></i> 2 Baños completos</li>
            <li><i class="fas fa-leaf"></i> Jardín amplio</li>
            <li><i class="fas fa-map-marker-alt"></i> Cerca de escuelas y comercios</li>
        </ul>`
    },
    {
        id: 8,
        tipo: "alquiler",
        titulo: "Apartamento Económico en San Juan",
        precio: 30000,
        localidad: "San Juan",
        imagenes: [
            "/images/pruebaPortadaCa3.jpg",
            "/images/carouselHome/CasaLD-00.jpeg",
            "/images/carouselHome/CasaLD-12.jpeg"
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-paint-brush"></i> Living-comedor y cocina integrada</li>
            <li><i class="fas fa-bed"></i> 2 dormitorios</li>
            <li><i class="fas fa-map-marker-alt"></i> Excelente ubicación en el centro</li>
            <li><i class="fas fa-building"></i> Balcón con vista urbana</li>
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

// Renderizar Propiedades
function renderProperties(data) {
    const container = document.getElementById("propiedadesContainer");
    container.innerHTML = data.map((prop) => `
      <div class="col-md-4">
        <div class="card shadow">
          <div class="swiper-container" id="swiper-${prop.id}">
            <div class="swiper-wrapper">
              ${prop.imagenes
                .map((img) => `<div class="swiper-slide"><img src="${img}" class="img-fluid" alt="${prop.titulo}"></div>`)
                .join("")}
            </div>
                <div class="botonesSwiperDes">
                    <div id="botonNextP" class="swiper-button-next"></div>
                    <div id="botonPrevP" class="swiper-button-prev"></div>
                 </div>
            <div class="swiper-pagination visores"></div>
          </div>
          <div class="card-body">
            <h5 class="card-title">${prop.titulo}</h5>
            <p class="card-text"><strong>Categoria:</strong> ${prop.tipo}</p>
            <p class="card-text"><strong>Precio:</strong> $${prop.precio.toLocaleString()}</p>
            <p class="card-text"><i class="fas fa-map-marker-alt"></i> Localidad: ${prop.localidad}</p>
           
            <button class="btn btn-info mb-2" onclick="viewPropertyDetails(${prop.id})">Ver más</button>
            <button class="btn btn-secondary" onclick="goToContact('${prop.titulo}')">Me interesa</button>
          </div>
        </div>
      </div>
    `).join("");

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
            <div class="row">
            <h3 class="text-center">${property.titulo}</h3>
                <div class="col-md-6">
                    
                    <p><strong>Precio:</strong> $${property.precio.toLocaleString()}</p>
                    <p><strong>Categoría:</strong> ${property.tipo}</p>
                    <p><strong>Localidad:</strong> ${property.localidad}</p>
                </div>
                <div class="col-md-6">
                    
                    <p id="descripcionDetalle">${property.descripcion}</p>
                </div>
            </div>
            <div class="d-flex justify-content-center gap-3 mt-4">
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
    document.getElementById("propiedadInteres").value = propiedad;
    document.getElementById("contacto").scrollIntoView({ behavior: "smooth" });
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
