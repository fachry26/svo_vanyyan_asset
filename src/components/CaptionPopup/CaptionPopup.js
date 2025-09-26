// src/components/Journey/CaptionPopup.js

import React from 'react';
import './CaptionPopup.css';

const CaptionPopup = ({ caption, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content">
        <p className="popup-text">{caption}</p>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default CaptionPopup;