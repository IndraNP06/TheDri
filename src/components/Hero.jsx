import { Typewriter } from 'react-simple-typewriter';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export function Hero() {
    // Highly Performant Mouse Tracking (Bypasses React State)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 50 };
    const parallaxX = useSpring(useTransform(mouseX, [0, window.innerWidth], [-15, 15]), springConfig);
    const parallaxY = useSpring(useTransform(mouseY, [0, window.innerHeight], [-15, 15]), springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        },
    };

    return (
        <section id="home" className="section-padding" style={{ paddingBottom: '2rem', minHeight: '80vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>

            {/* Floating Live Decorations */}
            <motion.div
                animate={{ rotate: 360, y: [0, -20, 0] }}
                transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
                style={{ position: 'absolute', top: '20%', right: '15%', width: '100px', height: '100px', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '20%', zIndex: 0 }}
            />
            <motion.div
                animate={{ rotate: -360, y: [0, 30, 0], x: [0, 20, 0] }}
                transition={{ rotate: { duration: 25, repeat: Infinity, ease: 'linear' }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }, x: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
                style={{ position: 'absolute', bottom: '25%', left: '10%', width: '60px', height: '60px', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '50%', zIndex: 0 }}
            />
            <motion.div
                animate={{ y: [0, -40, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: '40%', left: '40%', width: '6px', height: '6px', background: 'var(--primary-color)', borderRadius: '50%', zIndex: 0 }}
            />

            <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '15vh', width: '100%' }}>
                <motion.div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        gap: '3rem',
                        maxWidth: '1000px',
                        x: parallaxX,
                        y: parallaxY
                    }}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >

                    <motion.div variants={itemVariants}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '1rem',
                            marginBottom: '1rem' // Adjusted margin
                        }}>
                            <span style={{ width: '40px', height: '2px', background: 'var(--primary-color)' }}></span>
                            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-color)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                                Welcome Everyone
                            </span>
                        </div>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        style={{
                            fontSize: 'clamp(4rem, 10vw, 8rem)',
                            lineHeight: 0.95,
                            letterSpacing: '-0.04em',
                            fontWeight: 800,
                            margin: 0,
                            textTransform: 'uppercase'
                        }}
                    >
                        <div>Hi, I'm</div>
                        <motion.div
                            style={{ color: 'var(--primary-color)', display: 'inline-block' }}
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
                            className="gradient-text"
                        >
                            The Dri.
                        </motion.div>
                    </motion.h1>

                    <motion.div variants={itemVariants} style={{ marginTop: '1rem' }}>
                        <h2 className="typing-container" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#ffffff', fontWeight: 500, margin: '0 0 1.5rem 0', opacity: 0.9 }}>
                            <Typewriter
                                words={['Building Digital Experiences.', 'Crafting Modern Web3 Apps.', 'Designing User Interfaces.']}
                                loop={0}
                                cursor
                                cursorStyle='_'
                                typeSpeed={50}
                                deleteSpeed={30}
                                delaySpeed={2000}
                            />
                        </h2>

                        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '500px', lineHeight: 1.8, fontWeight: 400, marginBottom: '3rem' }}>
                            I blend creative design with clean code to build engaging digital experiences. Specializing in frontend development, intuitive UI/UX, and impactful graphic design.
                        </p>

                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                            <a href="#portfolio">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255,255,255,0.3)' }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ background: '#fff', color: '#000', borderWidth: '1px', borderStyle: 'solid', borderColor: '#fff' }}
                                >
                                    View Work
                                </motion.button>
                            </a>
                            <a href="#contact">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 229, 255, 0.3)' }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--primary-color)' }}
                                >
                                    Let's Talk
                                </motion.button>
                            </a>
                        </div>
                    </motion.div>

                </motion.div>
            </div>

            {/* Subtle Scroll Indicator (Hidden on small Heights/Mobiles to prevent overlap) */}
            <motion.div
                className="hero-scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    display: window.innerHeight < 700 || window.innerWidth < 768 ? 'none' : 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}
            >
                <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ fontSize: '0.75rem', fontWeight: 600, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.3em' }}
                >
                    Scroll
                </motion.span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--primary-color), transparent)' }}
                />
            </motion.div>
        </section>
    );
}
