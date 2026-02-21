const db = require('./db');

async function addImageColumn() {
    try {
        // checkpoint if column exists
        const [columns] = await db.query("SHOW COLUMNS FROM skills LIKE 'image_url'");

        if (columns.length === 0) {
            await db.query('ALTER TABLE skills ADD COLUMN image_url VARCHAR(255) DEFAULT NULL');
            console.log('Column "image_url" added to "skills" table.');
        } else {
            console.log('Column "image_url" already exists.');
        }
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

addImageColumn();
