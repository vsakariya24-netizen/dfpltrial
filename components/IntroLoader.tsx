import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Randomize speed for a "processing" feel
        return prev + Math.floor(Math.random() * 10) + 1; 
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  // Trigger completion callback when progress hits 100 + small delay
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        onComplete();
      }, 1000); // Wait 1 second after hitting 100% before lifting curtain
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* --- BACKGROUND GRID EFFECT --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* --- LOGO CONTAINER --- */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-8">
          {/* Glowing Aura behind logo */}
          <motion.div 
            className="absolute inset-0 bg-yellow-500 blur-[60px] opacity-20 rounded-full"
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0.1, 0.3, 0.1] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* THE UPLOADED LOGO */}
          <motion.img 
            src="/your-logo-path.png" // <--- PUT YOUR UPLOADED LOGO PATH HERE
            alt="Durable Fasteners Logo"
            className="w-32 h-32 md:w-48 md:h-48 object-contain relative z-10"
            initial={{ opacity: 0, scale: 0.8, filter: "grayscale(100%)" }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              filter: progress > 50 ? "grayscale(0%)" : "grayscale(100%)" 
            }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* --- LOADING TEXT & BAR --- */}
        <div className="w-64 md:w-80">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-mono text-white/50 tracking-widest uppercase">
              System Calibration
            </span>
            <span className="text-4xl font-black italic text-white">
              {Math.min(progress, 100)}%
            </span>
          </div>

          {/* Progress Bar Container */}
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-yellow-500"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* --- BOTTOM TAGLINE --- */}
      <motion.div 
        className="absolute bottom-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-[10px] tracking-[0.5em] uppercase text-white/30 font-bold">
          Durable Fasteners Pvt Ltd
        </p>
      </motion.div>
    </motion.div>
  );
};

export default IntroLoader;