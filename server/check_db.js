const db = require('./db');

async function listTables() {
    try {
        const [rows] = await db.query('SHOW TABLES');
        console.log('Tables in database:', rows);

        if (rows.length > 0) {
            const [users] = await db.query('SELECT * FROM users');
            console.log('Users count:', users.length);
            const [services] = await db.query('SELECT * FROM services');
            console.log('Services count:', services.length);
        }
        process.exit(0);
    } catch (err) {
        console.error('Error listing tables:', err);
        process.exit(1);
    }
}

listTables();
