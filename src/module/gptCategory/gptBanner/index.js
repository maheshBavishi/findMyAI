import React from "react";
import styles from "./gptBanner.module.scss";
import Link from "next/link";
import LazyLoad from "@/helpers/lazyLoad";
import classNames from "classnames";
import RightIconLg from "@/assets/icons/righticonlg";
import { useRouter } from "next/router";
const RightIcon = "/assets/icons/right.svg";
const IconImg = "/assets/images/banner-option-img.png";
export default function GptBanner({ search, handleOnSearch, handleSearchClick, description }) {
  const router = useRouter();
  const lastPathname = router?.pathname.substring(router?.pathname.lastIndexOf("/") + 1);
  const capitalizeFirstLetter = (str) => {
    const words = str.toLowerCase().split(/[\s-]+/);

    const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

    return capitalizedWords.join(" ");
  };

  return (
    <LazyLoad id={"GptBanner"}>
      <div>
        <div className={classNames(styles.herobanner, styles.gptHerobanner)} data-scroll-section data-scroll-direction="horizontal">
          <div className="container-sm">
            <div className={styles.relativeSection}>
              <div className={styles.gptStoreOption}>
                <img loading="lazy" src={IconImg} alt="IconImg" />
              </div>
              <div className={styles.centerDetailsAlignment}>
                <h1>
                  {router?.pathname.includes("gpt-category") ? <>{lastPathname ? capitalizeFirstLetter(lastPathname?.split("--")?.join(" ")) : `Gpt`}</> : <> {lastPathname ? lastPathname?.split("--")?.join(" ") : `Tools`} </>}

                  {router?.pathname.includes("/gpt-category") ? ` GPT's` : ` AI Tools`}
                </h1>
                {description ? <p>{description}</p> : <p>Compelling Content Made Easy - Top AI Copywriting Tools</p>}
                {/* <Searchbar placeholder={router?.pathname.includes("gpt-category") ? "Search Public GPTs Here" : "Type to search for over 1500+ tools..."} handleOnSearch={handleOnSearch} search={search} handleSearchClick={handleSearchClick} /> */}

                <div className={styles.gptStoreSearch}>
                  <input type="text" placeholder="Search Public GPTs Here...." onChange={handleOnSearch} value={search} />
                  <div className={styles.searchIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22">
                      <g clipPath="url(#clip0_280_415)">
                        <path
                          fill="#fff"
                          d="M21.297 20.038l-5.236-5.445a8.854 8.854 0 002.084-5.71C18.145 3.984 14.16 0 9.263 0 4.365 0 .38 3.985.38 8.882c0 4.898 3.985 8.883 8.883 8.883 1.838 0 3.59-.555 5.088-1.607l5.276 5.487c.22.229.517.355.835.355a1.153 1.153 0 001.158-1.136 1.16 1.16 0 00-.323-.826zM9.263 2.319a6.573 6.573 0 016.565 6.564 6.573 6.573 0 01-6.565 6.566 6.573 6.573 0 01-6.566-6.566 6.573 6.573 0 016.566-6.565z"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_280_415">
                          <path fill="#fff" d="M0 0H22V22H0z"></path>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>

                <div className={styles.twoButtonAlignment}>
                  {router?.pathname.includes("/gpt-category") ? (
                    <>
                      {/* <Link href="/browse-all-gpts">
                        <button aria-label="Submit Now">
                          Browse All Gpts
                          <img loading="lazy" src={RightIcon} alt="RightIcon" />
                        </button>
                      </Link> */}
                      <Link href="/gpt-category">
                        <button aria-label=" View All categories">
                          View All categories
                          <RightIconLg />
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
                        <button aria-label=" View All categories">
                          View All categories
                          <img loading="lazy" src={RightIcon} alt="RightIcon" />
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LazyLoad>
  );
}
