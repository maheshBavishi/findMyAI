"use client";
import React, { use, useEffect, useState } from "react";
import styles from "./toolsdetailsallDetails.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { marked } from "marked";
import {
  getAiTools,
  getAiToolsCategory,
  setScrollCategory,
  setToolLoader,
} from "@/store/ApiSlice/aiToolsSlice";
import Carddesign from "@/module/home/cardSection/carddesign";
import LazyLoad from "@/helpers/lazyLoad";
import Skeleton from "react-loading-skeleton";
import LazyImage from "@/helpers/lazyImage";
import Link from "next/link";
const BannerImg = "/assets/images/blog-image.png";
const Arrow = "/assets/icons/top-right-arrow.svg";
const CategoriesinformationImg = "/assets/images/categoriesinformation-img.png";
const Nodata = "/assets/icons/no-data-vector.svg";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import raw from "rehype-raw";
import { useRouter } from "next/router";
export default function ToolsDetailsAllDetails({
  categoryToolsDetails,
  loader,
  setLoader,
}) {
  const dispatch = useDispatch();
  const {
    getAiToolsCategoryData,
    categoryLoader,
    categoryDetails,
    loading,
    getAllAiTools,
  } = useSelector((state) => state.aiTools);
  const router = useRouter(); 
  const pathParts = router?.pathname?.split("/");
  const lastPart = pathParts[pathParts.length - 1];
  const trimmedLastPart = lastPart.trim();
  const handleViewDetails = (item) => {
    route?.push(`/tool/${item?.slugId}`);
  };
  const [toolsData, setToolData] = useState();
  const [hasCalledGetPopularTools, setHasCalledGetPopularTools] =
    useState(false);
  useEffect(() => {
    dispatch(getAiToolsCategory({ status: "active" }));
  }, []);
  const HndleOnToolsApiCalls = () => {
    setLoader(true);
    dispatch(setToolLoader(false));

    dispatch(
      getAiTools({
        page: 1,
        limit: 4,
        status: "approved",
        isFeatured: true,
        selectedData: true,
      })
    )
      .then((res) => {
        dispatch(setToolLoader(true));
        setLoader(false);

        setToolData(res?.payload?.payload?.aiTool);
      })
      .catch(() => {
        dispatch(setToolLoader(true));
        setLoader(false);
      });
  };

  useEffect(() => {
    if (categoryToolsDetails?.item && !hasCalledGetPopularTools) {
      dispatch(setToolLoader(false));
      HndleOnToolsApiCalls();
      setHasCalledGetPopularTools(true);
    }
  }, [categoryToolsDetails, hasCalledGetPopularTools]);

  const handleScrollToSection = async (id) => {
    await dispatch(setScrollCategory(id));
  };
  return (
    <div className={styles.toolsDetailsAllDetailsSection}>
      <div className={styles.toolsDetailsAllDetailsGrid}>
        <div className={styles.allChildDetailsAlignment}>
          {loading ? (
            <>
              <Skeleton
                className={styles.skeletonDetails}
                baseColor="#232147"
              />
              <Skeleton
                className={styles.skeletonDetails}
                baseColor="#232147"
              />
            </>
          ) : (
            <p>{categoryToolsDetails?.item?.description}</p>
          )}
          {loading ? (
            <>
              <Skeleton
                className={styles.childDetailsImg}
                baseColor="#232147"
              />
            </>
          ) : (
            <>
              {categoryToolsDetails?.item?.images?.[0] && !loading && (
                <div className={styles.childDetailsImg}>
                  <LazyImage
                    image={{
                      src: categoryToolsDetails?.item?.images?.[0] ?? BannerImg,
                      alt: `icon`,
                    }}
                    className={styles.lazyImgAlignmnt}
                  />
                </div>
              )}
            </>
          )}
          {loading ? (
            <>
              <Skeleton
                className={styles.allChildDetailsAlignment}
                baseColor="#232147"
                count={5}
              />
            </>
          ) : (
            <>
              <ReactMarkdown
                remarkPlugins={[gfm]}
                rehypePlugins={[raw]}
                children={categoryToolsDetails?.item?.details}
                className={styles?.textWrap}
              />
            </>
          )}

          <div className={styles.prosCrnsDetails}>
            {categoryToolsDetails?.item?.pros && (
              <>
                <h2>Pros</h2>
                {loading ? (
                  <>
                    <Skeleton
                      className={styles.skelttonCategory}
                      baseColor="#232147"
                      count={5}
                    />
                  </>
                ) : (
                  <div style={{ color: "white" }}>

                    <ReactMarkdown
                      remarkPlugins={[gfm]}
                      rehypePlugins={[raw]}
                      children={categoryDetails?.item?.pros}
                      className={styles?.textWrap}
                    />
                  </div>
                )}
              </>
            )}{" "}
            {categoryDetails?.item?.cons && (
              <>
                <h2>Cons</h2>
                {loading ? (
                  <>
                    <Skeleton
                      className={styles.skelttonCategory}
                      baseColor="#232147"
                      count={5}
                    />
                  </>
                ) : (
                  <div style={{ color: "white" }}>
                    <ReactMarkdown
                      remarkPlugins={[gfm]}
                      rehypePlugins={[raw]}
                      children={categoryDetails?.item?.cons}
                      className={styles?.textWrap}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className={styles.toolsDetailsRightSide}>
          <div className={styles.featureCategoryDetails}>
            {loader || loading ? (
              <Skeleton
                baseColor="#cccccc29"
                className={styles.skeletontitle}
              />
            ) : (
              <h4>Featured AI Tools</h4>
            )}

            <div className={styles.featureCategoryCard}>
              {loader ? (
                <div className={styles.grid}>
                  {[...Array(3)].map((_, index) => (
                    <Carddesign loading={loader} />
                  ))}
                </div>
              ) : (
                <>
                  {!loading && toolsData?.length > 0 ? (
                    <div>
                      {toolsData
                        ?.filter((aitool) => aitool?.slugId !== trimmedLastPart)
                        .slice(0, 3)

                        ?.map((aiTool, index) => (
                          <div
                            onClick={() => handleViewDetails(aiTool)}
                            key={index}
                          >
                            <Carddesign
                              images={aiTool?.images?.[0]}
                              name={aiTool?.title}
                              description={aiTool?.aiToolSubCategoryId?.name}
                              icon={aiTool?.icon}
                              isFeatured={aiTool?.isFeatured}
                              item={aiTool}
                            />
                          </div>
                        ))}
                    </div>
                  ) : (
                    !loading &&
                    getAllAiTools?.length > 0 && (
                      <div>
                        {getAllAiTools
                          .slice(0, 3)
                          .filter(
                            (aitool) => aitool?.slugId !== trimmedLastPart
                          )
                          .map((aiTool, index) => (
                            <div
                              onClick={() => handleViewDetails(aiTool)}
                              key={index}
                            >
                              <Carddesign
                                images={aiTool?.images?.[0]}
                                name={aiTool?.title}
                                description={aiTool?.aiToolSubCategoryId?.name}
                                icon={aiTool?.icon}
                                isFeatured={aiTool?.isFeatured}
                                item={aiTool}
                              />
                            </div>
                          ))}
                      </div>
                    )
                  )}
                </>
              )}
            </div>
          </div>

          <div className={styles.toolsCategoryDetails}>
            <div className={styles.toolsCategoryBox}>
              <h4>AI Tools Category</h4>
              <div className={styles.toolsCategoryListDetails}>
                {categoryLoader ? (
                  <>
                    <Skeleton
                      className={styles.skelttonCategory}
                      baseColor="#232147"
                      count={5}
                    />
                  </>
                ) : (
                  <ul>
                    <>
                      {getAiToolsCategoryData?.slice(0, 8)?.map((item) => {
                        return (
                          <li
                            onClick={() =>
                              handleScrollToSection(item?.name?.toLowerCase())
                            }
                          >
                            <Link href="/category">
                              <p>
                                {item?.name}
                                <img loading="lazy" src={Arrow} alt="Arrow" />
                              </p>
                            </Link>
                          </li>
                        );
                      })}
                    </>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
