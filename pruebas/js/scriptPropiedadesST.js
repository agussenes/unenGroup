// scriptPropiedades.js — reemplazo total

const API_BASE = 'https://api.unengroup.com.ar';

// Estado en memoria
let propiedades = [];

// Helpers
function formatPrice(v) {
  // En tu API, "precio" suele venir como string (ej: "USD 100.000" o "$800.000 + expensas")
  // Así que lo mostramos tal cual. Si eventualmente te llega número, lo formateamos.
  if (typeof v === 'number') return v.toLocaleString();
  return String(v ?? '').trim();
}

function byUniqueStrings(arr) {
  return [...new Set(arr.filter(Boolean).map(String))];
}

// === Swiper: importante scopear los selectores a cada carrusel ===
function initializeSwiper(containerId) {
  new Swiper(`#${containerId}`, {
    loop: true,
    pagination: {
      el: `#${containerId} .swiper-pagination`,
      clickable: true,
    },
    navigation: {
      nextEl: `#${containerId} .swiper-button-next`,
      prevEl: `#${containerId} .swiper-button-prev`,
    },
  });
}

// === Render principal de cards ===
function renderProperties(data) {
  const container = document.getElementById('propiedadesContainer');
  if (!container) return;

  if (!data.length) {
    container.innerHTML = `
      <div class="alert alert-warning text-center">
        No se encontraron propiedades. Intenta con otros filtros.
      </div>
    `;
    return;
  }

  container.innerHTML = data.map((prop) => {
    const imgs = Array.isArray(prop.imagenes) ? prop.imagenes : [];
    const swiperId = `swiper-${prop.id}`;
    const metros = Number(prop.metrosCuadrados || 0);

    return `
      <div class="col-12 col-md-6 col-lg-4 d-flex flex-wrap">
        <div class="card shadow w-100">
          <div class="swiper-container" id="${swiperId}">
            <div class="swiper-wrapper">
              ${
                imgs.length
                  ? imgs.map((img) =>
                      `<div class="swiper-slide">
                        <img src="${img}" class="img-fluid" alt="${prop.titulo}" loading="lazy">
                      </div>`
                    ).join('')
                  : `
                    <div class="swiper-slide">
                      <img src="/images/placeholder.webp" class="img-fluid" alt="sin-imagen" loading="lazy">
                    </div>
                  `
              }
            </div>
            <div class="botonesSwiperDes">
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
            <div class="swiper-pagination visores"></div>
          </div>

          <div class="card-body">
            <div class="card-icons d-flex justify-content-between py-2">
              <span><i class="fas fa-expand"></i> ${metros} m²</span>
              ${Number(prop.habitaciones) > 0 ? `<span><i class="fas fa-bed"></i> ${prop.habitaciones}</span>` : ''}
              ${Number(prop.banos) > 0 ? `<span><i class="fas fa-bath"></i> ${prop.banos}</span>` : ''}
              ${prop.petFriendly ? `<span><i class="fas fa-paw" style="color: #71C6D4;"></i> Pet-Friendly</span>` : ''}
            </div>

            <h5 class="card-title py-2">${prop.titulo}</h5>
            <p class="card-text"><strong>Categoría:</strong> ${prop.tipo}</p>
            <p class="card-text"><strong>Precio:</strong> ${formatPrice(prop.precio)}</p>
            <p class="card-text"><i class="fas fa-map-marker-alt"></i> Localidad: ${prop.localidad}</p>

            <button class="btn btn-info mb-2" data-view-more="${prop.id}">Ver más</button>
            <button class="btn btn-secondary btn-me-interesa" data-propiedad="${prop.titulo}">Me interesa</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Eventos de “Ver más”
  container.querySelectorAll('[data-view-more]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = Number(e.currentTarget.getAttribute('data-view-more'));
      viewPropertyDetails(id);
    });
  });

  // Eventos “Me interesa”
  container.querySelectorAll('.btn-me-interesa').forEach(button => {
    button.addEventListener('click', function () {
      goToContact(this.getAttribute('data-propiedad'));
    });
  });

  // Inicializar Swipers
  data.forEach((prop) => initializeSwiper(`swiper-${prop.id}`));
}

// === Modal detalle ===
function viewPropertyDetails(id) {
  const property = propiedades.find((p) => Number(p.id) === Number(id));
  if (!property) return;

  const imgs = Array.isArray(property.imagenes) ? property.imagenes : [];
  const content = `
    <div class="swiper-container mb-4" id="modal-swiper-${property.id}">
      <div class="swiper-wrapper">
        ${
          imgs.length
            ? imgs.map(img =>
                `<div class="swiper-slide">
                  <img src="${img}" class="img-fluid" alt="${property.titulo}" loading="lazy">
                </div>`
              ).join('')
            : `<div class="swiper-slide">
                <img src="/images/placeholder.webp" class="img-fluid" alt="sin-imagen" loading="lazy">
               </div>`
        }
      </div>
      <div class="botonesSwiperDes">
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
      <div class="pagination">
        <div class="swiper-pagination"></div>
      </div>
    </div>

    <div class="row text-center text-xl-start">
      <h3 class="text-center">${property.titulo}</h3>
      <div class="col-xl-6">
        <p><strong>Precio:</strong> ${formatPrice(property.precio)}</p>
        <p><strong>Categoría:</strong> ${property.tipo}</p>
        <p><strong>Localidad:</strong> ${property.localidad}</p>
      </div>
      <div class="col-xl-6">
        <div id="descripcionDetalle">${property.descripcion || ''}</div>
      </div>
    </div>
    <div class="d-flex justify-content-center gap-3 mt-4">
      <button class="btn btn-secondary" onclick="goToContact('${property.titulo}')" data-bs-dismiss="modal">Me interesa</button>
    </div>
  `;

  const target = document.getElementById('propertyDetailsContent');
  if (target) {
    target.innerHTML = content;
    initializeSwiper(`modal-swiper-${property.id}`);
    new bootstrap.Modal(document.getElementById('propertyDetailsModal')).show();
  }
}

// === “Me interesa” ===
function goToContact(propiedad) {
  const selectPropiedad = document.getElementById('propiedadInteres');
  if (!selectPropiedad) return;

  const opciones = Array.from(selectPropiedad.options);
  let opcion = opciones.find(opt => opt.value === propiedad);

  if (!opcion) {
    const nueva = document.createElement('option');
    nueva.value = propiedad;
    nueva.textContent = propiedad;
    nueva.selected = true;
    selectPropiedad.appendChild(nueva);
  } else {
    selectPropiedad.value = propiedad;
  }

  const modal = document.getElementById('propertyDetailsModal');
  if (modal) {
    const inst = bootstrap.Modal.getInstance(modal);
    if (inst) inst.hide();
  }

  setTimeout(() => {
    const contactoSection = document.getElementById('contacto');
    if (contactoSection) {
      contactoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => { window.location.hash = '#contacto'; }, 400);
    }
  }, 250);
}

// === Dropdowns (Localidades / Propiedad de interés) ===
function populateLocalitiesDropdown() {
  const select = document.getElementById('localidad');
  if (!select) return;
  const values = byUniqueStrings(propiedades.map(p => p.localidad));
  select.innerHTML = `<option value="">Todas las localidades</option>` + values
    .map(loc => `<option value="${String(loc).toLowerCase()}">${loc}</option>`)
    .join('');
}

function populatePropertiesDropdown() {
  const select = document.getElementById('propiedadInteres');
  if (!select) return;
  select.innerHTML = `<option value="">Selecciona una propiedad...</option>` +
    propiedades.map(p => `<option value="${p.titulo}">${p.titulo}</option>`).join('');
}

// === Filtros ===
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return { tipo: params.get('tipo') || 'all' };
}

function applyFilters() {
  const tipo = (document.getElementById('tipoPropiedad')?.value || 'all').trim();
  const localidad = (document.getElementById('localidad')?.value || '').toLowerCase();

  const filtered = propiedades.filter((prop) =>
    (tipo === 'all' || prop.tipo === tipo) &&
    (!localidad || String(prop.localidad || '').toLowerCase().includes(localidad))
  );

  renderProperties(filtered);
}

function applyInitialFilters() {
  const { tipo } = getQueryParams();
  const tipoDropdown = document.getElementById('tipoPropiedad');
  if (tipoDropdown && tipo !== 'all') tipoDropdown.value = tipo;
  applyFilters(); // aplica con el tipo seteado arriba
}

// === Carga desde API ===
async function fetchPropertiesFromAPI() {
  // Podés pasar filtros al servidor si querés reducir payload:
  // const qs = new URLSearchParams();
  // if (getQueryParams().tipo !== 'all') qs.set('tipo', getQueryParams().tipo);
  // const url = `${API_BASE}/properties?${qs.toString()}`;

  const url = `${API_BASE}/properties`; // traigo todas (ya vienen solo activas)
  const res = await fetch(url, { credentials: 'omit' });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const data = await res.json();
  if (!Array.isArray(data)) return [];

  // Aseguro shape mínimo esperado por tu front
  return data.map(p => ({
    id: p.id,
    tipo: p.tipo || '',
    titulo: p.titulo || '',
    precio: p.precio ?? '',
    localidad: p.localidad || '',
    metrosCuadrados: Number(p.metrosCuadrados || 0),
    habitaciones: Number(p.habitaciones || 0),
    banos: Number(p.banos || 0),
    petFriendly: !!p.petFriendly,
    imagenes: Array.isArray(p.imagenes) ? p.imagenes : [],
    descripcion: p.descripcion || '',
    destacado: !!p.destacado,
    active: !!p.active,
  }));
}

// === Boot ===
document.addEventListener('DOMContentLoaded', async () => {
  // Loader opcional
  const container = document.getElementById('propiedadesContainer');
  if (container) {
    container.innerHTML = `
      <div class="d-flex justify-content-center py-5">
        <div class="spinner-border text-secondary" role="status"></div>
      </div>`;
  }

  try {
    propiedades = await fetchPropertiesFromAPI();
  } catch (e) {
    if (container) {
      container.innerHTML = `
        <div class="alert alert-danger text-center">
          No se pudieron cargar las propiedades. Intenta más tarde.
        </div>`;
    }
    console.error(e);
    return;
  }

  // Dropdowns
  populateLocalitiesDropdown();
  populatePropertiesDropdown();

  // Filtros iniciales + render
  applyInitialFilters();

  // Filtros “en vivo”
  document.querySelectorAll('#filtros input, #filtros select').forEach((el) => {
    el.addEventListener('input', applyFilters);
    el.addEventListener('change', applyFilters);
  });
});

// Exponer para onclick inline que ya tenías
window.viewPropertyDetails = viewPropertyDetails;
window.goToContact = goToContact;
