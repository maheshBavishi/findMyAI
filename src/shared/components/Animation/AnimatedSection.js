'use client';
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AnimatedSection = ({ children, animationType, duration, delay, once }) => {
  useEffect(() => {
    AOS.init({
      duration: duration,
      delay: delay,
      once: once, 
    });

    AOS.refresh();
  }, [animationType, duration, delay, once]); 

  return (
    <div data-aos={animationType} data-aos-once={once} data-aos-duration={duration} data-aos-delay={delay}>
      {children}
    </div>
  );
};

export default AnimatedSection;
