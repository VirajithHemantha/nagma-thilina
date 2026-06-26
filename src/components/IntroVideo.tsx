import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { CornerFlowers } from './CornerFlowers';

interface IntroVideoProps {
  onComplete: () => void;
}

export const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Note slides out after flap opens
    setTimeout(() => {
      setShowNote(true);
    }, 800);

    // Fade out everything and complete
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 1500); // Wait for fade out
    }, 4500); // Read time for the note
  };

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-[url('/envelope-bg.png')] bg-cover bg-center flex items-center justify-center overflow-hidden"
        >
          {/* Background Ambient Textures (Optional overlay for extra texture) */}
          <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
          </div>

          {/* Envelope Container */}
          <div
            className="relative w-[320px] h-[220px] sm:w-[500px] sm:h-[340px] cursor-pointer group z-10"
            onClick={handleOpen}
          >
            {/* Shadow for Envelope */}
            <div className="absolute inset-0 bg-brand-gold-deep/10 blur-2xl translate-y-6 sm:translate-y-8 rounded-xl" />

            {/* Back of Envelope */}
            <div className="absolute inset-0 bg-[#f5e7d6] shadow-sm rounded-md border border-[#e8d5c4]/30" />

            {/* The Note / Letter */}
            <motion.div
              initial={{ y: 0, opacity: 0, scale: 0.95 }}
              animate={{
                y: showNote ? (window.innerWidth < 640 ? -120 : -180) : 0,
                opacity: showNote ? 1 : 0,
                scale: showNote ? 1 : 0.95
              }}
              transition={{ duration: 1.2, type: "spring", bounce: 0.15 }}
              className="absolute left-[4%] right-[4%] top-[4%] bottom-[4%] bg-white rounded-md shadow-[0_0_20px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center z-10 border border-[#f0e0d0]/50"
            >
              <h3 className="font-display italic text-3xl sm:text-4xl text-brand-gold-deep drop-shadow-sm px-6 text-center leading-relaxed">
                With pleasure, we invite you.
              </h3>
              <div className="w-12 h-[1px] bg-brand-gold/40 mt-6" />
            </motion.div>

            {/* Envelope Frame Body (Bottom Part of the Image) */}
            <div className="absolute inset-0 z-20 pointer-events-none drop-shadow-md">
              <div
                className="w-full h-full bg-[url('/envelope.png')] bg-contain bg-center bg-no-repeat"
                style={{ clipPath: 'polygon(0 0, 50% 52%, 100% 0, 100% 100%, 0 100%)' }}
              />
            </div>

            {/* Top Flap Container (Animated) */}
            <motion.div
              className="absolute inset-0 z-40"
              style={{ transformOrigin: 'top', transformStyle: 'preserve-3d' }}
              initial={{ rotateX: 0 }}
              animate={{ rotateX: isOpen ? -180 : 0 }}
              transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Top Flap Front (Visible when closed) */}
              <div
                className="absolute inset-0 flex flex-col items-center drop-shadow-[0_6px_10px_rgba(0,0,0,0.15)]"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                <div
                  className="w-full h-full bg-[url('/envelope.png')] bg-contain bg-center bg-no-repeat"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 52%)' }}
                />
              </div>

              {/* Top Flap Back (Visible when open) */}
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateX(180deg)'
                }}
              >
                <div
                  className="w-full h-full bg-[#e8d5c4] rounded-t-md"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 52%)' }}
                />
              </div>
            </motion.div>

            {/* Pulse hint for clicking (hides when open) */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: [0, 0.7, 0], y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-16 sm:-bottom-20 left-1/2 -translate-x-1/2 text-brand-gold-deep font-sans text-xs sm:text-sm tracking-[0.3em] uppercase whitespace-nowrap"
                >
                  Click to Open
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


