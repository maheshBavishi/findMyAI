"use client";
import React, { useEffect, useState } from "react";
import styles from "../../gptStore/trendingGPT/trendingGPT.module.scss";
import ViewAll from "@/shared/components/viewAll";
import GptStoreCard from "../../gptStore/gptStoreCard";
import { useDispatch, useSelector } from "react-redux";
import { GetGpt, setGptLoader } from "@/store/ApiSlice/gptSlice";
import Link from "next/link";
import Nodatashow from "@/shared/components/nodatashow";
const Nodata = "/assets/icons/no-data-vector.svg";

export default function ReleatedcategoryGpts({
  gptDetails,
  relatedGptLoader,
  setRelatedGptLoader,
}) {
  const [hasCalledGetPopularTools, setHasCalledGetPopularTools] =
    useState(false);
  const [gptData, setGptData] = useState([]);

  const dispatch = useDispatch();
  const HndleOnGptsApiCalls = () => {
    setRelatedGptLoader(true);
    dispatch(
      GetGpt({
        page: 1,
        limit: 6,
        selectedData: true,
        category: gptDetails?.category?.[0]?.name,
      })
    )
      .then((res) => {
        setGptData(res?.payload.payload.app);
        dispatch(setGptLoader(true));
        setRelatedGptLoader(false);
      })
      .catch((err) => {
        dispatch(setGptLoader(true));
        setRelatedGptLoader(false);
      });
  };

  useEffect(() => {
    if (gptDetails?.category?.[0]?.name && !hasCalledGetPopularTools) {
      dispatch(setGptLoader(false));
      HndleOnGptsApiCalls();
      setHasCalledGetPopularTools(true);
    }
  }, [gptDetails, hasCalledGetPopularTools]);
  return (
    <div className={styles.trendingGptSection}>
      <div className={styles.trendingGptHeading}>
        <div className={styles.headingName}>
          <h2>Related GPTs</h2>
        </div>
      </div>
      <div className={styles.trendingGptBodyAlignment}>
        <>
          {relatedGptLoader ? (
            <div className={styles.trendingGptGrid}>
              {[1, 2, 3, 4, 5, 6].map((item,index) => {
                return (
                  <div className={styles.browserAllCardGridItem} key={index}>
                    <GptStoreCard loading={relatedGptLoader} />
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              {gptData?.length > 0 ? (
                <div className={styles.trendingGptGrid}>
                  {gptData.map((item) => (
                    <GptStoreCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <Nodatashow />
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
}
