const db = require('./db');
const bcrypt = require('bcryptjs');

async function seedUser() {
    try {
        const email = 'test@gmail.com';
        const password = 'test123';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if user exists
        const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (existing.length === 0) {
            await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
            console.log(`User ${email} created.`);
        } else {
            // Update password just in case
            await db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);
            console.log(`User ${email} updated.`);
        }
        process.exit(0);
    } catch (err) {
        console.error('Error seeding user:', err);
        process.exit(1);
    }
}

seedUser();
