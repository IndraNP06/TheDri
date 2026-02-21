import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SkillsManager } from '../components/SkillsManager';
import { ProjectsManager } from '../components/ProjectsManager';
import { ExperienceManager } from '../components/ExperienceManager';
import { CVManager } from '../components/CVManager';

export function AdminDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="section-padding container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Admin Dashboard</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            background: '#3b82f6',
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '4px',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        Preview Site
                    </button>
                    <button
                        onClick={handleLogout}
                        style={{
                            background: '#ef4444',
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '4px',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            <SkillsManager />
            <ExperienceManager />
            <ProjectsManager />
            <CVManager />
        </div>
    );
}

