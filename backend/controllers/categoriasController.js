const conexion = require('../config/db');

const nombreValido = (nombre) =>
    typeof nombre === 'string' && nombre.trim().length > 0 && nombre.trim().length <= 100;

const obtenerCategorias = (req, res) => {
    conexion.query('SELECT * FROM categorias ORDER BY nombre ASC', (error, resultados) => {
        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultados);
    });
};

const obtenerCategoria = (req, res) => {
    conexion.query('SELECT * FROM categorias WHERE id = ?', [req.params.id], (error, resultados) => {
        if (error) {
            return res.status(500).json(error);
        }

        if (resultados.length === 0) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }

        res.json(resultados[0]);
    });
};

const agregarCategoria = (req, res) => {
    const { nombre } = req.body;

    if (!nombreValido(nombre)) {
        return res.status(400).json({ mensaje: 'El nombre es obligatorio y debe tener hasta 100 caracteres' });
    }

    conexion.query(
        'INSERT INTO categorias (nombre) VALUES (?)',
        [nombre.trim()],
        (error, resultado) => {
            if (error) {
                return res.status(500).json(error);
            }

            res.status(201).json({
                mensaje: 'Categoría agregada correctamente',
                id: resultado.insertId
            });
        }
    );
};

const actualizarCategoria = (req, res) => {
    const { nombre } = req.body;

    if (!nombreValido(nombre)) {
        return res.status(400).json({ mensaje: 'El nombre es obligatorio y debe tener hasta 100 caracteres' });
    }

    conexion.query(
        'UPDATE categorias SET nombre = ? WHERE id = ?',
        [nombre.trim(), req.params.id],
        (error, resultado) => {
            if (error) {
                return res.status(500).json(error);
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ mensaje: 'Categoría no encontrada' });
            }

            res.json({ mensaje: 'Categoría actualizada correctamente' });
        }
    );
};

const eliminarCategoria = (req, res) => {
    conexion.query('DELETE FROM categorias WHERE id = ?', [req.params.id], (error, resultado) => {
        if (error) {
            if (error.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(409).json({
                    mensaje: 'No se puede eliminar una categoría asignada a productos'
                });
            }

            return res.status(500).json(error);
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }

        res.json({ mensaje: 'Categoría eliminada correctamente' });
    });
};

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    agregarCategoria,
    actualizarCategoria,
    eliminarCategoria
};
