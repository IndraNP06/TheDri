import { useState, useEffect } from 'react';

export function ExperienceManager() {
    const [experiences, setExperiences] = useState([]);

    // Split period into start and end parts
    const [form, setForm] = useState({ company: '', role: '', startMonth: 'Jan', startYear: new Date().getFullYear().toString(), endMonth: 'Present', endYear: '', description: '', image_url: '' });
    const [editingId, setEditingId] = useState(null);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Present'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());

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
            // Reconstruct the period string
            const startStr = `${form.startMonth} ${form.startYear}`.trim();
            const endStr = form.endMonth === 'Present' ? 'Present' : `${form.endMonth} ${form.endYear}`.trim();
            const periodStr = `${startStr} - ${endStr}`;

            const payload = {
                company: form.company,
                role: form.role,
                period: periodStr,
                description: form.description,
                image_url: form.image_url
            };

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setForm({ company: '', role: '', startMonth: 'Jan', startYear: currentYear.toString(), endMonth: 'Present', endYear: '', description: '', image_url: '' });
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
        // Parse the period string back into components (e.g. "Jan 2023 - Present" or "Jan 2021 - Dec 2022")
        let sM = 'Jan', sY = currentYear.toString(), eM = 'Present', eY = '';
        if (exp.period) {
            const parts = exp.period.split(' - ');
            if (parts.length === 2) {
                const startParts = parts[0].trim().split(' ');
                if (startParts.length === 2) { sM = startParts[0]; sY = startParts[1]; }

                if (parts[1].trim() === 'Present') {
                    eM = 'Present';
                } else {
                    const endParts = parts[1].trim().split(' ');
                    if (endParts.length === 2) { eM = endParts[0]; eY = endParts[1]; }
                }
            }
        }

        setForm({ ...exp, startMonth: sM, startYear: sY, endMonth: eM, endYear: eY, image_url: exp.image_url || '' });
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
                <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                    <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '-0.5rem' }}>Start Period</label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <select
                            value={form.startMonth}
                            onChange={e => setForm({ ...form, startMonth: e.target.value })}
                            style={{ padding: '0.8rem', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px', flex: 1 }}
                        >
                            {months.filter(m => m !== 'Present').map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <select
                            value={form.startYear}
                            onChange={e => setForm({ ...form, startYear: e.target.value })}
                            style={{ padding: '0.8rem', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px', flex: 1 }}
                        >
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>

                    <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '-0.5rem', marginTop: '0.5rem' }}>End Period</label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <select
                            value={form.endMonth}
                            onChange={e => setForm({ ...form, endMonth: e.target.value })}
                            style={{ padding: '0.8rem', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px', flex: 1 }}
                        >
                            {months.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        {form.endMonth !== 'Present' && (
                            <select
                                value={form.endYear || currentYear.toString()}
                                onChange={e => setForm({ ...form, endYear: e.target.value })}
                                style={{ padding: '0.8rem', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px', flex: 1 }}
                            >
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        )}
                    </div>
                </div>
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
                        <button type="button" onClick={() => { setEditingId(null); setForm({ company: '', role: '', startMonth: 'Jan', startYear: currentYear.toString(), endMonth: 'Present', endYear: '', description: '', image_url: '' }); }} style={{ padding: '0.8rem 1.5rem', background: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
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
