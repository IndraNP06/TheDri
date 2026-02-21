const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function createCvTable() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'webporto_db'
        });

        console.log('Connected to MySQL.');

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS cv (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                file_url VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        await connection.query(createTableQuery);
        console.log('Table `cv` created or already exists.');

        process.exit(0);
    } catch (err) {
        console.error('Error creating cv table:', err);
        process.exit(1);
    } finally {
        if (connection) await connection.end();
    }
}

createCvTable();
