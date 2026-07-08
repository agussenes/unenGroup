document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formPropiedades");

    if (!form) {
        console.error("❌ ERROR: No se encontró el formulario 'formPropiedades' en el DOM.");
        return;
    }

    const submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Campos reales del formulario de propiedades
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("correo").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const propiedadInteres = document.getElementById("propiedadInteres").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();
        const recaptchaResponse = document.querySelector(".g-recaptcha-response")?.value || "";

        if (!nombre || !email || !telefono || !propiedadInteres || !mensaje || !recaptchaResponse) {
            notify("warning", "Faltan datos", "Completá todos los campos y verificá el reCAPTCHA antes de enviar.");
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = "Enviando... ⏳";

        try {
            const formData = new FormData(form);
            formData.append("g-recaptcha-response", recaptchaResponse);

            const response = await fetch("/php/formPropiedades.php", {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            console.log("📩 Respuesta del servidor:", result);

            if (result.status === "success") {
                form.reset();
                if (typeof grecaptcha !== "undefined") grecaptcha.reset();
                notify("success", "¡Mensaje enviado!", "Gracias por tu consulta. El equipo de UnenGroup se pondrá en contacto a la brevedad.");
            } else {
                notify("error", "No se pudo enviar", result.message || "Ocurrió un error al enviar tu mensaje. Intentá nuevamente.");
            }
        } catch (error) {
            console.error("❌ Error en la solicitud Fetch:", error);
            notify("error", "Error de conexión", "Verificá tu conexión a internet e intentá nuevamente.");
        } finally {
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
