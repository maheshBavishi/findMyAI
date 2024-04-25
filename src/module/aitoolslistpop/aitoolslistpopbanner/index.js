import React from "react";
import styles from "./aitoolslistpopbanner.module.scss";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import Searchbar from "@/module/home/herobanner/searchbar";
import Link from "next/link";
import LazyImage from "@/helpers/lazyImage";
import Righticon from "@/assets/icons/righticon";
import LazyLoad from "@/helpers/lazyLoad";
const RightIcon = "/assets/icons/right.svg";
const LoopinIcon = "/assets/icons/loopin.svg";
const MonicaIcon = "/assets/icons/monica.svg";
const JasperIcon = "/assets/icons/Jasper.svg";
const ChatgptIcon = "/assets/icons/Chatgpt.svg";
const AdobeIcon = "/assets/icons/Adobe.svg";
const BingIcon = "/assets/icons/bing.svg";

export default function Aitoolslistpopbanner() {
  return (
    <LazyLoad id={"Aitoolslistpopbanner"}>
      <div>
        <div className={styles.herobanner} data-scroll-section data-scroll-direction="horizontal">
          <div className="container-sm">
            <div className={styles.relativeSection}>
              <div className={styles.first}>
                {/* <AnimatedSection animationType="fade-up" duration={800} delay={400}> */}
                {/* <CommonImage src={LoopinIcon} alt="LoopinIcon" /> */}
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
                {/* <AnimatedSection animationType="fade-up" duration={800} delay={400}> */}
                {/* <CommonImage src={BingIcon} alt="BingIcon" /> */}
                <div className={styles.image}>
                  <LazyImage
                    image={{
                      src: BingIcon,
                      alt: `BingIcon`,
                    }}
                    className={styles.cardImageChild}
                  />
                </div>

                {/* <img  loading="lazy" src={BingIcon} alt="BingIcon" /> */}
                <span>bing chat</span>
                {/* </AnimatedSection> */}
              </div>

              <div className={styles.sec}>
                {/* <AnimatedSection animationType="fade-up" duration={800} delay={450}> */}
                {/* <CommonImage src={AdobeIcon} alt="AdobeIcon" /> */}
                <div className={styles.image}>
                  <LazyImage
                    image={{
                      src: AdobeIcon,
                      alt: `AdobeIcon`,
                    }}
                    className={styles.cardImageChild}
                  />
                </div>
                {/* <img  loading="lazy" src={AdobeIcon} alt="AdobeIcon" /> */}
                <span>Adobe</span>
                {/* </AnimatedSection> */}
              </div>
              <div className={styles.secRight}>
                {/* <AnimatedSection animationType="fade-up" duration={800} delay={450}> */}
                {/* <CommonImage src={MonicaIcon} alt="MonicaIcon" /> */}
                <div className={styles.image}>
                  <LazyImage
                    image={{
                      src: MonicaIcon,
                      alt: `MonicaIcon`,
                    }}
                    className={styles.cardImageChild}
                  />
                </div>
                {/* <img  loading="lazy" src={MonicaIcon} alt="MonicaIcon" /> */}
                <span>monica</span>
                {/* </AnimatedSection> */}
              </div>
              <div className={styles.three}>
                {/* <AnimatedSection animationType="fade-up" duration={800} delay={500}> */}
                {/* <CommonImage src={ChatgptIcon} alt="ChatgptIcon" /> */}
                <div className={styles.image}>
                  <LazyImage
                    image={{
                      src: ChatgptIcon,
                      alt: `ChatgptIcon`,
                    }}
                    className={styles.cardImageChild}
                  />
                </div>
                {/* <img  loading="lazy" src={ChatgptIcon} alt="ChatgptIcon" /> */}
                <span> Chat GPT</span>
                {/* </AnimatedSection> */}
              </div>
              <div className={styles.threeRight}>
                {/* <AnimatedSection animationType="fade-up" duration={800} delay={500}> */}
                {/* <CommonImage src={JasperIcon} alt="JasperIcon" /> */}
                <div className={styles.image}>
                  <LazyImage
                    image={{
                      src: JasperIcon,
                      alt: `JasperIcon`,
                    }}
                    className={styles.cardImageChild}
                  />
                </div>
                {/* <img  loading="lazy" src={JasperIcon} alt="JasperIcon" /> */}
                <span> Jasper</span>
                {/* </AnimatedSection> */}
              </div>
              {/* <AnimatedSection animationType="fade-up" duration={600} delay={100}> */}
              <h1>
                Browse <span>1500+</span> AI Tools
              </h1>
              {/* </AnimatedSection> */}
              {/* <AnimatedSection animationType="fade-up" duration={600} delay={150}> */}
              <p>Unlock limitless possibilities with Browse AI Tools - Your gateway to the world of artificial intelligence.</p>
              {/* </AnimatedSection> */}
              {/* <AnimatedSection animationType="fade-up" duration={600} delay={200}> */}
              <div className={styles.serchbarCenterAlignment}>
                <Searchbar placeholder="Type to search for over 1500+ tools..." />
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
