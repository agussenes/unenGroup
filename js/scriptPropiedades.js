// scriptPropiedades.js — LISTADO PROPIEDADES (consumo API)
// Portado desde referencia-produccion/js/scriptPropiedadesST.js
// Detalle en Offcanvas + Lightbox. Incluye mejoras de lightbox:
// teclado persistente y foco accesible.

const API_BASE = 'https://api.unengroup.com.ar';

// Estado en memoria
let propiedades = [];

// 🟢 Reintentos por si la API está fría
const RETRIES = 2;
const RETRY_DELAY_MS = 800;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// 🟢 Loader centralizado
function showLoader() {
  const c = document.getElementById('propiedadesContainer');
  if (!c) return;
  c.innerHTML = `
    <div class="dg-loader">
      <div class="spinner-border text-info" role="status" aria-label="Cargando"></div>
      <div class="mt-2 small text-muted">Cargando propiedades…</div>
    </div>`;
}

// Helpers
function formatPrice(v) {
  if (typeof v === 'number') return v.toLocaleString('es-AR');
  return String(v ?? '').trim();
}
function byUniqueStrings(arr) {
  return [...new Set(arr.filter(Boolean).map(String))];
}

// Normaliza la URL de una imagen que llega de la API.
// - Si ya es absoluta (http/https) → se deja igual.
// - Si es un asset local (/images/...) → se deja igual.
// - Si viene relativa (ej. "storage/..." o "/storage/...") → se arma con API_BASE.
function resolveImg(u) {
  const s = String(u ?? '').trim();
  if (!s) return s;
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith('/images/')) return s;
  return API_BASE.replace(/\/+$/, '') + '/' + s.replace(/^\/+/, '');
}

// Placeholder embebido (no depende de un archivo en el server)
const PLACEHOLDER_IMG = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450">' +
  '<rect width="100%" height="100%" fill="#e9ecef"/>' +
  '<text x="50%" y="50%" font-family="Arial,Helvetica,sans-serif" font-size="30" fill="#9aa4ad" text-anchor="middle" dominant-baseline="middle">Sin imagen</text>' +
  '</svg>'
);

// === Swiper: importante scopear los selectores a cada carrusel ===
function initializeSwiper(containerId) {
  new Swiper(`#${containerId}`, {
    loop: true,
    pagination: { el: `#${containerId} .swiper-pagination`, clickable: true },
    navigation: {
      nextEl: `#${containerId} .swiper-button-next`,
      prevEl: `#${containerId} .swiper-button-prev`,
    },
  });
}

// === Visor fullscreen simple (LIGHTBOX) ===
let currentLightboxImages = [];
let currentLightboxIndex = 0;
let lightboxKeyHandler = null;   // referencia para poder remover el listener
let lightboxLastFocused = null;  // foco previo, para devolverlo al cerrar

function openLightbox(images, startIndex = 0) {
  currentLightboxImages = images;
  currentLightboxIndex = startIndex;

  const overlay = document.getElementById('lightboxOverlay');
  const imgEl = document.getElementById('lightboxImage');
  if (!overlay || !imgEl) return;

  // Aseguro que el overlay sea el último hijo del body (queda por encima del offcanvas)
  document.body.appendChild(overlay);

  const setSrc = () => { imgEl.src = currentLightboxImages[currentLightboxIndex] || ''; };
  setSrc();
  overlay.style.display = 'flex';

  const closeBtn = overlay.querySelector('.dg-lightbox-close');
  const prevBtn = overlay.querySelector('.dg-lightbox-prev');
  const nextBtn = overlay.querySelector('.dg-lightbox-next');

  const prev = () => { currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length; setSrc(); };
  const next = () => { currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxImages.length; setSrc(); };

  const close = () => {
    overlay.style.display = 'none';
    // Mejora 1: remover el listener de teclado al cerrar
    if (lightboxKeyHandler) {
      document.removeEventListener('keydown', lightboxKeyHandler);
      lightboxKeyHandler = null;
    }
    overlay.onclick = null;
    // Mejora 3: devolver el foco al elemento previo
    if (lightboxLastFocused && typeof lightboxLastFocused.focus === 'function') {
      lightboxLastFocused.focus();
    }
  };

  closeBtn.onclick = close;
  prevBtn.onclick = prev;
  nextBtn.onclick = next;

  overlay.onclick = (e) => { if (e.target === overlay) close(); };

  // Mejora 1: teclado activo mientras el lightbox esté abierto (sin { once:true })
  if (lightboxKeyHandler) document.removeEventListener('keydown', lightboxKeyHandler);
  lightboxKeyHandler = (e) => {
    if (overlay.style.display !== 'flex') return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
  };
  document.addEventListener('keydown', lightboxKeyHandler);

  // Mejora 3: foco al abrir (guardando el previo)
  lightboxLastFocused = document.activeElement;
  closeBtn.focus();
}

// === Render principal de cards ===
function renderProperties(data) {
  const container = document.getElementById('propiedadesContainer');
  if (!container) return;

  if (!data.length) {
    container.innerHTML = `
      <div class="alert alert-warning text-center">
        No se encontraron propiedades. Intenta con otros filtros.
      </div>`;
    return;
  }

  container.innerHTML = data.map((prop) => {
    const imgs = Array.isArray(prop.imagenes) ? prop.imagenes : [];
    const swiperId = `swiper-${prop.id}`;

    // Métricas para chips
    const cub = Number(prop.metrosCubiertos || 0);
    const m2  = Number(prop.metrosCuadrados || prop.metrosTotales || 0); // usamos metrosCuadrados; si no viene, caemos a totales
    const hab = Number(prop.habitaciones || 0);
    const ban = Number(prop.banos || 0);

    const chips = [];
    if (cub > 0) chips.push(`<span title="Superficie cubierta"><i class="fas fa-th-large"></i> ${cub} m² cub.</span>`);
    if (m2  > 0) chips.push(`<span title="Superficie"><i class="fas fa-expand"></i> ${m2} m²</span>`);
    if (hab > 0) chips.push(`<span title="Dormitorios"><i class="fas fa-bed"></i> ${hab}</span>`);
    if (ban > 0) chips.push(`<span title="Baños"><i class="fas fa-bath"></i> ${ban}</span>`);
    if (prop.petFriendly) chips.push(`<span title="Pet-Friendly"><i class="fas fa-paw" style="color:#71C6D4;"></i> Pet-Friendly</span>`);

    return `
      <div class="col-12 col-md-6 col-lg-4 d-flex flex-wrap">
        <div class="card shadow w-100">
          <div class="swiper-container" id="${swiperId}">
            <div class="swiper-wrapper">
              ${imgs.length
                ? imgs.map((img) =>
                    `<div class="swiper-slide">
                      <img src="${img}" class="img-fluid" alt="${prop.titulo}" loading="lazy" decoding="async">
                    </div>`).join('')
                : `<div class="swiper-slide">
                    <img src="${PLACEHOLDER_IMG}" class="img-fluid" alt="sin-imagen" loading="lazy" decoding="async">
                  </div>`
              }
            </div>
            <div class="botonesSwiperDes">
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
            <div class="swiper-pagination visores"></div>
          </div>

          <div class="card-body">
            <div class="card-icons d-flex justify-content-between align-items-center py-2">
              ${chips.join('')}
            </div>

            <h5 class="card-title py-2">${prop.titulo}</h5>
            <p class="card-text"><strong>Categoría:</strong> ${prop.tipo || '—'}</p>
            ${prop.precio ? `<p class="card-text"><strong>Precio:</strong> ${formatPrice(prop.precio)}</p>` : ''}
            ${prop.localidad ? `<p class="card-text"><i class="fas fa-map-marker-alt"></i> Localidad: ${prop.localidad}</p>` : ''}

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

// === Panel lateral de detalle (Offcanvas) ===
function viewPropertyDetails(id) {
  const property = propiedades.find((p) => Number(p.id) === Number(id));
  if (!property) return;

  const imgs = Array.isArray(property.imagenes) ? property.imagenes : [];
  const swiperId = `modal-swiper-${property.id}`;

  const gallery = `
    <div class="swiper-container mb-3" id="${swiperId}">
      <div class="swiper-wrapper">
        ${imgs.length
          ? imgs.map((img,idx) =>
              `<div class="swiper-slide">
                 <img src="${img}" class="img-fluid" alt="${property.titulo}" loading="lazy" decoding="async" data-idx="${idx}">
               </div>`).join('')
          : `<div class="swiper-slide">
               <img src="${PLACEHOLDER_IMG}" class="img-fluid" alt="sin-imagen" loading="lazy" decoding="async">
             </div>`
        }
      </div>
      <div class="botonesSwiperDes">
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
      <div class="pagination"><div class="swiper-pagination"></div></div>
    </div>
  `;

  const content = `
    ${gallery}
    <div class="row contenedorGen p-1 p-md-5 g-3">
      <div class="col-12"><h3 class="mb-2 text-start">${property.titulo}</h3></div>
      <div class="col-12">
        <div class="row d-flex justify-content-between">
          <div class="col-md-4">${property.precio ? `<p class="mb-1"><strong>Precio:</strong> ${formatPrice(property.precio)}</p>` : ''}</div>
          <div class="col-md-4">${property.tipo ? `<p class="mb-1"><strong>Categoría:</strong> ${property.tipo}</p>` : ''}</div>
          <div class="col-md-4">${property.localidad ? `<p class="mb-1"><strong>Localidad:</strong> ${property.localidad}</p>` : ''}</div>
        </div>
      </div>
      <div class="col-12"><div id="descripcionDetalle">${property.descripcion || ''}</div></div>
    </div>
  `;

  const target = document.getElementById('propertyDetailsContent');
  if (!target) return;
  target.innerHTML = content;

  // Acciones (abajo)
  const actions = document.getElementById('propertyDetailsActions');
  if (actions) {
    actions.innerHTML = `
      <button class="btn btn-secondary btn-me-interesa" onclick="goToContact('${property.titulo}')" data-bs-dismiss="offcanvas">Me interesa</button>
    `;
  }

  // Mostrar panel
  const panelEl = document.getElementById('propertyDetailsPanel');
  try {
    const BS = (window && window.bootstrap) ? window.bootstrap : bootstrap;
    BS.Offcanvas.getOrCreateInstance(panelEl).show();
  } catch (err) {
    console.error('No pude abrir Offcanvas con Bootstrap, aplico fallback:', err);
    panelEl.classList.add('show');
    panelEl.style.visibility = 'visible';
    panelEl.style.zIndex = 2000;
    document.body.classList.add('offcanvas-backdrop', 'show');
  }

  // Iniciar Swiper + fullscreen
  try {
    initializeSwiper(swiperId);
    target.querySelectorAll(`#${swiperId} .swiper-slide img`).forEach(imgEl => {
      imgEl.addEventListener('click', (e) => {
        const idx = Number(e.currentTarget.getAttribute('data-idx')) || 0;
        openLightbox(imgs.length ? imgs : [e.currentTarget.src], idx);
      });
    });
  } catch (err) {
    console.error('Error iniciando Swiper del panel:', err);
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

  // Cerrar el offcanvas de detalle si está abierto
  const panelEl = document.getElementById('propertyDetailsPanel');
  if (panelEl) {
    const inst = bootstrap.Offcanvas.getInstance(panelEl);
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

  const values = byUniqueStrings(propiedades.map(p => p.localidad))
    .sort((a, b) => String(a).localeCompare(String(b), 'es', { sensitivity: 'base' }));

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
  applyFilters();
}

// === Carga desde API ===
async function fetchPropertiesFromAPI(tries = RETRIES) {
  try {
    const url = `${API_BASE}/properties`; // activas públicas
    const res = await fetch(url, { cache: 'no-store', credentials: 'omit' });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    const list = Array.isArray(data) ? data : [];

    if (list.length === 0 && tries > 0) {
      await sleep(RETRY_DELAY_MS);
      return fetchPropertiesFromAPI(tries - 1);
    }

    // Normalizo al shape
    return list.map(p => ({
      id: p.id,
      tipo: p.tipo || '',
      titulo: p.titulo || '',
      precio: p.precio ?? '',
      localidad: p.localidad || '',

      // Superficies
      metrosTotales: Number(p.metrosTotales || p.superficieTotal || p.m2Totales || p.metros || p.metrosCuadrados || 0),
      metrosCubiertos: Number(p.metrosCubiertos || p.superficieCubierta || p.m2Cubiertos || 0),
      superficieTerreno: Number(p.superficieTerreno || p.terreno || p.m2Terreno || 0),

      // Campo explícito “metrosCuadrados” si te llega así
      metrosCuadrados: Number(p.metrosCuadrados || 0),

      habitaciones: Number(p.habitaciones || 0),
      banos: Number(p.banos || 0),
      petFriendly: !!p.petFriendly,
      imagenes: (Array.isArray(p.imagenes) ? p.imagenes : []).map(resolveImg).filter(Boolean),
      descripcion: p.descripcion || '',
      destacado: !!p.destacado,
      active: !!p.active,
    }));
  } catch (e) {
    if (tries > 0) {
      await sleep(RETRY_DELAY_MS);
      return fetchPropertiesFromAPI(tries - 1);
    }
    throw e;
  }
}

// === Boot ===
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('propiedadesContainer');
  if (!container) return;

  showLoader();

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

  populateLocalitiesDropdown();
  populatePropertiesDropdown();
  applyInitialFilters();

  document.querySelectorAll('#filtros input, #filtros select').forEach((el) => {
    el.addEventListener('input', applyFilters);
    el.addEventListener('change', applyFilters);
  });
});

// Exponer para onclick inline
window.viewPropertyDetails = viewPropertyDetails;
window.goToContact = goToContact;
window.openLightbox = openLightbox;
