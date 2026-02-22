import { useState, useEffect } from 'react';

export function ProjectsManager() {
    const [projects, setProjects] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [techStack, setTechStack] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [link, setLink] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);



    const fetchProjects = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/projects`);
            const data = await res.json();
            // Ensure tech_stack is parsed if it comes as string, or handle if it's already object
            const parsedData = (Array.isArray(data) ? data : []).map(p => ({
                ...p,
                tech_stack: typeof p.tech_stack === 'string' ? JSON.parse(p.tech_stack) : p.tech_stack
            }));
            setProjects(parsedData);
        } catch (err) {
            console.error('Error fetching projects:', err);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const url = editingId
            ? `${import.meta.env.VITE_API_URL || ''}/api/projects/${editingId}`
            : `${import.meta.env.VITE_API_URL || ''}/api/projects`;

        const method = editingId ? 'PUT' : 'POST';

        // Parse tech stack string into array
        const techArray = techStack.split(',').map(t => t.trim()).filter(t => t);

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    tech_stack: techArray,
                    image_url: imageUrl,
                    link
                })
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                const errMsg = errorData.error || 'Failed to save project';
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    return;
                }
                throw new Error(errMsg);
            }

            resetForm();
            fetchProjects();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (project) => {
        setTitle(project.title);
        setDescription(project.description);
        setTechStack(Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : '');
        setImageUrl(project.image_url || '');
        setLink(project.link || '');
        setEditingId(project.id);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                const errMsg = errorData.error || 'Failed to delete project';
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    return;
                }
                throw new Error(errMsg);
            }
            fetchProjects();
        } catch (err) {
            alert(err.message);
        }
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setTechStack('');
        setImageUrl('');
        setLink('');
        setEditingId(null);
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
            <h2>Manage Projects</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="text"
                    placeholder="Project Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                    style={{ padding: '0.8rem', background: '#333', border: '1px solid #555', color: 'white', borderRadius: '4px' }}
                />
                <textarea
                    placeholder="Project Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    style={{ padding: '0.8rem', background: '#333', border: '1px solid #555', color: 'white', borderRadius: '4px', minHeight: '100px' }}
                />
                <input
                    type="text"
                    placeholder="Tech Stack (comma separated, e.g. React, Node.js)"
                    value={techStack}
                    onChange={e => setTechStack(e.target.value)}
                    style={{ padding: '0.8rem', background: '#333', border: '1px solid #555', color: 'white', borderRadius: '4px' }}
                />
                <input
                    type="text"
                    placeholder="Image URL (Thumbnail)"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    style={{ padding: '0.8rem', background: '#333', border: '1px solid #555', color: 'white', borderRadius: '4px' }}
                />
                <input
                    type="text"
                    placeholder="Project Link (URL)"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    style={{ padding: '0.8rem', background: '#333', border: '1px solid #555', color: 'white', borderRadius: '4px' }}
                />

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{ padding: '0.8rem 1.5rem', background: 'var(--primary-color)', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        {loading ? 'Saving...' : (editingId ? 'Update Project' : 'Add Project')}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={resetForm}
                            style={{ padding: '0.8rem 1.5rem', background: '#555', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                {projects.map(project => (
                    <div key={project.id} className="glass-panel" style={{ padding: '1rem', position: 'relative' }}>
                        <h3 style={{ margin: '0 0 0.5rem' }}>{project.title}</h3>
                        <p style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {project.description}
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                            {Array.isArray(project.tech_stack) && project.tech_stack.map((t, i) => (
                                <span key={i} style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '10px' }}>{t}</span>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => handleEdit(project)}
                                style={{ padding: '0.3rem 0.8rem', background: '#3b82f6', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(project.id)}
                                style={{ padding: '0.3rem 0.8rem', background: '#ef4444', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
