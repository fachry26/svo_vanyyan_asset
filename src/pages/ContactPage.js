// src/pages/ContactPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CtaSection from '../components/CtaSection/CtaSection';

const componentMap = {
  'cta-section.cta-section': CtaSection, // Make sure this name matches your Strapi component
};

const ContactPage = () => {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the page with the slug 'contact'
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/pages?filters[slug][$eq]=contact&pLevel=5`
        );
        
        if (res.data.data && res.data.data.length > 0) {
          setPageData(res.data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching Contact page data:", error);
      }
    };
    fetchData();
  }, []);

  if (!pageData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ paddingTop: '100px' }}>
      {pageData.page_content.map((component, index) => {
        const Component = componentMap[component.__component];
        if (!Component) {
          return null;
        }
        return <Component key={index} {...component} />;
      })}
    </div>
  );
};

export default ContactPage;