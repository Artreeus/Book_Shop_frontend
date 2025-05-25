// src/components/shared-component/ScrollToTop.tsx (or .jsx)
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // You can also use smooth scroll if desired
  }, [pathname]);

  return null;
};

export default ScrollToTop;
