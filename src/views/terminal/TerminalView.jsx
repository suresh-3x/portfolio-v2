import Hero from '../../components/sections/Hero';
import About from './sections/About';
import Work from './sections/Work';
import Experience from './sections/Experience';
import Stack from './sections/Stack';
import Notes from './sections/Notes';
import Contact from './sections/Contact';

export default function TerminalView() {
  return (
    <div className="t-view">
      <Hero />
      <About />
      <Work />
      <Experience />
      <Stack />
      {/* <Notes /> */}
      <Contact />
    </div>
  );
}
