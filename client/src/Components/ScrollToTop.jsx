import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top when the route changes
    document.documentElement.scrollTop = 0; // For most browsers
    document.body.scrollTop = 0; // For Safari

  }, [pathname]); // Run the effect when the pathname changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;
