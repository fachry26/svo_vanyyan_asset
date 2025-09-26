// src/components/OwnerStory/OwnerStory.js
import React from 'react';
import ReactCompareImage from 'react-compare-image';
import './OwnerStory.css';

const OwnerStory = (props) => {
  const { title, storyParagraph, signature, beforeImage, afterImage } = props;
  
  // CORRECTED: Use the simpler .url format to match your API data
  const beforeUrl = beforeImage?.url
    ? `${process.env.REACT_APP_API_URL}${beforeImage.url}`
    : '';
  const afterUrl = afterImage?.url
    ? `${process.env.REACT_APP_API_URL}${afterImage.url}`
    : '';

  return (
    <section className="owner-story-section">
      <div className="owner-story-content">
        <div className="story-text-content">
          <h2 className="story-title">{title}</h2>
          <p className="story-paragraph">{storyParagraph}</p>
          <p className="story-signature">{signature}</p>
        </div>
        <div className="story-image-comparison">
          {beforeUrl && afterUrl && <ReactCompareImage leftImage={beforeUrl} rightImage={afterUrl} />}
        </div>
      </div>
    </section>
  );
};

export default OwnerStory;