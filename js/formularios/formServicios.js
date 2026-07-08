document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formContacto");

    if (!form) {
        console.error("❌ ERROR: No se encontró el formulario 'contacto' en el DOM.");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Obtener valores del formulario
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const tipoContacto = document.getElementById("tipoContacto").value;
        const mensaje = document.getElementById("mensaje").value.trim();
        const recaptchaResponse = document.querySelector(".g-recaptcha-response")?.value || "";

        if (!nombre || !email || !tipoContacto || !mensaje || !recaptchaResponse) {
            notify("warning", "Faltan datos", "Completá todos los campos y verificá el reCAPTCHA antes de enviar.");
            return;
        }

        // Desactivar el botón para evitar múltiples clics
        const submitBtn = form.querySelector("button[type='submit']");
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Enviando... ⏳";

        try {
            const formData = new FormData(form);
            formData.append("g-recaptcha-response", recaptchaResponse);

            const response = await fetch("/php/formServicios.php", {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            console.log("📩 Respuesta del servidor:", result);

            if (result.status === "success") {
                form.reset();
                if (typeof grecaptcha !== "undefined") grecaptcha.reset();
                notify("success", "¡Mensaje enviado!", "Gracias por contactarte con UnenGroup. Te responderemos a la brevedad.");
            } else {
                notify("error", "No se pudo enviar", result.message || "Ocurrió un error al enviar tu mensaje. Intentá nuevamente.");
            }
        } catch (error) {
            console.error("❌ Error en la solicitud Fetch:", error);
            notify("error", "Error de conexión", "Verificá tu conexión a internet e intentá nuevamente.");
        } finally {
            // Reactivar el botón después de la respuesta
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Enviar mensaje";
        }
    });

    // Notificación con SweetAlert2 (con fallback a alert si no está cargado)
    function notify(icon, title, text) {
        if (typeof Swal !== "undefined") {
            Swal.fire({
                icon: icon,
                title: title,
                text: text,
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#71C6D4"
            });
        } else {
            alert(`${title}\n\n${text}`);
        }
    }
});
