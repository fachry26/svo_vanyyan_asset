import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import './Testimonials.css';

const TestimonialPopup = ({ testimonial, onClose }) => {
  if (!testimonial) return null;
  
  const imageUrl = testimonial.image?.url 
    ? `${process.env.REACT_APP_API_URL}${testimonial.image.url}` 
    : '';

  return (
    <div className="testimonial-popup-overlay" onClick={onClose}>
      <div className="testimonial-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-popup-button" onClick={onClose}>×</button>
        <div className="popup-image-wrapper">
          {imageUrl && <img src={imageUrl} alt={`Testimonial from ${testimonial.name}`} />}
        </div>
        <div className="popup-text-wrapper">
          <p className="popup-quote">"{testimonial.quote}"</p>
          <p className="popup-name">- {testimonial.name}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = (props) => {
  const { title, testimonials } = props;
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const swiperRef = useRef(null);
  
  const [swiperKey, setSwiperKey] = useState('swiper-initial');
  // NEW: A state to hold the starting slide index.
  const [initialSlideIndex, setInitialSlideIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const API_URL = process.env.REACT_APP_API_URL;

  const handleCardClick = (testimonial) => {
    swiperRef.current?.autoplay.stop();
    setSelectedTestimonial(testimonial);
  };

  // UPDATED: Now calculates a random starting point before resetting.
  const handleClosePopup = () => {
    setSelectedTestimonial(null);
    
    // 1. Calculate a new random index based on the number of testimonials.
    const randomIndex = Math.floor(Math.random() * testimonials.length);
    
    // 2. Set the state for the initial slide.
    setInitialSlideIndex(randomIndex);
    
    // 3. Change the key to force a full remount of the Swiper component.
    setSwiperKey(`swiper-${Date.now()}`);
  };

  return (
    <>
      <section className="testimonials-section">
        <h2>{title}</h2>
        <div className="testimonial-carousel-wrapper">
          <Swiper
            key={swiperKey}
            // NEW: Tell the new Swiper instance which slide to start on.
            initialSlide={initialSlideIndex}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            modules={[Autoplay, FreeMode]}
            loop={true}
            freeMode={true}
            speed={6000}
            autoplay={{ 
              delay: 1, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true, 
            }}
            slidesPerView={'auto'}
            spaceBetween={30}
            className="testimonial-swiper"
          >
            {testimonials.map(testimonial => {
              const imageUrl = testimonial.image?.url;
              if (!imageUrl) return null;
              return (
                <SwiperSlide key={testimonial.id} className="testimonial-slide">
                  <div className="polaroid-card" onClick={() => handleCardClick(testimonial)}>
                    <div className="polaroid-image-container">
                      <img src={`${API_URL}${imageUrl}`} alt={`Testimonial from ${testimonial.name}`} />
                    </div>
                    <div className="polaroid-caption">
                      <p className="quote">"{testimonial.quote}"</p>
                      <p className="name">- {testimonial.name}</p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
      <TestimonialPopup 
        testimonial={selectedTestimonial} 
        onClose={handleClosePopup} 
      />
    </>
  );
};

export default Testimonials;