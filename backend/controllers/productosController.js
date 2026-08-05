const conexion = require('../config/db');

// Obtener todos los productos
const obtenerProductos = (req, res) => {
    const { categoria } = req.query;
    const baseSql = 'SELECT p.*, c.nombre AS categoria_nombre FROM productos p LEFT JOIN categorias c ON c.id = p.categoria_id';
    const categoriaId = (categoria !== undefined && categoria !== null && categoria !== '') ? Number(categoria) : undefined;

    if (categoriaId !== undefined && (!Number.isInteger(categoriaId) || categoriaId <= 0)) {
        return res.status(400).json({ mensaje: 'La categoría debe ser un identificador válido' });
    }

    let sql = baseSql;
    const parametros = [];
    if (categoriaId !== undefined) {
        sql += ' WHERE p.categoria_id = ?';
        parametros.push(categoriaId);
    }

    conexion.query(sql, parametros, (error, resultados) => {
        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultados);
    });
};

// Obtener un producto por ID
const obtenerProducto = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT p.*, c.nombre AS categoria_nombre
        FROM productos p
        LEFT JOIN categorias c ON c.id = p.categoria_id
        WHERE p.id = ?
    `;

    conexion.query(sql, [id], (error, resultados) => {
        if (error) {
            return res.status(500).json(error);
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json(resultados[0]);
    });
};

// Agregar producto
const agregarProducto = (req, res) => {
    const { nombre, descripcion, precio, imagen, categoria_id } = req.body;
    const categoriaId = categoria_id !== undefined && categoria_id !== null && categoria_id !== ''
        ? Number(categoria_id)
        : null;

    const sql = `
        INSERT INTO productos(nombre, descripcion, precio, imagen, categoria_id)
        VALUES (?, ?, ?, ?, ?)
    `;

    conexion.query(
        sql,
        [nombre, descripcion, precio, imagen, categoriaId],
        (error, resultado) => {
            if (error) {
                return res.status(500).json(error);
            }

            res.json({
                mensaje: 'Producto agregado correctamente',
                id: resultado.insertId
            });
        }
    );
};

// Actualizar producto
const actualizarProducto = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, imagen } = req.body;

    const sql = `
        UPDATE productos
        SET nombre=?, descripcion=?, precio=?, imagen=?
        WHERE id=?
    `;

    conexion.query(
        sql,
        [nombre, descripcion, precio, imagen, id],
        (error) => {
            if (error) {
                return res.status(500).json(error);
            }

            res.json({
                mensaje: 'Producto actualizado correctamente'
            });
        }
    );
};

// Eliminar producto
const eliminarProducto = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM productos WHERE id=?';

    conexion.query(sql, [id], (error) => {
        if (error) {
            return res.status(500).json(error);
        }

        res.json({
            mensaje: 'Producto eliminado correctamente'
        });
    });
};

module.exports = {
    obtenerProductos,
    obtenerProducto,
    agregarProducto,
    actualizarProducto,
    eliminarProducto
};
