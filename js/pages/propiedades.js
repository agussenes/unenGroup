// Propiedades — listado, filtros (?tipo/#filtros/?propiedad), detalle, formulario. Etapa 3 (ES module).
import { WHATSAPP, WA_MSG, PLACEHOLDER } from '../core/config.js';
import { esc, sanitize, money, tipoLabel, supTotal, waLink, fact } from '../core/helpers.js';
import { fetchProperties } from '../core/api.js';
import { openLightbox } from '../core/lightbox.js';

// --- Envío del formulario (mismo backend + spinner) ---
(function () {
            'use strict';
            const form = document.getElementById('formPropiedades');
            if (!form) return;
            const btn = form.querySelector('button[type="submit"]');
            const originalHTML = btn ? btn.innerHTML : 'Enviar mensaje';

            function notify(icon, title, text) {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({ icon, title, text, confirmButtonText: 'Aceptar', confirmButtonColor: '#71C6D4' });
                } else {
                    alert(title + '\n\n' + text);
                }
            }

            form.addEventListener('submit', async function (e) {
                e.preventDefault();

                const nombre = document.getElementById('nombre').value.trim();
                const email = document.getElementById('correo').value.trim();
                const telefono = document.getElementById('telefono').value.trim();
                const propiedadInteres = document.getElementById('propiedadInteres').value.trim();
                const mensaje = document.getElementById('mensaje').value.trim();
                const recaptchaResponse = document.querySelector('.g-recaptcha-response')?.value || '';

                if (!nombre || !email || !telefono || !propiedadInteres || !mensaje || !recaptchaResponse) {
                    notify('warning', 'Faltan datos', 'Completá todos los campos y verificá el reCAPTCHA antes de enviar.');
                    return;
                }

                // Deshabilitar + spinner (evita doble envío; da movimiento)
                btn.disabled = true;
                btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando…';

                try {
                    const formData = new FormData(form);
                    formData.append('g-recaptcha-response', recaptchaResponse);
                    const response = await fetch('/php/formPropiedades.php', { method: 'POST', body: formData });
                    const result = await response.json();

                    if (result.status === 'success') {
                        form.reset();
                        if (typeof grecaptcha !== 'undefined') grecaptcha.reset();
                        notify('success', '¡Mensaje enviado!', 'Gracias por tu consulta. El equipo de UnenGroup se pondrá en contacto a la brevedad.');
                    } else {
                        notify('error', 'No se pudo enviar', result.message || 'Ocurrió un error al enviar tu mensaje. Intentá nuevamente.');
                    }
                } catch (err) {
                    console.error(err);
                    notify('error', 'Error de conexión', 'Verificá tu conexión a internet e intentá nuevamente.');
                } finally {
                    btn.disabled = false;
                    btn.innerHTML = originalHTML;
                }
            });
        })();

// --- App: consumo API, filtros, cards, detalle, lightbox ---
(function () {
            'use strict';

            let ALL = [];
            let VIEW = [];
            let detailSwiper = null;
            let bsOffcanvas = null;

            const $ = (s, r = document) => r.querySelector(s);


            // Sanitización básica de la descripción HTML de la API




            // ---------- FETCH ----------

            // ---------- ESTADOS ----------
            function showState(html) { const s = $('#state'); s.hidden = false; s.innerHTML = html; $('#grid').innerHTML = ''; }
            function hideState() { $('#state').hidden = true; }

            // ---------- FILTROS ----------
            function buildFilters() {
                const tipos = [...new Set(ALL.map(p => p.tipo).filter(Boolean))];
                const locs = [...new Set(ALL.map(p => p.localidad).filter(Boolean))]
                    .sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
                $('#fTipo').innerHTML = '<option value="all">Todas</option>' +
                    tipos.map(t => `<option value="${esc(t)}">${esc(tipoLabel(t))}</option>`).join('');
                $('#fLocalidad').innerHTML = '<option value="">Todas las localidades</option>' +
                    locs.map(l => `<option value="${esc(l.toLowerCase())}">${esc(l)}</option>`).join('');
                $('#chipsOperacion').innerHTML = ['all', ...tipos].map(t =>
                    `<span class="chip${t === 'all' ? ' active' : ''}" data-tipo="${esc(t)}">${t === 'all' ? 'Todas' : esc(tipoLabel(t))}</span>`
                ).join('');
            }

            // Poblar el select del formulario real (Propiedad de interés)
            function populateInteres() {
                const sel = $('#propiedadInteres');
                if (!sel) return;
                sel.innerHTML = '<option value="">Selecciona una propiedad...</option>' +
                    ALL.map(p => `<option value="${esc(p.titulo)}">${esc(p.titulo)}</option>`).join('');
            }

            function readFilters() {
                return {
                    q: $('#fBusqueda').value.trim().toLowerCase(),
                    tipo: $('#fTipo').value || 'all',
                    loc: $('#fLocalidad').value || '',
                    fav: $('#fFav').checked
                };
            }

            function applyFilters() {
                const f = readFilters();
                VIEW = ALL.filter(p => {
                    if (f.tipo !== 'all' && p.tipo !== f.tipo) return false;
                    if (f.loc && !String(p.localidad).toLowerCase().includes(f.loc)) return false;
                    if (f.fav && !p.destacado) return false;
                    if (f.q && !(p.titulo + ' ' + p.localidad).toLowerCase().includes(f.q)) return false;
                    return true;
                });
                document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.tipo === f.tipo));
                render();
            }

            function updateCounter() {
                const n = VIEW.length;
                $('#counter').textContent = n === 1 ? '1 propiedad disponible' : n + ' propiedades disponibles';
            }

            // ---------- CARD ----------
            function card(p) {
                const img = p.imagenes[0] || PLACEHOLDER;
                const sup = supTotal(p);
                const metrics = [];
                if (sup > 0) metrics.push(`<span class="m"><i class="fas fa-vector-square"></i> ${sup} m²</span>`);
                if (p.habitaciones > 0) metrics.push(`<span class="m"><i class="fas fa-bed"></i> ${p.habitaciones}</span>`);
                if (p.banos > 0) metrics.push(`<span class="m"><i class="fas fa-bath"></i> ${p.banos}</span>`);
                if (p.petFriendly) metrics.push(`<span class="m"><i class="fas fa-paw"></i> Pet</span>`);
                return `
                <div class="col-12 col-sm-6 col-lg-4 col-xxl-3">
                  <article class="prop-card">
                    <div class="prop-media">
                      <img src="${esc(img)}" alt="${esc(p.titulo || 'Propiedad')}" loading="lazy" decoding="async"
                           onerror="this.onerror=null;this.src='${PLACEHOLDER}'">
                      <span class="badge-op">${esc(tipoLabel(p.tipo))}</span>
                      ${p.destacado ? '<span class="badge-fav"><i class="fas fa-star"></i> Destacada</span>' : ''}
                      ${p.imagenes.length > 1 ? `<span class="badge-count"><i class="fas fa-images"></i> ${p.imagenes.length}</span>` : ''}
                    </div>
                    <div class="prop-body">
                      ${p.precio ? `<div class="prop-price">${esc(money(p.precio))}</div>` : ''}
                      <h3 class="prop-title">${esc(p.titulo || 'Propiedad')}</h3>
                      ${p.localidad ? `<div class="prop-loc"><i class="fas fa-map-marker-alt text-brand"></i> ${esc(p.localidad)}</div>` : ''}
                      <div class="prop-metrics">${metrics.join('')}</div>
                      <div class="prop-actions">
                        <button class="btn-detalle" data-detail="${esc(p.id)}"><i class="fas fa-eye"></i> Ver detalle</button>
                        <a class="btn btn-wa" target="_blank" rel="noopener noreferrer" href="${esc(waLink(p.titulo))}"
                           aria-label="Consultar por WhatsApp"><i class="fab fa-whatsapp"></i></a>
                      </div>
                    </div>
                  </article>
                </div>`;
            }

            function render() {
                updateCounter();
                if (!VIEW.length) {
                    showState('<i class="fas fa-magnifying-glass fa-2x mb-3 text-brand"></i><h5>No se encontraron propiedades</h5><p>Probá con otros filtros.</p>');
                    return;
                }
                hideState();
                $('#grid').innerHTML = VIEW.map(card).join('');
            }

            // ---------- DETALLE ----------

            function openDetail(id) {
                const p = ALL.find(x => String(x.id) === String(id));
                if (!p) return;
                const imgs = p.imagenes.length ? p.imagenes : [PLACEHOLDER];
                const facts = [];
                if (supTotal(p) > 0) facts.push(fact('fa-vector-square', supTotal(p) + ' m²', 'Superficie'));
                if (p.superficieTerreno > 0) facts.push(fact('fa-ruler-combined', p.superficieTerreno + ' m²', 'Terreno'));
                if (p.habitaciones > 0) facts.push(fact('fa-bed', p.habitaciones, 'Dormitorios'));
                if (p.banos > 0) facts.push(fact('fa-bath', p.banos, 'Baños'));
                if (p.petFriendly) facts.push(fact('fa-paw', 'Sí', 'Pet friendly'));

                $('#detailTitle').textContent = p.titulo || 'Detalle de la propiedad';
                $('#detailContent').innerHTML = `
                  <div class="detail-hero">
                    <div class="swiper" id="detailSwiper">
                      <div class="swiper-wrapper">
                        ${imgs.map((im, i) => `<div class="swiper-slide"><img src="${esc(im)}" data-i="${i}" alt="${esc(p.titulo || 'Propiedad')}" onerror="this.onerror=null;this.src='${PLACEHOLDER}'"></div>`).join('')}
                      </div>
                      <div class="swiper-button-next"></div>
                      <div class="swiper-button-prev"></div>
                      <div class="swiper-pagination"></div>
                    </div>
                  </div>
                  <div class="detail-content">
                    <span class="badge-op position-static d-inline-block mb-2">${esc(tipoLabel(p.tipo))}</span>
                    ${p.destacado ? '<span class="badge-fav position-static d-inline-block mb-2 ms-2"><i class="fas fa-star"></i> Destacada</span>' : ''}
                    <h2 class="font-head fw-bold h3">${esc(p.titulo || 'Propiedad')}</h2>
                    ${p.localidad ? `<div class="prop-loc mb-2"><i class="fas fa-map-marker-alt text-brand"></i> ${esc(p.localidad)}</div>` : ''}
                    ${p.precio ? `<div class="detail-price">${esc(money(p.precio))}</div>` : ''}
                    <div class="fact-grid">${facts.join('')}</div>
                    <h5 class="font-head fw-bold">Descripción</h5>
                    <div class="detail-desc">${p.descripcion ? sanitize(p.descripcion) : '<p class="text-muted">Sin descripción disponible.</p>'}</div>
                  </div>
                  <div class="detail-actions">
                    <button class="btn-interes flex-fill" data-interes="${esc(p.titulo)}"><i class="fas fa-heart"></i> Me interesa</button>
                    <a class="btn btn-wa flex-fill" target="_blank" rel="noopener noreferrer" href="${esc(waLink(p.titulo))}"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                  </div>`;

                if (!bsOffcanvas) bsOffcanvas = new bootstrap.Offcanvas('#detailPanel');
                bsOffcanvas.show();

                if (detailSwiper) { try { detailSwiper.destroy(true, true); } catch (e) { } }
                detailSwiper = new Swiper('#detailSwiper', {
                    loop: imgs.length > 1,
                    navigation: { nextEl: '#detailSwiper .swiper-button-next', prevEl: '#detailSwiper .swiper-button-prev' },
                    pagination: { el: '#detailSwiper .swiper-pagination', clickable: true }
                });
                $('#detailContent').querySelectorAll('.swiper-slide img').forEach(el => {
                    el.addEventListener('click', () => openLightbox(imgs, Number(el.dataset.i) || 0));
                });
            }

            // ---------- "Me interesa" → formulario real (igual que producción) ----------
            function goToContact(titulo) {
                const sel = $('#propiedadInteres');
                if (sel && titulo) {
                    let opt = Array.from(sel.options).find(o => o.value === titulo);
                    if (!opt) { opt = document.createElement('option'); opt.value = titulo; opt.textContent = titulo; sel.appendChild(opt); }
                    sel.value = titulo;
                }
                const c = $('#contacto');
                if (c) c.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // ---------- LIGHTBOX ----------
            let lbImgs = [], lbIdx = 0, lbKey = null, lbLastFocus = null;

            // ---------- EVENTOS ----------
            function bindEvents() {
                ['input', 'change'].forEach(ev => {
                    $('#fBusqueda').addEventListener(ev, applyFilters);
                    $('#fTipo').addEventListener(ev, applyFilters);
                    $('#fLocalidad').addEventListener(ev, applyFilters);
                    $('#fFav').addEventListener(ev, applyFilters);
                });
                $('#fClear').addEventListener('click', () => {
                    $('#fBusqueda').value = ''; $('#fTipo').value = 'all';
                    $('#fLocalidad').value = ''; $('#fFav').checked = false;
                    applyFilters();
                });
                document.addEventListener('click', e => {
                    const chip = e.target.closest('.chip');
                    if (chip) { $('#fTipo').value = chip.dataset.tipo; applyFilters(); return; }
                    const det = e.target.closest('[data-detail]');
                    if (det) { openDetail(det.getAttribute('data-detail')); return; }
                    const it = e.target.closest('[data-interes]');
                    if (it) {
                        const titulo = it.getAttribute('data-interes');
                        const panel = $('#detailPanel');
                        if (panel && panel.classList.contains('show') && bsOffcanvas) {
                            bsOffcanvas.hide();
                            setTimeout(() => goToContact(titulo), 320);
                        } else {
                            goToContact(titulo);
                        }
                    }
                });
            }

            // Soporte de deep-link ?propiedad= (igual que el sitio)
            function handleQueryProp() {
                const t = new URLSearchParams(location.search).get('propiedad');
                if (t) goToContact(t);
            }

            // ---------- DEEP-LINK ?tipo= (compat. con navbar / home / servicios / nosotros) ----------
            // Valores reales auditados (repo + API): venta · alquiler · alquiler-temporario ·
            // terreno · local-oficina-cochera · all. El texto visible del menú NO es el value;
            // el mapeo normaliza a los tipos canónicos que usa #fTipo (value = tipo crudo de la API).
            const TIPO_ALIASES = {
                'todas': 'all', 'todos': 'all',
                'ventas': 'venta',
                'alquileres': 'alquiler',
                'temporario': 'alquiler-temporario', 'alquiler-vacacional': 'alquiler-temporario', 'vacacional': 'alquiler-temporario',
                'terrenos': 'terreno',
                'locales': 'local-oficina-cochera', 'oficinas': 'local-oficina-cochera', 'cocheras': 'local-oficina-cochera',
                'local': 'local-oficina-cochera', 'oficina': 'local-oficina-cochera', 'cochera': 'local-oficina-cochera'
            };
            function normalizeTipo(raw) {
                const v = String(raw ?? '').trim().toLowerCase();
                if (!v) return '';
                if (v === 'all') return 'all';
                return TIPO_ALIASES[v] || v; // canónicos pasan tal cual
            }
            function applyTipoFromQuery() {
                const tipo = normalizeTipo(new URLSearchParams(location.search).get('tipo'));
                if (!tipo) return; // sin parámetro → comportamiento por defecto (todas)
                const sel = $('#fTipo');
                if (!sel) return;
                if (tipo !== 'all' && !Array.from(sel.options).some(o => o.value === tipo)) {
                    // Sin propiedades de ese tipo: creamos la opción para reflejar el filtro
                    // (resultado vacío), igual que el comportamiento del sitio actual.
                    const opt = document.createElement('option');
                    opt.value = tipo; opt.textContent = tipoLabel(tipo);
                    sel.appendChild(opt);
                }
                sel.value = tipo; // applyFilters() sincroniza chips + contador + render
            }
            function scrollToFiltersIfHash() {
                if (location.hash !== '#filtros') return;
                const el = $('#filtros');
                if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
            }

            // ---------- INIT ----------
            document.addEventListener('DOMContentLoaded', async () => {
                showState('<div class="spinner-brand"></div><p>Cargando propiedades…</p>');
                bindEvents();
                try {
                    ALL = await fetchProperties();
                } catch (e) {
                    console.error(e);
                    showState('<i class="fas fa-triangle-exclamation fa-2x mb-3 text-warning"></i><h5>No se pudieron cargar las propiedades</h5><p>Intentá nuevamente en unos minutos.</p>');
                    return;
                }
                if (!ALL.length) { showState('<h5>No hay propiedades publicadas por el momento.</h5>'); return; }
                buildFilters();
                populateInteres();
                applyTipoFromQuery();    // deep-link ?tipo= → preselecciona #fTipo (mapeo compatible)
                applyFilters();          // aplica filtro inicial + sincroniza chips + contador + render
                handleQueryProp();       // deep-link ?propiedad= → preselecciona en el formulario
                scrollToFiltersIfHash(); // respeta el ancla #filtros del navbar
            });
        })();
