import React from 'react';

const FloatingStickers: React.FC = () => {
    // Generate random positions and delays for a few stickers
    const stickers = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        type: ['cloud', 'star', 'heart', 'sparkle'][Math.floor(Math.random() * 4)],
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10,
        scale: 0.5 + Math.random() * 0.5
    }));

    const renderIcon = (type: string) => {
        switch (type) {
            case 'cloud':
                return (
                    <svg viewBox="0 0 24 24" fill="white" className="w-12 h-12 opacity-40 drop-shadow-lg">
                        <path d="M17.5,19c-0.83,0-1.5-0.67-1.5-1.5c0-0.83,0.67-1.5,1.5-1.5c0.83,0,1.5,0.67,1.5,1.5C19,18.33,18.33,19,17.5,19z M6.5,19 C5.67,19,5,18.33,5,17.5c0-0.83,0.67-1.5,1.5-1.5c0.83,0,1.5,0.67,1.5,1.5C8,18.33,7.33,19,6.5,19z M6.5,14C5.67,14,5,13.33,5,12.5 c0-0.83,0.67-1.5,1.5-1.5c0.83,0,1.5,0.67,1.5,1.5C8,13.33,7.33,14,6.5,14z M19.07,13.88L19.07,13.88c0.23-1.89-1.26-3.79-3.32-4.23 c-0.64-2.86-3.41-4.71-6.28-4.2C7.39,5.82,5.2,8.04,5.03,10.93c-2.31,0.26-4.04,2.37-3.87,4.72c0.16,2.2,1.96,3.95,4.16,3.98 c0.98,0.01,2.02,0.04,2.95,0.02c1.78-0.03,3.31-0.03,5.18,0.02c1.94,0.06,3.87,0.11,5.65-1.63C20.52,16.73,20.56,15.17,19.07,13.88 z" />
                    </svg>
                );
            case 'star':
                return (
                    <svg viewBox="0 0 24 24" fill="#FFD700" className="w-8 h-8 opacity-40 drop-shadow-md">
                        <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
                    </svg>
                );
            case 'heart':
                return (
                    <svg viewBox="0 0 24 24" fill="#FFB6C1" className="w-8 h-8 opacity-40 drop-shadow-md">
                        <path d="M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z" />
                    </svg>
                );
            case 'sparkle':
                return (
                    <svg viewBox="0 0 24 24" fill="#E0F7FA" className="w-6 h-6 opacity-60 drop-shadow-sm">
                        <path d="M12,2L9,9l-7,3l7,3l3,7l3-7l7-3l-7-3L12,2z" />
                    </svg>
                );
            default: return null;
        }
    }

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {stickers.map((s, index) => (
                <div
                    key={index}
                    className="absolute animate-float"
                    style={{
                        left: `${s.left}%`,
                        top: `${s.top}%`,
                        animationDuration: `${s.duration}s`,
                        animationDelay: `-${s.delay}s`,
                        transform: `scale(${s.scale})`
                    }}
                >
                    {renderIcon(s.type)}
                </div>
            ))}
        </div>
    );
};

export default FloatingStickers;
