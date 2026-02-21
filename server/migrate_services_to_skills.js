const db = require('./db');

async function migrate() {
    try {
        // Check if 'services' table exists
        const [tables] = await db.query("SHOW TABLES LIKE 'services'");

        if (tables.length > 0) {
            // Rename to 'skills'
            await db.query('RENAME TABLE services TO skills');
            console.log('Table "services" renamed to "skills".');
        } else {
            // Check if 'skills' already exists
            const [skillsTables] = await db.query("SHOW TABLES LIKE 'skills'");
            if (skillsTables.length > 0) {
                console.log('Table "skills" already exists. Skipping rename.');
            } else {
                // Create 'skills' table if neither exists (fallback)
                await db.query(`
                    CREATE TABLE IF NOT EXISTS skills (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        title VARCHAR(255) NOT NULL,
                        description TEXT NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                `);
                console.log('Table "skills" created.');
            }
        }
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrate();
