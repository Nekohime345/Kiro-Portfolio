// components/pages/Works.tsx
import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  { id: 1, title: 'RideRescue', category: 'Web App / QA', desc: 'Emergency roadside assistance platform.' },
  { id: 2, title: 'E-Commerce Marketplace', category: 'Full Stack', desc: 'A platform for buying and selling digital assets.' },
  { id: 3, title: 'Roblox Mining Sim', category: 'Game Dev', desc: 'Lua-based mining simulator game.' },
  { id: 4, title: 'Cybersec Tools', category: 'Python / OSINT', desc: 'Custom scripts for network analysis.' },
];

export default function Works() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      style={{
        width: '100%',
        height: '100%',
        padding: '100px 40px', // Top padding clears your header
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none' // Allows clicking through empty spaces
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '1200px',
        pointerEvents: 'auto' // Re-enable clicks for the cards
      }}>
        {projects.map((project) => (
          <div key={project.id} style={cardStyle}>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', margin: '0 0 10px 0', color: '#fff' }}>
              {project.title}
            </h3>
            <span style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontSize: '0.8rem', 
              background: 'rgba(255,255,255,0.2)', 
              padding: '4px 8px', 
              borderRadius: '4px',
              color: '#eee'
            }}>
              {project.category}
            </span>
            <p style={{ fontFamily: "'Inter', sans-serif", color: '#ccc', marginTop: '15px', lineHeight: '1.5' }}>
              {project.desc}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

const cardStyle: React.CSSProperties = {
  background: 'rgba(0, 0, 0, 0.6)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  padding: '30px',
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
};
