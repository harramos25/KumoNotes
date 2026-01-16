import React from 'react';
import { RefreshCw, Download, Share2 } from 'lucide-react';

interface ControlsProps {
    onNewNote: () => void;
    onDownload: () => void;
    onShare: () => void;
    aestheticMode: boolean; // Kept for prop compatibility
    setAestheticMode: (value: boolean) => void; // Kept for prop compatibility
}

const Controls: React.FC<ControlsProps> = ({ onNewNote, onDownload, onShare }) => {
    return (
        <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md p-3 rounded-full shadow-lg border border-white/50">
            {/* New Note Button (Refresh) */}
            <button
                onClick={onNewNote}
                className="p-4 bg-white text-blue-400 rounded-full shadow-sm hover:scale-110 hover:shadow-md transition-all active:scale-95"
                title="New Note"
            >
                <RefreshCw size={24} />
            </button>

            {/* Download Button */}
            <button
                onClick={onDownload}
                className="p-4 bg-pink-100 text-pink-500 rounded-full shadow-sm hover:scale-110 hover:shadow-md transition-all active:scale-95"
                title="Save Story"
            >
                <Download size={24} />
            </button>

            {/* Share Button */}
            <button
                onClick={onShare}
                className="p-4 bg-blue-100 text-blue-500 rounded-full shadow-sm hover:scale-110 hover:shadow-md transition-all active:scale-95"
                title="Share"
            >
                <Share2 size={24} />
            </button>
        </div>
    );
};

export default Controls;
