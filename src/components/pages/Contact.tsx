// components/pages/Contact.tsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none'
      }}
    >
      <div style={{
        background: 'rgba(20, 20, 20, 0.85)',
        backdropFilter: 'blur(20px)',
        padding: '60px',
        borderRadius: '4px',
        borderLeft: '4px solid #00aaff',
        pointerEvents: 'auto',
        color: 'white',
        width: '400px'
      }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '3rem', margin: 0 }}>
          LET'S TALK
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", color: '#888', marginBottom: '30px' }}>
          Got a project or an internship offer?
        </p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="Name" style={inputStyle} />
          <input type="email" placeholder="Email" style={inputStyle} />
          <textarea rows={4} placeholder="Message" style={inputStyle} />
          
          <button style={{
            background: '#00aaff',
            color: 'white',
            border: 'none',
            padding: '12px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '10px',
            fontFamily: "'Inter', sans-serif"
          }}>
            SEND MESSAGE
          </button>
        </form>
      </div>
    </motion.section>
  );
}

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  padding: '15px',
  color: 'white',
  fontFamily: "'Inter', sans-serif",
  fontSize: '0.9rem',
  outline: 'none'
};
