import { useMemo } from 'react';
import { motion } from 'framer-motion';

// Dynamically import all stickers and particles
const stickerModules = import.meta.glob('../assets/sticker_pack*.png', { eager: true, import: 'default' });
const particleModules = import.meta.glob('../assets/particles*.png', { eager: true, import: 'default' });

const stickersAssets = Object.values(stickerModules) as string[];
const particlesAssets = Object.values(particleModules) as string[];

const allImages = [...stickersAssets, ...particlesAssets];

export const FloatingStickers = () => {
    const stickers = useMemo(() => {
        if (allImages.length === 0) return [];

        // Create a dense field of stickers
        return Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            image: allImages[Math.floor(Math.random() * allImages.length)],
            // Random starting positions
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            // Random delay for animation start
            delay: Math.random() * 5,
            scale: 0.5 + Math.random() * 0.5
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {stickers.map((s) => (
                <motion.div
                    key={s.id}
                    className="absolute opacity-60 pointer-events-none"
                    style={{ left: s.x, top: s.y }} // Initial position
                    initial={{ y: 0, x: 0 }}
                    animate={{
                        y: [0, -20, 0], // Bobbing
                        x: [0, 10, 0],  // Drifting
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5, // Randomize timing
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: s.delay
                    }}
                >
                    <img
                        src={s.image}
                        alt=""
                        style={{
                            transform: `scale(${s.scale})`,
                            width: '64px',
                            height: 'auto'
                        }}
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingStickers;
