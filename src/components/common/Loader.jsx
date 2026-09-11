import React from 'react';

export const Spinner = ({ size = 20, color }) => {
  return (
    <div
      className="spinner"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderTopColor: color || 'var(--color-primary)'
      }}
    />
  );
};

export const FullPageLoader = () => {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
      }}
    >
      <Spinner size={36} color="var(--color-primary)" />
      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>
        Loading your creative studio...
      </span>
    </div>
  );
};

export const SkeletonBox = ({ width = '100%', height = '20px', borderRadius = 'var(--radius-sm)' }) => {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius
      }}
    />
  );
};

export default { Spinner, FullPageLoader, SkeletonBox };
