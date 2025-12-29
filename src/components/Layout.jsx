import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, highlightColor }) => {
  return (
    <div className="layout">
      <div className="grid-background"></div>
      <Navbar highlightColor={highlightColor} />
      <main className="main-content">
        {children}
      </main>
      <Footer />

      <style>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .grid-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-image: 
            linear-gradient(var(--grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
          z-index: -1;
          transform: translateZ(0); /* Hardware acceleration */
          will-change: transform;
        }

        .main-content {
          flex: 1;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }
      `}</style>
    </div>
  );
};

export default Layout;
