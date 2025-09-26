import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './FloatingIcons.css';

const FloatingIcons = () => {
  const [whatsappNumber, setWhatsappNumber] = useState(null);

  useEffect(() => {
    // Make sure your .env file has REACT_APP_API_URL=http://31.97.187.176:1337/api
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/whatsapp-flying`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(apiResponse => {
        if (apiResponse.data && apiResponse.data.whatsappNumber) {
          setWhatsappNumber(apiResponse.data.whatsappNumber);
        }
      })
      .catch(error => console.error("Failed to fetch WhatsApp data:", error));
  }, []); // The empty [] means this runs only once

  // If there's no number after fetching, the component renders nothing.
  if (!whatsappNumber) {
    return null;
  }

  return (
    <div className="floating-icons-container">
      <a
        href={`https://wa.me/${whatsappNumber}`}
        className="icon-link whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default FloatingIcons;