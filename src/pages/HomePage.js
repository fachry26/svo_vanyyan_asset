import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero/Hero';
import StoryHighlights from '../components/StoryHighlights/StoryHighlights';
import Journey from '../components/Journey/Journey';

const componentMap = {
  'hero-banner.hero-banner': Hero,
  'story-highlights-section.story-highlights-section': StoryHighlights,
  'journey-section.journey-section': Journey,
};

const HomePage = () => {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/pages?filters[slug][$eq]=home&pLevel=5`);
        if (res.data.data && res.data.data.length > 0) {
          setPageData(res.data.data[0]);
          console.log('✅ Data fetched successfully!', res.data.data[0]);
        } else {
          console.warn('API returned no data. Check if page slug is "home" and if it is published.');
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

  // Create a lookup for components by their type
  const componentsByType = {};
  pageData.page_content.forEach((component) => {
    componentsByType[component.__component] = component;
  });

  return (
    <div>
      {/* Render Hero if present */}
      {componentsByType['hero-banner.hero-banner'] && (
        <Hero {...componentsByType['hero-banner.hero-banner']} />
      )}

      {/* Render Story Highlights if present */}
      {componentsByType['story-highlights-section.story-highlights-section'] && (
        <StoryHighlights {...componentsByType['story-highlights-section.story-highlights-section']} />
      )}

      {/* Render Journey if present */}
      {componentsByType['journey-section.journey-section'] && (
        <Journey {...componentsByType['journey-section.journey-section']} />
      )}
    </div>
  );
};

export default HomePage;
