const express = require('express');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'supersecretkey';

// Protect HTTP headers
app.use(helmet());

// CORS Configuration (Allow all domains for public API)
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// JSON Parser
app.use(express.json());

// Rate Limiting (Prevent Brute Force)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: { error: 'Terlalu banyak request dari IP ini, coba lagi nanti.' },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Specific stricter limit for login
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per `window` (here, per 15 minutes)
    message: { error: 'Terlalu banyak percobaan login gagal, coba lagi dalam 15 menit.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Login Endpoint
app.post('/api/login', loginLimiter, async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, message: 'Login successful' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Null token' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Get all skills (Public)
app.get('/api/skills', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM skills ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch skills' });
    }
});

// Create a skill (Protected)
app.post('/api/skills', authenticateToken, async (req, res) => {
    const { title, description, image_url } = req.body;
    try {
        const [result] = await db.query('INSERT INTO skills (title, description, image_url) VALUES (?, ?, ?)', [title, description, image_url]);
        res.status(201).json({ id: result.insertId, title, description, image_url, message: 'Skill created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create skill' });
    }
});

// Update a skill (Protected)
app.put('/api/skills/:id', authenticateToken, async (req, res) => {
    const { title, description, image_url } = req.body;
    const { id } = req.params;
    try {
        await db.query('UPDATE skills SET title = ?, description = ?, image_url = ? WHERE id = ?', [title, description, image_url, id]);
        res.json({ message: 'Skill updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update skill' });
    }
});

// Delete a skill (Protected)
app.delete('/api/skills/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM skills WHERE id = ?', [id]);
        res.json({ message: 'Skill deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete skill' });
    }
});

// Test route
app.get('/api/test', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        res.json({ message: 'Backend connected to MySQL!', result: rows[0].result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

// --- PROJECTS API ---

// Get all projects (Public)
app.get('/api/projects', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM projects ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// Create a project (Protected)
app.post('/api/projects', authenticateToken, async (req, res) => {
    const { title, description, tech_stack, image_url, link } = req.body;
    try {
        await db.query(
            'INSERT INTO projects (title, description, tech_stack, image_url, link) VALUES (?, ?, ?, ?, ?)',
            [title, description, JSON.stringify(tech_stack), image_url, link]
        );
        res.status(201).json({ message: 'Project created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create project' });
    }
});

// Update a project (Protected)
app.put('/api/projects/:id', authenticateToken, async (req, res) => {
    const { title, description, tech_stack, image_url, link } = req.body;
    try {
        await db.query(
            'UPDATE projects SET title = ?, description = ?, tech_stack = ?, image_url = ?, link = ? WHERE id = ?',
            [title, description, JSON.stringify(tech_stack), image_url, link, req.params.id]
        );
        res.json({ message: 'Project updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update project' });
    }
});

// Delete a project (Protected)
app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
    try {
        await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

// --- EXPERIENCES API ---

// Get all experiences (Public)
app.get('/api/experiences', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM experiences ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch experiences' });
    }
});

// Create an experience (Protected)
app.post('/api/experiences', authenticateToken, async (req, res) => {
    const { company, role, period, description, image_url } = req.body;
    try {
        await db.query(
            'INSERT INTO experiences (company, role, period, description, image_url) VALUES (?, ?, ?, ?, ?)',
            [company, role, period, description, image_url]
        );
        res.status(201).json({ message: 'Experience created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create experience' });
    }
});

// Update an experience (Protected)
app.put('/api/experiences/:id', authenticateToken, async (req, res) => {
    const { company, role, period, description, image_url } = req.body;
    try {
        await db.query(
            'UPDATE experiences SET company = ?, role = ?, period = ?, description = ?, image_url = ? WHERE id = ?',
            [company, role, period, description, image_url, req.params.id]
        );
        res.json({ message: 'Experience updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update experience' });
    }
});

// Delete an experience (Protected)
app.delete('/api/experiences/:id', authenticateToken, async (req, res) => {
    try {
        await db.query('DELETE FROM experiences WHERE id = ?', [req.params.id]);
        res.json({ message: 'Experience deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete experience' });
    }
});

// --- CV API ---

// Get all CVs (Public)
app.get('/api/cv', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM cv ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch CVs' });
    }
});

// Create a CV (Protected)
app.post('/api/cv', authenticateToken, async (req, res) => {
    const { title, file_url } = req.body;
    try {
        await db.query(
            'INSERT INTO cv (title, file_url) VALUES (?, ?)',
            [title, file_url]
        );
        res.status(201).json({ message: 'CV created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create CV' });
    }
});

// Update a CV (Protected)
app.put('/api/cv/:id', authenticateToken, async (req, res) => {
    const { title, file_url } = req.body;
    try {
        await db.query(
            'UPDATE cv SET title = ?, file_url = ? WHERE id = ?',
            [title, file_url, req.params.id]
        );
        res.json({ message: 'CV updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update CV' });
    }
});

// Delete a CV (Protected)
app.delete('/api/cv/:id', authenticateToken, async (req, res) => {
    try {
        await db.query('DELETE FROM cv WHERE id = ?', [req.params.id]);
        res.json({ message: 'CV deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete CV' });
    }
});

// --- SERVER START & EXPORT ---

// Local development only: Listen on port
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export for serverless (Netlify Functions)
module.exports = app;
