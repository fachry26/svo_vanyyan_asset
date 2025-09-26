// src/components/Navbar/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navData, setNavData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchNavData = async () => {
      try {
        // Use your custom pLevel parameter
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/navigation?pLevel=5`
        );
        
        // Remove .attributes to match your API data structure
        setNavData(res.data.data);
      } catch (error) {
        console.error("Error fetching navigation data:", error);
      }
    };
    fetchNavData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!navData) {
    return (
      <nav className="navbar-container navbar-show">
        <div className="navbar-logo">
          <Link to="/">Loading...</Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`navbar-container ${showNavbar ? 'navbar-show' : 'navbar-hide'}`}>
      <div className="navbar-logo">
        <Link to="/">{navData.logoText}</Link>
      </div>
      
      <ul className="navbar-links desktop-links">
        {/* Add a safe check in case navLinks is empty */}
        {navData.navLinks?.map(link => (
          <li key={link.id}><Link to={link.linkPath}>{link.linkText}</Link></li>
        ))}
      </ul>

      <div className="hamburger-menu" onClick={toggleMobileMenu}>
        <div className={`line line1 ${isMobileMenuOpen ? 'open' : ''}`}></div>
        <div className={`line line2 ${isMobileMenuOpen ? 'open' : ''}`}></div>
        <div className={`line line3 ${isMobileMenuOpen ? 'open' : ''}`}></div>
      </div>

      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="navbar-links mobile-links">
          {navData.navLinks?.map(link => (
            <li key={link.id}><Link to={link.linkPath}>{link.linkText}</Link></li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;