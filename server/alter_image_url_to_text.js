const db = require('./db');

const alterColumnQuery = `
ALTER TABLE experiences
MODIFY COLUMN image_url TEXT;
`;

async function migrate() {
    try {
        await db.query(alterColumnQuery);
        console.log("Column 'image_url' modified to TEXT in 'experiences' table.");
        process.exit();
    } catch (err) {
        console.error("Error modifying column:", err);
        process.exit(1);
    }
}

migrate();
