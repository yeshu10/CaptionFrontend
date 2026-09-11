import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Toast from '../components/common/Toast';

/**
 * Main application layout providing consistent header, main viewport, footer,
 * and global toast notifications.
 */
const MainLayout = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'var(--color-background, #FAF8F4)',
        color: 'var(--color-text, #29272A)'
      }}
    >
      <Navbar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default MainLayout;
