const db = require('./db');

const createTableQuery = `
CREATE TABLE IF NOT EXISTS experiences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    period VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const seedDataQuery = `
INSERT INTO experiences (company, role, period, description) VALUES 
('Tech Innovators Inc.', 'Senior Frontend Developer', 'Jan 2023 - Present', 'Leading the frontend team in building scalable web applications using React and Next.js. improved performance by 40%.'),
('Creative Solutions Studio', 'Web Developer', 'Mar 2021 - Dec 2022', 'Developed responsive websites and e-commerce platforms for various clients. Collaborated with designers to implement pixel-perfect UIs.'),
('Digital Startups', 'Junior Developer', 'Jun 2020 - Feb 2021', 'Assisted in the development of MVPs for early-stage startups. Gained experience in full-stack development with MERN stack.');
`;

async function setup() {
    try {
        await db.query(createTableQuery);
        console.log("Experiences table created/verified.");

        // Check if data exists
        const [rows] = await db.query('SELECT COUNT(*) as count FROM experiences');
        if (rows[0].count === 0) {
            await db.query(seedDataQuery);
            console.log("Seed data inserted.");
        } else {
            console.log("Table already has data, skipping seed.");
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

setup();
