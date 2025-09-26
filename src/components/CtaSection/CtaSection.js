import React from 'react';
import { FaWhatsapp, FaPhone /*FaInstagram , FaMapMarkerAlt*/ } from 'react-icons/fa';
import './CtaSection.css';

const CtaSection = (props) => {
  // Destructure all the fields from the props
  const {
    title,
    subtitle,
    contactPersonName,
    whatsappNumber,
    phoneNumber,
    // We still receive these props, we just won't display them
    // instagramHandle,
    // address,
    // googleMapsEmbedUrl
  } = props;

  return (
    <section id="contact" className="cta-section">
      <div className="cta-content">
        <div className="cta-text">
          <h2>{title}</h2>
          <p>{subtitle}</p>
          
          <ul className="contact-list">
            {/* WhatsApp Link */}
            {whatsappNumber && (
              <li>
                <a href={`https://wa.me/${whatsappNumber.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="contact-icon" /> {whatsappNumber}
                  {contactPersonName && <h1>{contactPersonName}</h1>}
                </a>
              </li>
            )}
            
            {/* Phone Link */}
            {phoneNumber && (
              <li>
                <a href={`tel:${phoneNumber}`}>
                  <FaPhone className="contact-icon" /> {phoneNumber}
                  {contactPersonName && <h1>{contactPersonName}</h1>}
                </a>
              </li>
            )}

            {/* --- Instagram Link is now hidden --- */}
            {/*
            {instagramHandle && (
              <li>
                <a href={`https://instagram.com/${instagramHandle}`} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="contact-icon" /> @{instagramHandle}
                </a>
              </li>
            )}
            */}

            {/* --- Address is now hidden --- */}
            {/*
            {address && (
              <li>
                <div>
                  <FaMapMarkerAlt className="contact-icon" /> {address}
                </div>
              </li>
            )}
            */}
          </ul>
        </div>

        {/* --- Google Map is now hidden --- */}
        {/*
        {googleMapsEmbedUrl && (
          <div className="map-container">
            <iframe 
              src={googleMapsEmbedUrl}
              width="600" 
              height="450" 
              style={{ border:0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Kami"
            ></iframe>
          </div>
        )}
        */}
      </div>
    </section>
  );
};

export default CtaSection;