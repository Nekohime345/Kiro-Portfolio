// components/pages/Works.tsx
import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  { id: 1, title: 'Port Congestion Management', category: 'Windows App/ Mobile App', desc: 'port congestion management platform to visualize vessel traffic, port layouts, and congestion levels in a 3D environment..' },
  { id: 2, title: 'ShareSpace Booking System', category: 'Backend', desc: 'A platform for room reservation platform allowing users to book and manage shared spaces..' },
  { id: 3, title: 'Campus Quest', category: 'Web App/Game Dev', desc: 'Designed and developed an interactive 3D campus navigation game using Three.js, enabling students to locate and explore campus areas virtually.' },
  { id: 4, title: 'Student Affair Office (SAO) System', category: 'Python', desc: 'Collaborated on a backend system using Django to streamline student record management and office services for the university.' },
];

export default function Works() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="works-section"
      >
        <div className="works-container">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3 className="project-title">
                {project.title}
              </h3>
              
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <span className="project-category">
                  {project.category}
                </span>
              </div>
              
              <p className="project-desc">
                {project.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* RESPONSIVE CSS STYLES */}
      <style>{`
        /* --- 1. DEFAULT (MOBILE PHONE) --- */
        .works-section {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          /* Center vertically only if content fits, otherwise top align for scroll */
          justify-content: flex-start; 
          padding: 80px 20px 100px 20px; /* Top pad for header, Bottom pad for footer */
          pointer-events: none; /* Click-through for background */
          overflow-y: auto; /* Enable scrolling for long lists */
          box-sizing: border-box;
          
          /* Hide scrollbar */
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .works-section::-webkit-scrollbar { display: none; }

        .works-container {
          display: grid;
          /* Mobile: 1 column, full width */
          grid-template-columns: 1fr; 
          gap: 15px;
          width: 100%;
          max-width: 1200px;
          pointer-events: auto; /* Re-enable clicks */
          margin: auto 0; /* Vertically center if list is short */
        }

        .project-card {
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 20px; /* Smaller padding on mobile */
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s;
        }
        
        .project-card:hover {
          background: rgba(0, 0, 0, 0.75);
          border-color: rgba(0, 170, 255, 0.5);
        }

        .project-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem; /* Mobile size */
          margin: 0 0 10px 0;
          color: #fff;
          line-height: 1;
        }

        .project-category {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          background: rgba(255,255,255,0.15);
          padding: 4px 8px;
          border-radius: 4px;
          color: #ddd;
          white-space: nowrap;
        }

        .project-desc {
          font-family: 'Inter', sans-serif;
          color: #ccc;
          margin-top: 12px;
          line-height: 1.5;
          font-size: 0.85rem;
        }

        /* --- 2. TABLET (iPad, > 768px) --- */
        @media (min-width: 768px) {
          .works-section {
            padding: 100px 40px;
            justify-content: center; /* Center layout on larger screens */
          }
          
          .works-container {
            /* Tablet: 2 columns */
            grid-template-columns: repeat(2, 1fr); 
            gap: 20px;
          }

          .project-card { padding: 25px; }
          .project-title { font-size: 1.8rem; }
          .project-desc { font-size: 0.9rem; }
        }

        /* --- 3. DESKTOP (PC, > 1024px) --- */
        @media (min-width: 1024px) {
          .works-container {
            /* Desktop: Auto fit (usually 3 columns) */
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
          }
          
          .project-card {
            padding: 30px;
            transition: transform 0.2s ease;
          }
          
          .project-card:hover {
            transform: translateY(-5px);
          }

          .project-title { font-size: 2rem; }
          .project-category { font-size: 0.8rem; }
          .project-desc { font-size: 1rem; }
        }
      `}</style>
    </>
  );
}
