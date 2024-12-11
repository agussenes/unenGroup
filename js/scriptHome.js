// Función para preseleccionar el tipo de contacto
function setContactType(type) {
    // Encuentra el elemento select de tipo de contacto
    const tipoContacto = document.getElementById('tipoContacto');
    if (tipoContacto) {
        tipoContacto.value = type; // Establece el valor preseleccionado
    }

    // Enfoca la sección del formulario de contacto
    const contactoSection = document.getElementById('contacto');
    if (contactoSection) {
        contactoSection.scrollIntoView({ behavior: 'smooth' });
    }
}


// Función para abrir el modal con la vista 360°
function abrirVista360(imageUrl) {
    // Inicializar pannellum
    pannellum.viewer('pano', {
        type: 'equirectangular',
        panorama: imageUrl,
        autoLoad: true,
        compass: true
    });

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('modal360'));
    modal.show();
}
