import {
    guardarCarrito,
    obtenerCarrito,
    vaciarCarritoStorage,
} from "./storage.js";

import { actualizarContador, mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
    // Usamos la función que pide el carrito al localStorage
    const carrito = obtenerCarrito();
    carrito.push(producto);

    // Usamos la función que guarda el carrito en el localStorage
    guardarCarrito(carrito);

    // Usamos la funcion UI que actualiza el numero en carrito
    actualizarContador(carrito);
    mostrarMensaje("Producto agregado 👌");
}

export const eliminarProducto = (indice) => {
    const carrito = obtenerCarrito();
    carrito.splice(indice, 1);

    // actualizamos el carrito en el localStorage
    guardarCarrito(carrito);

    // actualizamos el contador
    actualizarContador(carrito);
    mostrarMensaje("Producto eliminado ❌")
};

export const vaciarCarrito = () => {
    vaciarCarritoStorage();
    actualizarContador([]);
    mostrarMensaje("Carrito vaciado");
};