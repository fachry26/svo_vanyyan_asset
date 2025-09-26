// src/pages/WhyDvnPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import Testimonials from '../components/Testimonials/Testimonials';
import CertifiedBy from '../components/CertifiedBy/CertifiedBy';

// Map the Strapi component names to our React components
const componentMap = {
  // CORRECTED the category names to match your API
  'testimonials-section.testimonials-section': Testimonials,
  'why-choose-us-section.why-choose-us-section': WhyChooseUs,
  'certified-by-section.certified-by-section': CertifiedBy,
};

const WhyDvnPage = () => {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the page with the slug 'why-dvn' using your working pLevel parameter
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/pages?filters[slug][$eq]=why-dvn&pLevel=5`
        );
        
        if (res.data.data && res.data.data.length > 0) {
          setPageData(res.data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching page data:", error);
      }
    };
    fetchData();
  }, []);

  if (!pageData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ paddingTop: '50px' }}>
      {pageData.page_content.map((component, index) => {
        const Component = componentMap[component.__component];
        if (!Component) {
          console.warn(`Component "${component.__component}" not found in componentMap.`);
          return null;
        }
        return <Component key={index} {...component} />;
      })}
    </div>
  );
};

export default WhyDvnPage;