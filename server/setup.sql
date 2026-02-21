CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO services (title, description) VALUES 
('Web3 Development', 'Building decentralized applications (dApps) with Solidity, Ethers.js, and Smart Contracts.'),
('Full Stack MERN', 'Developing scalable web apps using MongoDB, Express, React, and Node.js.'),
('Modern Frontend', 'Creating responsive UIs with Next.js, Tailwind CSS, and Framer Motion.');

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
