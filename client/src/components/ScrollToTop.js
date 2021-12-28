import React, { useEffect, useState } from "react";
import { FiArrowUpCircle } from "react-icons/fi";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, []);

  return (
    <div>
      {isVisible && 
        <div onClick={scrollToTop}>
         <FiArrowUpCircle size={55} style={{cursor: "pointer"}} />
        </div>}
    </div>
  );
}