import { obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    const contenedor = document.getElementById("contenedor-carrito");
    const divAcciones = document.getElementById("acciones-carrito");


    // Resetea el carrito cada vez que se borre un producto
    contenedor.innerHTML = "";
    divAcciones.innerHTML = "";

    if(carrito.lenght === 0){
        const mensaje = document.createElement("p");
        mensaje.classList.add("mensaje-carrito-vacio");
        mensaje.textContent = ("Tu carrito esta vacio");

        contenedor.appendChild(mensaje);
        return;
    }


    // Todo esto cuando hay productos
    carrito.forEach((producto, index) => {
                const tarjeta = document.createElement("article");
                tarjeta.classList.add("card");
    
                const img = document.createElement("img");
                img.src = `../${producto.img}`;
                img.alt = producto.nombre;
    
                const titulo = document.createElement("h3");
                titulo.classList.add("titulo-producto")
                titulo.textContent = producto.nombre;
    
                const precio = document.createElement("p");
                precio.classList.add("precio");
                precio.textContent = `Precio: $${producto.precio}`;
    
                const btnEliminar = document.createElement("button");
                btnEliminar.classList.add("btn");
                btnEliminar.classList.add("btn-eliminar-carrito");
                btnEliminar.textContent = "Eliminar producto";

                btnEliminar.addEventListener("click", () => {
                    eliminarProducto(index);
                    // Una vez que se elimina un producto hay que volver
                    // a reconstruir el DOM con la info actual del localStorage
                    renderizarCarrito();
                });
        
                tarjeta.appendChild(img);
                tarjeta.appendChild(titulo);
                tarjeta.appendChild(precio);
                tarjeta.appendChild(btnEliminar);
    
                // Agregamos la tarjeta al DOM
                contenedor.appendChild(tarjeta);
            });

            const btnVaciar = document.createElement("button");
            btnVaciar.classList.add("btn");
            btnVaciar.classList.add("btn-vaciar-carrito");
            btnVaciar.textContent = "Vaciar carrito";

            btnVaciar.addEventListener("click", () => {
                vaciarCarrito();
                renderizarCarrito();
            });

            divAcciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
})