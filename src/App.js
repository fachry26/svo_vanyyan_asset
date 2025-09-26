import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

// Component Imports
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import FloatingIcons from './components/FloatingIcons/FloatingIcons';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import FloatingVideo from './components/FloatingVideo/FloatingVideo';
import HomePage from './pages/HomePage';
import WhyDvnPage from './pages/WhyDvnPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';

// CSS Imports
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";

// This component correctly handles complex HTML strings (like scripts + noscript tags)
const HtmlInjector = ({ htmlString, placement }) => {
  useEffect(() => {
    if (!htmlString) return;

    const parent = placement === 'head' ? document.head : document.body;
    const fragment = document.createRange().createContextualFragment(htmlString);
    const nodesToAppend = Array.from(fragment.childNodes);

    nodesToAppend.forEach(node => parent.appendChild(node));

    return () => {
      nodesToAppend.forEach(node => {
        if (parent.contains(node)) {
          parent.removeChild(node);
        }
      });
    };
  }, [htmlString, placement]);

  return null; // This component only manages side-effects
};


function App() {
  const [headScripts, setHeadScripts] = useState([]);
  const [bodyScripts, setBodyScripts] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        document.body.classList.add('scrolled');
      } else {
        document.body.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchScript = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tracking-script?pLevel=5`);
        
        // --- THIS IS THE CORRECTED PART ---
        // We get the data object directly from the response
        const scriptData = response.data.data; 

        // We check properties directly on scriptData, not scriptData.attributes
        if (scriptData && scriptData.isEnabled) {
          if (scriptData.placement === 'head') {
            setHeadScripts([scriptData]);
          } else if (scriptData.placement === 'body_end') {
            setBodyScripts([scriptData]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch tracking script from Strapi:", error);
      }
    };
    fetchScript();
  }, []);

  return (
    <>
      <Helmet>
        <title>Vannyyan x DVN</title>
        <meta name="description" content="Welcome to the official website." />
      </Helmet>
      
      <Router>
        <ScrollToTop />
        <div className="App">
          <Navbar />
          <FloatingIcons />
          <FloatingVideo />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/journey" element={<WhyDvnPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>

      {headScripts.map(script => (
        <HtmlInjector key={script.id} htmlString={script.scriptContent} placement="head" />
      ))}
      {bodyScripts.map(script => (
        <HtmlInjector key={script.id} htmlString={script.scriptContent} placement="body" />
      ))}
    </>
  );
}

export default App;