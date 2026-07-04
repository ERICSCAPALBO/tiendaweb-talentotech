// Funciones para enviar objetos al array
import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

// Funcion que creamos que se ocupa de renderizar las tarjetas de producto
const renderizarProductos = () => {

    const contenedor = document.getElementById("contenedor-tarjetas");
    
    fetch("./data/productos.json")
    .then((res) => res.json())
    .then((data) => {
        data.forEach((producto) => {
            const tarjeta = document.createElement("article");
            tarjeta.classList.add("card", "text-dark");

            const img = document.createElement("img");
            img.src = `./${producto.img}`;
            img.alt = producto.nombre;

            const titulo = document.createElement("h3");
            titulo.classList.add("titulo-producto")
            titulo.textContent = producto.nombre;

            const precio = document.createElement("p");
            precio.classList.add("precio");
            precio.textContent = `Precio: $${producto.precio}`;

            const boton = document.createElement("button");
            boton.classList.add("btn", "bg-secondary", "text-dark");
            boton.textContent = "Agregar al carrito";

            boton.addEventListener("click", () => {
                agregarAlCarrito(producto);
            })

            // Sigo adentro del ciclo

            // Armar la estructura de la tarjeta

            tarjeta.appendChild(img);
            tarjeta.appendChild(titulo);
            tarjeta.appendChild(precio);
            tarjeta.appendChild(boton);

            // Agregamos la tarjeta al DOM
            contenedor.appendChild(tarjeta);

        });
    })
    .catch((error) => console.log(error));
}

document.addEventListener("DOMContentLoaded", () => {
    const carrito = obtenerCarrito();
    actualizarContador(carrito);
    renderizarProductos();
})