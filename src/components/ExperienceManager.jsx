import { useState, useEffect } from 'react';

export function ExperienceManager() {
    const [experiences, setExperiences] = useState([]);
    const [form, setForm] = useState({ company: '', role: '', period: '', description: '', image_url: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/experiences`);
            const data = await res.json();
            setExperiences(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `${import.meta.env.VITE_API_URL || ''}/api/experiences/${editingId}` : `${import.meta.env.VITE_API_URL || ''}/api/experiences`;

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                setForm({ company: '', role: '', period: '', description: '', image_url: '' });
                setEditingId(null);
                fetchExperiences();
            } else {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    return;
                }
                const errData = await res.json().catch(() => ({}));
                alert(errData.error || 'Failed to save experience');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (exp) => {
        setForm({ ...exp, image_url: exp.image_url || '' });
        setEditingId(exp.id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/experiences/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    return;
                }
                const errData = await res.json().catch(() => ({}));
                alert(errData.error || 'Failed to delete experience');
            } else {
                fetchExperiences();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
            <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>Manage Experience</h2>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                <input
                    type="text"
                    placeholder="Company Name"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    required
                    style={{ padding: '0.8rem', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px' }}
                />
                <input
                    type="text"
                    placeholder="Role / Job Title"
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}
                    required
                    style={{ padding: '0.8rem', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px' }}
                />
                <input
                    type="text"
                    placeholder="Period (e.g. Jan 2023 - Present)"
                    value={form.period}
                    onChange={e => setForm({ ...form, period: e.target.value })}
                    required
                    style={{ padding: '0.8rem', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px' }}
                />
                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    required
                    rows="4"
                    style={{ padding: '0.8rem', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px' }}
                />
                <input
                    type="text"
                    placeholder="Image URL (e.g. https://example.com/logo.png)"
                    value={form.image_url}
                    onChange={e => setForm({ ...form, image_url: e.target.value })}
                    style={{ padding: '0.8rem', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px' }}
                />
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" style={{ padding: '0.8rem 1.5rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        {editingId ? 'Update Experience' : 'Add Experience'}
                    </button>
                    {editingId && (
                        <button type="button" onClick={() => { setEditingId(null); setForm({ company: '', role: '', period: '', description: '', image_url: '' }); }} style={{ padding: '0.8rem 1.5rem', background: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {experiences.map(exp => (
                    <div key={exp.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ margin: 0 }}>{exp.role}</h3>
                            <p style={{ margin: '0.2rem 0', color: '#aaa' }}>{exp.company} | <small>{exp.period}</small></p>
                            <p style={{ margin: '0.2rem 0', color: '#888', fontSize: '0.9rem' }}>{exp.description}</p>
                            {exp.image_url && <img src={exp.image_url} alt={exp.company} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', marginTop: '0.5rem' }} />}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => handleEdit(exp)} style={{ padding: '0.4rem 0.8rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                            <button onClick={() => handleDelete(exp.id)} style={{ padding: '0.4rem 0.8rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
