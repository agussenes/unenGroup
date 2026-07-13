// Helpers puros compartidos (escape, sanitización, formato, normalización de propiedades).
// Etapa 3 — refactor. Bodies byte-idénticos a los que tenían Home y Propiedades inline.

import { API_BASE, WA_MSG, WHATSAPP, TIPO_LABEL } from './config.js';

export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

// Sanitización básica de la descripción HTML que llega de la API.
export function sanitize(html) {
    const tpl = document.createElement('template');
    tpl.innerHTML = String(html ?? '');
    tpl.content.querySelectorAll('script,style,iframe,object,embed,link,meta').forEach(n => n.remove());
    tpl.content.querySelectorAll('*').forEach(el => {
        [...el.attributes].forEach(a => {
            const n = a.name.toLowerCase();
            const v = String(a.value || '');
            if (n.startsWith('on') || ((n === 'href' || n === 'src') && /^\s*javascript:/i.test(v))) {
                el.removeAttribute(a.name);
            }
        });
        if (el.tagName === 'A') { el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener noreferrer'); }
    });
    return tpl.innerHTML;
}

export function num() { for (const v of arguments) { const n = Number(v); if (n > 0) return n; } return 0; }
export function money(v) { return (typeof v === 'number') ? '$' + v.toLocaleString('es-AR') : String(v ?? '').trim(); }

export function resolveImg(u) {
    const s = String(u ?? '').trim();
    if (!s) return '';
    if (/^https?:\/\//i.test(s)) return s;
    if (s.startsWith('/images/')) return s;
    return API_BASE.replace(/\/+$/, '') + '/' + s.replace(/^\/+/, '');
}

export function normalize(p) {
    return {
        id: p.id,
        tipo: p.tipo || '',
        titulo: p.titulo || '',
        precio: p.precio ?? '',
        localidad: p.localidad || '',
        metrosTotales: num(p.metrosTotales, p.superficieTotal, p.m2Totales, p.metros, p.metrosCuadrados),
        metrosCubiertos: num(p.metrosCubiertos, p.superficieCubierta, p.m2Cubiertos),
        superficieTerreno: num(p.superficieTerreno, p.terreno, p.m2Terreno),
        metrosCuadrados: num(p.metrosCuadrados),
        habitaciones: num(p.habitaciones),
        banos: num(p.banos),
        petFriendly: !!p.petFriendly,
        imagenes: (Array.isArray(p.imagenes) ? p.imagenes : []).map(resolveImg).filter(Boolean),
        descripcion: p.descripcion || '',
        destacado: !!p.destacado,
        active: !!p.active
    };
}

export const supTotal = p => p.metrosCubiertos || p.metrosCuadrados || p.metrosTotales || 0;
export const waLink = titulo => 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(WA_MSG + (titulo || ''));
export const tipoLabel = t => TIPO_LABEL[t] || (t ? t.replace(/-/g, ' ') : '—');

export function fact(icon, v, k) {
    return `<div class="fact"><i class="fas ${icon}"></i><div class="v">${esc(v)}</div><div class="k">${esc(k)}</div></div>`;
}
