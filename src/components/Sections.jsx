import { useState, useEffect } from 'react';
import photoProfile from '../assets/photoprofile.png';
import { RevealOnScroll } from './RevealOnScroll';

export function About() {
    return (
        <section id="about" className="section-padding">
            <div className="container">
                <RevealOnScroll>
                    <div className="glass-panel" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3rem',
                        padding: '3rem',
                        flexWrap: 'wrap'
                    }}>
                        {/* ... content ... */}
                        <div style={{ flex: '1 1 300px' }}>
                            <div style={{
                                width: '100%',
                                maxWidth: '350px',
                                aspectRatio: '1/1',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                margin: '0 auto',
                                background: '#333',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                            }}>
                                <img src={photoProfile} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>
                        <div style={{ flex: '1 1 400px' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                About Me
                                <div style={{ height: '2px', background: 'var(--primary-color)', flexGrow: 1, maxWidth: '100px', opacity: 0.5 }}></div>
                            </h2>
                            <p style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                                I'm a passionate developer with a knack for building immersive web experiences. With a background in both design and engineering, I bridge the gap between aesthetics and functionality.
                            </p>
                            <p style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: '1.8', marginBottom: '2rem' }}>
                                My journey in tech is driven by curiosity and a commitment to excellence. Whether it's a complex dApp or a stunning portfolio, I bring dedication and craft to every project.
                            </p>
                            <div style={{ display: 'flex', gap: '2rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '2rem', color: 'var(--primary-color)' }}>3+</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#888' }}>Years Exp.</p>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '2rem', color: 'var(--primary-color)' }}>20+</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#888' }}>Projects</p>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '2rem', color: 'var(--primary-color)' }}>15+</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#888' }}>Clients</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}

export function Skills() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL || ''}/api/skills`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                setSkills(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching skills:', err);
                setSkills([]);
                setLoading(false);
            });
    }, []);

    return (
        <section id="skills" className="section-padding" style={{ background: 'var(--secondary-color)' }}>
            <div className="container">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>My Skills</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1rem' }}>
                    {loading ? (
                        <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>Loading skills...</p>
                    ) : (
                        skills.map((skill) => (
                            <div key={skill.id || skill.title} className="glass-panel skill-card">
                                {skill.image_url ? (
                                    <img
                                        src={skill.image_url}
                                        alt={skill.title}
                                    />
                                ) : (
                                    <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: '1.2rem', color: '#666' }}>{skill.title.charAt(0)}</span>
                                    </div>
                                )}
                                <h3>{skill.title}</h3>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>

    );
}

export function Experience() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedExperience, setSelectedExperience] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL || ''}/api/experiences`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                setExperiences(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching experiences:', err);
                setExperiences([]);
                setLoading(false);
            });
    }, []);

    return (
        <section id="experience" className="section-padding">
            <div className="container">
                <RevealOnScroll>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>My Experience</h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '2rem'
                    }}>
                        {experiences.map((exp, index) => (
                            <div key={index} className="glass-panel" style={{
                                padding: '1.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                position: 'relative',
                                transition: 'all 0.3s ease',
                                height: '100%',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                background: 'rgba(255, 255, 255, 0.02)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                    {exp.image_url ? (
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            flexShrink: 0,
                                            background: '#333'
                                        }}>
                                            <img src={exp.image_url} alt={exp.company} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    ) : (
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '12px',
                                            background: 'rgba(255,255,255,0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}>
                                            <span style={{ fontSize: '1.2rem', color: '#666' }}>{exp.company.charAt(0)}</span>
                                        </div>
                                    )}
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', margin: 0, lineHeight: 1.2 }}>{exp.role}</h3>
                                        <p style={{ fontSize: '0.9rem', color: '#aaa', margin: 0 }}>{exp.company}</p>
                                    </div>
                                </div>

                                <div style={{
                                    fontSize: '0.85rem',
                                    color: '#666',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <span style={{
                                        display: 'inline-block',
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: 'var(--primary-color)'
                                    }}></span>
                                    {exp.period}
                                </div>

                                <p style={{
                                    color: '#ccc',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.6',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    margin: 0,
                                    opacity: 0.8
                                }}>
                                    {exp.description}
                                </p>

                                <button
                                    onClick={() => setSelectedExperience(exp)}
                                    style={{
                                        marginTop: 'auto',
                                        background: 'transparent',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: 'var(--primary-color)',
                                        padding: '0.6rem 1rem',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.2s',
                                        alignSelf: 'flex-start'
                                    }}
                                    className="hover-btn"
                                >
                                    View More
                                </button>
                            </div>

                        ))}
                    </div>
                </RevealOnScroll>
            </div >

            {/* Experience Details Modal */}
            {selectedExperience && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000,
                    padding: '1.5rem',
                    animation: 'fadeIn 0.3s ease-out'
                }} onClick={() => setSelectedExperience(null)}>
                    <div
                        className="glass-panel"
                        style={{
                            maxWidth: '650px',
                            width: '100%',
                            maxHeight: '85vh',
                            position: 'relative',
                            padding: '0',
                            border: '1px solid rgba(255,255,255,0.15)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            borderRadius: '24px',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                            transform: 'translateY(0)',
                            animation: 'slideUpFade 0.4s ease-out'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header Area */}
                        <div style={{
                            padding: '1.5rem 2rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            background: 'rgba(255,255,255,0.03)',
                            borderBottom: '1px solid rgba(255,255,255,0.08)'
                        }}>
                            <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                                {selectedExperience.image_url ? (
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '14px',
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                        background: '#333',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        <img src={selectedExperience.image_url} alt={selectedExperience.company} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                ) : (
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '14px',
                                        background: 'rgba(var(--primary-color-rgb), 0.2)',
                                        color: 'var(--primary-color)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        border: '1px solid rgba(var(--primary-color-rgb), 0.3)'
                                    }}>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedExperience.company.charAt(0)}</span>
                                    </div>
                                )}
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', margin: '0 0 0.2rem 0', fontWeight: '600', color: '#fff' }}>{selectedExperience.role}</h3>
                                    <p style={{ fontSize: '1.05rem', color: 'var(--primary-color)', margin: '0 0 0.2rem 0', fontWeight: '500' }}>{selectedExperience.company}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#888' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                        {selectedExperience.period}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedExperience(null)}
                                style={{
                                    background: 'transparent',
                                    color: '#888',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '36px',
                                    height: '36px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem',
                                    transition: 'all 0.2s',
                                    marginTop: '-0.5rem',
                                    marginRight: '-0.5rem'
                                }}
                                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; e.currentTarget.style.color = '#ef4444'; }}
                                onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#888'; }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        {/* Content Area */}
                        <div style={{ padding: '2rem', overflowY: 'auto' }}>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#aaa', fontWeight: '500' }}>Role Description</h4>
                            <div style={{ color: '#ddd', lineHeight: '1.8', fontSize: '1.05rem', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                {selectedExperience.description.split('\n').map((paragraph, idx) => (
                                    <p key={idx} style={{ margin: paragraph.trim() ? '0 0 1rem 0' : '0' }}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section >
    );
}

export function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL || ''}/api/projects`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                if (!Array.isArray(data)) {
                    setProjects([]);
                    setLoading(false);
                    return;
                }
                const parsedData = data.map(p => ({
                    ...p,
                    tech: typeof p.tech_stack === 'string' ? JSON.parse(p.tech_stack) : p.tech_stack
                }));
                setProjects(parsedData);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching projects:', err);
                setProjects([]);
                setLoading(false);
            });
    }, []);

    return (
        <section id="projects" className="section-padding">
            <div className="container">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>Project</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {loading ? (
                        <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>Loading projects...</p>
                    ) : (
                        projects.map((project) => (
                            <div key={project.id} className="glass-panel" style={{
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%'
                            }}>
                                <div style={{ height: '200px', background: '#252525', overflow: 'hidden', flexShrink: 0 }}>
                                    {project.image_url ? (
                                        <img src={project.image_url} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: '#333' }}></div>
                                    )}
                                </div>
                                <div style={{
                                    padding: '1.5rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flexGrow: 1
                                }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                                    <p style={{
                                        color: '#aaa',
                                        marginBottom: '1rem',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        flexGrow: 1
                                    }}>
                                        {project.description}
                                    </p>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                        {Array.isArray(project.tech) && project.tech.map((t, i) => (
                                            <span key={i} style={{
                                                fontSize: '0.8rem',
                                                padding: '0.2rem 0.8rem',
                                                background: 'rgba(255,255,255,0.1)',
                                                borderRadius: '100px'
                                            }}>{t}</span>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        style={{
                                            display: 'inline-block',
                                            color: 'var(--primary-color)',
                                            background: 'none',
                                            border: 'none',
                                            padding: 0,
                                            fontSize: '1rem',
                                            cursor: 'pointer',
                                            textDecoration: 'underline',
                                            alignSelf: 'flex-start',
                                            marginTop: 'auto'
                                        }}
                                    >
                                        View Details &rarr;
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Project Details Modal */}
            {selectedProject && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000,
                    padding: '1.5rem',
                    animation: 'fadeIn 0.3s ease-out'
                }} onClick={() => setSelectedProject(null)}>
                    <div
                        className="glass-panel"
                        style={{
                            maxWidth: '850px',
                            width: '100%',
                            maxHeight: '90vh',
                            position: 'relative',
                            padding: '0',
                            border: '1px solid rgba(255,255,255,0.15)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            borderRadius: '24px',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                            transform: 'translateY(0)',
                            animation: 'slideUpFade 0.4s ease-out'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div style={{ height: '350px', background: '#1a1a1a', position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, height: '100px',
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)',
                                zIndex: 5,
                                pointerEvents: 'none'
                            }}></div>

                            {selectedProject.image_url ? (
                                <img src={selectedProject.image_url} alt={selectedProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ width: '100%', height: '100%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                </div>
                            )}

                            {/* Close Button overlying the image */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1.5rem',
                                    background: 'rgba(0,0,0,0.4)',
                                    backdropFilter: 'blur(8px)',
                                    color: 'white',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem',
                                    transition: 'all 0.2s',
                                    zIndex: 10
                                }}
                                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.6)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.8)'; }}
                                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <div style={{ padding: '2.5rem', overflowY: 'auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                                <h2 style={{ fontSize: '2.2rem', margin: 0, fontWeight: '600' }}>{selectedProject.title}</h2>
                                {selectedProject.link && (
                                    <a
                                        href={selectedProject.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.6rem',
                                            background: 'var(--primary-color)',
                                            color: 'white',
                                            padding: '0.6rem 1.5rem',
                                            borderRadius: '50px',
                                            textDecoration: 'none',
                                            fontWeight: '600',
                                            fontSize: '0.95rem',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                                            transition: 'transform 0.2s'
                                        }}
                                        className="hover-btn"
                                    >
                                        Visit Project Site
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                    </a>
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                                {Array.isArray(selectedProject.tech) && selectedProject.tech.map((t, i) => (
                                    <span key={i} style={{
                                        fontSize: '0.85rem',
                                        padding: '0.4rem 1.2rem',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: '#eee',
                                        borderRadius: '100px',
                                        letterSpacing: '0.5px'
                                    }}>{t}</span>
                                ))}
                            </div>

                            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#aaa', fontWeight: '500', margin: '0 0 1rem 0' }}>About Project</h4>
                                {selectedProject.description.split('\n').map((paragraph, idx) => (
                                    <p key={idx} style={{ color: '#ddd', lineHeight: '1.8', fontSize: '1.05rem', margin: paragraph.trim() ? '0 0 1rem 0' : '0' }}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export function Contact() {
    const [showCopyPopup, setShowCopyPopup] = useState(false);
    const [showCvModal, setShowCvModal] = useState(false);
    const [cvData, setCvData] = useState(null);
    const email = "indranugrahaputra09@gmail.com";

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL || ''}/api/cv`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setCvData(data[0]);
                }
            })
            .catch(err => console.error('Error fetching CV:', err));
    }, []);

    const defaultCvUrl = "https://drive.google.com/file/d/1H5Aytrrorw81qJhAmU8XrBPohKImy2OM/view?usp=sharing";
    const activeCvUrl = cvData?.file_url || defaultCvUrl;

    const getIframeUrl = (url) => {
        if (!url) return '';
        if (url.includes('drive.google.com') && url.includes('/view')) {
            return url.replace(/\/view(\?usp=sharing)?/, '/preview');
        }
        return url;
    };

    const handleCopyEmail = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(email);
        setShowCopyPopup(true);
        setTimeout(() => setShowCopyPopup(false), 2000);
    };

    return (
        <section id="contact" className="section-padding" style={{ background: 'var(--secondary-color)', textAlign: 'center', position: 'relative' }}>
            <div className="container">
                {/* Curriculum Vitae Section */}
                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Curriculum Vitae</h2>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}>
                    <button
                        onClick={() => setShowCvModal(true)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            background: 'var(--primary-color)',
                            color: 'white',
                            padding: '1rem 2rem',
                            borderRadius: '50px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            fontWeight: '600',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                            transition: 'all 0.3s ease'
                        }}
                        className="hover-btn"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        View My CV
                    </button>
                </div>

                <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Personal Social Media</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>

                    {/* Instagram */}
                    <a href="https://www.instagram.com/kyovin_/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', color: '#aaa', textDecoration: 'none' }}>
                        <div style={{ width: '70px', height: '70px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', fontSize: '1.5rem', color: 'white' }} className="social-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </div>
                        <span style={{ fontSize: '1rem', fontWeight: 500 }}>Instagram</span>
                    </a>

                    {/* LinkedIn */}
                    <a href="https://www.linkedin.com/in/indra-nugraha-putra-783853331/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', color: '#aaa', textDecoration: 'none' }}>
                        <div style={{ width: '70px', height: '70px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', fontSize: '1.5rem', color: 'white' }} className="social-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </div>
                        <span style={{ fontSize: '1rem', fontWeight: 500 }}>LinkedIn</span>
                    </a>

                    {/* Email (Click to Copy) */}
                    <a href="#" onClick={handleCopyEmail} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', color: '#aaa', textDecoration: 'none' }}>
                        <div style={{ width: '70px', height: '70px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', fontSize: '1.5rem', color: 'white' }} className="social-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </div>
                        <span style={{ fontSize: '1rem', fontWeight: 500 }}>Email</span>
                    </a>

                    {/* GitHub */}
                    <a href="https://github.com/IndraNP06" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', color: '#aaa', textDecoration: 'none' }}>
                        <div style={{ width: '70px', height: '70px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', fontSize: '1.5rem', color: 'white' }} className="social-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </div>
                        <span style={{ fontSize: '1rem', fontWeight: 500 }}>GitHub</span>
                    </a>

                </div>
            </div>

            {/* Configurable Copy Notification Popup */}
            {showCopyPopup && (
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'var(--primary-color)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    zIndex: 10,
                    animation: 'fadeIn 0.3s ease-out'
                }}>
                    Email Copied!
                </div>
            )}

            {/* CV PDF Modal */}
            {showCvModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000,
                    padding: '2rem',
                    animation: 'fadeIn 0.3s ease-out'
                }} onClick={() => setShowCvModal(false)}>
                    <div
                        className="glass-panel"
                        style={{
                            maxWidth: '1000px',
                            width: '100%',
                            height: '85vh',
                            position: 'relative',
                            padding: '0',
                            border: '1px solid rgba(255,255,255,0.15)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            borderRadius: '24px',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                            transform: 'translateY(0)',
                            animation: 'slideUpFade 0.4s ease-out'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header Area */}
                        <div style={{
                            padding: '1.2rem 2rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'rgba(255,255,255,0.03)',
                            borderBottom: '1px solid rgba(255,255,255,0.08)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    background: 'rgba(var(--primary-color-rgb), 0.2)',
                                    padding: '0.5rem',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--primary-color)'
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                </div>
                                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '500', letterSpacing: '0.5px' }}>My Curriculum Vitae</h3>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <a
                                    href={activeCvUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        color: '#aaa',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '8px',
                                        background: 'rgba(255,255,255,0.05)',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#aaa'; }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                    Open App
                                </a>
                                <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }}></div>
                                <button
                                    onClick={() => setShowCvModal(false)}
                                    style={{
                                        background: 'transparent',
                                        color: '#888',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '36px',
                                        height: '36px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.2rem',
                                        transition: 'all 0.2s',
                                    }}
                                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; e.currentTarget.style.color = '#ef4444'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#888'; }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>
                        </div>

                        {/* Iframe Container */}
                        <div style={{ flexGrow: 1, width: '100%', background: '#1a1a1a', position: 'relative' }}>
                            {/* Loading State visible behind iframe */}
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1rem',
                                color: '#555',
                                zIndex: 0
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 2s linear infinite', color: 'var(--primary-color)' }}><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
                                <span style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>LOADING DOCUMENT...</span>
                            </div>

                            <iframe
                                src={getIframeUrl(activeCvUrl)}
                                width="100%"
                                height="100%"
                                allow="autoplay"
                                style={{ border: 'none', position: 'relative', zIndex: 1, borderRadius: '0 0 24px 24px' }}
                                title="Curriculum Vitae"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export function Footer() {
    return (
        <footer style={{ padding: '2rem 0', borderTop: '1px solid var(--border-color)', textAlign: 'center', color: '#666' }}>
            <div className="container">
                <p>&copy; 2024 The Dri.dev. All rights reserved.</p>
            </div>
        </footer>
    );
}
