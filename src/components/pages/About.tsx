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
        width: '90%', // Added for responsiveness
        maxHeight: '90vh', // Added for responsiveness
        overflowY: 'auto', // Added for responsiveness
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
        
        {/* MERGED BIO: Kept the tone, added the specific details */}
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', lineHeight: '1.6', color: '#ddd', marginTop: '20px' }}>
          I'm a <strong>4th-year IT student</strong> at <strong>Cebu Technological University - Argao Campus</strong>, bridging the gap between Full-Stack Development and Game Development.
        </p>
        
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', lineHeight: '1.6', color: '#bbb' }}>
          My expertise lies in <strong>Javascript, C#, and </strong>, which I've used to build robust solutions like Management Systems. Beyond web apps, I have started to take interest on experiences on <strong>Roblox (Lua)</strong>.
        </p>
        
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', lineHeight: '1.6', color: '#bbb' }}>
          Currently expanding my skills in the Node.js ecosystem (React, Next.js, TypeScript). When I'm not coding, I'm likely debugging game logic or testing out different games.
        </p>

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          {/* UPDATED SKILLS LIST */}
          {['React / Next.js', 'PHP & MySQL', 'C# / ASP.NET', 'Roblox Lua', 'Firebase', 'Cybersec', 'TypeScript'].map(skill => (
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
