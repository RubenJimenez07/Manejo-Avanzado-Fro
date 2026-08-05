const express = require('express');
const router = express.Router();

const {
    obtenerCategorias,
    obtenerCategoria,
    agregarCategoria,
    actualizarCategoria,
    eliminarCategoria
} = require('../controllers/categoriasController');

router.get('/', obtenerCategorias);
router.get('/:id', obtenerCategoria);
router.post('/', agregarCategoria);
router.put('/:id', actualizarCategoria);
router.delete('/:id', eliminarCategoria);

module.exports = router;
