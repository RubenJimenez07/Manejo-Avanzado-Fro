/* ===========================================
   CREAR TABLA CATEGORIAS
=========================================== */

CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

/* ===========================================
   INSERTAR CATEGORÍAS
=========================================== */

INSERT INTO categorias (nombre)
SELECT 'General'
FROM DUAL
WHERE NOT EXISTS (
    SELECT 1 FROM categorias WHERE nombre = 'General'
);

INSERT INTO categorias (nombre)
SELECT 'Electrónica'
FROM DUAL
WHERE NOT EXISTS (
    SELECT 1 FROM categorias WHERE nombre = 'Electrónica'
);

INSERT INTO categorias (nombre)
SELECT 'Hogar'
FROM DUAL
WHERE NOT EXISTS (
    SELECT 1 FROM categorias WHERE nombre = 'Hogar'
);

INSERT INTO categorias (nombre)
SELECT 'Accesorios'
FROM DUAL
WHERE NOT EXISTS (
    SELECT 1 FROM categorias WHERE nombre = 'Accesorios'
);

/* ===========================================
   AGREGAR COLUMNA categoria_id
   (Ejecutar solo si NO existe)
=========================================== */

ALTER TABLE productos
ADD COLUMN categoria_id INT NULL;

/* ===========================================
   ASIGNAR CATEGORÍA GENERAL
=========================================== */

UPDATE productos
SET categoria_id = (
    SELECT id
    FROM categorias
    WHERE nombre = 'General'
    LIMIT 1
)
WHERE categoria_id IS NULL;

/* ===========================================
   CREAR LLAVE FORÁNEA
=========================================== */

ALTER TABLE productos
ADD CONSTRAINT fk_productos_categoria
FOREIGN KEY (categoria_id)
REFERENCES categorias(id)
ON UPDATE CASCADE
ON DELETE RESTRICT;