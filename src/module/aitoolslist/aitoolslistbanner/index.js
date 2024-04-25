"use client";
import React from "react";
import styles from "./aitoolslistbanner.module.scss";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import Searchbar from "@/module/home/herobanner/searchbar";
import Link from "next/link";
import LazyImage from "@/helpers/lazyImage";
import LazyLoad from "@/helpers/lazyLoad";
const RightIcon = "/assets/icons/right.svg";
const LoopinIcon = "/assets/icons/loopin.svg";
const MonicaIcon = "/assets/icons/monica.svg";
const JasperIcon = "/assets/icons/Jasper.svg";
const ChatgptIcon = "/assets/icons/Chatgpt.svg";
const BingIcon = "/assets/icons/bing.svg";
const AdobeIcon = "/assets/icons/Adobe.svg";
export default function Aitoolslistbanner({ search, handleOnSearch, handleSearchClick }) {
  return (
    <LazyLoad id={"Aitoolslistbanner"}>
      <div>
        <div className={styles.herobanner} data-scroll-section data-scroll-direction="horizontal">
          <div className="container-sm">
            <div className={styles.relativeSection}>
              <div className={styles.first}>
                {/* <AnimatedSection
                animationType="fade-up"
                duration={600}
                delay={400}
              > */}
                {/* <img  loading="lazy" src={LoopinIcon} alt="LoopinIcon" /> */}
                <div className={styles.image}>
                  <LazyImage
                    image={{
                      src: LoopinIcon,
                      alt: `LoopinIcon`,
                    }}
                    className={styles.cardImageChild}
                  />
                </div>
                <span>loopin</span>
                {/* </AnimatedSection> */}
              </div>

              <div className={styles.firstRight}>
                {/* <AnimatedSection
                animationType="fade-up"
                duration={600}
                delay={400}
              > */}
                {/* <img loading="lazy" src={BingIcon} alt="BingIcon" /> */}
                <div className={styles.image}>
                  <LazyImage
                    image={{
                      src: BingIcon,
                      alt: `BingIcon`,
                    }}
                    className={styles.cardImageChild}
                  />
                </div>
                <span>bing chat</span>
                {/* </AnimatedSection> */}
              </div>
              <div className={styles.sec}>
                {/* <AnimatedSection
                animationType="fade-up"
                duration={600}
                delay={450}
              > */}
                {/* <img loading="lazy" src={AdobeIcon} alt="AdobeIcon" /> */}
                <div className={styles.image}>
                  <LazyImage
                    image={{
                      src: AdobeIcon,
                      alt: `AdobeIcon`,
                    }}
                    className={styles.cardImageChild}
                  />
                </div>
                <span>Adobe</span>
                {/* </AnimatedSection> */}
              </div>
              <div className={styles.secRight}>
                {/* <AnimatedSection
                animationType="fade-up"
                duration={600}
                delay={450}
              > */}
                {/* <img loading="lazy" src={MonicaIcon} alt="MonicaIcon" /> */}
                <div className={styles.image}>
                  <LazyImage
                    image={{
                      src: MonicaIcon,
                      alt: `MonicaIcon`,
                    }}
                    className={styles.cardImageChild}
                  />
                </div>
                <span>monica</span>
                {/* </AnimatedSection> */}
              </div>
              <div className={styles.three}>
                {/* <AnimatedSection
                animationType="fade-up"
                duration={600}
                delay={500}
              > */}
                {/* <img loading="lazy" src={ChatgptIcon} alt="ChatgptIcon" /> */}
                <div className={styles.image}>
                  <LazyImage
                    image={{
                      src: ChatgptIcon,
                      alt: `ChatgptIcon`,
                    }}
                    className={styles.cardImageChild}
                  />
                </div>
                <span> Chat GPT</span>
                {/* </AnimatedSection> */}
              </div>
              <div className={styles.threeRight}>
                {/* <AnimatedSection
                animationType="fade-up"
                duration={600}
                delay={500}
              > */}
                {/* <img loading="lazy" src={JasperIcon} alt="JasperIcon" /> */}
                <div className={styles.image}>
                  <LazyImage
                    image={{
                      src: JasperIcon,
                      alt: `JasperIcon`,
                    }}
                    className={styles.cardImageChild}
                  />
                </div>
                <span> Jasper</span>
                {/* </AnimatedSection> */}
              </div>
              {/* <AnimatedSection animationType="fade-up" duration={600} delay={100}> */}
              <h1>
                Browse <span>1500+</span> <br />
                AI Tools
              </h1>
              {/* </AnimatedSection> */}
              {/* <AnimatedSection animationType="fade-up" duration={600} delay={150}> */}
              <p>Unlock limitless possibilities with Browse AI Tools - Your gateway to the world of artificial intelligence.</p>
              {/* </AnimatedSection> */}
              {/* <AnimatedSection animationType="fade-up" duration={600} delay={200}> */}
              <div className={styles.serchbarCenterAlignment}>
                <Searchbar placeholder="Type to search for over 1500+ tools..." handleOnSearch={handleOnSearch} search={search} handleSearchClick={handleSearchClick} />
              </div>
              {/* </AnimatedSection> */}
              {/* <AnimatedSection animationType="fade-up" duration={600} delay={250}> */}
              <div className={styles.twoButtonAlignment}>
                <Link href="/category">
                  <button aria-label="View All categories">
                    View All categories
                    <img loading="lazy" src={RightIcon} alt="RightIcon" />
                  </button>
                </Link>
              </div>
              {/* </AnimatedSection> */}
            </div>
          </div>
        </div>
      </div>
    </LazyLoad>
  );
}
