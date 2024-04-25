"use client";
import React from "react";
import styles from "./testimonial.module.scss";
import Slider from "react-slick";
import { Space_Mono } from "next/font/google";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import ViewAll from "@/shared/components/viewAll";
import LazyLoad from "@/helpers/lazyLoad";
import RightIconLg from "@/assets/icons/righticonlg";
const ProfileImage = "/assets/icons/testimal-user.svg";
const LeftArrow = "/assets/icons/slider-left.svg";
const RightArrow = "/assets/icons/slider-left.svg";

const StarIcon = "/assets/icons/star-icon.svg";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={styles.rightArrow} onClick={onClick}>
      <img loading="lazy" src={LeftArrow} alt="LeftArrow" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={styles.leftArrow} onClick={onClick}>
      <img loading="lazy" src={LeftArrow} alt="LeftArrow" />
    </div>
  );
}
const DummyData = [
  {
    name: "Liam Johnson",
    title: "Find My AI Tool is a one-stop solution for all AI tool needs. It’s like having a personal AI consultant, guiding you to the perfect tools for your specific requirements,",
  },
  {
    name: "Noah Patel",
    title: "Navigating the world of AI tools can be overwhelming, but Find My AI Tool makes it easy. With its comprehensive directory and intuitive interface, finding the right AI tool has never been simpler",
  },
  {
    name: "Harper Jones",
    title: "Find My AI Tool has transformed the way we approach AI in our business. The platform’s extensive directory and insightful reviews have saved us countless hours of research",
  },
  {
    name: "Grace Taylor",
    title: "Find My AI Tool is a game-changer. It’s the ultimate guide to AI tools, making it easy to find the perfect solution for any project or proble,",
  },
  {
    name: "Umang Kanani",
    title: "Find My AI Tool is a must-have resource for anyone in the AI field. It’s comprehensive, and user-friendly, and makes finding the right AI tool a breeze",
  },
  {
    name: "Arjun Gupta",
    title: "Find My AI Tool has transformed the way we approach AI in our business. The platform’s extensive directory and insightful reviews have saved us countless hours of research",
  },
];

export default function Testimonial() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 476,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };
  return (
    <LazyLoad id={"Testimonial"}>
      <div className={styles.testimonialAlignment}  >
        <div className="container">
          <div className={styles.title}>
            <div>
              {/* <AnimatedSection animationType="fade-up" duration={800} delay={400}> */}
              <h2>Testimonials</h2>
              {/* </AnimatedSection> */}
              <p>Hear what our users have to say in their own words</p>
            </div>
            <div className={styles.webView}>
              <div className={styles.previewButton}>
                <a href="https://www.trustpilot.com/review/findmyaitool.com" target="_blank">
                  <button aria-label="Review Us">
                    Review Us
                    <RightIconLg />
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className={styles.sliderDesign}>
            <Slider {...settings}>
              {DummyData.map((item, i) => {
                return (
                  <div className={styles.card} key={i}>
                    <div className={styles.topDetailsAlignment}>
                      <img loading="lazy" src="/assets/icons/testimal-icon.svg" alt="testimal" />
                      <p>{item?.title}</p>
                    </div>
                    <div className={styles.bottomDetailsAlignment}>
                      <div className={styles.leftSideAlignment}>
                        <div className={styles.bottomProfile}>
                          <img loading="lazy" src={ProfileImage} alt="ProfileImage" />
                        </div>
                        <h6>{item?.name}</h6>
                      </div>

                      <div className={styles.starIconAlignment}>
                        {[0, 1, 2, 3, 4].map(() => {
                          return (
                            <div>
                              <img loading="lazy" src={StarIcon} alt="StarIcon" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>

          <div className={styles.mobileView}>
            <div className={styles.previewButton}>
              <a href="https://www.trustpilot.com/review/findmyaitool.com" target="_blank">
                <button aria-label="Review Us">
                  Review Us
                  <svg width="22" height="27" viewBox="0 0 22 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_280_332)">
                      <path
                        d="M21.7479 12.5161L21.7472 12.5151L17.2568 7.13283C16.9204 6.72962 16.3762 6.73112 16.0414 7.13635C15.7066 7.54152 15.7079 8.19687 16.0443 8.60013L19.0591 12.2137H0.859375C0.384742 12.2137 0 12.6771 0 13.2488C0 13.8204 0.384742 14.2838 0.859375 14.2838H19.0591L16.0443 17.8974C15.7079 18.3007 15.7066 18.956 16.0414 19.3612C16.3763 19.7665 16.9205 19.7679 17.2568 19.3647L21.7472 13.9824L21.748 13.9815C22.0846 13.5768 22.0835 12.9194 21.7479 12.5161Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_280_332">
                        <rect width="22" height="26.4975" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </LazyLoad>
  );
}
