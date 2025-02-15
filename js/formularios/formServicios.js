document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contacto");

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
        const recaptchaResponse = document.getElementById("g-recaptcha-response").value; // ✅ Obtener token reCAPTCHA v2

        // Validaciones
        if (!nombre || !email || !tipoContacto || !mensaje || !recaptchaResponse) {
            mostrarMensaje("Todos los campos son obligatorios y debes completar el reCAPTCHA.", "danger");
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(nombre)) {
            mostrarMensaje("El nombre solo puede contener letras y espacios.", "danger");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            mostrarMensaje("Ingrese un correo electrónico válido.", "danger");
            return;
        }

        try {
            // Enviar formulario con Fetch API
            const formData = new FormData(form);
            formData.append("g-recaptcha-response", recaptchaResponse);

            const response = await fetch("../../php/formServicios.php", {
                method: "POST",
                body: formData
            });

            const result = await response.text();
            console.log("📩 Respuesta del servidor:", result);

            if (result.includes("Mensaje enviado con éxito")) {
                form.reset();
                form.style.display = "none"; // Ocultar formulario tras el envío
                mostrarMensaje("¡Gracias! Hemos recibido tu mensaje.", "success");
            } else {
                mostrarMensaje("Error al enviar el mensaje. Inténtelo de nuevo.", "danger");
            }
        } catch (error) {
            console.error("❌ Error en la solicitud Fetch:", error);
            mostrarMensaje("Error de conexión. Verifique su conexión a internet.", "danger");
        }
    });

    function mostrarMensaje(texto, tipo) {
        mensajeDiv.innerHTML = <div class="alert alert-${tipo}">${texto}</div>;
    }
});