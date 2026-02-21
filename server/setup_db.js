const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const setupSql = fs.readFileSync(path.join(__dirname, 'setup.sql'), 'utf8');
const queries = setupSql.split(';').filter(q => q.trim());

async function runSetup() {
    let connection;
    try {
        // Connect without database selected
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || ''
        });

        console.log('Connected to MySQL.');

        // Create database
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'webporto_db'}`);
        console.log(`Database ${process.env.DB_NAME || 'webporto_db'} created or already exists.`);

        // Use database
        await connection.query(`USE ${process.env.DB_NAME || 'webporto_db'}`);

        // Run setup queries
        for (const query of queries) {
            await connection.query(query);
            console.log('Executed query successfully.');
        }

        console.log('Database setup complete!');
        process.exit(0);
    } catch (err) {
        console.error('Error running setup:', err);
        process.exit(1);
    } finally {
        if (connection) await connection.end();
    }
}

runSetup();
