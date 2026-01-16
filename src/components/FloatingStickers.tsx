import React, { useMemo } from 'react';

// Use Vite's glob import to get all sticker and particle images
const stickerModules = import.meta.glob('../assets/sticker_pack*.png', { eager: true, import: 'default' });
const particleModules = import.meta.glob('../assets/particles*.png', { eager: true, import: 'default' });

const stickers = Object.values(stickerModules) as string[];
const particles = Object.values(particleModules) as string[];

const allImages = [...stickers, ...particles];

const FloatingStickers: React.FC = () => {
    // Generate random items on mount
    const items = useMemo(() => {
        // If no images found (fallback), return empty or Handle
        if (allImages.length === 0) return [];

        return Array.from({ length: 30 }).map((_, i) => {
            const img = allImages[Math.floor(Math.random() * allImages.length)];
            return {
                id: i,
                image: img,
                left: Math.random() * 100, // random position
                top: Math.random() * 100,
                delay: Math.random() * 8,
                duration: 15 + Math.random() * 15, // Slow float
                scale: 0.3 + Math.random() * 0.4, // Random size
                rotation: Math.random() * 360, // Random initial rotation
                opacity: 0.6 + Math.random() * 0.4
            };
        });
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="absolute animate-float"
                    style={{
                        left: `${item.left}%`,
                        top: `${item.top}%`,
                        animationDuration: `${item.duration}s`,
                        animationDelay: `-${item.delay}s`,
                    }}
                >
                    <img
                        src={item.image}
                        alt=""
                        className="select-none drop-shadow-sm"
                        style={{
                            transform: `scale(${item.scale}) rotate(${item.rotation}deg)`,
                            opacity: item.opacity,
                            width: '64px',
                            height: 'auto'
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default FloatingStickers;
