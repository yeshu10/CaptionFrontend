import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Sparkles } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div
      className="container"
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '1.25rem'
      }}
    >
      <div
        style={{
          fontSize: '5rem',
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          background: 'var(--gradient-brand)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        404
      </div>
      <h2 style={{ fontSize: '1.75rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>
        The visual universe you are looking for does not exist or has moved.
      </p>
      <Link to="/" className="btn btn-primary">
        <Home size={16} />
        <span>Return to Home</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;
