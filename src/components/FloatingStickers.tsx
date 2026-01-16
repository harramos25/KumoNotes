import React, { useEffect, useState } from "react";

// Dynamically import assets using Vite's glob feature to avoid manual file moving
const stickerModules = import.meta.glob('../assets/sticker_pack*.png', { eager: true, import: 'default' });
const particleModules = import.meta.glob('../assets/particles*.png', { eager: true, import: 'default' });

const stickerAssets = Object.values(stickerModules) as string[];
const particleAssets = Object.values(particleModules) as string[];

type StickerItem = {
    id: string;
    src: string;
    top: number;   // %
    left: number;  // %
    size: number;  // px
    opacity: number;
    duration: number; // seconds
    delay: number;    // seconds
    drift: number;    // px
    rotate: number;   // deg
};

function rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function pickMany<T>(arr: T[], count: number) {
    const copy = [...arr];
    const out: T[] = [];
    while (out.length < count && copy.length) {
        const idx = Math.floor(Math.random() * copy.length);
        out.push(copy.splice(idx, 1)[0]);
    }
    return out;
}

export const FloatingStickers = ({
    stickerCount = 6,
    particleCount = 5, // Increased slightly for atmosphere
    seedKey,
}: {
    stickerCount?: number;
    particleCount?: number;
    seedKey?: string | number;
}) => {
    const [items, setItems] = useState<StickerItem[]>([]);

    useEffect(() => {
        // Basic safety: if no assets found, don't crash
        if (stickerAssets.length === 0 && particleAssets.length === 0) return;

        // Pick assets
        const chosenStickers = pickMany(stickerAssets, stickerCount);
        const chosenParticles = pickMany(particleAssets, particleCount);

        const makeItem = (src: string, kind: "sticker" | "particle", index: number): StickerItem => {
            const isParticle = kind === "particle";

            // Placement Logic: Keep away from center (Safe Zone)
            const placeAwayFromCenter = () => {
                let top = rand(4, 92);
                let left = rand(4, 92);

                // Center Exclusion Zone: 30% to 70%
                const inSafeZone = top > 25 && top < 75 && left > 20 && left < 80;

                if (inSafeZone) {
                    // Push to edges if landed in center
                    if (left < 50) left = rand(2, 18);
                    else left = rand(82, 98);
                }
                return { top, left };
            };

            const { top, left } = placeAwayFromCenter();

            return {
                id: `${kind}-${index}-${Math.random()}`,
                src,
                top,
                left,
                size: isParticle ? rand(14, 28) : rand(44, 85),
                opacity: isParticle ? rand(0.15, 0.3) : rand(0.2, 0.35),
                duration: rand(10, 20), // Slower, more calming drift
                delay: rand(0, 5),
                drift: rand(10, 25),
                rotate: rand(-15, 15),
            };
        };

        const next: StickerItem[] = [
            ...chosenStickers.map((src, i) => makeItem(src, "sticker", i)),
            ...chosenParticles.map((src, i) => makeItem(src, "particle", i)),
        ];

        setItems(next);
    }, [stickerCount, particleCount, seedKey]);

    return (
        <div className="sticker-layer" aria-hidden="true">
            {items.map((it) => (
                <img
                    key={it.id}
                    src={it.src}
                    className="sticker"
                    style={
                        {
                            top: `${it.top}%`,
                            left: `${it.left}%`,
                            width: `${it.size}px`,
                            opacity: it.opacity,
                            ["--dur" as any]: `${it.duration}s`,
                            ["--delay" as any]: `${it.delay}s`,
                            ["--drift" as any]: `${it.drift}px`,
                            ["--rot" as any]: `${it.rotate}deg`,
                        } as React.CSSProperties
                    }
                    alt=""
                    draggable={false}
                />
            ))}
        </div>
    );
};

export default FloatingStickers;
