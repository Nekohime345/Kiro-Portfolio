import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        className="about-section"
      >
        <div className="about-container">
          <h2 className="about-title">WHO AM I?</h2>
          
          <div className="about-bio">
            <p>
              I'm a <strong>4th-year IT student</strong> at <strong>Cebu Technological University - Argao Campus</strong>, bridging the gap between Full-Stack Development and Game Development.
            </p>
            <p>
              My expertise lies in <strong>Javascript, C#, and HTML</strong>, which I've used to build robust solutions like Management Systems. Beyond web apps, I have started to take interest on experiences on <strong>Roblox (Lua)</strong>.
            </p>
            <p>
              Currently expanding my skills in the Node.js ecosystem (React, TypeScript). When I'm not coding, I'm likely debugging game logic or testing out different games.
            </p>
          </div>

          <div className="skills-grid">
            {['React / Next.js', 'PHP & MySQL', 'C# / ASP.NET', 'Roblox Lua', 'Firebase', 'Cybersec', 'TypeScript'].map(skill => (
              <span key={skill} className="skill-badge">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      <style>{`
        /* --- 1. DEFAULT (MOBILE PHONE) --- */
        .about-section {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          
          /* FIX 1: Add Box Sizing */
          box-sizing: border-box; 
          
          /* FIX 2: Add padding so it doesn't touch edges or cover header */
          padding: 80px 20px 20px 20px; 
        }

        .about-container {
          pointer-events: auto;
          width: 100%; 
          max-width: 500px; /* Limits width so it doesn't stretch too wide */
          max-height: 85vh;
          overflow-y: auto;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(20px);
          padding: 25px 20px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          text-align: center;
          scrollbar-width: none;
          box-sizing: border-box; /* Ensure padding inside container is handled too */
        }
        
        .about-container::-webkit-scrollbar { display: none; }

        .about-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.2rem;
          margin: 0 0 15px 0;
          color: #00aaff;
          line-height: 1;
        }

        .about-bio {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .about-bio p {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          line-height: 1.5;
          color: #ccc;
          margin: 0;
        }

        .skills-grid {
          margin-top: 25px;
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .skill-badge {
          border: 1px solid #00aaff;
          color: #00aaff;
          padding: 5px 10px;
          border-radius: 20px;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
        }

        /* --- 2. TABLET (iPad, Large Phones > 768px) --- */
        @media (min-width: 768px) {
          .about-container {
            width: 80%;
            padding: 40px;
          }
          .about-title { font-size: 3rem; }
          .about-bio p { font-size: 1rem; }
          .skill-badge { font-size: 0.85rem; padding: 6px 14px; }
        }

        /* --- 3. DESKTOP (Laptop/PC > 1024px) --- */
        @media (min-width: 1024px) {
          .about-section { 
             /* Remove top padding on desktop since header is on the side/top-left */
             padding: 0; 
          }
          .about-container {
            width: 90%;
            max-width: 800px;
            padding: 50px;
            max-height: 90vh;
          }
          .about-title { font-size: 4rem; margin-bottom: 20px; }
          .about-bio { gap: 20px; }
          .about-bio p { font-size: 1.1rem; line-height: 1.6; }
          .skills-grid { gap: 12px; margin-top: 30px; }
          .skill-badge { padding: 8px 16px; font-size: 0.9rem; }
        }
      `}</style>
    </>
  );
}
