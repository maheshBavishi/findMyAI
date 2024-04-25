"use client";
import React, { memo } from "react";
import { default as ReactLazyLoad } from "react-lazyload";

const LazyLoad = ({ children, offset = 200, height = 500, id, once = true }) => {
  return (
    <ReactLazyLoad
      offset={offset}
      height={height}
      once={once}
      {...(id
        ? {
            placeholder: <div id={id} style={{ height: height }} />,
          }
        : {})}
    >
      {children}
    </ReactLazyLoad>
  );
};

export default memo(LazyLoad);
