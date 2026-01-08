// components/pages/Resume.tsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Resume() {
  const resumePdf = "/assets/Basanal-Resume.pdf"; 
  const page1 = "/assets/Basanal-Resume_page-0001.jpg"; 
  const page2 = "/assets/Basanal-Resume_page-0002.jpg"; 

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="resume-section"
      >
        {/* RESUME VIEWER CARD */}
        <div className="resume-card">
          {/* Header Bar */}
          <div className="resume-header">
            PREVIEW MODE • SCROLL TO READ
          </div>

          {/* Scrollable Container */}
          <div className="resume-content">
            <img src={page1} alt="Resume Page 1" className="resume-page" />
            <img src={page2} alt="Resume Page 2" className="resume-page" />
          </div>
        </div>

        {/* DOWNLOAD BUTTON */}
        <a href={resumePdf} download="Basanal-Resume.pdf" className="download-btn">
          DOWNLOAD PDF
        </a>
      </motion.section>

      {/* RESPONSIVE CSS STYLES */}
      <style>{`
        /* GLOBAL RESET FOR RESUME */
        .resume-section * {
          box-sizing: border-box;
        }

        /* --- 1. DEFAULT (MOBILE PHONE) --- */
        .resume-section {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center; /* Centers vertically */
          pointer-events: none;
          
          /* FIX: Padding to clear mobile headers */
          padding: 80px 20px 20px 20px;
          box-sizing: border-box;
        }

        .resume-card {
          background: rgba(255, 255, 255, 0.95);
          width: 100%;
          max-width: 600px;
          height: 65vh; /* Slightly shorter on mobile to fit button */
          pointer-events: auto;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .resume-header {
          background: #333;
          color: #fff;
          padding: 12px;
          text-align: center;
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          flex-shrink: 0;
          z-index: 2;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .resume-content {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          background: #e5e5e5;
          padding: 15px; /* Smaller padding on mobile */
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
          
          /* Hide scrollbar */
          scrollbar-width: none;
        }
        .resume-content::-webkit-scrollbar { display: none; }

        .resume-page {
          width: 100%; /* Make images responsive */
          height: auto;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          background: white;
          display: block;
        }

        .download-btn {
          margin-top: 20px;
          background: #00aaff;
          color: white;
          text-decoration: none;
          padding: 12px 30px; /* Smaller button on mobile */
          border-radius: 30px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem;
          pointer-events: auto;
          letter-spacing: 1px;
          box-shadow: 0 0 20px rgba(0, 170, 255, 0.4);
          transition: transform 0.2s;
          cursor: pointer;
          white-space: nowrap;
        }

        /* --- 2. TABLET (iPad, > 768px) --- */
        @media (min-width: 768px) {
          .resume-card {
            width: 80%;
            height: 70vh;
          }
          .resume-content { padding: 20px; }
          .download-btn { font-size: 1.4rem; padding: 15px 35px; }
        }

        /* --- 3. DESKTOP (PC, > 1024px) --- */
        @media (min-width: 1024px) {
          .resume-section {
            /* Reset top padding on desktop */
            padding: 0;
            justify-content: center;
          }
          
          .resume-card {
            width: 600px; /* Fixed width for desktop readablity */
            height: 80vh;
          }

          .download-btn {
            font-size: 1.5rem;
            padding: 15px 40px;
            margin-top: 25px;
          }

          .download-btn:hover {
            transform: scale(1.05);
          }
        }
      `}</style>
    </>
  );
}
