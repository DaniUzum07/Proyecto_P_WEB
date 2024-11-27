function updateTotal() {
    let total = 0;
    // Obtener todos los checkboxes del carrito
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            total += parseFloat(checkbox.dataset.price);
        }
    });
    // Mostrar el total actualizado
    document.getElementById('total').textContent = total;
}

// Agregar un evento a cada checkbox para que se actualice el total
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateTotal);
});