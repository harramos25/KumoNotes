import { forwardRef } from 'react';
// We'll import Note from a central type definition now, or define locally if needed.
// User's App.tsx imports { Note } from '../data/notes'. Let's assume we'll create that or allow local definition.
// For now, let's define it here to be safe, or import if we create notes.ts.
// Actually, App.tsx is the consumer. Let's assume we create notes.ts next.
import type { Note } from '../data/notes';

interface NoteCardProps {
  note: Note;
  aestheticMode?: boolean; // Kept for compatibility if passed
}

// We use forwardRef to expose the div to the parent for capture
export const NoteCard = forwardRef<HTMLDivElement, NoteCardProps>(({ note }, ref) => {
  return (
    <div
      ref={ref}
      id="capture-card"
      className="relative bg-white shadow-xl rounded-[32px] p-8 flex flex-col justify-between items-center text-center overflow-hidden"
      // Maintain Aspect Ratio 9:16
      style={{
        aspectRatio: '9/16',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0px 10px 25px -5px rgba(84, 110, 122, 0.15)' // Colored shadow
      }}
    >
      {/* Decorative inner border */}
      <div className="absolute inset-3 border-2 border-dashed border-blue-100 rounded-[24px] pointer-events-none" />

      {/* Top: Mood */}
      <div className="mt-8 z-10">
        <span className="bg-blue-50 text-blue-400 px-4 py-1 rounded-full font-heading font-bold text-sm tracking-wide uppercase">
          {note.category}
        </span>
      </div>

      {/* Center: Text */}
      <div className="flex-1 flex items-center justify-center z-10 px-4">
        <h1
          className="font-heading text-3xl md:text-4xl leading-relaxed text-slate-600"
        >
          {note.text}
        </h1>
      </div>

      {/* Bottom: Footer */}
      <div className="mb-6 z-10 opacity-50 font-heading text-xs tracking-widest text-[#546E7A]">
        cloudnote • a note for you 💌
      </div>

      {/* Internal Decor (Optional: Soft gradient blob in corner) */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-100 rounded-full blur-2xl opacity-50 pointer-events-none" />
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-50 pointer-events-none" />
    </div>
  );
});

export default NoteCard;
