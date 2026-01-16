import { useState, useRef } from 'react';
import html2canvas from 'html2canvas'; // Import library
import { NOTES, type Note } from './data/notes';
import { FloatingStickers } from './components/FloatingStickers';
import Controls from './components/Controls';
// Lucide icons are now used inside Controls.tsx, not here.

function App() {
  const [currentNote, setCurrentNote] = useState<Note>(NOTES[0]); // Default init, but won't be shown until open
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [seed, setSeed] = useState(0);
  const [aestheticMode, setAestheticMode] = useState(true);
  const [hasOpened, setHasOpened] = useState(false);

  // Removed auto-init useEffect so user must click open

  const getRandomNote = () => {
    let newNote;
    do {
      newNote = NOTES[Math.floor(Math.random() * NOTES.length)];
    } while (newNote.id === currentNote.id && NOTES.length > 1);

    setCurrentNote(newNote);
    // Force sticker re-randomization on new note
    setSeed(s => s + 1);
  };

  const handleOpen = () => {
    if (!hasOpened) {
      getRandomNote();
      setHasOpened(true);
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);

    // Scale up for high res (1080px width)
    const scale = 1080 / cardRef.current.offsetWidth;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: scale,
        backgroundColor: null, // Transparent bg if card has radius
        useCORS: true,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `KumoNote_${currentNote.category}.png`;
      link.click();
    } catch (err) {
      console.error("Export failed", err);
    } finally {
      setIsExporting(false);
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
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      alert("Share API not supported on this browser! Try downloading.");
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 relative overflow-hidden app">
      <FloatingStickers seedKey={seed} stickerCount={6} particleCount={4} />

      {/* Main UI Container */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-8">


        {/* The Card */}
        {!hasOpened ? (
          <div className="note-card">
            <div className="note-title">KumoNote ☁️</div>
            <button className="open-btn" onClick={handleOpen}>
              💌 A note for you — Open
            </button>
            <div className="note-footer" style={{ marginTop: '12px' }}>tap to receive your note</div>
          </div>
        ) : (
          <div className="note-card" ref={cardRef}>
            <div className="note-title">KUMONOTE ☁️</div>
            <div className="note-text">{currentNote.text}</div>

            {/* Tags */}
            <div className="tag-row">
              {(currentNote.tags ?? []).map((t: string) => (
                <span key={t} className="tag">#{t}</span>
              ))}
            </div>

            <div className="note-footer">a note for you 💗</div>
          </div>
        )}

        {/* Controls */}
        <div className="mt-8 z-50">
          <Controls
            onDownload={handleDownload}
            onShare={handleShare}
            aestheticMode={aestheticMode}
            setAestheticMode={setAestheticMode}
            disabled={isExporting || !hasOpened}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
