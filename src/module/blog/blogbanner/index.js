"use client";
import React, { useEffect, useState } from "react";
import styles from "./blogbanner.module.scss";
import Searchbar from "@/module/home/herobanner/searchbar";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import { useDispatch } from "react-redux";
import { getBlog } from "@/store/ApiSlice/blogSlice";
import classNames from "classnames";
import LazyLoad from "@/helpers/lazyLoad";
const ArticleImg = "/assets/images/artical-img.png";
const BlogerImg = "/assets/images/bloger-img.svg";
import Slider from "react-slick";
import { useRouter } from "next/router";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={styles.rightArrowDesign} onClick={onClick}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.9" clip-path="url(#clip0_379_2664)">
          <path d="M6.30693 10.7032L0.287338 4.68338C-0.0957785 4.30045 -0.0957785 3.67959 0.287338 3.29685C0.670114 2.91407 1.29094 2.91407 1.67368 3.29685L7.0001 8.62342L12.3263 3.297C12.7093 2.91423 13.33 2.91423 13.7128 3.297C14.0957 3.67978 14.0957 4.3006 13.7128 4.68353L7.69312 10.7033C7.50164 10.8947 7.25095 10.9903 7.00013 10.9903C6.74919 10.9903 6.49832 10.8945 6.30693 10.7032Z" fill="white" />
        </g>
        <defs>
          <clipPath id="clip0_379_2664">
            <rect width="14" height="14" fill="white" transform="translate(14) rotate(90)" />
          </clipPath>
        </defs>
      </svg>

    </div>
  )
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={styles.leftArrowDesign} onClick={onClick}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.9" clip-path="url(#clip0_379_2664)">
          <path d="M6.30693 10.7032L0.287338 4.68338C-0.0957785 4.30045 -0.0957785 3.67959 0.287338 3.29685C0.670114 2.91407 1.29094 2.91407 1.67368 3.29685L7.0001 8.62342L12.3263 3.297C12.7093 2.91423 13.33 2.91423 13.7128 3.297C14.0957 3.67978 14.0957 4.3006 13.7128 4.68353L7.69312 10.7033C7.50164 10.8947 7.25095 10.9903 7.00013 10.9903C6.74919 10.9903 6.49832 10.8945 6.30693 10.7032Z" fill="white" />
        </g>
        <defs>
          <clipPath id="clip0_379_2664">
            <rect width="14" height="14" fill="white" transform="translate(14) rotate(90)" />
          </clipPath>
        </defs>
      </svg>

    </div>
  )

}

export default function Blogbanner({ search, handleOnSearch, setSearch }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [categorySearch, setCategorySearch] = useState("");
  useEffect(() => {
    dispatch(getBlog({ categorytext: categorySearch }))
      .then((res) => { })
      .catch(() => { });
  }, [categorySearch]);
  useEffect(() => {
    if (search) {
      setCategorySearch("");
    }
  }, [search]);


  const NavSlider = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    adaptiveHeight: true,
  };

  return (
    <LazyLoad id={"Blogbanner"}>
      <div className={styles.blogbannerAlignment}>
        <div className="container">
          <div className={styles.line}></div>
          <div className={styles.textSectionAlignment}>
            <div className={styles.textwidth}>
              {/* <AnimatedSection animationType="fade-up" duration={600} delay={400}> */}
              <h1> {router?.pathname?.includes(`/blog`) ? <>{`Discover New Blog’s Here`}</> : <>{`Discover New Article’s Here`}</>}</h1>
              {/* </AnimatedSection> */}
              {/* <AnimatedSection animationType="fade-up" duration={600} delay={500}> */}
              {router?.pathname?.includes(`/blog`) ? <p>Discover the latest and hottest blogs based on current trends.</p> : <p>Embark on a Journey of Discovery Explore Our Latest Articles</p>}
              {/* </AnimatedSection> */}
              {/* <AnimatedSection animationType="fade-up" duration={600} delay={600}> */}
              <div className={styles.lastContnet}>
                <div className={styles.blogsearch}>
                  <Searchbar placeholder="Search blog here..." handleOnSearch={handleOnSearch} search={search} name="search" />
                </div>
                {router?.pathname?.includes(`/blog`) && (
                  <>
                    <div className={styles.buttonalignment}>
                      <Slider {...NavSlider}>
                        <button className={classNames(categorySearch === "" ? styles.active : "")} onClick={() => setCategorySearch("")} aria-label="all">
                          All
                        </button>
                        <button className={classNames(categorySearch === "health" ? styles.active : "")} onClick={() => setCategorySearch("health")} aria-label="Health">
                          Health
                        </button>
                        <button className={classNames(categorySearch === "AI tools" ? styles.active : "")} onClick={() => setCategorySearch("AI tools")} aria-label="AI Tools">
                          AI Tools
                        </button>
                        <button className={classNames(categorySearch === "Marketing" ? styles.active : "")} onClick={() => setCategorySearch("Marketing")} aria-label="Marketing">
                          Marketing
                        </button>
                        <button className={classNames(categorySearch === "Real estate" ? styles.active : "")} onClick={() => setCategorySearch("Real estate")} aria-label="Real Estate">
                          Real Estate
                        </button>
                        <button className={classNames(categorySearch === "Finance" ? styles.active : "")} onClick={() => setCategorySearch("Finance")} aria-label="Finance">
                          Finance
                        </button>
                      </Slider>

                    </div>
                  </>
                )}
              </div>
              {/* </AnimatedSection> */}
            </div>
            <div className={styles.imgwidth}>
              {router?.pathname?.includes(`/article`) ? (
                <div className={styles.bannerRightImg}>
                  <img src={ArticleImg} alt="ArticleImg" />
                </div>
              ) : (<div className={styles.bannerRightImg}>
                <img src={BlogerImg} alt="BlogerImg" />
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </LazyLoad>
  );
}
