document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const propiedad = urlParams.get("propiedad");

    if (propiedad) {
        const propiedadInteresInput = document.getElementById("propiedadInteres");
        if (propiedadInteresInput) {
            propiedadInteresInput.value = propiedad; 
        }

        // Desplazamiento automático al formulario
        const formSection = document.getElementById("contacto");
        if (formSection) {
            formSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }
    // El envío real del formulario lo maneja formPropiedades.js
});
