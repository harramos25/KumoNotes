import React from 'react';
import { RefreshCw, Download, Share2 } from 'lucide-react';

export interface ControlsProps {
    onNewNote: () => void;
    onDownload: () => void;
    onShare: () => void;
    aestheticMode: boolean; // Kept for prop compatibility
    setAestheticMode: (value: boolean) => void; // Kept for prop compatibility
    disabled?: boolean;
}

const Controls: React.FC<ControlsProps> = ({ onNewNote, onDownload, onShare, disabled = false }) => {
    return (
        <div className={`flex items-center gap-4 bg-white/40 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/50 transition-opacity duration-300 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            {/* New Note Button (Refresh) */}
            <button
                onClick={onNewNote}
                disabled={disabled}
                className="control-btn"
                title="New Note"
            >
                <RefreshCw size={20} />
            </button>

            {/* Download Button */}
            <button
                onClick={onDownload}
                disabled={disabled}
                className="control-btn"
                title="Save Story"
            >
                <Download size={20} />
            </button>

            {/* Share Button */}
            <button
                onClick={onShare}
                disabled={disabled}
                className="control-btn"
                title="Share"
            >
                <Share2 size={20} />
            </button>
        </div>
    );
};

export default Controls;
