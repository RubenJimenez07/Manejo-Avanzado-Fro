const express = require('express');
const router = express.Router();

const {
    obtenerProductos,
    obtenerProducto,
    agregarProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productosController');

// Obtener todos los productos
console.log('[productosRoutes] ruta /productos cargada');
router.get('/', obtenerProductos);

// Obtener un producto por ID
router.get('/:id', obtenerProducto);

// Agregar un producto
router.post('/', agregarProducto);

// Actualizar un producto
router.put('/:id', actualizarProducto);

// Eliminar un producto
router.delete('/:id', eliminarProducto);

module.exports = router;