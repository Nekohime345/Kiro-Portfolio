// components/pages/Resume.tsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Resume() {
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
        background: '#fff',
        width: '500px',
        height: '700px', // A4 Aspect ratio-ish
        pointerEvents: 'auto',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#333'
      }}>
        {/* Placeholder for PDF Viewer or Image */}
        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', margin: 0 }}>RESUME PREVIEW</h3>
        <p style={{ fontFamily: "'Inter', sans-serif" }}>PDF Viewer Content Here</p>
      </div>

      <a href="/path-to-your-resume.pdf" download style={{
        marginTop: '30px',
        background: '#00aaff',
        color: 'white',
        textDecoration: 'none',
        padding: '15px 40px',
        borderRadius: '30px',
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '1.5rem',
        pointerEvents: 'auto',
        letterSpacing: '1px',
        boxShadow: '0 0 20px rgba(0, 170, 255, 0.4)'
      }}>
        DOWNLOAD PDF
      </a>
    </motion.section>
  );
}
