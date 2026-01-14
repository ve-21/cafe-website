import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function ScrollReveal({ children, className = "" }) {
    const ref = useRef(null);

    // Track position relative to viewport
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Smoother spring for cinematic feel without the jitter
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 30,
        restDelta: 0.001
    });

    // Cinematic Fate Style: [Entry, Solid, Solid, Exit]
    const opacity = useTransform(smoothProgress, [0.05, 0.2, 0.8, 0.95], [0, 1, 1, 0]);
    const blur = useTransform(smoothProgress, [0.05, 0.2, 0.8, 0.95], [8, 0, 0, 8]);
    const y = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [40, 0, 0, -40]);
    const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.97, 1, 0.97]);

    return (
        <motion.div
            ref={ref}
            style={{
                opacity,
                filter: useTransform(blur, b => `blur(${b}px)`),
                transform: useTransform(y, val => `translateY(${val}px)`),
                scale
            }}
            className={`will-change-[opacity,transform,filter] ${className}`}
        >
            {children}
        </motion.div>
    );
}
