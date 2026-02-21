const db = require('./db');

async function addDummy() {
    try {
        const [result] = await db.query(
            'INSERT INTO experiences (company, role, period, description) VALUES (?, ?, ?, ?)',
            ['Dummy Company', 'Dummy Role', 'Jan 2024 - Present', 'This is a dummy experience entry added to test the system. It demonstrates the dynamic data fetching from the MySQL database.']
        );
        console.log(`Dummy experience added with ID: ${result.insertId}`);
        process.exit();
    } catch (err) {
        console.error('Error adding dummy experience:', err);
        process.exit(1);
    }
}

addDummy();
