import { useState, useEffect } from 'react';
import photoProfile from '../assets/photoprofile.png';
import { motion, AnimatePresence } from 'framer-motion';

export function AboutAndSkills() {
    const [skills, setSkills] = useState([]);
    const [projectCount, setProjectCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch(`${import.meta.env.VITE_API_URL || ''}/api/skills`).then(res => res.ok ? res.json() : []),
            fetch(`${import.meta.env.VITE_API_URL || ''}/api/projects`).then(res => res.ok ? res.json() : [])
        ])
            .then(([skillsData, projectsData]) => {
                setSkills(Array.isArray(skillsData) ? skillsData : []);
                setProjectCount(Array.isArray(projectsData) ? projectsData.length : 0);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setSkills([]);
                setProjectCount(0);
                setLoading(false);
            });
    }, []);

    return (
        <section id="about" className="section-padding" style={{ paddingTop: '2rem' }}>
            <div className="container">
                <div className="bento-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gap: '2rem',
                    gridAutoRows: 'minmax(150px, auto)'
                }}>
                    {/* Box 1: Intro Text (Spans 8 cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        whileHover={{ y: -5 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 1 }}
                        className="glass-panel" style={{
                            gridColumn: 'span 8',
                            padding: '3rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            background: 'rgba(255,255,255,0.02)'
                        }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '1.5rem', color: '#fff' }}>
                            The <span style={{ color: 'var(--primary-color)' }}>Mind</span><br /> Behind The Code
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '600px' }}>
                            A detail-oriented developer and designer with a deep passion for visual hierarchy, precise layouts, and spatial harmony. I craft pixel-perfect web experiences where minimalist aesthetics meet clean, functional code.
                        </p>
                    </motion.div>

                    {/* Box 2: Profile Image (Spans 4 cols) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        whileHover="hover"
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="glass-panel" style={{
                            gridColumn: 'span 4',
                            overflow: 'hidden',
                            padding: 0,
                            position: 'relative',
                            minHeight: '300px'
                        }}>
                        <motion.img
                            variants={{
                                hover: { scale: 1.05, filter: 'grayscale(0%)' }
                            }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            src={photoProfile}
                            alt="Profile"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(30%)' }} />
                        <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'var(--primary-color)', color: '#ffffff', padding: '0.5rem 1rem', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                            Indra Nugraha Putra
                        </div>
                    </motion.div>

                    {/* Box 3: Stats (Spans 4 cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        whileHover={{ scale: 1.03, y: -10, boxShadow: '0 20px 40px rgba(79, 172, 254, 0.5)' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="glass-panel" style={{
                            gridColumn: 'span 4',
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '1.5rem',
                            background: 'linear-gradient(135deg, var(--primary-color), var(--primary-hover))',
                            color: '#fff',
                            border: 'none',
                            boxShadow: '0 10px 30px rgba(79, 172, 254, 0.3)'
                        }}>
                        <div>
                            <h3 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, margin: 0 }}>0.8</h3>
                            <p style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0, opacity: 0.9 }}>Years Exp.</p>
                        </div>
                        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.3)' }}></div>
                        <div>
                            <h3 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, margin: 0 }}>{projectCount}</h3>
                            <p style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0, opacity: 0.9 }}>Projects</p>
                        </div>
                    </motion.div>

                    {/* Box 4: Skills Marquee (Spans 8 cols) */}
                    <div className="glass-panel" style={{
                        gridColumn: 'span 8',
                        padding: '2.5rem',
                        background: 'rgba(255,255,255,0.02)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem', fontWeight: 600 }}>Technical Stack</h3>

                        <div style={{
                            display: 'flex',
                            position: 'relative',
                            width: '100%',
                            overflow: 'hidden',
                            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                        }}>
                            {loading ? (
                                <p style={{ color: 'var(--text-muted)' }}>Loading skills...</p>
                            ) : (
                                <motion.div
                                    animate={{ x: [`0%`, `-${100 / 2}%`] }}
                                    transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                                    style={{ display: 'flex', gap: '1.5rem', width: 'max-content' }}
                                >
                                    {[...skills, ...skills].map((skill, index) => (
                                        <motion.div key={index}
                                            whileHover={{ scale: 1.1, backgroundColor: 'var(--primary-color)', color: '#000' }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1.5rem',
                                                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '50px', cursor: 'pointer', whiteSpace: 'nowrap',
                                                color: 'var(--text-muted)'
                                            }}>
                                            {skill.icon && <i className={skill.icon} style={{ fontSize: '1.2rem' }}></i>}
                                            <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{skill.title}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function PortfolioTabs() {
    const [activeTab, setActiveTab] = useState('experience');

    // Experience State
    const [experiences, setExperiences] = useState([]);
    const [expLoading, setExpLoading] = useState(true);
    const [selectedExperience, setSelectedExperience] = useState(null);

    // Projects State
    const [projects, setProjects] = useState([]);
    const [projLoading, setProjLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        // Fetch Experiences
        fetch(`${import.meta.env.VITE_API_URL || ''}/api/experiences`)
            .then(res => res.ok ? res.json() : [])
            .then(data => {
                setExperiences(Array.isArray(data) ? data : []);
                setExpLoading(false);
            })
            .catch(err => {
                console.error('Error fetching experiences:', err);
                setExpLoading(false);
            });

        // Fetch Projects
        fetch(`${import.meta.env.VITE_API_URL || ''}/api/projects`)
            .then(res => res.ok ? res.json() : [])
            .then(data => {
                const parsedData = Array.isArray(data) ? data.map(p => ({
                    ...p,
                    tech: typeof p.tech_stack === 'string' ? JSON.parse(p.tech_stack) : p.tech_stack
                })) : [];
                setProjects(parsedData);
                setProjLoading(false);
            })
            .catch(err => {
                console.error('Error fetching projects:', err);
                setProjLoading(false);
            });
    }, []);

    useEffect(() => {
        if (selectedExperience || selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedExperience, selectedProject]);

    // Animation Variants
    const tabContentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } }
    };

    const modalOverlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    };

    const modalContentVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
        exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } }
    };

    return (
        <section id="portfolio" className="section-padding">
            <div className="container" style={{ maxWidth: '1000px' }}>
                {/* Tabs Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, textTransform: 'uppercase', margin: 0, lineHeight: 1 }}>
                        Professional <br /><span style={{ color: 'var(--primary-color)' }}>Showcase</span>
                    </h2>

                    <div style={{ display: 'flex', gap: '2rem', position: 'relative' }}>
                        {['experience', 'projects'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    position: 'relative',
                                    padding: '0 0 0.5rem 0',
                                    border: 'none',
                                    background: 'transparent',
                                    color: activeTab === tab ? '#fff' : 'var(--text-muted)',
                                    fontSize: '1.2rem',
                                    letterSpacing: '0.1em',
                                    transition: 'color 0.3s',
                                    textTransform: 'capitalize',
                                    borderRadius: 0,
                                    boxShadow: 'none'
                                }}>
                                {tab}
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            height: '2px',
                                            background: 'var(--primary-color)',
                                            zIndex: 1
                                        }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <AnimatePresence mode='wait'>
                    {/* Tab Content: Experience */}
                    {activeTab === 'experience' && (
                        <motion.div
                            key="experience-tab"
                            variants={tabContentVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                        >
                            {expLoading ? (
                                <p style={{ color: 'var(--text-muted)' }}>Loading experiences...</p>
                            ) : (
                                experiences.map((exp, index) => (
                                    <motion.div key={index} variants={cardVariants}
                                        whileHover={{ scale: 1.02, y: -5, backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'var(--primary-color)', boxShadow: '0 15px 35px rgba(0, 229, 255, 0.15)' }}
                                        className="glass-panel" style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            padding: '2.5rem',
                                            border: '1px solid var(--border-color)',
                                            background: 'rgba(255,255,255,0.01)',
                                            position: 'relative'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                                {/* Logo/Icon */}
                                                <div style={{ width: '60px', height: '60px', flexShrink: 0, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)' }}>
                                                    {exp.image_url ? (
                                                        <img src={exp.image_url} alt={exp.company} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '5px' }} />
                                                    ) : (
                                                        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-muted)' }}>{exp.company.charAt(0)}</span>
                                                    )}
                                                </div>

                                                {/* Headers */}
                                                <div>
                                                    <h3 style={{ fontSize: '1.6rem', color: '#fff', margin: '0 0 0.3rem 0', fontWeight: 700, lineHeight: 1.2 }}>{exp.role}</h3>
                                                    <p style={{ fontSize: '1.1rem', color: 'var(--primary-color)', margin: 0, fontWeight: 500, letterSpacing: '0.05em' }}>{exp.company}</p>
                                                </div>
                                            </div>

                                            {/* Period/Date */}
                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.4rem 1rem', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--border-radius-sm)' }}>
                                                {exp.period}
                                            </div>
                                        </div>

                                        <p style={{
                                            color: '#bbb', fontSize: '1rem', lineHeight: '1.7', margin: '0 0 2rem 0',
                                            display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                                        }}>
                                            {exp.description}
                                        </p>

                                        <div style={{ marginTop: 'auto' }}>
                                            <motion.button
                                                whileHover={{ scale: 1.05, backgroundColor: 'var(--primary-color)', color: '#000' }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setSelectedExperience(exp)} style={{
                                                    padding: '0.6rem 1.5rem', border: '1px solid var(--primary-color)', color: 'var(--primary-color)',
                                                    fontSize: '0.85rem', letterSpacing: '0.1em', background: 'transparent', textTransform: 'uppercase', fontWeight: 600,
                                                    cursor: 'pointer', borderRadius: 'var(--border-radius-sm)',
                                                    boxShadow: 'none'
                                                }}
                                            >
                                                View Details
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </motion.div>
                    )}

                    {/* Tab Content: Projects */}
                    {activeTab === 'projects' && (
                        <motion.div
                            key="projects-tab"
                            variants={tabContentVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '3rem', paddingTop: '1rem' }}
                        >
                            {projLoading ? (
                                <p style={{ color: 'var(--text-muted)' }}>Loading projects...</p>
                            ) : (
                                projects.map((project, index) => (
                                    <motion.div key={project.id} variants={{
                                        hidden: { opacity: 0, y: 20, scale: 0.95 },
                                        visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } },
                                        hover: { scale: 1.02, y: -8, boxShadow: '0 20px 40px rgba(0, 229, 255, 0.15)', borderColor: 'var(--primary-color)' }
                                    }}
                                        whileHover="hover"
                                        className="glass-panel tab-grid-proj" style={{
                                            position: 'relative', overflow: 'hidden', padding: 0, border: '1px solid var(--border-color)',
                                            display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr',
                                            alignItems: 'stretch',
                                            transition: 'border-color 0.3s'
                                        }}>
                                        <div style={{ background: '#111', aspectRatio: '1 / 1', position: 'relative', overflow: 'hidden', minHeight: '100%' }}>
                                            {project.image_url ? (
                                                <motion.img
                                                    variants={{
                                                        hover: { scale: 1.05, filter: 'grayscale(0%)' }
                                                    }}
                                                    transition={{ duration: 0.5 }}
                                                    src={project.image_url} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
                                                />
                                            ) : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #111, #222)' }}></div>}
                                        </div>
                                        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                                0{index + 1}
                                            </div>
                                            <h3 style={{ fontSize: '2rem', margin: '0 0 1rem 0', fontWeight: 800, color: '#fff', textTransform: 'uppercase' }}>{project.title}</h3>
                                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                {project.description}
                                            </p>

                                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                                {Array.isArray(project.tech) && project.tech.map((t, i) => (
                                                    <span key={i} style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', borderRadius: 'var(--border-radius-sm)' }}>{t}</span>
                                                ))}
                                            </div>

                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setSelectedProject(project)} style={{ alignSelf: 'flex-start', padding: '0.8rem 1.5rem', fontSize: '0.8rem' }}>
                                                Explore Scope
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {/* Experience Modal */}
                {selectedExperience && (
                    <motion.div
                        variants={modalOverlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, padding: '1.5rem'
                        }} onClick={() => setSelectedExperience(null)}>
                        <motion.div
                            variants={modalContentVariants}
                            className="glass-panel" style={{ position: 'relative', maxWidth: '800px', width: '100%', maxHeight: '90vh', padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#050505', borderRadius: 'var(--border-radius-lg)', border: '1px solid #333' }} onClick={e => e.stopPropagation()}>

                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: 'var(--primary-color)', color: '#000' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedExperience(null)} style={{
                                    position: 'absolute', top: '1.5rem', right: '1.5rem', width: '40px', height: '40px', borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '1.2rem',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10,
                                    padding: 0, boxShadow: 'none'
                                }}>✕</motion.button>

                            <div style={{ overflowY: 'auto', padding: 'clamp(2rem, 5vw, 4rem)', paddingBottom: '3rem' }}>
                                <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid #222', paddingBottom: '2.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                        {selectedExperience.image_url && (
                                            <div style={{ width: '50px', height: '50px', background: '#fff', borderRadius: '8px', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <img src={selectedExperience.image_url} alt={selectedExperience.company} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                            </div>
                                        )}
                                        <div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '0.3rem' }}>
                                                {selectedExperience.period}
                                            </div>
                                            <div style={{ fontSize: '1.2rem', color: '#aaa', fontWeight: 500 }}>
                                                {selectedExperience.company}
                                            </div>
                                        </div>
                                    </div>
                                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, margin: 0, lineHeight: 1.2, color: '#fff' }}>{selectedExperience.role}</h2>
                                </div>

                                <div style={{ color: '#ccc', lineHeight: '1.8', fontSize: '1.1rem' }}>
                                    {selectedExperience.description.split('\n').map((paragraph, idx) => <p key={idx} style={{ marginBottom: paragraph.trim() ? '1.5rem' : '0' }}>{paragraph}</p>)}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {/* Project Modal */}
                {selectedProject && (
                    <motion.div
                        variants={modalOverlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, padding: '1.5rem'
                        }} onClick={() => setSelectedProject(null)}>
                        <motion.div
                            variants={modalContentVariants}
                            className="glass-panel" style={{ position: 'relative', maxWidth: '900px', width: '100%', maxHeight: '90vh', display: 'flex', flexDirection: 'column', background: '#050505', overflow: 'hidden', borderRadius: 'var(--border-radius-lg)', border: '1px solid #333', padding: 0 }} onClick={e => e.stopPropagation()}>

                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: 'var(--primary-color)', color: '#000' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedProject(null)} style={{
                                    position: 'absolute', top: '1.5rem', right: '1.5rem', width: '40px', height: '40px', borderRadius: '50%',
                                    background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '1.2rem',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10,
                                    padding: 0, boxShadow: 'none'
                                }}>✕</motion.button>

                            <div style={{ overflowY: 'auto' }}>
                                <div style={{ height: '350px', background: '#111', position: 'relative' }}>
                                    {selectedProject.image_url ? (
                                        <img src={selectedProject.image_url} alt={selectedProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #111, #222)' }}></div>
                                    )}
                                </div>

                                <div style={{ padding: 'clamp(2rem, 5vw, 4rem)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '2rem' }}>
                                        <div>
                                            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', margin: '0 0 1rem 0', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.1 }}>{selectedProject.title}</h2>
                                            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                                                {Array.isArray(selectedProject.tech) && selectedProject.tech.map((t, i) => <span key={i} style={{ fontSize: '0.75rem', padding: '0.4rem 1rem', background: 'rgba(255,255,255,0.05)', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.05em', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>{t}</span>)}
                                            </div>
                                        </div>
                                        {selectedProject.link && (
                                            <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    style={{ padding: '0.8rem 2rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary-color)', color: '#000', border: 'none', fontWeight: 600 }}>
                                                    Visit App <span style={{ fontSize: '1.2rem' }}>↗</span>
                                                </motion.button>
                                            </a>
                                        )}
                                    </div>

                                    <div style={{ color: '#ccc', lineHeight: '1.8', fontSize: '1.1rem', marginTop: '2rem', borderTop: '1px solid #222', paddingTop: '2.5rem' }}>
                                        {selectedProject.description.split('\n').map((paragraph, idx) => <p key={idx} style={{ marginBottom: paragraph.trim() ? '1.5rem' : '0' }}>{paragraph}</p>)}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export function Contact() {
    const [showCopyPopup, setShowCopyPopup] = useState(false);
    const [showCvModal, setShowCvModal] = useState(false);
    const [cvData, setCvData] = useState(null);
    const [cvLoading, setCvLoading] = useState(true);
    const email = "indranugrahaputra09@gmail.com";

    useEffect(() => {
        let isMounted = true;
        fetch(`${import.meta.env.VITE_API_URL || ''}/api/cv`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                if (isMounted) {
                    if (Array.isArray(data) && data.length > 0) {
                        setCvData(data[0]);
                    }
                    setCvLoading(false);
                }
            })
            .catch(err => {
                console.error('Error fetching CV:', err);
                if (isMounted) setCvLoading(false);
            });

        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        if (showCvModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showCvModal]);

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

    const modalOverlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    };

    const modalContentVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
        exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } }
    };

    return (
        <section id="contact" className="section-padding" style={{ position: 'relative', paddingBottom: '4rem' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {/* Horizontal Contact Banner */}
                    <div className="contact-flex glass-panel" style={{
                        padding: '3rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem'
                    }}>
                        <div>
                            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1, margin: '0 0 0.5rem 0' }}>
                                Let's <span style={{ color: 'var(--primary-color)' }}>Talk</span>
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '400px', lineHeight: 1.6, margin: 0 }}>
                                Ready to start your next project or have a brilliant idea? I'm currently available for new opportunities.
                            </p>
                        </div>

                        <a href={`mailto:${email}`} style={{ textDecoration: 'none' }} onClick={handleCopyEmail}>
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: 'var(--primary-color)', color: '#000' }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '1rem 2.5rem',
                                    fontSize: '1rem',
                                    background: 'transparent',
                                    border: '1px solid var(--primary-color)',
                                    color: 'var(--primary-color)'
                                }}>
                                Drop Me An Email
                            </motion.button>
                        </a>
                    </div>

                    {/* Minimalist Lower Bar: Socials & CV */}
                    <div className="contact-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', flexWrap: 'wrap', gap: '2rem' }}>
                        <div className="social-flex" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                            <span style={{ textTransform: 'uppercase', color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>Socials //</span>
                            <motion.a whileHover={{ color: 'var(--primary-color)' }} href="https://www.instagram.com/kyovin_/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Instagram</motion.a>
                            <motion.a whileHover={{ color: 'var(--primary-color)' }} href="https://www.linkedin.com/in/indra-nugraha-putra-783853331/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>LinkedIn</motion.a>
                            <motion.a whileHover={{ color: 'var(--primary-color)' }} href="https://github.com/IndraNP06" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>GitHub</motion.a>
                        </div>

                        <motion.button
                            whileHover={{ color: '#fff', borderColor: '#fff' }}
                            onClick={() => setShowCvModal(true)}
                            style={{
                                padding: '0', paddingBottom: '2px', border: 'none', borderBottom: '1px solid var(--primary-color)',
                                background: 'transparent', color: 'var(--primary-color)', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em',
                                boxShadow: 'none'
                            }}
                        >
                            View Full CV &rarr;
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Configurable Copy Notification Popup */}
            <AnimatePresence>
                {showCopyPopup && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                        style={{
                            position: 'absolute', top: '20%', left: '50%',
                            background: 'var(--primary-color)', color: '#000', padding: '0.5rem 1rem', borderRadius: 'var(--border-radius-sm)',
                            zIndex: 10, textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.05em'
                        }}>
                        Email Copied!
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {/* CV PDF Modal Minimalist */}
                {showCvModal && (
                    <motion.div
                        variants={modalOverlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000,
                            padding: '1.5rem'
                        }} onClick={() => setShowCvModal(false)}>
                        <motion.div
                            variants={modalContentVariants}
                            className="glass-panel"
                            style={{
                                maxWidth: '1000px', width: '100%', height: '85vh', position: 'relative',
                                padding: '0', display: 'flex', flexDirection: 'column', background: '#050505',
                                border: '1px solid #333', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{
                                padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                borderBottom: '1px solid #222'
                            }}>
                                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Curriculum Vitae</h3>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <motion.a
                                        whileHover={{ color: '#fff' }}
                                        href={activeCvUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: 'var(--primary-color)', textDecoration: 'none', fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em'
                                        }}
                                    >
                                        Extern. Link ↗
                                    </motion.a>
                                    <motion.button
                                        whileHover={{ scale: 1.1, backgroundColor: 'var(--primary-color)', color: '#000' }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setShowCvModal(false)}
                                        style={{
                                            width: '32px', height: '32px', borderRadius: '50%',
                                            background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '1rem',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                            padding: 0, boxShadow: 'none'
                                        }}
                                    >
                                        ✕
                                    </motion.button>
                                </div>
                            </div>

                            <div style={{ flexGrow: 1, width: '100%', background: '#111', position: 'relative' }}>
                                <div style={{
                                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: '#555', zIndex: 0
                                }}>
                                    <span style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>LOADING DOCUMENT...</span>
                                </div>

                                <iframe
                                    src={getIframeUrl(activeCvUrl)}
                                    width="100%"
                                    height="100%"
                                    allow="autoplay"
                                    style={{ border: 'none', position: 'relative', zIndex: 1 }}
                                    title="Curriculum Vitae"
                                ></iframe>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export function Footer() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
        >
            <footer style={{ padding: '2rem 0', borderTop: '1px solid var(--border-color)', textAlign: 'center', color: '#666' }}>
                <div className="container">
                    <p style={{ letterSpacing: '0.05em' }}>&copy; {new Date().getFullYear()} The Dri.dev. All rights reserved.</p>
                </div>
            </footer>
        </motion.div>
    );
}
