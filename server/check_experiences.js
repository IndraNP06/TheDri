const db = require('./db');
async function checkSchema() {
    try {
        const [rows] = await db.query('DESCRIBE experiences');
        console.log("Column names:");
        rows.forEach(row => {
            console.log(row.Field);
        });
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
checkSchema();
