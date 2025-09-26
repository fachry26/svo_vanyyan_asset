import React, { useState } from 'react';
import './StoryHighlights.css';

const StoryHighlights = ({ stories }) => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(0);

  if (!stories || stories.length === 0) {
    return null; 
  }
  
  const API_URL = process.env.REACT_APP_API_URL;

  const openPreview = (story) => {
    setSelectedStory(story);
    setPreviewIndex(0);
  };

  const closePreview = () => setSelectedStory(null);

  const handleNext = () => {
    if (selectedStory && selectedStory.contentImages && previewIndex < selectedStory.contentImages.length - 1) {
      setPreviewIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedStory && previewIndex > 0) {
      setPreviewIndex(prevIndex => prevIndex - 1);
    }
  };

  return (
    <>
      <div id="story-highlights" className="story-section-wrapper">
        <div className="story-highlights-container">
          {stories.map((story) => {
            // Get profile image url safely
            const profileImageUrl = story.profileImage?.url;

            return (
              <div key={story.id} className="story-highlight-item" onClick={() => openPreview(story)}>
                <div className="story-ring">
                  {profileImageUrl && (
                    <div 
                      className="story-image" 
                      style={{ backgroundImage: `url(${API_URL}${profileImageUrl})` }}>
                    </div>
                  )}
                </div>
                <p className="story-name">{story.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      {selectedStory && (
        <div className="preview-overlay" onClick={closePreview}>
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-preview-button" onClick={closePreview}>×</button>
            <div className="preview-image-container">
              {selectedStory.contentImages && selectedStory.contentImages.length > 1 && previewIndex > 0 && (
                <button className="nav-button prev" onClick={handlePrev}>‹</button>
              )}

              {selectedStory.contentImages && selectedStory.contentImages[previewIndex] && (
                <img
                  src={`${API_URL}${selectedStory.contentImages[previewIndex].url}`}
                  alt={selectedStory.name}
                  className="preview-image"
                />
              )}

              {selectedStory.contentImages && selectedStory.contentImages.length > 1 && previewIndex < selectedStory.contentImages.length - 1 && (
                <button className="nav-button next" onClick={handleNext}>›</button>
              )}
            </div>
            <p className="preview-caption">{selectedStory.name}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default StoryHighlights;
