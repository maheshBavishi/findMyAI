import React from "react";
import styles from "./copywritingbanner.module.scss";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import Searchbar from "@/module/home/herobanner/searchbar";
import Link from "next/link";
import LazyLoad from "@/helpers/lazyLoad";
import LazyImage from "@/helpers/lazyImage";
import classNames from "classnames";
import { useRouter } from "next/router";
const AdobeIcon = "/assets/icons/Adobe.svg";
const RightIcon = "/assets/icons/right.svg";
const LoopinIcon = "/assets/icons/loopin.svg";
const MonicaIcon = "/assets/icons/monica.svg";
const JasperIcon = "/assets/icons/Jasper.svg";
const ChatgptIcon = "/assets/icons/Chatgpt.svg";
const BingIcon = "/assets/icons/bing.svg";
const IconImg = "/assets/images/banner-option-img.png";

export default function Copywritingbanner({ search, handleOnSearch, handleSearchClick, description }) {
  const router = useRouter();
  const lastPathname = router?.pathname.substring(router?.pathname.lastIndexOf("/") + 1);
  const capitalizeFirstLetter = (str) => {
    const words = str.toLowerCase().split(/[\s-]+/);

    const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

    return capitalizedWords.join(" ");
  };

  return (
    <LazyLoad id={"Copywritingbanner"}>
      <div>
        <div className={classNames(styles.herobanner, styles.gptHerobanner)} data-scroll-section data-scroll-direction="horizontal">
          <div className="container-sm">
            <div className={styles.relativeSection}>
              {/* <div className={styles.gptStoreOption}>
                  <img loading="lazy" src={IconImg} alt="IconImg" />
                </div> */}
              <div className={styles.first}>
                {/* <AnimatedSection
                animationType="fade-up"
                duration={600}
                delay={400}
              > */}
                {/* <img loading="lazy" src={LoopinIcon} alt="LoopinIcon" /> */}
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
                {/* <BingIcon /> */}
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
                {router?.pathname.includes("gpt-category") ? <>{lastPathname ? capitalizeFirstLetter(lastPathname?.split("--")?.join(" ")) : `Gpt`}</> : <> {lastPathname ? capitalizeFirstLetter(lastPathname?.split("--")?.join(" ")) : `Tools`} </>}
                <span> {router?.pathname.includes("/gpt-category") ? `GPT's` : ` AI Tools`}</span>
              </h1>
              {/* </AnimatedSection> */}
              {/* <AnimatedSection animationType="fade-up" duration={600} delay={150}> */}
              {description ? <p>{description}</p> : <p>Compelling Content Made Easy - Top AI Copywriting Tools</p>}
              {/* </AnimatedSection> */}
              {/* <AnimatedSection animationType="fade-up" duration={600} delay={200}> */}
              <div className={styles.serchbarCenterAlignment}>
                <Searchbar placeholder={router?.pathname.includes("gpt-category") ? "Search Public GPTs Here" : "Type to search for over 1500+ tools..."} handleOnSearch={handleOnSearch} search={search} handleSearchClick={handleSearchClick} />
              </div>
              {/* </AnimatedSection> */}
              {/* <AnimatedSection animationType="fade-up" duration={600} delay={250}> */}
              <div className={styles.twoButtonAlignment}>
                {router?.pathname.includes("/gpt-category") ? (
                  <>
                    <Link href="/browse-all-gpts">
                      <button aria-label=" Browse All Gpts">
                        Browse All Gpts
                        <img loading="lazy" src={RightIcon} alt="RightIcon" />
                      </button>
                    </Link>
                    <Link href="/gpt-category">
                      <button aria-label="View All categories">
                        View All categories
                        <img loading="lazy" src={RightIcon} alt="RightIcon" />
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/browse-tools">
                      <button aria-label="Explore 1500+ AI Tools">
                        Explore 1500+ AI Tools
                        <img loading="lazy" src={RightIcon} alt="RightIcon" />
                      </button>
                    </Link>
                    <Link href="/category">
                      <button aria-label="View All categories">
                        View All categories
                        <img loading="lazy" src={RightIcon} alt="RightIcon" />
                      </button>
                    </Link>
                  </>
                )}
              </div>
              {/* </AnimatedSection> */}
            </div>
          </div>
        </div>
      </div>
    </LazyLoad>
  );
}
