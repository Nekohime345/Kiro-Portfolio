import React, { useState, useEffect, useRef } from 'react'; // Import useEffect and useRef
import { motion, AnimatePresence } from 'framer-motion';

// Import your pages
import Works from './pages/Works';
import About from './pages/About';
import Contact from './pages/Contact';
import Resume from './pages/Resume';

export default function Overlay() {
  const [section, setSection] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);

  // 1. CREATE A REF FOR THE AUDIO ELEMENT
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 2. SYNC AUDIO PLAYBACK WITH MUTED STATE
  useEffect(() => {
    if (audioRef.current) {
      if (muted) {
        audioRef.current.pause();
      } else {
        // Play and catch errors (browsers block auto-play sometimes)
        audioRef.current.play().catch((e) => {
          console.log("Audio play failed (user interaction needed first):", e);
        });
      }
    }
  }, [muted]);

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
      padding: '50px', 
      boxSizing: 'border-box',
      zIndex: 10,
      overflow: 'hidden' 
    }}>
      
      {/* 3. INVISIBLE AUDIO ELEMENT */}
      <audio 
        ref={audioRef} 
        loop // Makes it repeat forever
        src="/assets/OceanWaves.mp3" // Ensure this file exists!
      />

      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;700&display=swap');`}
      </style>

      {/* VIGNETTE */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, 
        background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)'
      }} />

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
            textShadow: '0 4px 20px rgba(0,0,0,0.5)', 
            whiteSpace: 'nowrap'
          }}
          initial={{ fontSize: "15rem", opacity: 0 }} 
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
            color: '#ffffff', 
            fontSize: '1.2rem', 
            fontWeight: '600',
            letterSpacing: '2px',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}
        >
          WEB AND GAME DEVELOPMENT
        </motion.p>

        {/* STATUS INDICATOR */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          style={{ 
            marginTop: '20px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            marginLeft: '5px'
          }}
        >
          <div style={{ position: 'relative', width: '12px', height: '12px' }}>
            <span style={{ 
              position: 'absolute', width: '100%', height: '100%', 
              borderRadius: '50%', background: '#4ade80', opacity: 0.75, 
              animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' 
            }} />
            <span style={{ 
              position: 'relative', display: 'block', width: '12px', height: '12px', 
              borderRadius: '50%', background: '#22c55e' 
            }} />
          </div>
          <span style={{ 
            fontFamily: "'Inter', sans-serif", 
            color: 'rgba(255,255,255,0.8)', 
            fontSize: '0.85rem', 
            fontWeight: '500',
            letterSpacing: '1px' 
          }}>
            OPEN TO WORK
          </span>
          <style>{`
            @keyframes ping {
              75%, 100% { transform: scale(2); opacity: 0; }
            }
          `}</style>
        </motion.div>

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
          
          {/* LEFT SIDE: TECH STACK + SOCIALS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'flex', gap: '10px', opacity: 0.9 }}>
              {['REACT', 'TS', 'THREE JS'].map(tech => (
                <span key={tech} style={{
                  fontFamily: "'Bebas Neue', sans-serif", 
                  color: 'rgba(255,255,255,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)', 
                  padding: '4px 10px', 
                  borderRadius: '4px',
                  fontSize: '1rem',
                  letterSpacing: '1px'
                }}>
                  {tech}
                </span>
              ))}
            </div>

            <div style={{ pointerEvents: 'auto', display: 'flex', gap: '20px' }}>
              <button 
                onClick={() => window.open('https://github.com/Nekohime345', '_blank')} 
                style={btnStyle}
              >
                GITHUB
              </button>
              <button 
                onClick={() => window.open('https://www.linkedin.com/in/kiro-basanal-0432103a5/', '_blank')} 
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
          </div>

          {/* RIGHT SIDE: INSTRUCTIONS + SOUND TOGGLE */}
          <div style={{ textAlign: 'right', color: 'white', opacity: 0.9, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '15px' }}>
            
            {section === null && (
              <p style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontSize: '1rem', 
                fontWeight: 'bold',
                margin: 0,
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}>
                DRAG TO EXPLORE &
                SCROLL TO ZOOM
              </p>
            )}

            {/* SOUND TOGGLE BUTTON */}
            <button 
              onClick={() => setMuted(!muted)}
              style={{
                pointerEvents: 'auto',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
                fontSize: '1.2rem',
                backdropFilter: 'blur(5px)'
              }}
            >
              {muted ? "🔇" : "🔊"}
            </button>

          </div>
        </footer>
      </motion.div>
    </div>
  );
}

const btnStyle = {
  background: 'rgba(255, 255, 255, 0.1)', 
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.5)', 
  color: 'white',
  padding: '14px 32px', 
  borderRadius: '40px',
  fontFamily: "'Inter', sans-serif",
  fontSize: '1rem', 
  fontWeight: '600',
  letterSpacing: '1px',
  cursor: 'pointer',
  transition: 'background 0.3s, transform 0.2s',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
};
