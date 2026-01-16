import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas'; // Import library
import { NOTES, type Note } from './data/notes';
import { FloatingStickers } from './components/FloatingStickers';
import { NoteCard } from './components/NoteCard';
// We need to import the icons. User asked for Lucide React.
// Assuming lucide-react is installed.
// "import { RefreshCw, Download, Share2 } from 'lucide-react';"
import { RefreshCw, Download, Share2 } from 'lucide-react';

function App() {
  const [currentNote, setCurrentNote] = useState<Note>(NOTES[0]);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Initialize with a random note on mount
  useEffect(() => {
    getRandomNote();
  }, []);

  const getRandomNote = () => {
    let newNote;
    do {
      newNote = NOTES[Math.floor(Math.random() * NOTES.length)];
    } while (newNote.id === currentNote.id && NOTES.length > 1);
    setCurrentNote(newNote);
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
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <FloatingStickers />

      {/* Main UI Container */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="font-heading text-5xl text-white drop-shadow-md select-none">KumoNote</h1>
        </div>

        {/* The Card */}
        <NoteCard ref={cardRef} note={currentNote} />

        {/* Controls */}
        <div className="flex items-center gap-4">

          {/* Refresh Button (Big) */}
          <button
            onClick={getRandomNote}
            className="group relative bg-white px-8 py-4 rounded-full font-heading text-xl text-slate-500 font-bold transition-transform active:translate-y-1"
            style={{ boxShadow: '0px 6px 0px #CBD5E1' }} // Chunky shadow
          >
            <div className="flex items-center gap-2">
              <RefreshCw className="group-hover:rotate-180 transition-transform duration-500" />
              <span>New Note</span>
            </div>
          </button>

          {/* Download Button (Small) */}
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="bg-pink-100 p-4 rounded-full text-pink-500 transition-transform active:translate-y-1"
            style={{ boxShadow: '0px 6px 0px #F8BBD0' }}
          >
            <Download />
          </button>

          {/* Share Button (Small) */}
          <button
            onClick={handleShare}
            className="bg-blue-100 p-4 rounded-full text-blue-500 transition-transform active:translate-y-1"
            style={{ boxShadow: '0px 6px 0px #B3E5FC' }}
          >
            <Share2 />
          </button>

        </div>
      </div>
    </div>
  );
}

export default App;
