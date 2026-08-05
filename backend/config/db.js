const mysql = require('mysql2');

const conexion = mysql.createPool({
    host: process.env.DB_HOST || 'sakura.proxy.rlwy.net',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'SOwhgUqbTOiQBREdjDrIfTQwDasYHEQh',
    database: process.env.DB_NAME || 'railway',
    port: Number(process.env.DB_PORT || 37394),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const inicializarBaseDeDatos = () => {
    conexion.query(`
        CREATE TABLE IF NOT EXISTS favoritos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            producto_id INT NOT NULL,
            creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY uk_favorito_producto (producto_id),
            CONSTRAINT fk_favoritos_producto FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
        )
    `, (error) => {
        if (error) {
            console.log('❌ Error al crear la tabla favoritos');
            console.log(error);
            return;
        }

        console.log('✅ Tabla favoritos lista');
    });
};

conexion.getConnection((error, connection) => {
    if (error) {
        console.log('❌ Error al conectar con la base de datos');
        console.log(error);
        return;
    }

    connection.release();
    console.log('✅ Base de datos conectada');
    inicializarBaseDeDatos();
});

module.exports = conexion;