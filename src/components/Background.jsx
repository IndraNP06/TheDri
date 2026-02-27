import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function Background() {
    // Performant mouse tracking bypassing React state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 50 };
    const followerX = useSpring(useTransform(mouseX, [0, window.innerWidth], [-150, window.innerWidth - 150]), springConfig);
    const followerY = useSpring(useTransform(mouseY, [0, window.innerHeight], [-150, window.innerHeight - 150]), springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    // Create a series of elegant floating orbs (Reduced count for performance)
    const particles = React.useMemo(() => Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        size: Math.random() * 80 + 20, // 20px to 100px
        x: Math.random() * 100, // percentage
        y: Math.random() * 100, // percentage
        duration: Math.random() * 20 + 15, // 15s to 35s
        delay: Math.random() * 5
    })), []);

    return (
        <div className="fixed-background" style={{ overflow: 'hidden', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
            {/* Base gradient spots */}
            <div className="glow-spot" style={{ top: '-10%', left: '-10%', width: '50vmax', height: '50vmax' }}></div>
            <div className="glow-spot" style={{ bottom: '-10%', right: '-10%', width: '40vmax', height: '40vmax', animationDelay: '-5s' }}></div>

            {/* Dynamic floating particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="floating-orb"
                    initial={{
                        x: `${p.x}vw`,
                        y: `${p.y}vh`,
                        opacity: 0
                    }}
                    animate={{
                        x: [`${p.x}vw`, `${(p.x + 20) % 100}vw`, `${(p.x - 10) % 100}vw`, `${p.x}vw`],
                        y: [`${p.y}vh`, `${(p.y - 20) % 100}vh`, `${(p.y + 15) % 100}vh`, `${p.y}vh`],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: p.duration,
                        ease: "linear",
                        repeat: Infinity,
                        delay: p.delay
                    }}
                    style={{
                        position: 'absolute',
                        width: p.size,
                        height: p.size,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 70%)',
                        // Removed expensive filter: blur()
                    }}
                />
            ))}

            {/* Subtle Interactive Mouse Follower */}
            <motion.div
                className="mouse-follower"
                style={{
                    x: followerX,
                    y: followerY,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0, 229, 255, 0.05) 0%, transparent 70%)',
                    // Removed heavy filter: blur(40px) that was causing lag
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />
        </div>
    );
}
