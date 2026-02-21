import { useState, useEffect } from 'react';

export function SkillsManager() {
    const [skills, setSkills] = useState([]);
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);



    const fetchSkills = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/skills');
            const data = await res.json();
            setSkills(data);
        } catch (err) {
            console.error('Error fetching skills:', err);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const url = editingId
            ? `http://localhost:5000/api/skills/${editingId}`
            : 'http://localhost:5000/api/skills';

        const method = editingId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                // Send a space for description to satisfy DB constraint if needed, 
                // or just send empty string if DB allows. 
                // We'll send a space " " to be safe based on my previous thought.
                body: JSON.stringify({
                    title,
                    description: ' ',
                    image_url: imageUrl
                })
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                const errMsg = errorData.error || 'Failed to save skill';
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    return;
                }
                throw new Error(errMsg);
            }

            setTitle('');
            setImageUrl('');
            setEditingId(null);
            fetchSkills();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (skill) => {
        setTitle(skill.title);
        setImageUrl(skill.image_url || '');
        setEditingId(skill.id);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this skill?')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/skills/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                const errMsg = errorData.error || 'Failed to delete skill';
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    return;
                }
                throw new Error(errMsg);
            }
            fetchSkills();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleCancel = () => {
        setTitle('');
        setImageUrl('');
        setEditingId(null);
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem' }}>
            <h2>Manage Skills</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa' }}>Skill Title</label>
                    <input
                        type="text"
                        placeholder="e.g., React, Node.js"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.8rem', background: '#333', border: '1px solid #555', color: 'white', borderRadius: '4px' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa' }}>Image URL (Icon/Logo)</label>
                    <input
                        type="text"
                        placeholder="https://example.com/icon.png"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        style={{ width: '100%', padding: '0.8rem', background: '#333', border: '1px solid #555', color: 'white', borderRadius: '4px' }}
                    />
                    <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', color: '#666' }}>
                        Paste a URL for the skill icon (SVG or PNG recommended).
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{ padding: '0.8rem 1.5rem', background: 'var(--primary-color)', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        {loading ? 'Saving...' : (editingId ? 'Update Skill' : 'Add Skill')}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            style={{ padding: '0.8rem 1.5rem', background: '#555', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                {skills.map(skill => (
                    <div key={skill.id} className="glass-panel" style={{
                        padding: '0.8rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', overflow: 'hidden' }}>
                            <div style={{ width: '40px', height: '40px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {skill.image_url ? (
                                    <img
                                        src={skill.image_url}
                                        alt={skill.title}
                                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                ) : (
                                    <div style={{ width: '32px', height: '32px', background: '#333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: '0.9rem', color: '#666' }}>{skill.title.charAt(0)}</span>
                                    </div>
                                )}
                            </div>
                            <h3 style={{ fontSize: '1rem', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{skill.title}</h3>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                            <button
                                onClick={() => handleEdit(skill)}
                                style={{
                                    padding: '0.4rem',
                                    background: 'rgba(59, 130, 246, 0.2)',
                                    color: '#3b82f6',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                title="Edit"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            </button>
                            <button
                                onClick={() => handleDelete(skill.id)}
                                style={{
                                    padding: '0.4rem',
                                    background: 'rgba(239, 68, 68, 0.2)',
                                    color: '#ef4444',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                title="Delete"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
