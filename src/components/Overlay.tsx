import React from 'react';
import { motion } from 'framer-motion';

export default function Overlay() {
  return (
    <div 
      className="overlay-container"
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 10,
        overflow: 'hidden'
      }}
    >
      {/* 
         CSS Styles for Responsiveness 
         (Using standard CSS media queries for layout changes)
      */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500&display=swap');
          
          /* Default Desktop Padding */
          .overlay-container { padding: 40px; }
          .nav-link { font-size: 1.5rem; }
          .footer-container { flex-direction: row; align-items: flex-end; }
          .buttons-container { flex-direction: row; }

          /* Mobile Styles (Max Width 768px) */
          @media (max-width: 768px) {
            .overlay-container { padding: 20px; }
            .nav-link { font-size: 1.1rem; }
            .footer-container { flex-direction: column-reverse; align-items: center; gap: 15px; }
            .buttons-container { flex-wrap: wrap; justify-content: center; gap: 10px; }
            .footer-text { text-align: center; width: 100%; margin-bottom: 10px; }
          }
        `}
      </style>

      {/* 
         ANIMATED TITLE CONTAINER 
         Moves from Center -> Top-Left
      */}
      <motion.div
        initial={{ 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)", 
          textAlign: "center"
        }}
        animate={{ 
          top: "clamp(20px, 5vh, 40px)",    // Responsive margin
          left: "clamp(20px, 5vw, 40px)",   // Responsive margin
          transform: "translate(0%, 0%)", 
          textAlign: "left"
        }}
        transition={{ 
          duration: 1.5, 
          ease: "easeInOut", 
          delay: 3 
        }}
        style={{ position: "absolute", zIndex: 20 }}
      >
        <motion.h1 
          style={{ 
            fontFamily: "'Bebas Neue', sans-serif", 
            margin: 0, 
            color: '#ffffff',
            lineHeight: '0.9',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            whiteSpace: 'nowrap'
          }}
          // RESPONSIVE SCALING: Huge (120vh) -> Normal (Clamp)
          initial={{ fontSize: "120vh", opacity: 0 }} 
          animate={{ fontSize: "clamp(3rem, 10vw, 5rem)", opacity: 1 }}
          transition={{ 
            duration: 2.5, 
            ease: [0.16, 1, 0.3, 1], 
          }}
        >
          MY PORTFOLIO
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }} 
          style={{ 
            fontFamily: "'Inter', sans-serif", 
            margin: '5px 0 0 5px', 
            color: 'rgba(255, 255, 255, 0.8)', 
            fontSize: 'clamp(0.8rem, 2vw, 1rem)', // Responsive font size
            letterSpacing: '1px' 
          }}
        >
          WEB DEV & CYBERSECURITY
        </motion.p>
      </motion.div>

      {/* 
         NAVIGATION & FOOTER 
         Fades in after animation
      */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 4, duration: 1 }}
        style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      >
        {/* TOP NAV */}
        <header style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <nav style={{ pointerEvents: 'auto', display: 'flex', gap: 'clamp(15px, 3vw, 30px)' }}>
            {['WORKS', 'ABOUT', 'CONTACT'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="nav-link"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: 'white',
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

        {/* FOOTER */}
        <footer className="footer-container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          
          {/* Social Buttons */}
          <div className="buttons-container" style={{ pointerEvents: 'auto', display: 'flex', gap: '20px' }}>
            <button style={btnStyle}>GITHUB</button>
            <button style={btnStyle}>LINKEDIN</button>
            <button style={btnStyle}>RESUME</button>
          </div>

          {/* Instructions Text */}
          <div className="footer-text" style={{ textAlign: 'right', color: 'white', opacity: 0.7 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', margin: 0 }}>
              DRAG TO EXPLORE
            </p>
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
