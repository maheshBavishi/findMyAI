"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./aishortvideoscard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAiToolsShortVideo } from "@/store/ApiSlice/aiToolSortVideoSlice";
import AishortvideosModal from "@/shared/components/aishortvideosModal";
import Loader from "@/shared/components/Loader";
import Pagination from "@/shared/components/pagination";
import Skeleton from "react-loading-skeleton";
import { setCurrentPage } from "@/store/ApiSlice/gptSlice";
import useOnClickOutside from "@/hook/useOnClickOutside";
import LazyImage from "@/helpers/lazyImage";
import Nodatashow from "@/shared/components/nodatashow";
const PlayImg = "/assets/icons/play-button.svg";
const Nodata = "/assets/icons/no-data-vector.svg";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import raw from "rehype-raw";
const Logo = "/assets/logo/logo-5.png";

export default function Aishortvideoscard() {
  const dispatch = useDispatch();
  const { getAllAiToolsVideo, videoloading, AiToolsVideoCount } = useSelector(
    (state) => state.aiToolsshortvideo
  );
  const { page } = useSelector((state) => state.gpt);
  const [item, setItem] = useState("");
  const [oenModal, setOpenModal] = useState(false);
  const nPages = Math.ceil(AiToolsVideoCount / 20);
  useEffect(() => {
    dispatch(getAiToolsShortVideo({ page: page, limit: 20 }))
      .unwrap()
      .then((res) => {});
    window.scrollTo(0, 0);
  }, [page]);
  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, []);
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
    setOpenModal(false);
  });

  return (
    <>
      <div className={styles.aishortvideoscardAlignment}>
        <div className="container video-container">
          {videoloading ? (
            <div className={styles.videoSkeletonUi}>
              <div className={styles.grid}>
                {[...Array(10)].map((_, index) => (
                  <>
                    <Skeleton
                      baseColor="#cccccc29"
                      className={styles.skeletonPlayer}
                    />
                  </>
                ))}
              </div>
            </div>
          ) : (
            <>
              {getAllAiToolsVideo?.length > 0 ? (
                <>
                  <div className={styles.grid}>
                    {getAllAiToolsVideo?.map((item, i) => {
                      return (
                        <div
                          className={styles.griditems}
                          key={i}
                          onClick={() => handleOnOpenModel(item)}
                        >
                          <img loading="lazy" src={item?.image} alt="video" />

                          {/* <video autoPlay loop muted>
                    <source src={item?.videoLink} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video> */}
                          <div className={styles.blur}></div>
                          <div className={styles.text}>
                            <div className={styles.spacer}>
                              <div className={styles.videoDescription}>
                                <div className={styles.logoAlignment}>
                                  <div className={styles.logoImage}>
                                    <LazyImage
                                      image={{
                                        src: item?.icon ?? Logo,
                                        alt: `videoImage`,
                                      }}
                                      className={styles.cardImageChild}
                                    />
                                  </div>
                                  <h6>Find my ai tools</h6>
                                </div>
                              </div>

                              <ReactMarkdown
                                remarkPlugins={[gfm]}
                                rehypePlugins={[raw]}
                                children={item?.description}
                                className={styles?.textWrap}
              />                            </div>
                          </div>

                          <div className={styles.videoPlayIcon}>
                            <img loading="lazy" src={PlayImg} alt="PlayImg" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <Nodatashow />
                </>
              )}
            </>
          )}
        </div>
      </div>
      {AiToolsVideoCount > 20 && (
        <Pagination nPages={nPages} currentPage={page} />
      )}
      {oenModal && (
        <AishortvideosModal
          item={item}
          setOpenModal={setOpenModal}
          SherebarRef={SherebarRef}
        />
      )}
    </>
  );
}
