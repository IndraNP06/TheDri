import { Typewriter } from 'react-simple-typewriter';

export function Hero() {
    return (
        <section id="home" className="section-padding" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div className="animate-fade-in">
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '100px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        marginBottom: '2rem',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}>
                        <span style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 10px #22c55e' }}></span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#ccc', letterSpacing: '0.5px' }}>Full Stack & Web3 Developer</span>
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(3.5rem, 6vw, 6rem)',
                        marginBottom: '1.5rem',
                        lineHeight: 1,
                        letterSpacing: '-2px',
                        fontWeight: 700
                    }}>
                        Hi, I'm <span className="gradient-text">The Dri.</span> <br />
                        <span style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', color: '#fff', fontWeight: 600, display: 'block', marginTop: '0.5rem', opacity: 0.9 }}>
                            <Typewriter
                                words={['Building Digital Experiences', 'Crafting Modern Web3 Apps', 'Designing User Interfaces']}
                                loop={0}
                                cursor
                                cursorStyle='_'
                                typeSpeed={50}
                                deleteSpeed={30}
                                delaySpeed={2000}
                            />
                        </span>
                    </h1>

                    <p style={{ fontSize: '1.2rem', color: '#999', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: 1.8 }}>
                        I transform complex ideas into robust, high-performance web applications. Specializing in modern frontend architecture and intuitive UI/UX design.
                    </p>

                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <a href="#projects" style={{ textDecoration: 'none' }}>
                            <button style={{
                                background: 'white',
                                color: 'black',
                                fontWeight: 700,
                                border: 'none',
                                padding: '1rem 2.5rem'
                            }}>
                                View Work
                            </button>
                        </a>
                        <a href="#contact" style={{ textDecoration: 'none' }}>
                            <button style={{
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'white',
                                backdropFilter: 'blur(5px)'
                            }}>
                                Contact Me
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
