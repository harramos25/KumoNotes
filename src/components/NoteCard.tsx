import { forwardRef } from 'react';
import type { Note } from '../data/notes';

interface NoteCardProps {
  note: Note;
  aestheticMode?: boolean; // Kept for compatibility props, but ignored for style
}

// We use forwardRef to expose the div to the parent for capture
export const NoteCard = forwardRef<HTMLDivElement, NoteCardProps>(({ note }, ref) => {
  return (
    <div
      ref={ref}
      id="capture-card"
      className="note-card"
    >
      {/* Top: App Name (Small, Soft) */}
      <div className="note-title">
        KumoNote ☁️
      </div>

      {/* Center: Main Text (Big, Emotional) */}
      <div className="note-text">
        {note.text}
      </div>

      {/* Bottom: Footer (Tiny, Optional) */}
      <div className="note-footer">
        a note for you 💗
      </div>
    </div>
  );
});

export default NoteCard;
