import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import your pages
import Works from './pages/Works';
import About from './pages/About';
import Contact from './pages/Contact';
import Resume from './pages/Resume';

export default function Overlay() {
  const [section, setSection] = useState<string | null>(null);

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
      padding: '50px', // Increased padding slightly
      boxSizing: 'border-box',
      zIndex: 10,
      overflow: 'hidden' 
    }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;700&display=swap');`}
      </style>

      {/* DYNAMIC CONTENT AREA */}
      <div 
        onClick={(e) => {
           if (e.target === e.currentTarget) setSection(null);
        }}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 0, 
          pointerEvents: section ? 'auto' : 'none',
          cursor: section ? 'zoom-out' : 'default'
        }}
      >
        <AnimatePresence mode='wait'>
          {section === 'works' && <Works key="works" />}
          {section === 'about' && <About key="about" />}
          {section === 'contact' && <Contact key="contact" />}
          {section === 'resume' && <Resume key="resume" />}
        </AnimatePresence>
      </div>

      {/* ANIMATED TITLE */}
      <motion.div
        initial={{ 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)", 
          position: "absolute",
          textAlign: "center"
        }}
        animate={{ 
          top: "60px", 
          left: "60px", 
          transform: "translate(0%, 0%)", 
          textAlign: "left"
        }}
        transition={{ 
          duration: 1.5, 
          ease: "easeInOut", 
          delay: 3 
        }}
        style={{ zIndex: 20, pointerEvents: 'auto', cursor: 'pointer' }}
        onClick={() => setSection(null)} 
      >
        <motion.h1 
          style={{ 
            fontFamily: "'Bebas Neue', sans-serif", 
            margin: 0, 
            color: '#ffffff',
            lineHeight: '0.85',
            // Stronger shadow for clarity
            textShadow: '0 4px 20px rgba(0,0,0,0.5)', 
            whiteSpace: 'nowrap'
          }}
          initial={{ fontSize: "15rem", opacity: 0 }} 
          // INCREASED SIZE HERE (was 4rem)
          animate={{ fontSize: "8rem", opacity: 1 }} 
          transition={{ 
            duration: 2.5, 
            ease: [0.16, 1, 0.3, 1], 
          }}
        >
          MY PORTFOLIO
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          style={{ 
            fontFamily: "'Inter', sans-serif", 
            margin: '10px 0 0 5px', 
            color: '#ffffff', // Pure white
            // INCREASED SIZE (was 0.9rem)
            fontSize: '1.2rem', 
            fontWeight: '600',
            letterSpacing: '2px',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}
        >
          WEB AND GAME DEVELOPMENT
        </motion.p>
      </motion.div>

      {/* NAVIGATION & FOOTER */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 4, duration: 1 }}
        style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 30 }}
      >
        <header style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <nav style={{ pointerEvents: 'auto', display: 'flex', gap: '40px' }}>
            {['WORKS', 'ABOUT', 'CONTACT'].map((item) => (
              <button 
                key={item} 
                onClick={() => setSection(item.toLowerCase())}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: section === item.toLowerCase() ? '#00aaff' : 'white', 
                  // INCREASED SIZE (was 1.5rem)
                  fontSize: '2.5rem', 
                  cursor: 'pointer',
                  textShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  transition: 'transform 0.2s, color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {item}
              </button>
            ))}
          </nav>
        </header>

        <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ pointerEvents: 'auto', display: 'flex', gap: '20px' }}>
            <button 
              onClick={() => window.open('https://github.com', '_blank')} 
              style={btnStyle}
            >
              GITHUB
            </button>
            <button 
              onClick={() => window.open('https://linkedin.com', '_blank')} 
              style={btnStyle}
            >
              LINKEDIN
            </button>
            <button 
              onClick={() => setSection('resume')}
              style={{...btnStyle, background: section === 'resume' ? 'rgba(0, 170, 255, 0.4)' : btnStyle.background}}
            >
              RESUME
            </button>
          </div>
          <div style={{ textAlign: 'right', color: 'white', opacity: 0.9 }}>
            {section === null && (
              <p style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontSize: '1rem', // INCREASED SIZE
                fontWeight: 'bold',
                margin: 0,
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}>
                DRAG TO EXPLORE &
                SCROLL TO ZOOM
              </p>
            )}
          </div>
        </footer>
      </motion.div>
    </div>
  );
}

const btnStyle = {
  background: 'rgba(255, 255, 255, 0.1)', // Slightly more transparent for glass effect
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.5)', // Brighter border
  color: 'white',
  // BIGGER BUTTONS
  padding: '14px 32px', 
  borderRadius: '40px',
  fontFamily: "'Inter', sans-serif",
  fontSize: '1rem', // INCREASED SIZE (was 0.8rem)
  fontWeight: '600',
  letterSpacing: '1px',
  cursor: 'pointer',
  transition: 'background 0.3s, transform 0.2s',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
};
