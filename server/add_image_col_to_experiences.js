const db = require('./db');

const addImageColQuery = `
ALTER TABLE experiences
ADD COLUMN image_url VARCHAR(255) DEFAULT NULL;
`;

async function migrate() {
    try {
        await db.query(addImageColQuery);
        console.log("Column 'image_url' added to 'experiences' table.");
        process.exit();
    } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log("Column 'image_url' already exists.");
            process.exit();
        } else {
            console.error(err);
            process.exit(1);
        }
    }
}

migrate();
