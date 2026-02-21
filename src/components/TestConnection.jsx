import { useState, useEffect } from 'react';

export function TestConnection() {
    const [status, setStatus] = useState('Checking connection...');
    const [result, setResult] = useState(null);

    useEffect(() => {
        // Use Vite env variable for the API URL, fallback to relative path for Netlify Functions
        const apiUrl = import.meta.env.VITE_API_URL || '';

        fetch(`${apiUrl}/api/test`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setStatus(`Database Error: ${data.error}`);
                    setResult(null);
                } else {
                    const message = data.message || 'Connected';
                    const calcResult = data.result ? ` (Result: ${data.result})` : '';
                    setStatus(message + calcResult);
                    setResult(data);
                }
            })
            .catch(err => {
                console.error(err);
                setStatus('Connection failed. Is the backend server running?');
            });
    }, []);

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '1rem',
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            zIndex: 9999,
            backdropFilter: 'blur(10px)'
        }}>
            <h4 style={{ margin: '0 0 0.5rem' }}>Backend Status</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: result ? '#4ade80' : '#f87171' }}>
                {status}
            </p>
        </div>
    );
}
