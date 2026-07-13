// Consumo único de la API de propiedades (fetch + reintentos + normalización).
// Etapa 3 — refactor: reemplaza fetchProps() (Propiedades) y fetchDestacadas() (Home).

import { API_URL, RETRIES, RETRY_DELAY } from './config.js';
import { normalize } from './helpers.js';

const sleep = ms => new Promise(r => setTimeout(r, ms));

// Trae y normaliza las propiedades activas. `filter` opcional filtra la lista CRUDA antes de
// normalizar (Home pasa p => p.destacado && p.active). Sin filtro devuelve todas (Propiedades).
export async function fetchProperties(filter = null, tries = RETRIES) {
    try {
        const res = await fetch(API_URL, { cache: 'no-store', credentials: 'omit' });
        if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        if (!list.length && tries > 0) { await sleep(RETRY_DELAY); return fetchProperties(filter, tries - 1); }
        return (filter ? list.filter(filter) : list).map(normalize);
    } catch (e) {
        if (tries > 0) { await sleep(RETRY_DELAY); return fetchProperties(filter, tries - 1); }
        throw e;
    }
}
