"use client";

import React from "react";
import styles from "./categoriestextsection.module.scss";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import { useSelector } from "react-redux";
import { marked } from "marked";
const ThumbIcon = "/assets/icons/thumb.svg";
const ThumbIconSec = "/assets/icons/thumb-sec.svg";
export default function Categoriestextsection() {
  const { categoryDetails } = useSelector((state) => state.aiTools);

  return (
    <div
      className={styles.categoriestextsectionAlignment}
      data-scroll
      data-scroll-section
      data-scroll-direction="horizontal"
    >
      <div className="container">
        {/* <AnimatedSection animationType="fade-up" duration={600} delay={400}> */}
        <div className={styles.textStyle}>
          {categoryDetails?.item?.details
            ?.split("\n")
            ?.map((details, index) => (
              <p
                key={index}
                dangerouslySetInnerHTML={{ __html: marked(details) }}
              />
            ))}
        </div>
        {/* </AnimatedSection> */}
        {/* <AnimatedSection animationType="fade-up" duration={600} delay={500}> */}
        <div className={styles.textGridCard}>
          <div className={styles.items}>
            <div className={styles.centerAlignment}>
              <img loading="lazy" src={ThumbIcon} alt="ThumbIcon" />
            </div>
            <h6>Pros</h6>
            <ul style={{ color: "white" }}>
              {categoryDetails?.item?.pros?.split("\n")?.map((pros, index) => (
                <li
                  key={index}
                  dangerouslySetInnerHTML={{ __html: marked(pros) }}
                />
              ))}
            </ul>
          </div>
          <div className={styles.line}></div>
          <div className={styles.items}>
            <div className={styles.centerAlignment}>
              <img loading="lazy" src={ThumbIconSec} alt="ThumbIconSec" />
            </div>
            <h6>Cons</h6>
            <ul style={{ color: "white" }}>
              {categoryDetails?.item?.cons?.split("\n")?.map((cons, index) => (
                <li
                  key={index}
                  dangerouslySetInnerHTML={{ __html: marked(cons) }}
                />
              ))}
            </ul>
          </div>
        </div>
        {/* </AnimatedSection> */}
      </div>
    </div>
  );
}
