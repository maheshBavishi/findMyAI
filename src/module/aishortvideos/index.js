"use client"
import React from "react";
import styles from "./aishortvideos.module.scss";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import Aishortvideoscard from "../aishortvideoscard";
import AishortvideosModal from "@/shared/components/aishortvideosModal";
import LazyLoad from "@/helpers/lazyLoad";
import { useSelector } from "react-redux";
const Logo = "/assets/logo/logo-5.png";

export default function Aishortvideos() {

  return (
    <LazyLoad id={"Aishortvideos"}>

    <div  >
      <div className={styles.aishortvideosBanner}>
        <div className="container">
          <div className={styles.title}>
            {/* <AnimatedSection animationType="fade-up" duration={600} delay={400}> */}
            <h1>AI Shorts Videos</h1>
            {/* </AnimatedSection> */}
            {/* <AnimatedSection animationType="fade-up" duration={600} delay={500}> */}
            <p>The AI tools you've saved as bookmarks can be deleted by clicking on the bookmark icon..</p>
            {/* </AnimatedSection> */}
          </div>
        </div>
      </div>
      <Aishortvideoscard />
      {/* <AishortvideosModal/> */}
    </div>
    </LazyLoad>
  );
}
