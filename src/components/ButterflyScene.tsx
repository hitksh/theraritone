import React from 'react';
import { motion } from 'framer-motion';

const ButterflyScene: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 1 }}>
      {/* Pastel Butterfly Wings */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <motion.div
          className="relative"
          style={{
            width: '120vw',
            height: '80vh',
            opacity: 0.6,
          }}
          animate={{ 
            scale: [1, 1.01, 1],
            y: [0, -4, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut"
          }}
        >
          {/* Pastel Butterfly SVG */}
          <svg
            viewBox="0 0 1200 800"
            className="w-full h-full"
          >
            {/* Butterfly Body */}
            <ellipse
              cx="600"
              cy="400"
              rx="8"
              ry="120"
              fill="#81c784"
              opacity="0.8"
            />
            
            {/* Body Segments */}
            <ellipse cx="600" cy="340" rx="6" ry="12" fill="#81c784" opacity="0.7" />
            <ellipse cx="600" cy="370" rx="7" ry="15" fill="#81c784" opacity="0.8" />
            <ellipse cx="600" cy="410" rx="6" ry="12" fill="#81c784" opacity="0.7" />
            <ellipse cx="600" cy="450" rx="5" ry="10" fill="#81c784" opacity="0.6" />
            
            {/* LEFT UPPER WING - Light Green Pastel */}
            <motion.path
              d="M600 340 Q400 180 180 220 Q80 260 100 360 Q120 460 200 480 Q320 500 480 460 Q560 420 600 380"
              fill="rgba(200, 230, 201, 0.7)"
              stroke="#81c784"
              strokeWidth="2"
              animate={{
                rotateZ: [0, -1, 0],
                scaleY: [1, 1.02, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
              }}
            />
            
            {/* RIGHT UPPER WING - Light Green Pastel */}
            <motion.path
              d="M600 340 Q800 180 1020 220 Q1120 260 1100 360 Q1080 460 1000 480 Q880 500 720 460 Q640 420 600 380"
              fill="rgba(200, 230, 201, 0.7)"
              stroke="#81c784"
              strokeWidth="2"
              animate={{
                rotateZ: [0, 1, 0],
                scaleY: [1, 1.02, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
              }}
            />
            
            {/* LEFT LOWER WING - Darker Pastel */}
            <motion.path
              d="M600 420 Q480 480 380 500 Q320 520 310 560 Q320 600 360 590 Q420 570 520 540 Q580 510 600 460"
              fill="rgba(165, 214, 167, 0.6)"
              stroke="#81c784"
              strokeWidth="2"
              animate={{
                rotateZ: [0, -0.5, 0],
                scaleY: [1, 1.01, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            {/* RIGHT LOWER WING - Darker Pastel */}
            <motion.path
              d="M600 420 Q720 480 820 500 Q880 520 890 560 Q880 600 840 590 Q780 570 680 540 Q620 510 600 460"
              fill="rgba(165, 214, 167, 0.6)"
              stroke="#81c784"
              strokeWidth="2"
              animate={{
                rotateZ: [0, 0.5, 0],
                scaleY: [1, 1.01, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
                delay: 1
              }}
            />

            {/* Wing Patterns */}
            <circle cx="380" cy="320" r="15" fill="rgba(129, 199, 132, 0.4)" />
            <circle cx="820" cy="320" r="15" fill="rgba(129, 199, 132, 0.4)" />
            <circle cx="420" cy="480" r="10" fill="rgba(129, 199, 132, 0.3)" />
            <circle cx="780" cy="480" r="10" fill="rgba(129, 199, 132, 0.3)" />

            {/* Antennae */}
            <path
              d="M590 330 Q585 310 580 290"
              stroke="#81c784"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M610 330 Q615 310 620 290"
              stroke="#81c784"
              strokeWidth="3"
              fill="none"
            />
            
            {/* Antennae Tips */}
            <circle cx="580" cy="290" r="4" fill="#81c784" />
            <circle cx="620" cy="290" r="4" fill="#81c784" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Floating Pastel Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${15 + (i * 5)}%`,
              top: `${25 + (i * 4)}%`,
              background: 'rgba(200, 230, 201, 0.6)',
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              repeat: Infinity,
              duration: 8 + (i * 0.3),
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
      </div>

      {/* Subtle Background Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(200, 230, 201, 0.1) 0%, transparent 60%)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default ButterflyScene;