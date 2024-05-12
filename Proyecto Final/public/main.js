// Conexión con Socket.IO
const socket = io();

// Función para manejar el evento de agregar producto
function agregar(event) {
    event.preventDefault();

    // Obtén los valores de los campos del formulario
    let title = document.getElementById('title').value;
    let price = document.getElementById('price').value;
    let code = document.getElementById('code').value;
    let stock = document.getElementById('stock').value;
    let description = document.getElementById('description').value;

    // Crea un objeto con los datos del producto
    let product = {
        title: title,
        price: price,
        code: code,
        stock: stock,
        description: description
    };

    // Envía el producto al servidor a través de Socket.IO
    socket.emit('addProduct', product);

    // Limpia los campos del formulario
    document.getElementById('agregarForm').reset();
}

// Asigna la función agregar al evento onclick del botón agregar
document.getElementById('botonAgregar').onclick = agregar;

// Función para manejar el evento de borrar producto
// (Aquí deberías agregar la lógica para borrar un producto)