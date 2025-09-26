// src/components/WhyChooseUs/WhyChooseUs.js
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './WhyChooseUs.css';

const OurStoryPopup = ({ isOpen, onClose, title, content, signature }) => {
  if (!isOpen) return null;
  return (
    <div className="story-popup-overlay" onClick={onClose}>
      <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-popup-button" onClick={onClose}>×</button>
        <div className="popup-text-content">
          <h3 className="popup-title">{title}</h3>
          <ReactMarkdown>{content || ''}</ReactMarkdown>
          <p className="popup-signature">{signature}</p>
        </div>
      </div>
    </div>
  );
};

const WhyChooseUs = (props) => {
  const { mainImage, title, ingredients, buttonText, popupTitle, popupContent, popupSignature } = props;
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  // CORRECTED: Get the first image from the array [0]
  const imageUrl = mainImage?.[0]?.url 
    ? `${process.env.REACT_APP_API_URL}${mainImage[0].url}` 
    : '';

  return (
    <>
      <section className="why-choose-us-section">
        <div className="why-choose-us-image">
          {imageUrl && <img src={imageUrl} alt={title} />}
        </div>
        <div className="why-choose-us-content">
          <h2>{title}</h2>
          <ul>
            {/* This will work after you fix the typo in Strapi */}
            {ingredients?.map(item => (
              <li key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
          <button className="story-button" onClick={() => setIsStoryOpen(true)}>{buttonText}</button>
        </div>
      </section>

      <OurStoryPopup 
        isOpen={isStoryOpen} 
        onClose={() => setIsStoryOpen(false)}
        title={popupTitle}
        content={popupContent}
        signature={popupSignature}
      />
    </>
  );
};

export default WhyChooseUs;