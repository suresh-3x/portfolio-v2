import Navbar from './Navbar';
import Footer from './Footer';
import { useRouter } from '../router';
import useGridSnap from '../hooks/useGridSnap';

export default function Layout({ children }) {
  const { pathname } = useRouter();
  useGridSnap(pathname);
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
