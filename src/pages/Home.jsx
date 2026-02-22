import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Contact, AboutAndSkills, PortfolioTabs } from '../components/Sections';

export function Home() {
    const navigate = useNavigate();
    const isAdmin = !!localStorage.getItem('token');

    return (
        <div>
            {isAdmin && (
                <button
                    onClick={() => navigate('/admin')}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '20px',
                        padding: '10px 20px',
                        background: 'var(--primary-color, #3b82f6)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        zIndex: 9999,
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <span>⚙️</span> Back to Dashboard
                </button>
            )}
            <Hero />
            <AboutAndSkills />
            <PortfolioTabs />
            <Contact />
        </div>
    );
}
