// Visor de imágenes a pantalla completa (lightbox) compartido.
// Etapa 3 — refactor. Markup esperado: #lightbox, #lightboxImg, .lb-close/.lb-prev/.lb-next.

import { PLACEHOLDER } from './config.js';

let lbImgs = [], lbIdx = 0, lbKey = null, lbLastFocus = null;

export function openLightbox(images, start) {
    lbImgs = images; lbIdx = start || 0;
    const lb = document.getElementById('lightbox'), im = document.getElementById('lightboxImg');
    document.body.appendChild(lb);
    const set = () => { im.src = lbImgs[lbIdx] || PLACEHOLDER; };
    set(); lb.style.display = 'flex';
    const close = () => {
        lb.style.display = 'none';
        if (lbKey) { document.removeEventListener('keydown', lbKey); lbKey = null; }
        lb.onclick = null;
        if (lbLastFocus && lbLastFocus.focus) lbLastFocus.focus();
    };
    const prev = () => { lbIdx = (lbIdx - 1 + lbImgs.length) % lbImgs.length; set(); };
    const next = () => { lbIdx = (lbIdx + 1) % lbImgs.length; set(); };
    lb.querySelector('.lb-close').onclick = close;
    lb.querySelector('.lb-prev').onclick = prev;
    lb.querySelector('.lb-next').onclick = next;
    lb.onclick = e => { if (e.target === lb) close(); };
    if (lbKey) document.removeEventListener('keydown', lbKey);
    lbKey = e => {
        if (lb.style.display !== 'flex') return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowLeft') prev();
        else if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', lbKey);
    lbLastFocus = document.activeElement;
    lb.querySelector('.lb-close').focus();
}
