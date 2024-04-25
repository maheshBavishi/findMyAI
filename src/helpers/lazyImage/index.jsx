"use client";
import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const AiLogo = "/assets/logo/logo-5.png";

export const addTransformParam = (src) => {
  return src?.length > 0 && src?.indexOf("?") === -1 ? "?t=w" : "&t=w";
};

const contentHubSizes = [576, 992, 1200, 1920, 2880];
const deviceSizes = [576, 992, 1440, 1920, 2880];

const LazyImage = ({
  image,
  priority,
  sizes,
  width,
  height,
  loading = "lazy",
  className,
  disableSkeleton = false,
}) => {

  const { src, alt } = image;
  const [isLoaded, setIsLoaded] = useState(false);
  const handleImageLoad = (arg) => {
    setIsLoaded(true);
  };



  return (
    <div className={className} style={{ position: "relative", width, height }}>
      {!isLoaded && (
        <Skeleton
          baseColor="hsl(0deg 0% 100% / 12%"
          highlightColor="hsl(0deg 0% 100% / 12%"
          style={{ width: "100%", height: "100%" }}
          className={className}
        />
      )}

      {image ? (
        <img
          alt={alt}
          width={width}
          height={height}
          onLoad={handleImageLoad}
          loading={loading}
          src={`${src}${addTransformParam(src ?? AiLogo)}${
            deviceSizes[deviceSizes.length - 1]
          }`}
          srcSet={deviceSizes
            .map(
              (deviceSize, index) =>
                `${src}${addTransformParam(src)}${
                  contentHubSizes[index]
                } ${deviceSize}w`
            )
            .join(", ")}
          sizes={sizes ? sizes : `(max-width: 768px) 100vw, 50vw`}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 1s",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : null}
    </div>
  );
};

export default LazyImage;
