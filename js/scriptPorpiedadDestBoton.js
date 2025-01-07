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

    // Manejar el envío del formulario
    const form = document.getElementById("formContacto");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = {
            nombre: document.getElementById("nombre").value,
            correo: document.getElementById("correo").value,
            telefono: document.getElementById("telefono").value,
            propiedadInteres: document.getElementById("propiedadInteres").value,
            mensaje: document.getElementById("mensaje").value,
        };

        console.log("Formulario enviado:", formData);

        // Aquí puedes implementar la lógica de envío, por ejemplo, una llamada a un backend
        alert("Formulario enviado correctamente. Nos pondremos en contacto contigo pronto.");
        form.reset(); // Limpia el formulario después del envío
    });
});
