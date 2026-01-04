// components/pages/Resume.tsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Resume() {
  const resumePdf = "/assets/Basanal-Resume.pdf"; 
  
  // DEFINE BOTH PAGES
  const page1 = "/assets/Basanal-Resume_page-0001.jpg"; 
  const page2 = "/assets/Basanal-Resume_page-0002.jpg"; 

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none'
      }}
    >
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)', 
        width: '600px', 
        height: '80vh', // Slightly taller to accommodate scrolling
        pointerEvents: 'auto',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        
        {/* Header Bar (Stays Fixed) */}
        <div style={{ 
          background: '#333', 
          color: '#fff', 
          padding: '12px', 
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.8rem',
          flexShrink: 0, // Prevents header from shrinking
          zIndex: 2,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          PREVIEW MODE • SCROLL TO READ
        </div>

        {/* 
            SCROLLABLE CONTAINER 
            This div holds the images and allows scrolling
        */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', // Enables vertical scrolling
          overflowX: 'hidden',
          background: '#e5e5e5', // Grey background behind pages
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px', // Space between pages
          alignItems: 'center'
        }}>
            {/* Page 1 */}
            <img 
              src={page1} 
              alt="Resume Page 1"
              style={pageStyle}
            />
            
            {/* Page 2 */}
            <img 
              src={page2} 
              alt="Resume Page 2"
              style={pageStyle}
            />
        </div>
      </div>

      {/* DOWNLOAD BUTTON */}
      <a 
        href={resumePdf} 
        download="Basanal-Resume.pdf" 
        style={{
          marginTop: '25px',
          background: '#00aaff',
          color: 'white',
          textDecoration: 'none',
          padding: '15px 40px',
          borderRadius: '30px',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '1.5rem',
          pointerEvents: 'auto',
          letterSpacing: '1px',
          boxShadow: '0 0 20px rgba(0, 170, 255, 0.4)',
          transition: 'transform 0.2s',
          cursor: 'pointer'
        }}
      >
        DOWNLOAD PDF
      </a>
    </motion.section>
  );
}

// Shared style for the pages to keep them consistent
const pageStyle: React.CSSProperties = {
  width: '100%', 
  height: 'auto', 
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  background: 'white',
  display: 'block'
};
