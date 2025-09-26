import React, { useState } from 'react';
import Slider from 'react-slick';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import './Journey.css';

const JourneyStoryPopup = ({ story, onClose }) => {
  if (!story) return null;
  const imageUrl = story.image?.url;  // <-- updated here
  return (
    <div className="story-popup-overlay" onClick={onClose}>
      <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-popup-button" onClick={onClose}>×</button>
        {imageUrl && <img src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt={story.caption} className="popup-image" />}
        <div className="popup-text-content">
          <h3 className="popup-caption">{story.caption}</h3>
          <p className="popup-story-text">{story.storyText}</p>
        </div>
      </div>
    </div>
  );
};

const Journey = (props) => {
  const { title, cards, buttonText, buttonLink } = props;
  const [selectedStory, setSelectedStory] = useState(null);

  if (!cards || cards.length === 0) {
    return null;
  }

  const API_URL = process.env.REACT_APP_API_URL;
  const settings = {
    dots: true,
    infinite: cards.length > (isMobile ? 1 : 3),
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    centerMode: !isMobile,
    centerPadding: '0px',
  };

  const handleCardClick = (story) => {
    setSelectedStory(story);
  };

  return (
    <>
      <section id="journey" className={`journey-section ${isMobile ? 'mobile-view' : ''}`}>
        <div className="journey-title">
          <h2>{title}</h2>
        </div>
        <div className="journey-carousel-wrapper">
          <Slider {...settings}>
            {cards.map((item) => {
              // Adjusted here: get imageUrl from item.image.url
              const imageUrl = item.image?.url;
              if (!imageUrl) return null;

              return (
                <div key={item.id} className="journey-card-wrapper">
                  <div className="journey-card" onClick={() => handleCardClick(item)}>
                    <img src={`${API_URL}${imageUrl}`} alt={item.caption} />
                    <div className="caption">{item.caption}</div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
        <Link to={buttonLink || '/'} className="journey-see-more-button">
          {buttonText}
        </Link>
      </section>
      <JourneyStoryPopup story={selectedStory} onClose={() => setSelectedStory(null)} />
    </>
  );
};

export default Journey;
