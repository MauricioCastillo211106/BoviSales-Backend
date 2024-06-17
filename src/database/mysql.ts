import mysql from "mysql2/promise";
import { Signale } from "signale";
import dotenv from "dotenv";

const signale = new Signale(); // Corregido el nombre

dotenv.config();

// Asegurarse de que las variables de entorno estén definidas y tengan un valor predeterminado
const config = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
};

// Crear el pool de conexiones
const pool = mysql.createPool(config);

export async function query(sql: string, params?: any[]) {
    try {
        const conn = await pool.getConnection();
        signale.success("Conexión exitosa a la BD");
        const result = await conn.execute(sql, params);
        conn.release();
        return result;
    } catch (error) {
        console.log(process.env.DB_HOST); // debería imprimir el host de la base de datos
        signale.error(error);
        return null;
    }
}
