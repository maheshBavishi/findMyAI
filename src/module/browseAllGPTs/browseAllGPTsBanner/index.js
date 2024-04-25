import React from "react";
import styles from "./browseAllGPTsBanner.module.scss";
import Link from "next/link";
import RightIconLg from "@/assets/icons/righticonlg";
import SearchIcon from "@/assets/icons/SearchIcon";
import LazyLoad from "@/helpers/lazyLoad";
// const SearchIcon = "/assets/icons/search.svg";
const IconImg = "/assets/images/banner-option-img.png";
export default function BrowseAllGPTsBanner({
  search,
  handleOnSearch,
}) {
  return (
    <LazyLoad id={"BrowseAllGPTsBanner"}>

      <div className={styles.browseAllGPTsBannerSection}>
        <div className="container">
          <div className={styles.browseAllGPTsBannerAlignment}>
            <div className={styles.browseAllOption}>
            <img  loading="lazy" src={IconImg} alt="IconImg" />
            </div>
            <div className={styles.browseAllGPTsBannerDetails}>
              <h1>Browse All GPTs</h1>
              <p>
                Discover and create custom versions of ChatGPT that combine
                instructions, extra knowledge, and any combination of skills.
              </p>
              <div className={styles.browseAllGPTsSearch}>
                <input
                  type="text"
                  placeholder="Search Public GPTs Here...."
                  onChange={handleOnSearch}
                  value={search?.trim()}
                />

                <div className={styles.searchIcon}>
                <SearchIcon/>
                  {/* <img  loading="lazy" src={SearchIcon} alt="SearchIcon" /> */}
                </div>
              <Link href="/gpt-category" >
                  <div className={styles.browseAllGPTsviewAllAlignment}>
                    <span>View All Categories</span>
                  <RightIconLg/>
                  </div>
                </Link>
           
            </div>
            </div>
          </div>
        </div>
      </div>
    </LazyLoad>
  );
}
