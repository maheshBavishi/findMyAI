"use client";

import React, { useEffect } from "react";
import styles from "./herobanner.module.scss";
import Searchbar from "./searchbar";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getAiTools, getAiToolsName, setSearchTools, setToolsData } from "@/store/ApiSlice/aiToolsSlice";
import { useRouter } from "next/navigation";
import CommonImage from "@/helpers/CommonImage";
import LazyImage from "@/helpers/lazyImage";
import LazyLoad from "@/helpers/lazyLoad";
import Righticon from "@/assets/icons/righticon";
const RightIcon = "/assets/icons/right.svg";
const LoopinIcon = "/assets/icons/loopin.svg";
const MonicaIcon = "/assets/icons/monica.svg";
const JasperIcon = "/assets/icons/Jasper.svg";
const ChatgptIcon = "/assets/icons/Chatgpt.svg";
const AdobeIcon = "/assets/icons/Adobe.svg";
const BingIcon = "/assets/icons/bing.svg";

export default function Herobanner() {
  const { searchTools, getAllAiTools } = useSelector((state) => state.aiTools);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleOnSearch = (e) => {
    const value = e.target.value.trim(); 
    if (value !== "") {
      dispatch(setSearchTools(value));
      dispatch(getAiToolsName({ search: value }));  
      } else {
      dispatch(setSearchTools(""));
    }
  };
  useEffect(() => {
    dispatch(setSearchTools(""));
  }, []);

  const handleSearchClick = () => {
    router.push(`/browse-tools`);
  };
  return (
    <LazyLoad id={"Herobanner"}>
      <div className={styles.herobanner} data-scroll-section data-scroll-direction="horizontal">
        <div className="container-sm">
          <div className={styles.relativeSection}>
            <div className={styles.first}>
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

            </div>

            <div className={styles.firstRight}>
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

            </div>
            <div className={styles.sec}>
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

            </div>
            <div className={styles.threeRight}>
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
            </div>
            <h1>
              Discover <span>AI Tools</span> for Your Business!
            </h1>
            <p>Streamline Your Workflow with Our List of AI tools Find Your Perfect Solution.</p>
            <div className={styles.serchbarCenterAlignment}>
              <Searchbar placeholder="Type to search for over 1500+ tools..." handleOnSearch={handleOnSearch} search={searchTools} handleSearchClick={handleSearchClick} name="search" />
            </div>
            <div className={styles.twoButtonAlignment}>
              <Link href="/browse-tools">
                <button aria-label="Explore 1500+ AI Tools">
                  Explore 1500+ AI Tools
                  <img loading="lazy" src={RightIcon} alt="RightIcon" />
                </button>
              </Link>
              <Link href="/category">
                <button aria-label="iew All categories">
                  View All categories
                  <img loading="lazy" src={RightIcon} alt="RightIcon" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LazyLoad>
  );
}
