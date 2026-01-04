import React from 'react';
import { motion } from 'framer-motion';

export default function Overlay() {
  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      pointerEvents: 'none', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '40px',
      boxSizing: 'border-box',
      zIndex: 10,
      overflow: 'hidden' // Prevents scrollbars during the huge text phase
    }}>
      {/* Import Fonts */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500&display=swap');`}
      </style>

      {/* 
         ANIMATED TITLE CONTAINER 
         This handles the position shift from CENTER -> TOP-LEFT
      */}
      <motion.div
        initial={{ 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)", // Center initially
          position: "absolute",
          textAlign: "center"
        }}
        animate={{ 
          top: "40px", 
          left: "40px", 
          transform: "translate(0%, 0%)", // Reset transform for top-left
          textAlign: "left"
        }}
        transition={{ 
          duration: 1.5, 
          ease: "easeInOut", 
          delay: 3 // Wait 3 seconds before moving to corner
        }}
        style={{ zIndex: 20 }}
      >
        <motion.h1 
          style={{ 
            fontFamily: "'Bebas Neue', sans-serif", 
            margin: 0, 
            color: '#ffffff',
            lineHeight: '0.9',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            whiteSpace: 'nowrap' // Keeps text on one line during animation
          }}
          // TEXT SCALE ANIMATION: Huge -> Normal
          initial={{ fontSize: "200rem", opacity: 0 }} 
          animate={{ fontSize: "4rem", opacity: 1 }}
          transition={{ 
            duration: 2.5, 
            ease: [0.16, 1, 0.3, 1], // Custom "spring-like" ease
          }}
        >
          MY PORTFOLIO
        </motion.h1>
        
        {/* SUBTITLE (Fades in after title lands) */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }} // Fade in after move completes
          style={{ 
            fontFamily: "'Inter', sans-serif", 
            margin: '5px 0 0 5px', 
            color: 'rgba(255, 255, 255, 0.8)', 
            fontSize: '0.9rem', 
            letterSpacing: '1px' 
          }}
        >
          WEB DEV & CYBERSECURITY
        </motion.p>
      </motion.div>

      {/* 
         NAVIGATION & FOOTER 
         These fade in only AFTER the intro is done (delay: 4s)
      */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 4, duration: 1 }}
        style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      >
        {/* TOP NAV (Aligned Right) */}
        <header style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <nav style={{ pointerEvents: 'auto', display: 'flex', gap: '30px' }}>
            {['WORKS', 'ABOUT', 'CONTACT'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: 'white',
                  fontSize: '1.5rem',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                {item}
              </a>
            ))}
          </nav>
        </header>

        {/* BOTTOM FOOTER */}
        <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ pointerEvents: 'auto', display: 'flex', gap: '20px' }}>
            <button style={btnStyle}>GITHUB</button>
            <button style={btnStyle}>LINKEDIN</button>
            <button style={btnStyle}>RESUME</button>
          </div>
          <div style={{ textAlign: 'right', color: 'white', opacity: 0.7 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', margin: 0 }}>DRAG TO EXPLORE</p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}

const btnStyle = {
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '30px',
  fontFamily: "'Inter', sans-serif",
  fontSize: '0.8rem',
  fontWeight: '500',
  cursor: 'pointer'
};
