import { useState, useEffect } from 'react';

export function CVManager() {
    const [cvId, setCvId] = useState(null);
    const [title, setTitle] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchCV = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/cv');
            const data = await res.json();
            if (data && data.length > 0) {
                const cv = data[0];
                setCvId(cv.id);
                setTitle(cv.title || '');
                setFileUrl(cv.file_url || '');
            }
        } catch (err) {
            console.error('Error fetching CV:', err);
        }
    };

    useEffect(() => {
        fetchCV();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const url = cvId
            ? `http://localhost:5000/api/cv/${cvId}`
            : 'http://localhost:5000/api/cv';

        const method = cvId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title,
                    file_url: fileUrl
                })
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                const errMsg = errorData.error || 'Failed to save CV';

                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                    return;
                }

                throw new Error(errMsg);
            }

            alert('CV saved successfully!');
            fetchCV();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h2>Manage CV / Resume</h2>
            <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>
                Update your CV link here. This link will be used on the public website.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa' }}>CV Title</label>
                    <input
                        type="text"
                        placeholder="e.g., Fullstack Developer Resume 2024"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.8rem', background: '#333', border: '1px solid #555', color: 'white', borderRadius: '4px' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa' }}>CV File URL</label>
                    <input
                        type="text"
                        placeholder="https://link-to-your-cv.pdf"
                        value={fileUrl}
                        onChange={e => setFileUrl(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.8rem', background: '#333', border: '1px solid #555', color: 'white', borderRadius: '4px' }}
                    />
                    <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', color: '#666' }}>
                        Paste a URL to your CV PDF document (e.g., Google Drive link, Dropbox, etc).
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{ padding: '0.8rem 1.5rem', background: 'var(--primary-color)', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        {loading ? 'Saving...' : 'Save CV'}
                    </button>
                </div>
            </form>
        </div>
    );
}
