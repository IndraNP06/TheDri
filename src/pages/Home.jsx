import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Skills, Projects, Contact, About, Experience } from '../components/Sections';
import { TestConnection } from '../components/TestConnection';
import { Login } from '../components/Login';

export function Home() {
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <TestConnection />
            <Contact />

            {showLogin && <Login onClose={() => setShowLogin(false)} />}

            {/* Admin Controls */}
            {localStorage.getItem('token') ? (
                <button
                    onClick={() => navigate('/admin')}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '20px',
                        background: 'var(--primary-color)',
                        color: 'white',
                        border: 'none',
                        padding: '0.8rem 1.5rem',
                        borderRadius: '99px',
                        zIndex: 1000,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}
                >
                    Back to Dashboard
                </button>
            ) : (
                <button
                    onClick={() => setShowLogin(true)}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '20px',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(5px)',
                        border: '1px solid var(--border-color)',
                        color: '#aaa',
                        fontSize: '0.8rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '99px',
                        zIndex: 1000,
                        cursor: 'pointer'
                    }}
                >
                    Admin Login
                </button>
            )}
        </div>
    );
}
