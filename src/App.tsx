import { useState, useRef } from 'react';
import html2canvas from 'html2canvas'; // Import library
import { NOTES, type Note } from './data/notes';
import { FloatingStickers } from './components/FloatingStickers';
import Controls from './components/Controls';
// Lucide icons are now used inside Controls.tsx, not here.

function App() {
  const [currentNote, setCurrentNote] = useState<Note>(NOTES[0]); // Default init, but won't be shown until open
  const cardRef = useRef<HTMLDivElement>(null);
  // New Export Ref
  const exportRef = useRef<HTMLDivElement>(null);
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

    const original = cardRef.current;

    // ✅ clone so we don't touch the UI
    const clone = original.cloneNode(true) as HTMLElement;

    // ✅ remove preview scaling class
    clone.classList.remove("export-preview");

    // ✅ put offscreen but renderable
    clone.style.position = "fixed";
    clone.style.left = "-99999px";
    clone.style.top = "0";
    clone.style.transform = "none";
    clone.style.width = "1080px";
    clone.style.height = "1920px";
    // We expect the internal .export-bg to handle the background, 
    // but a fallback doesn't hurt.
    clone.style.background = "#fff4cc";

    document.body.appendChild(clone);

    try {
      const canvas = await html2canvas(clone, {
        backgroundColor: null, // keep whatever your export-bg provides
        scale: 2, // High resolution export
        useCORS: true,
        allowTaint: true,
        width: 1080,
        height: 1920,
        windowWidth: 1080,
        windowHeight: 1920,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `KumoNote_${currentNote.category}.png`;
      link.click();
    } catch (err) {
      console.error("Export failed", err);
    } finally {
      document.body.removeChild(clone);
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
    <div className="scene">
      <FloatingStickers seedKey={seed} stickerCount={6} particleCount={4} />

      {/* Main UI Container */}
      <main className="app">
        <div className="card-wrap">
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
              <div className="watermark">kumo-notes.vercel.app</div>
            </div>
          )}

          {/* Controls - Only visible after opening */}
          {hasOpened && (
            <div className="mt-8 z-50">
              <Controls
                onDownload={handleDownload}
                onShare={handleShare}
                aestheticMode={aestheticMode}
                setAestheticMode={setAestheticMode}
                disabled={isExporting}
              />
            </div>
          )}
        </div>
      </main>

      {/* Hidden Export Template (1080x1920) */}
      <div className="export-hidden">
        <div ref={exportRef} className="export-frame">
          <div className="export-bg" />
          <div className="export-card-container">
            {/* Scaled up Card for Export */}
            <div className="note-card" style={{ transform: 'scale(1.5)', transformOrigin: 'center' }}>
              <div className="note-title">KUMONOTE ☁️</div>
              <div className="note-text">{currentNote.text}</div>
              <div className="tag-row">
                {(currentNote.tags ?? []).map((t: string) => (
                  <span key={t} className="tag">#{t}</span>
                ))}
              </div>
              <div className="note-footer">a note for you 💗</div>
              <div className="watermark">kumo-notes.vercel.app</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
