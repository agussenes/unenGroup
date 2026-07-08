// scriptHomeDestacados.js — DESTACADOS HOME (consumo API)
// Portado desde referencia-produccion/js/scriptHomeDestacadosST.js
// Incluye mejoras de lightbox: teclado persistente, foco accesible.

const API_BASE = 'https://api.unengroup.com.ar';

let propsDestacadas = [];

// Utils
const RETRIES = 2;
const RETRY_DELAY_MS = 800;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function formatPrice(v) {
  return (typeof v === 'number') ? v.toLocaleString('es-AR') : String(v ?? '').trim();
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

// ========= LIGHTBOX =========
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

  // Garantizo tope de z-index por encima del modal
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

// ========= RENDER =========
function renderDestacadas(list) {
  const mount = document.getElementById('destacadasMount');
  if (!mount) return;

  if (!list.length) {
    mount.innerHTML = `<div class="alert alert-info text-center">No hay propiedades destacadas por ahora.</div>`;
    return;
  }

  // envolvemos en .row para respetar el grid
  mount.innerHTML = `
    <div class="row g-4" id="destacadasRow">
      ${list.map((prop) => {
        const imgs = Array.isArray(prop.imagenes) ? prop.imagenes : [];
        const swiperId = `destacada-swiper-${prop.id}`;

        // Chips (cubiertos → totales/cuadrados → hab → baños → Pet)
        const cub = Number(prop.metrosCubiertos || 0);
        const m2  = Number(prop.metrosCuadrados || prop.metrosTotales || 0);
        const hab = Number(prop.habitaciones || 0);
        const ban = Number(prop.banos || 0);

        const chips = [];
        if (cub > 0) chips.push(`<span title="Superficie cubierta"><i class="fas fa-th-large"></i> ${cub} m² cub.</span>`);
        if (m2  > 0)  chips.push(`<span title="Superficie"><i class="fas fa-expand"></i> ${m2} m²</span>`);
        if (hab > 0) chips.push(`<span title="Dormitorios"><i class="fas fa-bed"></i> ${hab}</span>`);
        if (ban > 0) chips.push(`<span title="Baños"><i class="fas fa-bath"></i> ${ban}</span>`);
        if (prop.petFriendly) chips.push(`<span title="Pet-Friendly"><i class="fas fa-paw" style="color:#71C6D4;"></i> Pet-Friendly</span>`);

        return `
        <div class="col-12 col-md-6 col-lg-4 d-flex">
          <div class="card shadow w-100">
            <div class="swiper-container" id="${swiperId}">
              <div class="swiper-wrapper">
                ${imgs.length
                  ? imgs.map(img => `
                      <div class="swiper-slide">
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

            </div>

          </div>
        </div>`;
      }).join('')}
    </div>
  `;

  // Listeners
  mount.querySelectorAll('[data-view-more]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = Number(e.currentTarget.getAttribute('data-view-more'));
      openDetailsModal(id);
    });
  });

  mount.querySelectorAll('.btn-me-interesa').forEach(button => {
    button.addEventListener('click', function () {
      goToContactFromHome(this.getAttribute('data-propiedad'));
    });
  });

  // Swipers
  list.forEach((prop) => initializeSwiper(`destacada-swiper-${prop.id}`));
}

// ========= MODAL DETALLE =========
function openDetailsModal(id) {
  const property = propsDestacadas.find(p => Number(p.id) === Number(id));
  if (!property) return;

  const imgs = Array.isArray(property.imagenes) ? property.imagenes : [];
  const swiperId = `modal-swiper-${property.id}`;

  const gallery = `
    <div class="swiper-container mb-3" id="${swiperId}">
      <div class="swiper-wrapper">
        ${imgs.length
          ? imgs.map((img, idx) => `
              <div class="swiper-slide">
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
    <div class="row g-3  p-3">
      <div class="col-12"><h3 class="mb-2">${property.titulo}</h3></div>
      <div class="col-12">
        <div class="row text-center text-md-start">
          <div class="col-md-4">${property.precio ? `<p class="mb-1"><strong>Precio:</strong> ${formatPrice(property.precio)}</p>` : ''}</div>
          <div class="col-md-4">${property.tipo ? `<p class="mb-1"><strong>Categoría:</strong> ${property.tipo}</p>` : ''}</div>
          <div class="col-md-4">${property.localidad ? `<p class="mb-1"><strong>Localidad:</strong> ${property.localidad}</p>` : ''}</div>
        </div>
      </div>
      <div class="col-12"><div id="descripcionDetalle">${property.descripcion || ''}</div></div>
      <div class="col-12 d-flex justify-content-center">
        <button class="btn btn-secondary" onclick="goToContactFromHome('${property.titulo}')">Me interesa</button>
      </div>
    </div>
  `;

  const target = document.getElementById('propertyDetailsContent');
  if (!target) return;
  target.innerHTML = content;

  // Abrir modal
  const modalEl = document.getElementById('propertyDetailsModal');
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();

  // Swiper + Lightbox
  try {
    initializeSwiper(swiperId);
    target.querySelectorAll(`#${swiperId} .swiper-slide img`).forEach(imgEl => {
      imgEl.addEventListener('click', (e) => {
        const idx = Number(e.currentTarget.getAttribute('data-idx')) || 0;
        openLightbox(imgs.length ? imgs : [e.currentTarget.src], idx);
      });
    });
  } catch (err) {
    console.error('Error iniciando Swiper del modal:', err);
  }
}

// ========= CONTACTO (fix del scroll cortado) =========
function goToContactFromHome(propiedadTitulo) {
  // Si estamos en modal, cerrarlo antes de scrollear
  const modalEl = document.getElementById('propertyDetailsModal');
  if (modalEl) {
    const inst = bootstrap.Modal.getInstance(modalEl);
    if (inst) inst.hide();
  }

  // Precargar el título en el mensaje del formulario de home
  const mensaje = document.getElementById('mensaje');
  if (mensaje && propiedadTitulo) {
    if (!mensaje.value.includes(propiedadTitulo)) {
      mensaje.value = `Consulta por: ${propiedadTitulo}\n${mensaje.value}`.trim();
    }
  }

  // Scroll con offset por navbar
  const destino = document.getElementById('contacto');
  if (!destino) return;

  const NAV_OFFSET = document.querySelector('.navbar')?.offsetHeight || 0;
  const top = destino.getBoundingClientRect().top + window.scrollY - (NAV_OFFSET + 12);

  // Espero al cierre del modal y al repaint para evitar corte
  setTimeout(() => {
    window.scrollTo({ top, behavior: 'smooth' });
    setTimeout(() => window.scrollTo({ top, behavior: 'smooth' }), 250);
  }, 200);
}

// ========= FETCH =========
async function fetchDestacadas(tries = RETRIES) {
  try {
    const res = await fetch(`${API_BASE}/properties`, { cache: 'no-store', credentials: 'omit' });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const arr = await res.json();
    const list = Array.isArray(arr) ? arr : [];

    if (list.length === 0 && tries > 0) {
      await sleep(RETRY_DELAY_MS);
      return fetchDestacadas(tries - 1);
    }

    return list
      .filter(p => !!p.destacado && !!p.active) // solo destacados activos
      .map(p => ({
        id: p.id,
        tipo: p.tipo || '',
        titulo: p.titulo || '',
        precio: p.precio ?? '',
        localidad: p.localidad || '',
        metrosTotales: Number(p.metrosTotales || p.superficieTotal || p.m2Totales || p.metros || p.metrosCuadrados || 0),
        metrosCubiertos: Number(p.metrosCubiertos || p.superficieCubierta || p.m2Cubiertos || 0),
        metrosCuadrados: Number(p.metrosCuadrados || 0),
        superficieTerreno: Number(p.superficieTerreno || p.terreno || p.m2Terreno || 0),
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
      return fetchDestacadas(tries - 1);
    }
    throw e;
  }
}

// ========= BOOT =========
document.addEventListener('DOMContentLoaded', async () => {
  const mount = document.getElementById('destacadasMount');
  if (mount) {
    mount.innerHTML = `
      <div class="dg-loader text-center my-4">
        <div class="spinner-border text-info" role="status" aria-label="Cargando"></div>
        <div class="mt-2 small text-muted">Cargando destacadas…</div>
      </div>`;
  }

  try {
    propsDestacadas = await fetchDestacadas();
  } catch (err) {
    console.error(err);
    if (mount) {
      mount.innerHTML = `<div class="alert alert-danger text-center">No se pudieron cargar las destacadas.</div>`;
    }
    return;
  }

  renderDestacadas(propsDestacadas);
});

// Expose (por si los necesitás en inline)
window.openLightbox = openLightbox;
window.goToContactFromHome = goToContactFromHome;
