import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '2.5rem 0',
        marginTop: 'auto',
        background: 'rgba(11, 15, 25, 0.95)'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          textAlign: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
          <Sparkles size={18} color="var(--primary-light)" />
          <span>AI Instagram Caption Generator</span>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Supercharged by Google Gemini Vision. Built for artists, creators, and brands.
        </p>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          Crafted with <Heart size={14} color="#EC4899" fill="#EC4899" /> using the MERN Stack.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
