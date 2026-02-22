import { Typewriter } from 'react-simple-typewriter';

export function Hero() {
    return (
        <section id="home" className="section-padding" style={{ paddingBottom: '2rem', minHeight: '80vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
            <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '15vh' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', maxWidth: '1000px' }}>

                    <div className="text-reveal-wrapper">
                        <div className="text-reveal-inner" style={{ transform: 'translateY(0)' /* Fallback in case class isn't triggered */ }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1rem',
                                marginBottom: '2rem'
                            }}>
                                <span style={{ width: '40px', height: '2px', background: 'var(--primary-color)' }}></span>
                                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-color)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                                    Full Stack & Web3 Developer
                                </span>
                            </div>
                        </div>
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(4rem, 10vw, 8rem)',
                        lineHeight: 0.95,
                        letterSpacing: '-0.04em',
                        fontWeight: 800,
                        margin: 0,
                        textTransform: 'uppercase'
                    }}>
                        <div className="text-reveal-wrapper" style={{ display: 'block' }}>
                            <div className="text-reveal-inner revealed">Hi, I'm</div>
                        </div>
                        <div className="text-reveal-wrapper" style={{ display: 'block' }}>
                            <div className="text-reveal-inner revealed" style={{ transitionDelay: '0.1s', color: 'var(--primary-color)' }}>
                                The Dri.
                            </div>
                        </div>
                    </h1>

                    <div style={{ marginTop: '2rem' }} className="animate-fade-in delay-200">
                        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#ffffff', fontWeight: 500, margin: '0 0 1.5rem 0', opacity: 0.9 }}>
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
                            I transform complex ideas into robust, high-performance web applications. Specializing in modern frontend architecture and intuitive minimalist design.
                        </p>

                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                            <a href="#projects">
                                <button style={{ background: '#fff', color: '#000', borderColor: '#fff' }}>
                                    View Work
                                </button>
                            </a>
                            <a href="#contact">
                                <button>
                                    Let's Talk
                                </button>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
