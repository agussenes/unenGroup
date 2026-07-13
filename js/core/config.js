// Configuración compartida del sitio (API, contacto, placeholder, etiquetas de tipo).
// Etapa 3 — refactor: única fuente de verdad para Home y Propiedades.

export const API_BASE = 'https://api.unengroup.com.ar';
export const API_URL = API_BASE + '/properties';
export const WHATSAPP = '5493516837691';
export const WA_MSG = 'Hola, me interesa recibir más información sobre la propiedad: ';
export const RETRIES = 2;
export const RETRY_DELAY = 800;

export const TIPO_LABEL = {
    'venta': 'Venta',
    'alquiler': 'Alquiler',
    'alquiler-temporario': 'Alquiler temporario',
    'terreno': 'Terrenos',
    'local-oficina-cochera': 'Locales / Oficinas / Cocheras'
};

export const PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450">' +
    '<rect width="100%" height="100%" fill="#efe9e2"/>' +
    '<text x="50%" y="50%" font-family="Arial" font-size="26" fill="#a89a8c" ' +
    'text-anchor="middle" dominant-baseline="middle">Sin imagen</text></svg>'
);
