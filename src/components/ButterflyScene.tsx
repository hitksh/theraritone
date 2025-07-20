import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ButterflyScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        const parallaxSpeed = 0.05;
        containerRef.current.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Elegant Butterfly - Luxury Aesthetic */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: 'translateY(-15vh)' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 4, ease: "easeOut" }}
      >
        <motion.div
          className="relative"
          style={{
            width: '140vw',
            height: '100vh',
            opacity: 0.5,
            filter: 'drop-shadow(0 0 50px rgba(0, 64, 48, 0.4))',
            mixBlendMode: 'multiply'
          }}
          animate={{ 
            scale: [1, 1.05, 1],
            y: [0, -12, 0],
            rotateZ: [0, 1, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut"
          }}
        >
          {/* Luxury Butterfly SVG - Premium Forest Green Palette */}
          <svg
            viewBox="0 0 1200 800"
            className="w-full h-full"
            style={{ filter: 'brightness(1.2) contrast(1.15) saturate(1.1)' }}
          >
            {/* Butterfly Body - Elegant and Refined */}
            <motion.ellipse
              cx="600"
              cy="400"
              rx="8"
              ry="160"
              fill="rgba(0, 64, 48, 0.9)"
              style={{ 
                filter: 'drop-shadow(0 0 20px rgba(0, 64, 48, 0.6))',
                transformOrigin: '600px 400px'
              }}
            />
            
            {/* Body Segments */}
            <ellipse cx="600" cy="340" rx="6" ry="12" fill="rgba(0, 64, 48, 0.6)" />
            <ellipse cx="600" cy="380" rx="8" ry="16" fill="rgba(0, 64, 48, 0.7)" />
            <ellipse cx="600" cy="420" rx="7" ry="14" fill="rgba(0, 64, 48, 0.6)" />
            <ellipse cx="600" cy="460" rx="5" ry="12" fill="rgba(0, 64, 48, 0.5)" />
            
            {/* LEFT UPPER WING - Elegant Forest Green */}
            <motion.path
              d="M600 320 Q420 180 200 220 Q80 270 100 360 Q120 450 200 490 Q340 520 480 470 Q560 430 600 380"
              fill="rgba(0, 64, 48, 0.4)"
              stroke="rgba(0, 64, 48, 0.7)"
              strokeWidth="1.5"
              style={{ 
                filter: 'drop-shadow(0 0 30px rgba(0, 64, 48, 0.4))',
                transformOrigin: '600px 320px'
              }}
              animate={{
                rotateZ: [0, -2, 0],
                scaleY: [1, 1.05, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "easeInOut",
                delay: 0
              }}
            />
            
            {/* RIGHT UPPER WING - Elegant Forest Green */}
            <motion.path
              d="M600 320 Q780 180 1000 220 Q1120 270 1100 360 Q1080 450 1000 490 Q860 520 720 470 Q640 430 600 380"
              fill="rgba(0, 64, 48, 0.4)"
              stroke="rgba(0, 64, 48, 0.7)"
              strokeWidth="1.5"
              style={{ 
                filter: 'drop-shadow(0 0 30px rgba(0, 64, 48, 0.4))',
                transformOrigin: '600px 320px'
              }}
              animate={{
                rotateZ: [0, 2, 0],
                scaleY: [1, 1.05, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "easeInOut",
                delay: 0
              }}
            />
            
            {/* LEFT LOWER WING - Refined Lower Wing */}
            <motion.path
              d="M600 410 Q480 500 360 540 Q280 580 260 640 Q270 690 320 680 Q380 660 460 620 Q540 580 600 520"
              fill="rgba(220, 208, 168, 0.5)"
              stroke="rgba(220, 208, 168, 0.8)"
              strokeWidth="1.5"
              style={{ 
                filter: 'drop-shadow(0 0 25px rgba(220, 208, 168, 0.4))',
                transformOrigin: '600px 410px'
              }}
              animate={{
                rotateZ: [0, -1.5, 0],
                scaleY: [1, 1.04, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "easeInOut",
                delay: 2
              }}
            />
            
            {/* RIGHT LOWER WING - Refined Lower Wing */}
            <motion.path
              d="M600 410 Q720 500 840 540 Q920 580 940 640 Q930 690 880 680 Q820 660 740 620 Q660 580 600 520"
             fill="rgba(220, 208, 168, 0.5)"
             stroke="rgba(220, 208, 168, 0.8)"
              strokeWidth="1.5"
              style={{ 
               filter: 'drop-shadow(0 0 25px rgba(220, 208, 168, 0.4))',
                transformOrigin: '600px 410px'
              }}
              animate={{
               rotateZ: [0, 1.5, 0],
               scaleY: [1, 1.04, 1],
               opacity: [0.5, 0.7, 0.5]
              }}
              transition={{
                repeat: Infinity,
               duration: 12,
                ease: "easeInOut",
                delay: 2
              }}
            />

            {/* Delicate Wing Patterns */}
            <motion.path
              d="M600 320 Q520 280 440 300 Q360 320 320 360"
              stroke="rgba(0, 64, 48, 0.5)"
              strokeWidth="0.8"
              fill="none"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{
                repeat: Infinity,
                duration: 16,
                ease: "easeInOut"
              }}
            />

            <motion.path
              d="M600 320 Q680 280 760 300 Q840 320 880 360"
              stroke="rgba(0, 64, 48, 0.5)"
              strokeWidth="0.8"
              fill="none"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{
                repeat: Infinity,
                duration: 16,
                ease: "easeInOut",
                delay: 2
              }}
            />

            {/* Elegant Wing Accents */}
            <motion.ellipse
              cx="400" cy="340" rx="15" ry="12"
              fill="rgba(0, 64, 48, 0.3)"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 14,
                ease: "easeInOut"
              }}
            />
            <motion.ellipse
              cx="800" cy="340" rx="15" ry="12"
              fill="rgba(0, 64, 48, 0.3)"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 14,
                ease: "easeInOut",
                delay: 3
              }}
            />

            {/* Delicate Antennae */}
            <motion.path
              d="M590 300 Q580 280 570 260 Q565 250 560 240"
              stroke="rgba(0, 64, 48, 0.9)"
              strokeWidth="2"
              fill="none"
              animate={{ rotate: [0, 2, 0] }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M610 300 Q620 280 630 260 Q635 250 640 240"
              stroke="rgba(0, 64, 48, 0.9)"
              strokeWidth="2"
              fill="none"
              animate={{ rotate: [0, -2, 0] }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut"
              }}
            />
            
            {/* Antennae Tips */}
            <circle cx="560" cy="240" r="3" fill="rgba(0, 64, 48, 1)" />
            <circle cx="640" cy="240" r="3" fill="rgba(0, 64, 48, 1)" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Subtle Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${20 + (i * 7)}%`,
              top: `${20 + (i * 5)}%`,
              background: 'rgba(0, 64, 48, 0.4)',
              filter: 'blur(0.5px)',
              boxShadow: '0 0 12px rgba(0, 64, 48, 0.5)'
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [0.8, 1.4, 0.8]
            }}
            transition={{
              repeat: Infinity,
              duration: 10 + (i * 0.8),
              ease: "easeInOut",
              delay: i * 0.6
            }}
          />
        ))}
      </div>

      {/* Subtle Background Ambiance */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 35%, rgba(0, 64, 48, 0.12) 0%, rgba(220, 208, 168, 0.08) 40%, transparent 70%)',
          mixBlendMode: 'multiply'
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.06, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default ButterflyScene;