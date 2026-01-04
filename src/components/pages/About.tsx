// components/pages/About.tsx
import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
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
        maxWidth: '800px',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(15px)',
        padding: '50px',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.1)',
        pointerEvents: 'auto',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '4rem', margin: 0, color: '#00aaff' }}>
          WHO AM I?
        </h2>
        
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', lineHeight: '1.6', color: '#ddd', marginTop: '20px' }}>
          I'm a BSIT student based in <strong>Cebu, Philippines</strong>, bridging the gap between Full-Stack Development and Game Development. 
        </p>
        
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', lineHeight: '1.6', color: '#bbb' }}>
          Currently exploring the depths of Firebase, React, and C#. When I'm not coding, I'm likely developing games on Roblox or hunting for Valorant skins.
        </p>

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          {['React', 'Firebase', 'Python', 'Lua', 'Cybersec', 'C#'].map(skill => (
            <span key={skill} style={{
              border: '1px solid #00aaff',
              color: '#00aaff',
              padding: '8px 16px',
              borderRadius: '20px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9rem'
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
