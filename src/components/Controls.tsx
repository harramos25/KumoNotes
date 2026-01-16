import React from 'react';
import { Download, Share2 } from 'lucide-react';

export interface ControlsProps {
    onDownload: () => void;
    onShare: () => void;
    aestheticMode: boolean; // Kept for prop compatibility
    setAestheticMode: (value: boolean) => void; // Kept for prop compatibility
    disabled?: boolean;
}

const Controls: React.FC<ControlsProps> = ({ onDownload, onShare, disabled = false }) => {
    return (
        <div className={`controls-row transition-opacity duration-300 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
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