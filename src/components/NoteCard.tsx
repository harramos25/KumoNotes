import React from 'react';
import mascot from '../assets/mascot.png';

interface Note {
  id: number;
  text: string;
  category: string;
  tags: string[];
}

interface NoteCardProps {
  note: Note;
  aestheticMode: boolean;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, aestheticMode, cardRef }) => {
  return (
    <div
      ref={cardRef}
      className={`relative w-auto h-auto max-w-full max-h-[75vh] md:max-h-[85vh] aspect-[9/16] p-6 md:p-10 flex flex-col items-center justify-center text-center transition-all duration-500 ease-out transform ${aestheticMode ? 'glass-card' : 'solid-card'}`}
      style={{
        // Removed fixed width 1080px to prevent layout breakage on screens.
        // We rely on html2canvas scale for high-res export.
        boxShadow: aestheticMode ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)' : '0 10px 15px -3px rgba(0,0,0,0.1)',
        border: aestheticMode ? '1px solid rgba(255, 255, 255, 0.18)' : 'none',
        background: aestheticMode ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: aestheticMode ? 'blur(10px)' : 'none',
        borderRadius: '24px', // standardized
      }}
    >
      {/* Floating elements inside card?? No, user asked for stickers "slowly float... using CSS keyframes". */}

      <div className="flex-1 flex flex-col items-center justify-center z-10 w-full">
        <span className="uppercase tracking-widest text-xs mb-4 font-bold opacity-70" style={{ color: '#5D6D7E' }}>
          {note.category}
        </span>

        <h1 className="font-baloo text-3xl md:text-4xl lg:text-5xl mb-6 font-bold leading-tight" style={{ color: '#2E4053' }}>
          {note.text}
        </h1>

        <div className="flex gap-2 flex-wrap justify-center mt-4">
          {note.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs font-nunito font-semibold bg-white/50 text-gray-600">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Mascot */}
      {aestheticMode && (
        <img
          src={mascot}
          alt="Cloud Mascot"
          className="absolute bottom-8 right-8 w-24 h-24 object-contain animate-bounce-slow"
        />
      )}


      <div className="absolute bottom-4 text-[10px] opacity-60 font-nunito tracking-wider">
        cloudnote • a note for you 💌
      </div>
    </div>
  );
};

export default NoteCard;
