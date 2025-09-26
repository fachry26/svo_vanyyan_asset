// src/components/ScrollToTop.js

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Mengambil informasi path URL saat ini (misal: "/", "/journey", dll.)
  const { pathname } = useLocation();

  // useEffect ini akan berjalan SETIAP KALI 'pathname' berubah
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Komponen ini tidak menampilkan visual apa pun
  return null;
};

export default ScrollToTop;