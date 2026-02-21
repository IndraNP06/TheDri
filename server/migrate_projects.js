const db = require('./db');

async function migrate() {
    try {
        console.log('Starting Projects migration...');

        // 1. Create table
        await db.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                tech_stack JSON,
                image_url VARCHAR(255),
                link VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Table "projects" created or already exists.');

        // 2. Check if data exists
        const [rows] = await db.query('SELECT COUNT(*) as count FROM projects');
        if (rows[0].count > 0) {
            console.log('Projects table already has data. Skipping seed.');
            process.exit(0);
            return;
        }

        // 3. Seed data
        const projects = [
            {
                title: 'DeveloperFolio',
                description: 'A modern developer portfolio built with React, Sanity CMS, and high-performance animations.',
                tech_stack: JSON.stringify(['React', 'Sanity', 'Framer Motion']),
                image_url: '', // Placeholder, user can update later
                link: '#'
            },
            {
                title: 'MERN Memories',
                description: 'A social media app to create and share memories. Features full CRUD and authentication.',
                tech_stack: JSON.stringify(['MERN Stack', 'Redux', 'Material UI']),
                image_url: '',
                link: '#'
            },
            {
                title: 'Uniswap Clone',
                description: 'A decentralized exchange clone enabling crypto swaps on the blockchain.',
                tech_stack: JSON.stringify(['Next.js', 'Solidity', 'Web3.js']),
                image_url: '',
                link: '#'
            }
        ];

        for (const p of projects) {
            await db.query(
                'INSERT INTO projects (title, description, tech_stack, image_url, link) VALUES (?, ?, ?, ?, ?)',
                [p.title, p.description, p.tech_stack, p.image_url, p.link]
            );
        }

        console.log('Seeded 3 existing projects into database.');
        process.exit(0);

    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();
