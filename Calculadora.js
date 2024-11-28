// Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const wishlistContainer = document.getElementById('wishlist-container'); // Contenedor para los productos
    const totalElement = document.getElementById('total'); // Elemento para mostrar el total

    // Obtener la lista de deseos del localStorage
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Si no hay productos, mostrar un mensaje vacío
    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = `<p>No tienes productos en tu lista de deseos.</p>`;
        return;
    }

    // Renderizar productos dinámicamente
    wishlist.forEach((producto) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <div class="card">
                <div class="card-details">
                    <input type="checkbox" class="product-checkbox" data-price="${producto.price}" id="product-${producto.id}">
                    <label for="product-${producto.id}">
                        <img src="${producto.image || 'default-image.jpg'}" alt="${producto.name}">
                        <h3>${producto.name}</h3>
                        <p>${producto.description || ''}</p>
                        <p class="precio">$${producto.price}</p>
                    </label>
                </div>
            </div>
        `;
        wishlistContainer.appendChild(productDiv);
    });

    // Actualizar el total cuando cambien los checkboxes
    const checkboxes = document.querySelectorAll('.product-checkbox');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', updateTotal);
    });

    // Función para calcular y actualizar el total
    function updateTotal() {
        let total = 0;
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                total += parseFloat(checkbox.dataset.price);
            }
        });
        totalElement.textContent = total.toFixed(2);
    }

    // Inicializar el total
    updateTotal();

    // Opción para vaciar la lista de deseos
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que deseas vaciar tu lista de deseos?')) {
                localStorage.removeItem('wishlist'); // Limpiar localStorage
                wishlistContainer.innerHTML = `<p>No tienes productos en tu lista de deseos.</p>`;
                totalElement.textContent = '0';
            }
        });
    }
});
