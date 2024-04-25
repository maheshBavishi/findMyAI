import Image from "next/image";
import React, { useRef, useEffect } from "react";

function CommonImage({ src, alt, id }) {
  const imgRef = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.05,
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  const handleIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = src;
        observer.unobserve(img);
      }
    });
  };

  return <img loading="lazy" ref={imgRef} src={alt} decoding="async" data-original={imgRef} alt={alt} />;
}

export default CommonImage;
