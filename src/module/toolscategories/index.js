'use client'
import React, { useEffect } from "react";
import Categoriessection from "./categoriessection";

export default function Toolscategories() {

  useEffect(() => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}, [])
  return (
    <div>
      {/* <Toolscategoriesbanner /> */}
      <Categoriessection />
    </div>
  );
}
