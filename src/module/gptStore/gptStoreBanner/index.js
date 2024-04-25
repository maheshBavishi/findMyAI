import React from "react";
import styles from "./GptStoreBanner.module.scss";
import Link from "next/link";
import RightIconLg from "@/assets/icons/righticonlg";
import SearchIcon from "@/assets/icons/SearchIcon";
const IconImg = "/assets/images/banner-option-img.png";
export default function GptStoreBanner({ search, handleOnSearch }) {
  return (
    <div className={styles.gptStoreBannerSection}>
      <div className="container">
        <div className={styles.gptStoreBannerAlignment}>
          <div className={styles.gptStoreOption}>
            <img loading="lazy" src={IconImg} alt="IconImg" />
          </div>
          <div className={styles.gptStoreBannerDetails}>
            <h1>Welcome to GPT Store</h1>
            <p>
              Discover and create custom versions of ChatGPT that combine
              instructions, extra knowledge, and any combination of skills.
            </p>
            <div className={styles.gptStoreSearch}>
              <input
                type="text"
                placeholder="Search Public GPTs Here...."
                onChange={handleOnSearch}
                value={search?.trim()}
              />
              <div className={styles.searchIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 22 22"
                >
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
            <div className={styles.gptViewFlex}>
              <Link href="/gpt-category">
                <div className={styles.gptviewAllAlignment}>
                  <span>View All Categories</span>
                  <RightIconLg />
                </div>
              </Link>
              <Link href="/browse-all-gpts">
                <div className={styles.gptviewAllAlignment}>
                  <span>Browse All Gpts</span>
                  <RightIconLg />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
