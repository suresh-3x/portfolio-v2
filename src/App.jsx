import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import Education from './components/sections/Education';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import GithubStats from './components/sections/GithubStats';
import Loader from './components/ui/Loader';

function App() {
  // No artificial loading delay
  // The app will render immediately once mounted

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="app"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Layout>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <GithubStats />
          <Education />
          <Contact />
        </Layout>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
