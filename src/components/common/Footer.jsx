import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: '2.5rem 0',
        marginTop: 'auto',
        background: 'var(--color-background)'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          textAlign: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--color-text)' }}>
          <Sparkles size={16} color="var(--color-primary)" />
          <span>Caption<span style={{ color: 'var(--color-primary)' }}>GenAI</span></span>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          Supercharged by Google Gemini Vision. Built for creators, artists, and storytellers.
        </p>
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          Crafted with <Heart size={14} color="var(--color-primary)" fill="var(--color-primary)" /> for creators everywhere.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
