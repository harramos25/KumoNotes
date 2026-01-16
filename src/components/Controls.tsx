import React from 'react';

interface ControlsProps {
    onNewNote: () => void;
    onDownload: () => void;
    onShare: () => void;
    aestheticMode: boolean;
    setAestheticMode: (mode: boolean) => void;
}

const Controls: React.FC<ControlsProps> = ({ onNewNote, onDownload, onShare, aestheticMode, setAestheticMode }) => {
    return (
        <div className="flex flex-col items-center gap-4 p-4 z-50 w-full max-w-md mx-auto">

            {/* Main Actions Row */}
            <div className="flex flex-wrap justify-center gap-3 w-full">
                {/* New Note Button */}
                <button
                    onClick={onNewNote}
                    className="flex-1 min-w-[140px] px-6 py-3 bg-white text-gray-700 rounded-full font-baloo font-bold shadow-lg hover:scale-105 hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base"
                >
                    <span>✨</span> New Note
                </button>

                {/* Download Button */}
                <button
                    onClick={onDownload}
                    className="flex-1 min-w-[140px] px-6 py-3 bg-blue-400 text-white rounded-full font-baloo font-bold shadow-lg hover:scale-105 hover:bg-blue-500 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base"
                >
                    <span>📥</span> Save Story
                </button>
            </div>

            {/* Secondary Row */}
            <div className="flex flex-wrap justify-center items-center gap-4 w-full">
                {/* Share Button (Mobile mostly) */}
                <button
                    onClick={onShare}
                    className="p-3 bg-white/80 backdrop-blur rounded-full text-gray-600 shadow-md hover:scale-110 transition-all"
                    title="Share"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                </button>

                {/* Aesthetic Toggle */}
                <label className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur rounded-full cursor-pointer shadow-sm hover:bg-white/80 transition-all select-none">
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Aesthetic Mode</span>
                    <div className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            checked={aestheticMode}
                            onChange={(e) => setAestheticMode(e.target.checked)}
                        />
                        <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-400"></div>
                    </div>
                </label>
            </div>

        </div>
    );
};

export default Controls;
