// Home — destacadas (grilla/carrusel), detalle y formulario de contacto. Etapa 3 (ES module).
import { WHATSAPP, WA_MSG, PLACEHOLDER } from '../core/config.js';
import { esc, sanitize, money, tipoLabel, supTotal, waLink, fact } from '../core/helpers.js';
import { fetchProperties } from '../core/api.js';
import { openLightbox } from '../core/lightbox.js';

        (function () {
            'use strict';
            const GRID_MAX = 4; // hasta 4 => grilla (cards tamaño /propuesta/, 3 centradas); más de 4 => carrusel

            let DEST = [], detailSwiper = null, bsOffcanvas = null;
            const $ = (s, r = document) => r.querySelector(s);

            function showState(html) { const s = $('#destacadasState'); s.hidden = false; s.innerHTML = html; $('#destacadasMount').innerHTML = ''; }
            function hideState() { $('#destacadasState').hidden = true; }

            function card(p) {
                const img = p.imagenes[0] || PLACEHOLDER; const sup = supTotal(p); const m = [];
                if (sup > 0) m.push(`<span class="m"><i class="fas fa-vector-square"></i> ${sup} m²</span>`);
                if (p.habitaciones > 0) m.push(`<span class="m"><i class="fas fa-bed"></i> ${p.habitaciones}</span>`);
                if (p.banos > 0) m.push(`<span class="m"><i class="fas fa-bath"></i> ${p.banos}</span>`);
                if (p.petFriendly) m.push(`<span class="m"><i class="fas fa-paw"></i> Pet</span>`);
                return `
                  <article class="prop-card">
                    <div class="prop-media">
                      <img src="${esc(img)}" alt="${esc(p.titulo || 'Propiedad')}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${PLACEHOLDER}'">
                      <span class="badge-op">${esc(tipoLabel(p.tipo))}</span>
                      <span class="badge-fav"><i class="fas fa-star"></i> Destacada</span>
                      ${p.imagenes.length > 1 ? `<span class="badge-count"><i class="fas fa-images"></i> ${p.imagenes.length}</span>` : ''}
                    </div>
                    <div class="prop-body">
                      ${p.precio ? `<div class="prop-price">${esc(money(p.precio))}</div>` : ''}
                      <h3 class="prop-title">${esc(p.titulo || 'Propiedad')}</h3>
                      ${p.localidad ? `<div class="prop-loc"><i class="fas fa-map-marker-alt" style="color:var(--brand-dark)"></i> ${esc(p.localidad)}</div>` : ''}
                      <div class="prop-metrics">${m.join('')}</div>
                      <div class="prop-actions">
                        <button class="btn-detalle" data-detail="${esc(p.id)}"><i class="fas fa-eye"></i> Ver detalle</button>
                        <a class="btn btn-wa" target="_blank" rel="noopener noreferrer" href="${esc(waLink(p.titulo))}" aria-label="Consultar por WhatsApp"><i class="fab fa-whatsapp"></i></a>
                      </div>
                    </div>
                  </article>`;
            }

            function renderDestacadas() {
                const mount = $('#destacadasMount');
                if (!DEST.length) { showState('<div class="alert alert-info d-inline-block">No hay propiedades destacadas por el momento.</div>'); return; }
                hideState();
                if (DEST.length <= GRID_MAX) {
                    // Pocas => grilla (layout actual)
                    mount.innerHTML = '<div class="row g-4 justify-content-center">' +
                        DEST.map(p => `<div class="col-12 col-sm-6 col-lg-4 col-xxl-3">${card(p)}</div>`).join('') + '</div>';
                } else {
                    // Más de 3 => carrusel Swiper (clases propias, responsive)
                    mount.innerHTML =
                        '<div class="dest-carousel">' +
                        '  <div class="swiper dest-swiper"><div class="swiper-wrapper">' +
                        DEST.map(p => `<div class="swiper-slide">${card(p)}</div>`).join('') +
                        '  </div></div>' +
                        '  <button class="dest-nav dest-prev" type="button" aria-label="Anterior"><i class="fas fa-chevron-left"></i></button>' +
                        '  <button class="dest-nav dest-next" type="button" aria-label="Siguiente"><i class="fas fa-chevron-right"></i></button>' +
                        '  <div class="dest-pagination"></div>' +
                        '</div>';
                    new Swiper('.dest-swiper', {
                        slidesPerView: 1,
                        spaceBetween: 24,
                        rewind: true, // vuelve al inicio sin duplicar (evita warnings de loop)
                        navigation: { nextEl: '.dest-next', prevEl: '.dest-prev' },
                        pagination: { el: '.dest-pagination', clickable: true },
                        breakpoints: {
                            576: { slidesPerView: 2, spaceBetween: 18 },
                            992: { slidesPerView: 3, spaceBetween: 22 },
                            1200: { slidesPerView: 4, spaceBetween: 24 }
                        }
                    });
                }
            }

            function openDetail(id) {
                const p = DEST.find(x => String(x.id) === String(id)); if (!p) return;
                const imgs = p.imagenes.length ? p.imagenes : [PLACEHOLDER]; const facts = [];
                if (supTotal(p) > 0) facts.push(fact('fa-vector-square', supTotal(p) + ' m²', 'Superficie'));
                if (p.superficieTerreno > 0) facts.push(fact('fa-ruler-combined', p.superficieTerreno + ' m²', 'Terreno'));
                if (p.habitaciones > 0) facts.push(fact('fa-bed', p.habitaciones, 'Dormitorios'));
                if (p.banos > 0) facts.push(fact('fa-bath', p.banos, 'Baños'));
                if (p.petFriendly) facts.push(fact('fa-paw', 'Sí', 'Pet friendly'));
                $('#detailTitle').textContent = p.titulo || 'Detalle de la propiedad';
                $('#propertyDetailsContent').innerHTML = `
                  <div class="detail-hero"><div class="swiper" id="detailSwiper"><div class="swiper-wrapper">
                    ${imgs.map((im, i) => `<div class="swiper-slide"><img src="${esc(im)}" data-i="${i}" alt="${esc(p.titulo || 'Propiedad')}" onerror="this.onerror=null;this.src='${PLACEHOLDER}'"></div>`).join('')}
                  </div><div class="swiper-button-next"></div><div class="swiper-button-prev"></div><div class="swiper-pagination"></div></div></div>
                  <div class="detail-content">
                    <span class="badge-op position-static d-inline-block mb-2">${esc(tipoLabel(p.tipo))}</span>
                    <span class="badge-fav position-static d-inline-block mb-2 ms-2"><i class="fas fa-star"></i> Destacada</span>
                    <h2 class="fw-bold h3">${esc(p.titulo || 'Propiedad')}</h2>
                    ${p.localidad ? `<div class="prop-loc mb-2"><i class="fas fa-map-marker-alt" style="color:var(--brand-dark)"></i> ${esc(p.localidad)}</div>` : ''}
                    ${p.precio ? `<div class="detail-price">${esc(money(p.precio))}</div>` : ''}
                    <div class="fact-grid">${facts.join('')}</div>
                    <h5 class="fw-bold">Descripción</h5>
                    <div class="detail-desc">${p.descripcion ? sanitize(p.descripcion) : '<p class="text-muted">Sin descripción disponible.</p>'}</div>
                  </div>
                  <div class="detail-actions">
                    <a class="btn btn-interes" href="/propiedades/"><i class="fas fa-layer-group"></i> Ver todas</a>
                    <a class="btn btn-wa flex-fill" target="_blank" rel="noopener noreferrer" href="${esc(waLink(p.titulo))}"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                  </div>`;
                if (!bsOffcanvas) bsOffcanvas = new bootstrap.Offcanvas('#propertyDetailsPanel');
                bsOffcanvas.show();
                if (detailSwiper) { try { detailSwiper.destroy(true, true); } catch (e) { } }
                detailSwiper = new Swiper('#detailSwiper', { loop: imgs.length > 1, navigation: { nextEl: '#detailSwiper .swiper-button-next', prevEl: '#detailSwiper .swiper-button-prev' }, pagination: { el: '#detailSwiper .swiper-pagination', clickable: true } });
                $('#propertyDetailsContent').querySelectorAll('.swiper-slide img').forEach(el => el.addEventListener('click', () => openLightbox(imgs, Number(el.dataset.i) || 0)));
            }

            let lbImgs = [], lbIdx = 0, lbKey = null, lbFocus = null;

            document.addEventListener('click', e => { const d = e.target.closest('[data-detail]'); if (d) openDetail(d.getAttribute('data-detail')); });

            // ---- Formulario (mismo backend /php/formServicios.php + spinner) ----
            function bindForm() {
                const form = document.getElementById('formContacto'); if (!form) return;
                const btn = form.querySelector('button[type="submit"]'); const orig = btn ? btn.innerHTML : 'Enviar mensaje';
                function notify(icon, title, text) { if (typeof Swal !== 'undefined') Swal.fire({ icon, title, text, confirmButtonText: 'Aceptar', confirmButtonColor: '#71C6D4' }); else alert(title + '\n\n' + text); }
                form.addEventListener('submit', async function (e) {
                    e.preventDefault();
                    const nombre = document.getElementById('nombre').value.trim();
                    const email = document.getElementById('email').value.trim();
                    const tipoContacto = document.getElementById('tipoContacto').value;
                    const mensaje = document.getElementById('mensaje').value.trim();
                    const rc = document.querySelector('.g-recaptcha-response')?.value || '';
                    if (!nombre || !email || !tipoContacto || !mensaje || !rc) { notify('warning', 'Faltan datos', 'Completá todos los campos y verificá el reCAPTCHA antes de enviar.'); return; }
                    btn.disabled = true; btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando…';
                    try {
                        const fd = new FormData(form); fd.append('g-recaptcha-response', rc);
                        const res = await fetch('/php/formServicios.php', { method: 'POST', body: fd });
                        const result = await res.json();
                        if (result.status === 'success') { form.reset(); if (typeof grecaptcha !== 'undefined') grecaptcha.reset(); notify('success', '¡Mensaje enviado!', 'Gracias por contactarte con UnenGroup. Te responderemos a la brevedad.'); }
                        else notify('error', 'No se pudo enviar', result.message || 'Ocurrió un error al enviar tu mensaje. Intentá nuevamente.');
                    } catch (err) { console.error(err); notify('error', 'Error de conexión', 'Verificá tu conexión a internet e intentá nuevamente.'); }
                    finally { btn.disabled = false; btn.innerHTML = orig; }
                });
            }

            document.addEventListener('DOMContentLoaded', async () => {
                bindForm();
                showState('<div class="spinner-brand"></div><p class="text-muted">Cargando destacadas…</p>');
                try { DEST = await fetchProperties(p => !!p.destacado && !!p.active); }
                catch (e) { console.error(e); showState('<i class="fas fa-triangle-exclamation fa-2x mb-3 text-warning"></i><h5>No se pudieron cargar las destacadas</h5><p class="text-muted">Intentá nuevamente en unos minutos.</p>'); return; }
                renderDestacadas();
            });
        })();
    
