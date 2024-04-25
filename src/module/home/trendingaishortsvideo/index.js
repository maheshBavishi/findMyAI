"use client ";
import React, { useEffect, useRef, useState } from "react";
import styles from "./trendingaishortsvideo.module.scss";
import ViewAll from "@/shared/components/viewAll";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { getAiToolsShortVideo } from "@/store/ApiSlice/aiToolSortVideoSlice";
import AishortvideosModal from "@/shared/components/aishortvideosModal";
import Link from "next/link";
const DemoImg = "/assets/images/demoimg.jpg";
const Logo = "/assets/logo/logo-5.png";
const LeftArrow = "/assets/icons/slider-left.svg";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { setCurrentPage } from "@/store/ApiSlice/gptSlice";
import LazyImage from "@/helpers/lazyImage";
import LazyLoad from "@/helpers/lazyLoad";
import useOnClickOutside from "@/hook/useOnClickOutside";
import Nodatashow from "@/shared/components/nodatashow";
const PlayIcon = "/assets/icons/play-button.svg";
const Nodata = "/assets/icons/no-data-vector.svg";

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
export default function Trendingaishortsvideo() {
  const { getAllAiToolsVideo, videoloading } = useSelector((state) => state.aiToolsshortvideo);
  const [videosToShow, setVideosToShow] = useState([]);
  const dispatch = useDispatch();
  const [item, setItem] = useState("");
  const [oenModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getAiToolsShortVideo({}))
      .unwrap()
      .then((res) => {});
    dispatch(setCurrentPage(1));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
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

  const handleOnOpenModel = (item) => {
    setOpenModal(true);
    setItem(item);
  };
  const disableBodyScroll = () => {
    const body = document.body;
    if (body) {
      body.style.overflow = "hidden";
    }
  };
  const enableBodyScroll = () => {
    const body = document.body;
    if (body) {
      body.style.overflow = "auto";
    }
  };
  useEffect(() => {
    if (oenModal) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  }, [oenModal]);
  const SherebarRef = useRef();
  useOnClickOutside(SherebarRef, () => {
    setOpenModal(false)  });

  return (
    <LazyLoad id={"Trendingaishortsvideo"}>
      <div className={styles.trendingaishortsvideoSection}>
        <div className="container">
          <div className={styles.heading}>
            <div className={styles.title}>
              <div>
                <h2>AI Shorts</h2>
                <p>Quick AI Videos for Everyone - Simplifying Tech with Short, Easy-to-Understand Clips.</p>
              </div>
            </div>
            <div className={styles.webViewAll}>
              <Link href={`/ai-shorts-videos`}>
                <ViewAll />
              </Link>
            </div>
          </div>
          {oenModal && <AishortvideosModal item={item} setOpenModal={setOpenModal} SherebarRef={SherebarRef} />}
          {/* {videoloading ? (
          <>
            <div className={styles.grid}>
              {[...Array(5)].map((_, index) => (
                <div>
                  <Skeleton baseColor="#cccccc29" className={styles.shortVideoSkeletImg} height={380} borderRadius={10} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <> */}
          {getAllAiToolsVideo?.length > 0 ? (
            <>
              {getAllAiToolsVideo?.length <= 2 ? (
                <>
                  <div className={styles.grid}>
                    {getAllAiToolsVideo?.map((item, i) => {
                      return (
                        <div className={styles.griditems} key={i} onClick={() => handleOnOpenModel(item)}>
                          <div className={styles.image}>
                            <LazyImage
                              image={{
                                src: item?.image,
                                alt: `videoImage`,
                              }}
                              className={styles.cardImageChild}
                            />
                          </div>
                          {/* <img  loading="lazy" src={item?.image} /> */}
                          {/* <video autoPlay loop muted poster={item?.image}>
                          <source src={item?.videoLink} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video> */}
                          <div className={styles.blur}></div>
                          <div className={styles.text}>
                            <div className={styles.spacer}>
                              {/* <img  loading="lazy" src={item?.icon ? item?.icon : Logo} alt="Logo" /> */}
                              <div className={styles.image}>
                                <LazyImage
                                  image={{
                                    src: item?.icon ? item?.icon : Logo,
                                    alt: `videoImage`,
                                  }}
                                  className={styles.cardImageChild}
                                />
                              </div>
                              {/* <img  loading="lazy" src={Logo} alt="Logo" /> */}
                              <p>{item?.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.sliderAlignment}>
                    <Slider {...settings}>
                      {getAllAiToolsVideo?.map((item, i) => {
                        return (
                          <div className={styles.videoAlignment} key={i} onClick={() => handleOnOpenModel(item)}>
                            <div className={styles.videoDetailsAlignment}>
                              {/* <img loading="lazy" src={item?.image} /> */}
                              <div className={styles.image}>
                                <LazyImage
                                  image={{
                                    src: item?.image,
                                    alt: `videoImage`,
                                  }}
                                  className={styles.cardImageChild}
                                />
                              </div>

                              <div className={styles.videoDescription}>
                                <div className={styles.logoAlignment}>
                                  {/* <img  loading="lazy" src={item?.icon ? item?.icon : Logo} alt="Logo" />
                                    <img  loading="lazy" src={Logo} alt="Logo" /> */}
                                  {/* <img loading="lazy" src={Logo} alt="Logo" /> */}
                                  <div className={styles.logoImage}>
                                    <LazyImage
                                      image={{
                                        src: item?.icon ? item?.icon : Logo,
                                        alt: `videoImage`,
                                      }}
                                      className={styles.cardImageChild}
                                    />
                                  </div>
                                  <h6>Find my ai tools</h6>
                                </div>
                                <p>{item?.description}</p>
                              </div>

                              <div className={styles.videoPlayIcon}>
                                <img loading="lazy" src={PlayIcon} alt="PlayIcon" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
             <Nodatashow/>
            </>
          )}
          {/* </>
        )} */}

          <div className={styles.mobileViewAll}>
            <Link href="/ai-shorts-videos">
              <ViewAll />
            </Link>
          </div>
        </div>
      </div>
    </LazyLoad>
  );
}
