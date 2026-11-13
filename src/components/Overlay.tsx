import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import your pages
import Works from './pages/Works';
import About from './pages/About';
import Contact from './pages/Contact';
import Resume from './pages/Resume';

export default function Overlay({ navigationVisible }: { navigationVisible: boolean }) {
  const [section, setSection] = useState<string | null>(null);
  const skills = [
    'JAVASCRIPT', 'TYPESCRIPT', 'PYTHON', 'PHP', 'C#', 'JAVA',
    'HTML', 'CSS', 'REACT', 'NEXT.JS', 'TAILWIND CSS', 'THREE.JS',
    'FASTAPI', 'FIREBASE', 'REST API', 'FIRESTORE', 'PRISMA',
    'GIT', 'GITHUB', 'FIGMA', 'VERCEL', 'ARDUINO',
  ];
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="portfolio-overlay" style={{
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
      
      <div className="portfolio-grid" aria-hidden="true" />

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
          // FIX: If a section is open, bring it to front (50). If closed, send to back (0).
          zIndex: 10,
          pointerEvents: section ? 'auto' : 'none',
          cursor: section ? 'zoom-out' : 'default',
          transition: 'z-index 0.2s step-end' // smooth transition
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
          top: isMobile ? "30px" : "50%",
          left: isMobile ? "0" : "50%",
          transform: isMobile ? "none" : "translate(-50%, -50%)",
          position: "absolute",
          textAlign: isMobile ? "center" : "left"
        }}
        animate={{ 
          top: isMobile ? "30px" : "60px", 
          left: isMobile ? "0" : "60px",
          transform: isMobile ? "none" : "translate(0%, 0%)",
          textAlign: isMobile ? "center" : "left"
        }}
        transition={{ 
          duration: isMobile ? 0.6 : 1.5,
          ease: "easeInOut", 
          delay: isMobile ? 0.4 : 3
        }}
        style={{ zIndex: 20, pointerEvents: 'auto', cursor: 'pointer', width: isMobile ? '100%' : 'auto', padding: isMobile ? '0 4px' : 0 }}
        onClick={() => setSection(null)} 
      >
        <motion.h1 
          style={{ 
            fontFamily: "'Bebas Neue', sans-serif", 
            margin: 0, 
            color: '#ffffff',
            lineHeight: '0.85',
            textShadow: '8px 8px 0 rgba(255, 198, 48, 0.75)',
            whiteSpace: 'nowrap',
            maxWidth: '100%'
          }}
          initial={{ fontSize: isMobile ? "3.1rem" : "15rem", opacity: 0 }}
          animate={{ fontSize: isMobile ? "3.1rem" : "8rem", opacity: 1 }}
          transition={{ 
            duration: isMobile ? 0.7 : 2.5,
            ease: [0.16, 1, 0.3, 1], 
          }}
        >
          Kiro D. Basanal
        </motion.h1>

        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          style={{ 
            fontFamily: "'Montserrat', sans-serif", 
            margin: '10px 0 0 5px', 
            color: '#ffffff', 
            fontSize: isMobile ? '0.9rem' : '1.2rem', // Smaller text on mobile/tablet
            fontWeight: '600',
            letterSpacing: '2px',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            background: 'linear-gradient(90deg, #fff0a3, #ffc630 52%, #e88b12)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          WEB AND GAME DEVELOPMENT
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.8, duration: 1 }}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            maxWidth: isMobile ? '24rem' : '42rem',
            margin: isMobile ? '10px auto 0' : '12px 0 0 5px',
            color: 'rgba(255,255,255,0.82)',
            fontSize: isMobile ? '0.88rem' : '1.1rem',
            lineHeight: isMobile ? 1.45 : 1.6,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}
        >
          I create interactive digital experiences through web development, game development, and 3D.
        </motion.p>

        {/* STATUS INDICATOR */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          style={{ 
            marginTop: isMobile ? '14px' : '20px',
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
            fontFamily: "'Montserrat', sans-serif", 
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

        <motion.nav
          aria-label="Main navigation"
          initial={{ opacity: 0, x: 56 }}
          animate={navigationVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 56 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onClick={(event) => event.stopPropagation()}
          style={{
            pointerEvents: navigationVisible ? 'auto' : 'none',
            display: isMobile ? 'flex' : 'none',
            position: isMobile ? 'fixed' : 'static',
            left: isMobile ? 0 : 'auto',
            right: isMobile ? 0 : 'auto',
            bottom: isMobile ? '84px' : 'auto',
            flexDirection: 'row',
            alignItems: isMobile ? 'center' : 'flex-start',
            justifyContent: isMobile ? 'center' : 'flex-start',
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            gap: isMobile ? '8px' : '14px',
            width: isMobile ? '100%' : 'min(42rem, 75vw)',
            margin: isMobile ? 0 : '24px 0 0',
            zIndex: 31
          }}
        >
          {['WORKS', 'ABOUT', 'CONTACT'].map((item) => (
            <button
              key={item}
              onClick={() => setSection(item.toLowerCase())}
              style={navButtonStyle(isMobile, section === item.toLowerCase())}
            >
              {item}
            </button>
          ))}
        </motion.nav>

      </motion.div>

      {/* 
          NAVIGATION & FOOTER 
          Logic: We switch flex-direction based on screen size.
      */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.6 }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 30
        }}
      >
        
        {/* BOTTOM SECTION */}
        <footer style={{
          position: 'absolute',
          left: isMobile ? '20px' : '50px',
          right: isMobile ? '20px' : '50px',
          bottom: isMobile ? '20px' : '50px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: isMobile ? 'center' : 'space-between',
          gap: '12px',
          pointerEvents: 'none'
        }}>
          {!isMobile && <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            gap: '8px',
            width: 'min(65vw, 920px)',
            maxWidth: '100%',
            pointerEvents: 'none'
          }}>
            {skills.map((skill) => (
              <span key={skill} style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: 'rgba(255,255,255,0.82)',
                border: '1px solid rgba(255,198,48,0.28)',
                background: 'rgba(8,9,11,0.72)',
                padding: '4px 9px',
                borderRadius: '4px',
                fontSize: '1rem',
                letterSpacing: '1px'
              }}>
                {skill}
              </span>
            ))}
          </div>}

          {/* SOCIAL LINKS (at the former sound control position) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            position: 'static',
            pointerEvents: 'auto'
          }}>
            <a href="https://github.com/Nekohime345" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub" style={iconBtnStyle}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/kiro-basanal-0432103a5/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn" style={iconBtnStyle}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <button onClick={() => setSection('resume')} aria-label="Resume" title="Resume" style={{ ...iconBtnStyle, background: section === 'resume' ? 'rgba(255, 198, 48, 0.2)' : iconBtnStyle.background }}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>
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

const iconBtnStyle = {
  background: 'rgba(12, 13, 15, 0.82)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 198, 48, 0.28)',
  color: 'white',
  width: '46px',
  height: '46px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'background 0.3s, transform 0.2s',
  boxShadow: '0 8px 24px rgba(0,0,0,0.28)'
};

const navButtonStyle = (isMobile: boolean, isActive: boolean) => ({
  background: 'rgba(9, 10, 12, 0.72)',
  border: '1px solid rgba(255, 198, 48, 0.22)',
  fontFamily: "'Bebas Neue', sans-serif",
  color: isActive ? '#ffd85a' : 'white',
  fontSize: isMobile ? '1.2rem' : '2.5rem',
  cursor: 'pointer',
  padding: isMobile ? '6px 15px' : '7px 22px',
  borderRadius: '8px',
  letterSpacing: '1.5px',
  textShadow: '0 4px 10px rgba(0,0,0,0.3)',
  transition: 'transform 0.2s, color 0.3s ease'
});
