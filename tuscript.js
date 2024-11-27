document.addEventListener("DOMContentLoaded", function () {
    console.log("El DOM ha cargado correctamente.");

    // Manejo del formulario de registro
    const registroForm = document.querySelector("form[action='/proceso']");
    if (registroForm) {
        registroForm.addEventListener("submit", function (e) {
            const usuario = document.getElementById("usuario").value.trim();
            const correo = document.getElementById("correo_electronico").value.trim();
            const contrasena = document.getElementById("contrasena").value.trim();

            // Validar que los campos no estén vacíos
            if (!usuario || !correo || !contrasena) {
                e.preventDefault(); // Detener el envío del formulario
                alert("⚠️ Por favor, completa todos los campos.");
                return;
            }

            // Validación de correo electrónico
            const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!correoValido.test(correo)) {
                e.preventDefault();
                alert("⚠️ Por favor, ingresa un correo electrónico válido.");
                return;
            }

            console.log("Formulario de registro validado y enviado correctamente.");
        });
    }

    // Manejo del formulario de inicio de sesión
    const loginForm = document.querySelector("form[action='/insesion']");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            const usuario = document.getElementById("usuario").value.trim();
            const contrasena = document.getElementById("contrasena").value.trim();

            // Validar que los campos no estén vacíos
            if (!usuario || !contrasena) {
                e.preventDefault(); // Detener el envío del formulario
                alert("⚠️ Por favor, completa todos los campos.");
                return;
            }

            console.log("Formulario de inicio de sesión validado y enviado correctamente.");
        });
    }

    // Manejo del formulario de recuperación de contraseña
    const recuperarForm = document.querySelector("form[action='/rec']");
    if (recuperarForm) {
        recuperarForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Detener el envío para usar fetch

            const usuario = document.getElementById("usuario").value.trim();

            if (!usuario) {
                alert("⚠️ Por favor, ingresa tu nombre de usuario.");
                return;
            }

            // Realizar la solicitud POST al servidor
            fetch("/rec", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ usuario: usuario }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.mensaje) {
                        alert(data.mensaje);
                    } else {
                        alert("⚠️ Error al recuperar la contraseña.");
                    }
                })
                .catch((error) => {
                    console.error("Error en la solicitud:", error);
                    alert("⚠️ Ocurrió un error al procesar la solicitud.");
                });
        });
    }
});
