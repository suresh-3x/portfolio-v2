import React from 'react';
import Layout from './components/Layout';
import Education from './components/sections/Education';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';


function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Contact />
    </Layout>
  );
}

export default App;
