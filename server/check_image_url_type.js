const db = require('./db');
async function checkSchema() {
    try {
        const [rows] = await db.query("SHOW COLUMNS FROM experiences LIKE 'image_url'");
        console.log(rows);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
checkSchema();
