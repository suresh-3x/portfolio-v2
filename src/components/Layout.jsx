import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main" className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
