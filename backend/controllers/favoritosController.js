const conexion = require('../config/db');

const obtenerFavoritos = (req, res) => {
    const sql = `
        SELECT p.*, c.nombre AS categoria_nombre
        FROM favoritos f
        JOIN productos p ON p.id = f.producto_id
        LEFT JOIN categorias c ON c.id = p.categoria_id
        ORDER BY f.id DESC
    `;

    conexion.query(sql, (error, resultados) => {
        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultados);
    });
};

const agregarFavorito = (req, res) => {
    const { producto_id } = req.body;

    if (!Number.isInteger(producto_id) || producto_id <= 0) {
        return res.status(400).json({ mensaje: 'El producto debe ser válido' });
    }

    const sql = 'INSERT IGNORE INTO favoritos (producto_id) VALUES (?)';

    conexion.query(sql, [producto_id], (error, resultado) => {
        if (error) {
            return res.status(500).json(error);
        }

        res.status(201).json({
            mensaje: 'Favorito agregado correctamente',
            id: resultado.insertId
        });
    });
};

const eliminarFavorito = (req, res) => {
    const { id } = req.params;
    const productoId = Number(id);

    if (!Number.isInteger(productoId) || productoId <= 0) {
        return res.status(400).json({ mensaje: 'El producto debe ser válido' });
    }

    const sql = 'DELETE FROM favoritos WHERE producto_id = ?';

    conexion.query(sql, [productoId], (error, resultado) => {
        if (error) {
            return res.status(500).json(error);
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Favorito no encontrado' });
        }

        res.json({ mensaje: 'Favorito eliminado correctamente' });
    });
};

module.exports = {
    obtenerFavoritos,
    agregarFavorito,
    eliminarFavorito
};
