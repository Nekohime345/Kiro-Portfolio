// components/pages/Contact.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  // 1. STATE FOR FEEDBACK (Success/Error)
  const [status, setStatus] = useState(""); 

  // 2. HANDLE SUBMIT FUNCTION
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");

    try {
      // 3. REPLACE THIS URL WITH YOUR FORMSPREE URL
      const response = await fetch("https://formspree.io/f/xpqwkzgg", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("success");
        form.reset(); // Clear the form
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

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

        {/* 4. ATTACH THE HANDLER */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* NAME FIELD */}
          <input 
            type="text" 
            name="name" // "name" attribute is required for Formspree
            placeholder="Name" 
            required
            style={inputStyle} 
          />

          {/* EMAIL FIELD */}
          <input 
            type="email" 
            name="email" // "name" attribute is required
            placeholder="Email" 
            required
            style={inputStyle} 
          />

          {/* MESSAGE FIELD */}
          <textarea 
            name="message" // "name" attribute is required
            rows={4} 
            placeholder="Message" 
            required
            style={inputStyle} 
          />
          
          <button 
            type="submit" 
            disabled={status === "sending" || status === "success"}
            style={{
              background: status === 'success' ? '#4ade80' : '#00aaff', // Green on success
              color: 'white',
              border: 'none',
              padding: '12px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: status === 'sending' ? 'wait' : 'pointer',
              marginTop: '10px',
              fontFamily: "'Inter', sans-serif",
              transition: 'background 0.3s'
            }}
          >
            {status === "sending" ? "SENDING..." : status === "success" ? "MESSAGE SENT!" : "SEND MESSAGE"}
          </button>

          {status === "error" && (
            <p style={{ color: '#ef4444', margin: 0, fontSize: '0.8rem', textAlign: 'center' }}>
              Oops! Something went wrong. Please try again.
            </p>
          )}
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
  outline: 'none',
  borderRadius: '4px'
};
