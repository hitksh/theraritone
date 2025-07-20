import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ButterflyScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        const parallaxSpeed = 0.03;
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
      {/* Enhanced Butterfly Wings - More Visible and Prominent */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: 'translateY(-10vh)' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <motion.div
          className="relative"
          style={{
            width: '160vw',
            height: '120vh',
            opacity: 0.8,
            filter: 'drop-shadow(0 0 40px rgba(1, 71, 55, 0.3))',
          }}
          animate={{ 
            scale: [1, 1.03, 1],
            y: [0, -8, 0],
            rotateZ: [0, 0.5, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut"
          }}
        >
          {/* Enhanced Butterfly SVG with Better Visibility */}
          <svg
            viewBox="0 0 1400 900"
            className="w-full h-full"
            style={{ filter: 'brightness(1.1) contrast(1.1)' }}
          >
            {/* Butterfly Body - More Prominent */}
            <motion.ellipse
              cx="700"
              cy="450"
              rx="12"
              ry="180"
              fill="rgba(1, 71, 55, 0.9)"
              style={{ 
                filter: 'drop-shadow(0 0 25px rgba(1, 71, 55, 0.5))',
                transformOrigin: '700px 450px'
              }}
            />
            
            {/* Body Segments - Enhanced */}
            <ellipse cx="700" cy="380" rx="8" ry="15" fill="rgba(1, 71, 55, 0.7)" />
            <ellipse cx="700" cy="420" rx="10" ry="20" fill="rgba(1, 71, 55, 0.8)" />
            <ellipse cx="700" cy="470" rx="9" ry="18" fill="rgba(1, 71, 55, 0.7)" />
            <ellipse cx="700" cy="520" rx="7" ry="15" fill="rgba(1, 71, 55, 0.6)" />
            
            {/* LEFT UPPER WING - Enhanced Visibility */}
            <motion.path
              d="M700 360 Q480 180 220 240 Q80 300 110 420 Q140 540 240 580 Q380 620 540 570 Q640 520 700 440"
              fill="rgba(198, 218, 198, 0.7)"
              stroke="rgba(1, 71, 55, 0.8)"
              strokeWidth="2"
              style={{ 
                filter: 'drop-shadow(0 0 35px rgba(198, 218, 198, 0.6))',
                transformOrigin: '700px 360px'
              }}
              animate={{
                rotateZ: [0, -1.5, 0],
                scaleY: [1, 1.04, 1],
                opacity: [0.7, 0.9, 0.7]
              }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut",
                delay: 0
              }}
            />
            
            {/* RIGHT UPPER WING - Enhanced Visibility */}
            <motion.path
              d="M700 360 Q920 180 1180 240 Q1320 300 1290 420 Q1260 540 1160 580 Q1020 620 860 570 Q760 520 700 440"
              fill="rgba(198, 218, 198, 0.7)"
              stroke="rgba(1, 71, 55, 0.8)"
              strokeWidth="2"
              style={{ 
                filter: 'drop-shadow(0 0 35px rgba(198, 218, 198, 0.6))',
                transformOrigin: '700px 360px'
              }}
              animate={{
                rotateZ: [0, 1.5, 0],
                scaleY: [1, 1.04, 1],
                opacity: [0.7, 0.9, 0.7]
              }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut",
                delay: 0
              }}
            />
            
            {/* LEFT LOWER WING - More Prominent */}
            <motion.path
              d="M700 480 Q560 580 420 620 Q320 660 300 720 Q310 780 370 770 Q440 750 540 700 Q620 650 700 580"
              fill="rgba(1, 71, 55, 0.6)"
              stroke="rgba(1, 71, 55, 0.9)"
              strokeWidth="2"
              style={{ 
                filter: 'drop-shadow(0 0 30px rgba(1, 71, 55, 0.5))',
                transformOrigin: '700px 480px'
              }}
              animate={{
                rotateZ: [0, -1, 0],
                scaleY: [1, 1.03, 1],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            {/* RIGHT LOWER WING - More Prominent */}
            <motion.path
              d="M700 480 Q840 580 980 620 Q1080 660 1100 720 Q1090 780 1030 770 Q960 750 860 700 Q780 650 700 580"
              fill="rgba(1, 71, 55, 0.6)"
              stroke="rgba(1, 71, 55, 0.9)"
              strokeWidth="2"
              style={{ 
                filter: 'drop-shadow(0 0 30px rgba(1, 71, 55, 0.5))',
                transformOrigin: '700px 480px'
              }}
              animate={{
                rotateZ: [0, 1, 0],
                scaleY: [1, 1.03, 1],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut",
                delay: 1
              }}
            />

            {/* Enhanced Wing Patterns - More Visible */}
            <motion.path
              d="M700 360 Q600 320 500 340 Q400 360 360 400"
              stroke="rgba(1, 71, 55, 0.7)"
              strokeWidth="1.5"
              fill="none"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{
                repeat: Infinity,
                duration: 14,
                ease: "easeInOut"
              }}
            />

            <motion.path
              d="M700 360 Q800 320 900 340 Q1000 360 1040 400"
              stroke="rgba(1, 71, 55, 0.7)"
              strokeWidth="1.5"
              fill="none"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{
                repeat: Infinity,
                duration: 14,
                ease: "easeInOut",
                delay: 2
              }}
            />

            {/* Wing Accent Spots - Enhanced */}
            <motion.ellipse
              cx="450" cy="380" rx="20" ry="15"
              fill="rgba(1, 71, 55, 0.5)"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "easeInOut"
              }}
            />
            <motion.ellipse
              cx="950" cy="380" rx="20" ry="15"
              fill="rgba(1, 71, 55, 0.5)"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "easeInOut",
                delay: 2
              }}
            />

            {/* Enhanced Antennae */}
            <motion.path
              d="M690 340 Q680 320 670 300 Q665 290 660 280"
              stroke="rgba(1, 71, 55, 1)"
              strokeWidth="3"
              fill="none"
              animate={{ rotate: [0, 1.5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M710 340 Q720 320 730 300 Q735 290 740 280"
              stroke="rgba(1, 71, 55, 1)"
              strokeWidth="3"
              fill="none"
              animate={{ rotate: [0, -1.5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut"
              }}
            />
            
            {/* Antennae Tips - Enhanced */}
            <circle cx="660" cy="280" r="4" fill="rgba(1, 71, 55, 1)" />
            <circle cx="740" cy="280" r="4" fill="rgba(1, 71, 55, 1)" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${15 + (i * 6)}%`,
              top: `${15 + (i * 4)}%`,
              background: 'rgba(198, 218, 198, 0.6)',
              filter: 'blur(0.5px)',
              boxShadow: '0 0 15px rgba(198, 218, 198, 0.7)'
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [0.8, 1.6, 0.8]
            }}
            transition={{
              repeat: Infinity,
              duration: 8 + (i * 0.5),
              ease: "easeInOut",
              delay: i * 0.4
            }}
          />
        ))}
      </div>

      {/* Enhanced Background Ambiance */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 70% at 50% 40%, rgba(198, 218, 198, 0.2) 0%, rgba(1, 71, 55, 0.1) 40%, transparent 70%)',
          mixBlendMode: 'multiply'
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.05, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 16,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default ButterflyScene;