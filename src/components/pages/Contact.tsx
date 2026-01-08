// components/pages/Contact.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [status, setStatus] = useState(""); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/xpqwkzgg", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus("success");
        form.reset(); 
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="contact-section"
      >
        <div className="contact-card">
          <h2 className="contact-title">LET'S TALK</h2>
          <p className="contact-subtitle">
            Got a project or an internship offer?
          </p>

          <form onSubmit={handleSubmit} className="contact-form">
            <input 
              type="text" 
              name="name" 
              placeholder="Name" 
              required
              className="contact-input"
            />

            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              required
              className="contact-input"
            />

            <textarea 
              name="message" 
              rows={4} 
              placeholder="Message" 
              required
              className="contact-input contact-textarea"
            />
            
            <button 
              type="submit" 
              disabled={status === "sending" || status === "success"}
              className="contact-btn"
              style={{
                background: status === 'success' ? '#4ade80' : '#00aaff',
                cursor: status === 'sending' ? 'wait' : 'pointer',
              }}
            >
              {status === "sending" ? "SENDING..." : status === "success" ? "MESSAGE SENT!" : "SEND MESSAGE"}
            </button>

            {status === "error" && (
              <p className="error-msg">
                Oops! Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </motion.section>

      {/* RESPONSIVE CSS STYLES */}
      <style>{`
        /* --- 1. DEFAULT (MOBILE PHONE) --- */
        .contact-section {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          padding: 20px;
        }

        .contact-card {
          pointer-events: auto;
          background: rgba(20, 20, 20, 0.9);
          backdrop-filter: blur(20px);
          padding: 30px 25px; /* Compact padding for mobile */
          border-radius: 4px;
          border-left: 4px solid #00aaff;
          color: white;
          width: 100%;
          max-width: 400px; /* Limits width on larger screens */
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .contact-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem; /* Smaller title for mobile */
          margin: 0;
          line-height: 1;
        }

        .contact-subtitle {
          font-family: 'Inter', sans-serif;
          color: #888;
          margin-bottom: 20px;
          font-size: 0.9rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 12px; /* Smaller gap for mobile */
        }

        .contact-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 12px;
          color: white;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          outline: none;
          border-radius: 4px;
          width: 100%;
          box-sizing: border-box; /* Ensures padding doesn't break width */
        }

        .contact-textarea {
          resize: vertical; /* Allow vertical resizing only */
          min-height: 80px;
        }

        .contact-btn {
          color: white;
          border: none;
          padding: 12px;
          font-size: 0.9rem;
          font-weight: bold;
          margin-top: 5px;
          font-family: 'Inter', sans-serif;
          transition: background 0.3s;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .error-msg {
          color: #ef4444;
          margin: 5px 0 0 0;
          font-size: 0.8rem;
          text-align: center;
        }

        /* --- 2. TABLET (iPad, > 768px) --- */
        @media (min-width: 768px) {
          .contact-card {
            padding: 40px;
            width: 80%;
          }
          .contact-title { font-size: 2.8rem; }
        }

        /* --- 3. DESKTOP (PC, > 1024px) --- */
        @media (min-width: 1024px) {
          .contact-section { padding: 0; }
          .contact-card {
            padding: 60px;
            width: 400px;
          }
          .contact-title { font-size: 3rem; }
          .contact-subtitle { margin-bottom: 30px; font-size: 1rem; }
          .contact-form { gap: 15px; }
          .contact-input { padding: 15px; font-size: 1rem; }
          .contact-btn { font-size: 1rem; margin-top: 10px; }
        }
      `}</style>
    </>
  );
}
