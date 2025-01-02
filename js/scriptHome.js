function setContactType(type) {
    // Encuentra el campo select de tipo de contacto
    const tipoContacto = document.getElementById('tipoContacto');
    if (tipoContacto) {
        tipoContacto.value = type; // Asigna el valor al select
    }

    // Identifica el modal actualmente abierto
    const modal = document.querySelector('.modal.show');
    if (modal) {
        const bootstrapModal = bootstrap.Modal.getInstance(modal);

        // Espera a que el modal se cierre completamente antes de desplazar la pantalla
        modal.addEventListener('hidden.bs.modal', function () {
            const contactoSection = document.getElementById('contacto');
            if (contactoSection) {
                contactoSection.scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Cierra el modal manualmente si no está ya cerrado
        if (bootstrapModal) {
            bootstrapModal.hide();
        }
    } else {
        // Si no hay modal abierto, desplaza directamente a la sección de contacto
        const contactoSection = document.getElementById('contacto');
        if (contactoSection) {
            contactoSection.scrollIntoView({ behavior: 'smooth' });
        }
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