// Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const wishlistContainer = document.getElementById('wishlist-container');
    const totalElement = document.getElementById('total');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

    if (!wishlistContainer || !totalElement) {
        console.error('Faltan elementos esenciales en el DOM.');
        return;
    }

    // Obtener la lista de deseos desde localStorage
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Si la lista está vacía, mostrar mensaje y terminar
    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = `<p>No tienes productos en tu lista de deseos.</p>`;
        totalElement.textContent = '0.00';
        return;
    }

    // Renderizar los productos de la lista
    wishlist.forEach((producto) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <div class="card">
                <div class="card-details">
                    <input type="checkbox" class="product-checkbox" data-price="${producto.price || 0}" id="product-${producto.id}">
                    <label for="product-${producto.id}">
                        <img src="${producto.image || 'default-image.jpg'}" alt="${producto.name || 'Producto'}">
                        <h3>${producto.name || 'Sin nombre'}</h3>
                        <p>${producto.description || 'Sin descripción disponible'}</p>
                        <p class="precio">$${producto.price || '0.00'}</p>
                    </label>
                </div>
            </div>
        `;
        wishlistContainer.appendChild(productDiv);
    });

    // Función para actualizar el total
    const updateTotal = () => {
        let total = 0;
        document.querySelectorAll('.product-checkbox').forEach((checkbox) => {
            if (checkbox.checked) {
                total += parseFloat(checkbox.dataset.price) || 0;
            }
        });
        totalElement.textContent = total.toFixed(2); // Mostrar total con dos decimales
    };

    // Añadir eventos a los checkboxes
    document.querySelectorAll('.product-checkbox').forEach((checkbox) => {
        checkbox.addEventListener('change', updateTotal);
    });

    // Inicializar el total al cargar la página
    updateTotal();

    // Vaciar lista de deseos
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que deseas vaciar tu lista de deseos?')) {
                localStorage.removeItem('wishlist'); // Eliminar lista de localStorage
                wishlistContainer.innerHTML = `<p>No tienes productos en tu lista de deseos.</p>`;
                totalElement.textContent = '0.00';
            }
        });
    }
});
