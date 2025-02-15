document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formContacto");

    if (!form) {
        console.error("❌ ERROR: No se encontró el formulario 'contacto' en el DOM.");
        return;
    }

    const mensajeDiv = document.createElement("div");
    mensajeDiv.classList.add("mt-3", "text-center", "fw-bold");
    form.parentElement.appendChild(mensajeDiv);

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Obtener valores del formulario
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const tipoContacto = document.getElementById("tipoContacto").value;
        const mensaje = document.getElementById("mensaje").value.trim();
        const recaptchaResponse = document.querySelector(".g-recaptcha-response")?.value || "";

        if (!nombre || !email || !tipoContacto || !mensaje || !recaptchaResponse) {
            mostrarMensaje("❌ Todos los campos son obligatorios y debes completar el reCAPTCHA.", "danger");
            return;
        }

        // **Desactivar el botón para evitar múltiples clics**
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

            const result = await response.json(); // ✅ Esperamos un JSON válido

            console.log("📩 Respuesta del servidor:", result);

            if (result.status === "success") {
                form.reset();
                grecaptcha.reset();
                mostrarMensaje("✅ ¡Gracias! Hemos recibido tu mensaje.", "success");
            } else {
                mostrarMensaje(`❌ ${result.message}`, "danger");
            }
        } catch (error) {
            console.error("❌ Error en la solicitud Fetch:", error);
            mostrarMensaje("❌ Error de conexión. Verifique su conexión a internet.", "danger");
        } finally {
            // **Reactivar el botón después de la respuesta**
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Enviar mensaje";
        }
    });

    function mostrarMensaje(texto, tipo) {
        mensajeDiv.innerHTML = `<div class="alert alert-${tipo}">${texto}</div>`;
    }
});
