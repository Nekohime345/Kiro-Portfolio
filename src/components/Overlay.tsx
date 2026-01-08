import React, { useState, useEffect, useRef } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';

// Import your pages
import Works from './pages/Works';
import About from './pages/About';
import Contact from './pages/Contact';
import Resume from './pages/Resume';

export default function Overlay() {
  const [section, setSection] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  
  // 1. UPDATED MOBILE/TABLET DETECTION
  // Changed from < 768 to <= 1024 to include tablets (like iPads) in the "mobile" layout
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (muted) {
        audioRef.current.pause();
      } else {
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
      padding: isMobile ? '20px' : '50px', // Adjusted padding for mobile/tablet
      boxSizing: 'border-box',
      zIndex: 10,
      overflow: 'hidden' 
    }}>
      
      <audio 
        ref={audioRef} 
        loop 
        src="/assets/OceanWaves.mp3" 
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

      {/* 
          ANIMATED TITLE 
          Logic: If Mobile/Tablet -> Center Top. If Desktop -> Top Left.
      */}
      <motion.div
        initial={{ 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)", 
          position: "absolute",
          textAlign: "center"
        }}
        animate={{ 
          top: isMobile ? "30px" : "60px", 
          left: isMobile ? "50%" : "60px", 
          transform: isMobile ? "translate(-50%, 0%)" : "translate(0%, 0%)", 
          textAlign: isMobile ? "center" : "left"
        }}
        transition={{ 
          duration: 1.5, 
          ease: "easeInOut", 
          delay: 3 
        }}
        style={{ zIndex: 20, pointerEvents: 'auto', cursor: 'pointer', width: isMobile ? '100%' : 'auto' }}
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
          animate={{ fontSize: isMobile ? "4rem" : "8rem", opacity: 1 }} // Smaller font on mobile/tablet
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
            fontSize: isMobile ? '0.9rem' : '1.2rem', // Smaller text on mobile/tablet
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
            justifyContent: isMobile ? 'center' : 'flex-start', // Center on mobile/tablet
            gap: '10px',
            marginLeft: isMobile ? 0 : '5px'
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

      {/* 
          NAVIGATION & FOOTER 
          Logic: We switch flex-direction based on screen size.
      */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 4, duration: 1 }}
        style={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          // MOBILE/TABLET: Stack everything at the bottom. DESKTOP: Spread top/bottom
          flexDirection: isMobile ? 'column-reverse' : 'column', 
          justifyContent: isMobile ? 'flex-start' : 'space-between', 
          zIndex: 30 
        }}
      >
        
        {/* TOP NAV (Desktop Only - Hidden on Tablets/Mobile) */}
        {!isMobile && (
          <header style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <nav style={{ pointerEvents: 'auto', display: 'flex', gap: '40px' }}>
              {['WORKS', 'ABOUT', 'CONTACT'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => setSection(item.toLowerCase())}
                  style={navButtonStyle(false, section === item.toLowerCase())}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {item}
                </button>
              ))}
            </nav>
          </header>
        )}

        {/* BOTTOM SECTION */}
        <footer style={{ 
          display: 'flex', 
          // MOBILE/TABLET: Column (stacked). DESKTOP: Row (spread).
          flexDirection: isMobile ? 'column' : 'row', 
          justifyContent: isMobile ? 'flex-end' : 'space-between', 
          alignItems: isMobile ? 'center' : 'flex-end', 
          gap: isMobile ? '20px' : '0',
          paddingBottom: isMobile ? '20px' : '0' // Extra padding for mobile/tablet bottom
        }}>
          
          {/* LEFT SIDE: TECH STACK + SOCIALS */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '20px',
            alignItems: isMobile ? 'center' : 'flex-start',
            width: isMobile ? '100%' : 'auto'
          }}>
            
            {/* MOBILE/TABLET NAV (Appears above icons) */}
            {isMobile && (
              <nav style={{ pointerEvents: 'auto', display: 'flex', gap: '20px', marginBottom: '10px' }}>
                {['WORKS', 'ABOUT', 'CONTACT'].map((item) => (
                  <button 
                    key={item} 
                    onClick={() => setSection(item.toLowerCase())}
                    style={navButtonStyle(true, section === item.toLowerCase())}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            )}

            {/* Tech Stack (Hidden on mobile/tablet to save space) */}
            {!isMobile && (
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
            )}

            {/* Social Buttons: Standard on Desktop, Iconized on Mobile/Tablet */}
            <div style={{ pointerEvents: 'auto', display: 'flex', gap: isMobile ? '15px' : '20px' }}>
              <button 
                onClick={() => window.open('https://github.com/Nekohime345', '_blank')} 
                style={isMobile ? iconBtnStyle : btnStyle}
                title="GitHub"
              >
                {isMobile ? (
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
                ) : "GITHUB"}
              </button>
              <button 
                onClick={() => window.open('https://www.linkedin.com/in/kiro-basanal-0432103a5/', '_blank')} 
                style={isMobile ? iconBtnStyle : btnStyle}
                title="LinkedIn"
              >
                {isMobile ? (
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                ) : "LINKEDIN"}
              </button>
              <button 
                onClick={() => setSection('resume')}
                style={{
                  ...(isMobile ? iconBtnStyle : btnStyle), 
                  background: section === 'resume' ? 'rgba(0, 170, 255, 0.4)' : (isMobile ? iconBtnStyle.background : btnStyle.background)
                }}
                title="Resume"
              >
                {isMobile ? (
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>
                ) : "RESUME"}
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: INSTRUCTIONS + SOUND TOGGLE */}
          <div style={{ 
            textAlign: 'right', 
            color: 'white', 
            opacity: 0.9, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-end', 
            gap: '15px',
            position: isMobile ? 'absolute' : 'static', // Fix volume to bottom-right corner on mobile/tablet
            bottom: isMobile ? '20px' : 'auto',
            right: isMobile ? '20px' : 'auto'
          }}>
            
            {section === null && !isMobile && (
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

// ------------------------------------
// STYLE HELPERS
// ------------------------------------

const btnStyle = {
  background: 'rgba(255, 255, 255, 0.1)', 
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.5)', 
  color: 'white',
  padding: '14px 32px', 
  borderRadius: '40px',
  fontFamily: "'Inter', sans-serif",
  fontSize: '1rem', 
  fontWeight: 600,
  letterSpacing: '1px',
  cursor: 'pointer',
  transition: 'background 0.3s, transform 0.2s',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
};

const iconBtnStyle = {
  background: 'rgba(255, 255, 255, 0.1)', 
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.5)', 
  color: 'white',
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'background 0.3s, transform 0.2s',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
};

const navButtonStyle = (isMobile: boolean, isActive: boolean) => ({
  background: 'none',
  border: 'none',
  fontFamily: "'Bebas Neue', sans-serif",
  color: isActive ? '#00aaff' : 'white', 
  fontSize: isMobile ? '1.5rem' : '2.5rem', 
  cursor: 'pointer',
  textShadow: '0 4px 10px rgba(0,0,0,0.3)',
  transition: 'transform 0.2s, color 0.3s ease'
});
