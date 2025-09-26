import React, { useState, useRef, useEffect } from 'react';
import './FloatingVideo.css';
import promoVideo from '../../assets/promo-video.mp4';

const FloatingVideo = () => {
  // State untuk visibilitas komponen secara keseluruhan
  const [isVisible, setIsVisible] = useState(true);
  // State untuk mode besar (maximized) atau kecil (minimized)
  const [isMinimized, setIsMinimized] = useState(true);
  
  const videoRef = useRef(null);

  // Fungsi untuk menutup video secara permanen
  const handleClose = (e) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  // Fungsi untuk membuat video menjadi besar
  const handleMaximize = () => {
    setIsMinimized(false);
    if (videoRef.current) {
      videoRef.current.muted = false; // Nyalakan suara saat video besar
    }
  };

  // Fungsi untuk membuat video menjadi kecil kembali
  const handleMinimize = (e) => {
    e.stopPropagation();
    setIsMinimized(true);
    if (videoRef.current) {
      videoRef.current.muted = true; // Matikan lagi suaranya saat kecil
    }
  };
  
  // Efek untuk memutar video saat komponen pertama kali muncul
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        // Autoplay seringkali diblokir browser, ini untuk menangani errornya
        console.log("Autoplay was prevented:", error);
      });
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Overlay gelap yang hanya muncul saat video besar */}
      {!isMinimized && <div className="video-overlay" onClick={handleMinimize}></div>}

      <div 
        className={`floating-video-container ${isMinimized ? 'minimized' : 'maximized'}`}
        onClick={isMinimized ? handleMaximize : undefined} // Hanya bisa dibesarkan saat kecil
      >
        <video
          ref={videoRef}
          src={promoVideo}
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Tombol-tombol kontrol */}
        <div className="video-controls">
          {!isMinimized && (
            <button className="minimize-video-button" onClick={handleMinimize}>—</button>
          )}
          <button className="close-video-button" onClick={handleClose}>×</button>
        </div>
      </div>
    </>
  );
};

export default FloatingVideo;