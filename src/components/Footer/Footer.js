// src/components/Footer/Footer.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Footer.css';

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        // Using your requested API endpoint
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/navigation?pLevel=5`
        );
        
        // This safely checks for the correct data structure
        if (res.data && res.data.data) {
          const dataToSet = res.data.data.attributes ? res.data.data.attributes : res.data.data;
          setFooterData(dataToSet);
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    fetchFooterData();
  }, []);

  if (!footerData) {
    return (
      <footer className="footer-container">
        <div className="footer-content">
          <p className="footer-copyright">
            &copy; {currentYear} VANNY X DVN. All Rights Reserved.
          </p>
        </div>
      </footer>
    );
  }

  const copyright = footerData.copyrightText 
    ? footerData.copyrightText.replace('{year}', currentYear) 
    // Safely access footerBrandName
    : `© ${currentYear} ${footerData.footerBrandName || 'VANNY X DVN'}. All Rights Reserved.`;

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <Link to="/" className="footer-brand-name">
          {footerData.footerBrandName}
        </Link>
        
        <nav className="footer-nav">
          {/* Safely map over the links */}
          {footerData.footerNavLinks?.map(link => {
            const isExternal = link.linkPath.startsWith('http') || 
                               link.linkPath.startsWith('www') ||
                               link.linkPath.includes('.');

            if (isExternal) {
              const href = link.linkPath.startsWith('http') ? link.linkPath : `https://${link.linkPath}`;
              return (
                <a 
                  key={link.id} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {link.linkText}
                </a>
              );
            } else {
              const internalPath = link.linkPath.startsWith('/') 
                ? link.linkPath 
                : `/${link.linkPath}`;
              return (
                <Link key={link.id} to={internalPath}>
                  {link.linkText}
                </Link>
              );
            }
          })}
        </nav>

        <p className="footer-copyright">
          {copyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;