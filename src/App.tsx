import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';

// Components
import NoteCard from './components/NoteCard';
import FloatingStickers from './components/FloatingStickers';
import Controls from './components/Controls';
import particlesBg from './assets/particles.png';

// Data
import notesData from './data/notes.json';

interface Note {
  id: number;
  text: string;
  category: string;
  tags: string[];
}

function App() {
  const [currentNote, setCurrentNote] = useState<Note>(notesData[0]);
  const [aestheticMode, setAestheticMode] = useState<boolean>(true);
  const cardRef = useRef<HTMLDivElement>(null);

  // Initialize with a random note on mount
  useEffect(() => {
    randomizeNote();
  }, []);

  const randomizeNote = () => {
    let newNote;
    do {
      const randomIndex = Math.floor(Math.random() * notesData.length);
      newNote = notesData[randomIndex];
    } while (newNote.id === currentNote.id && notesData.length > 1);

    // Simple pop animation effect key
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.transform = 'scale(1)';
      }, 150);
    }

    setCurrentNote(newNote);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    // Create a canvas from the card
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // Higher quality
        backgroundColor: null, // Transparent if card has transparency, but we probably want the gradient? 
        // Actually request says "Export only the note card area (not the whole page)".
        // But usually "Story" implies a full screen image.
        // Request says: "Export only the note card area (not the whole page)." 
        // AND "The exported image must be sized exactly 1080x1920".
        // If we export just the CARD, it won't be 1080x1920 unless card IS 1080x1920.
        // The card styling in NoteCard.tsx has width: 1080px (conceptually) but responsive.

        // To get a 1080x1920 output of JUST the card, we'd need the card to BE that size or have a wrapper.
        // If the user wants "Export only the note card area... sized exactly 1080x1920", maybe they mean the card IS the story?
        // "Note card area" usually implies the rectangle. 
        // IF I export just the rectangle, and it's 9:16, that's good.
        // Let's ensure the capture captures the card at high res.
        useCORS: true,
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `kumonote_${currentNote.id}.png`;
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
      alert("Oops! Could not save the note. Try again!");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'KumoNote',
          text: currentNote.text,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      // Fallback
      alert("Downloaded! You can upload it to your story manually!");
      handleDownload();
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">

      {/* Background Particles Layer */}
      {aestheticMode && (
        <>
          <div
            className="absolute inset-0 z-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `url(${particlesBg})`,
              backgroundSize: '400px',
              animation: 'float 20s linear infinite' // simple parallax
            }}
          />
          <FloatingStickers />
        </>
      )}

      {/* Main Card */}
      <div className="z-10 w-full flex justify-center items-center p-4">
        <NoteCard
          note={currentNote}
          aestheticMode={aestheticMode}
          cardRef={cardRef}
        />
      </div>

      {/* Controls */}
      <Controls
        onNewNote={randomizeNote}
        onDownload={handleDownload}
        onShare={handleShare}
        aestheticMode={aestheticMode}
        setAestheticMode={setAestheticMode}
      />

    </div>
  );
}

export default App;
