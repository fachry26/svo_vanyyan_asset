// src/components/CertifiedBy/CertifiedBy.js
import React from 'react';
import './CertifiedBy.css';

const CertifiedBy = (props) => {
  const { title, logos } = props;
  const API_URL = process.env.REACT_APP_API_URL;

  return (
    <section className="certified-section">
      <h2>{title}</h2>
      <div className="logos-container">
        {logos?.map(item => {
          const logoUrl = item.logoImage?.url;
          if (!logoUrl) return null;
          
          return (
            <div key={item.id} className="logo-item">
              <img src={`${API_URL}${logoUrl}`} alt={item.logoText} className="certification-logo" />
              <p className="logo-text">{item.logoText}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CertifiedBy;