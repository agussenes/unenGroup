// js/scriptHomeDestacados.js

const API_BASE = 'https://api.unengroup.com.ar';

// reintentos por si la API tarda en responder (frío)
const RETRIES = 2;
const RETRY_DELAY_MS = 800;

async function fetchDestacadas(tries = RETRIES) {
  try {
    const res = await fetch(`${API_BASE}/properties?destacado=1`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const data = await res.json();

    // si vino vacío, reintento una o dos veces
    if (Array.isArray(data) && data.length === 0 && tries > 0) {
      await new Promise(r => setTimeout(r, RETRY_DELAY_MS));
      return fetchDestacadas(tries - 1);
    }
    return data;
  } catch (e) {
    if (tries > 0) {
      await new Promise(r => setTimeout(r, RETRY_DELAY_MS));
      return fetchDestacadas(tries - 1);
    }
    throw e;
  }
}

// ----- helpers de UI -----
let MOUNT = null;

function showLoader() {
  MOUNT.innerHTML = `
    <div class="dg-loader">
      <div class="spinner-border text-info" role="status" aria-label="Cargando"></div>
      <div class="mt-2 small text-muted">Cargando destacadas…</div>
    </div>`;
}

function buildInnerSwiper(prop) {
  const imgs = (Array.isArray(prop.imagenes) && prop.imagenes.length
    ? prop.imagenes
    : ['/images/placeholder.webp']).slice(0, 9);

  return `
    <div class="swiper dg-card-swiper" data-card-id="${prop.id}">
      <div class="swiper-wrapper">
        ${imgs.map(u => `
          <div class="swiper-slide">
            <img src="${u}" loading="lazy"
                 alt="${(prop.titulo || '').replace(/"/g,'&quot;')}"
                 onerror="this.src='/images/placeholder.webp'">
          </div>`).join('')}
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-pagination"></div>
    </div>`;
}

function buildCard(prop) {
  const precio = (prop.precio ?? '').toString().trim() || 'Consultar';
  return `
    <div class="card shadow h-100 dg-card">
      ${buildInnerSwiper(prop)}
      <div class="card-body">
        <div class="card-icons d-flex justify-content-between py-2">
          <span><i class="fas fa-expand"></i> ${Number(prop.metrosCuadrados || 0)} m²</span>
          ${prop.habitaciones ? `<span><i class="fas fa-bed"></i> ${prop.habitaciones}</span>` : ''}
          ${prop.banos ? `<span><i class="fas fa-bath"></i> ${prop.banos}</span>` : ''}
          ${prop.petFriendly ? `<span><i class="fas fa-paw" style="color:#71C6D4;"></i> Pet-Friendly</span>` : ''}
        </div>
        <h5 class="card-title py-2">${prop.titulo || ''}</h5>
        <p class="card-text"><strong>Precio:</strong> ${precio}</p>
        <p class="card-text"><strong>Categoría:</strong> ${prop.tipo || ''}</p>
        <p class="card-text"><i class="fas fa-map-marker-alt"></i> Localidad: ${prop.localidad || ''}</p>
        <div class="d-flex justify-content-between">
          <button class="btn btn-info" data-open-details="${prop.id}">Ver más</button>
          <a class="btn btn-secondary" href="/propiedades.html">Ver todas</a>
        </div>
      </div>
    </div>`;
}

function mountGrid(props) {
  MOUNT.innerHTML = `
    <div class="row g-4 d-flex align-content-center justify-content-center dg-fade-in">
      ${props.map(p => `<div class="col-12 col-md-6 col-lg-4 d-flex">${buildCard(p)}</div>`).join('')}
    </div>`;
}

function mountCarousel(props) {
  MOUNT.innerHTML = `
    <div class="swiper dg-destacadas-swiper dg-fade-in">
      <div class="swiper-wrapper">
        ${props.map(p => `<div class="swiper-slide">${buildCard(p)}</div>`).join('')}
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-pagination"></div>
    </div>`;

  new Swiper('.dg-destacadas-swiper', {
    slidesPerView: 1,
    spaceBetween: 16,
    watchOverflow: true,
    nested: true,
    navigation: {
      nextEl: '.dg-destacadas-swiper > .swiper-button-next',
      prevEl: '.dg-destacadas-swiper > .swiper-button-prev',
    },
    pagination: { el: '.dg-destacadas-swiper > .swiper-pagination', clickable: true },
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 16 },
      992: { slidesPerView: 3, spaceBetween: 24 },
    },
  });
}

function initInnerSwipers() {
  document.querySelectorAll('.dg-card-swiper').forEach(el => {
    new Swiper(el, {
      slidesPerView: 1,
      loop: true,
      nested: true,
      watchOverflow: true,
      navigation: {
        nextEl: el.querySelector('.swiper-button-next'),
        prevEl: el.querySelector('.swiper-button-prev'),
      },
      pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
    });
  });
}

function bindDetails(props) {
  const map = new Map(props.map(p => [String(p.id), p]));
  MOUNT.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open-details]');
    if (!btn) return;
    const p = map.get(btn.getAttribute('data-open-details'));
    if (p) openDetailsModal(p);
  });
}

function openDetailsModal(p) {
  const imgs = Array.isArray(p.imagenes) ? p.imagenes : [];
  const content = `
    <div class="swiper dg-modal-swiper" id="modal-swiper-${p.id}">
      <div class="swiper-wrapper">
        ${(imgs.length ? imgs : ['/images/placeholder.webp']).map(u => `
          <div class="swiper-slide">
            <img src="${u}" loading="lazy" alt="${p.titulo || ''}"
                 onerror="this.src='/images/placeholder.webp'">
          </div>`).join('')}
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-pagination"></div>
    </div>

    <div class="row  mt-3">
      <h3 class="text-start">${p.titulo || ''}</h3>
      <div class="col-12 mb-4 border-bottom detalleProp">
        <div class="row">
          <div class="col-lg-4 col-sm-12">
           <p><strong>Precio:</strong> ${(p.precio ?? '').toString().trim() || 'Consultar'}</p>
          </div>
          <div class="col-lg-4 col-sm-12">
            <p><strong>Categoría:</strong> ${p.tipo || ''}</p>
          </div>
          <div class="col-lg-4 col-sm-12">
           <p><strong>Localidad:</strong> ${p.localidad || ''}</p>
          </div>
        </div>
      </div>
      <div class="col-12">
      <div id="descripcionDetalle">${p.descripcion || ''}
      </div>
      </div>
    </div>
    <div class="d-flex justify-content-center gap-3 mt-4">
      <a class="btn btn-secondary" href="/propiedades.html">Ver todas</a>
      <a class="btn btn-secondary" href="/propiedades.html?propiedad=${encodeURIComponent(p.titulo || '')}#contacto">Me interesa</a>
    </div>`;

  document.getElementById('propertyDetailsContent').innerHTML = content;

  new Swiper(`#modal-swiper-${p.id}`, {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: `#modal-swiper-${p.id} .swiper-button-next`,
      prevEl: `#modal-swiper-${p.id} .swiper-button-prev`,
    },
    pagination: { el: `#modal-swiper-${p.id} .swiper-pagination`, clickable: true },
  });

  new bootstrap.Modal(document.getElementById('propertyDetailsModal')).show();
}

// ----- bootstrap -----
document.addEventListener('DOMContentLoaded', async () => {
  MOUNT = document.getElementById('destacadasMount') || document.getElementById('propiedadesContainer');
  if (!MOUNT) return; // contenedor no existe en esta página

  showLoader();

  try {
    const props = await fetchDestacadas();

    if (!props.length) {
      MOUNT.innerHTML = '<p class="text-center text-muted">No hay propiedades destacadas por ahora.</p>';
      return;
    }

    if (props.length > 3) mountCarousel(props);
    else mountGrid(props);

    initInnerSwipers();
    bindDetails(props);
  } catch (err) {
    console.error(err);
    MOUNT.innerHTML = '<p class="text-center text-danger">No se pudieron cargar las propiedades destacadas.</p>';
  }
});
