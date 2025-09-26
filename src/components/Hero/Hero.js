// src/components/Hero/Hero.js
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Hero.css';
import Navbar from '../Navbar/Navbar';

const Hero = (props) => {
  const { 
    heading, 
    subheading, 
    backgroundImage, 
    primaryButtonText, 
    whatsappNumber, 
    secondaryButtonText,
    tertiaryButtonText 
  } = props;

  // --- REVERTED TO THE CORRECT LINE FOR THE HERO IMAGE ---
  const imageUrl = backgroundImage?.url 
    ? `${process.env.REACT_APP_API_URL}${backgroundImage.url}`
    : '';

  const handleLearnMoreClick = () => {
    const nextSection = document.getElementById('story-highlights');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappLink = `https://wa.me/${whatsappNumber || ''}`;

  return (
    <header id="home" className="hero-container">
      <Navbar />
      {imageUrl && <img src={imageUrl} alt="Hero Background" className="hero-background-image" />}
      <div className="hero-content-panel">
        <div className="hero-text-wrapper">
          <p className="hero-subheading">{subheading}</p>
          <h1>{heading}</h1>
          <div className="hero-cta-group">
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-cta-button primary"
            >
              <FaWhatsapp className="cta-icon" />
              {primaryButtonText}
            </a>
            <div className="hero-cta-row-secondary">
              <Link to="/contact" className="hero-cta-button secondary">
                {secondaryButtonText}
              </Link>
              <button className="hero-cta-button tertiary" onClick={handleLearnMoreClick}>
                {tertiaryButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;