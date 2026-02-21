const db = require('./db');

async function addSecondDummy() {
    try {
        const [result] = await db.query(
            'INSERT INTO experiences (company, role, period, description) VALUES (?, ?, ?, ?)',
            ['Global Tech Solutions', 'Frontend Engineer', 'Aug 2019 - May 2020', 'Collaborated with cross-functional teams to deliver high-quality web solutions. Optimized legacy codebases for better performance and maintainability.']
        );
        console.log(`Second experience added with ID: ${result.insertId}`);
        process.exit();
    } catch (err) {
        console.error('Error adding experience:', err);
        process.exit(1);
    }
}

addSecondDummy();
