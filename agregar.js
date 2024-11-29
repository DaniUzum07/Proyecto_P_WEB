// Seleccionar todos los botones de "Agregar a la lista de deseos"
const botonesAgregar = document.querySelectorAll('agregar-al-carrito.btn-3'); // Asegúrate de usar el selector correcto para tus botones

// Verificar si se encontraron botones antes de continuar
if (botonesAgregar.length > 0) {
    // Escuchar el evento clic en cada botón
    botonesAgregar.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            e.preventDefault(); // Evitar comportamiento predeterminado

            // Obtener la información del producto del botón
            const articulo = {
                id: boton.getAttribute('data-id'), // ID único del producto
                name: boton.getAttribute('data-name'), // Nombre del producto
                price: parseFloat(boton.getAttribute('data-price')), // Precio del producto
                image: boton.getAttribute('data-image') || 'default-image.jpg', // Imagen del producto
                description: boton.getAttribute('data-description') || '' // Descripción del producto (si existe)
            };

            // Obtener la lista actual del localStorage o inicializarla
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

            // Verificar si el artículo ya está en la lista
            const articuloExistente = wishlist.find((item) => item.id === articulo.id);
            if (articuloExistente) {
                alert('Este artículo ya está en tu lista de deseos.');
                return;
            }

            // Agregar el nuevo artículo a la lista
            wishlist.push(articulo);

            // Actualizar el localStorage con la lista actualizada
            localStorage.setItem('wishlist', JSON.stringify(wishlist));

            // Confirmación de que el producto fue añadido
            alert('Artículo añadido a tu lista de deseos.');
        });
    });
} else {
    console.warn("No se encontraron botones para 'Agregar a la lista de deseos'. Verifica el selector.");
}
