"use client";
import React, { useEffect, useState } from "react";
import styles from "./trendingGPT.module.scss";
import ViewAll from "@/shared/components/viewAll";
import GptStoreCard from "../gptStoreCard";
import { useDispatch, useSelector } from "react-redux";
import { GetGpt } from "@/store/ApiSlice/gptSlice";
import Nodatashow from "@/shared/components/nodatashow";
const Nodata = "/assets/icons/no-data-vector.svg";

export default function TrendingGPT() {

  const [gptData, setGptData] = useState([]);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    setLoader(true)
    dispatch(GetGpt({ page: 1, isPopular: true, limit: 6, selectedData: true }))
      .then((res) => {
        setGptData(res?.payload.payload.app);
        setLoader(false)

      })
      .catch((err) => {        setLoader(false)
      });
  }, []);
  return (
    <div className={styles.trendingGptSection}>
      <div className={styles.trendingGptHeading}>
        <div className={styles.headingName}>
          <h2>Trending GPTs</h2>
          <p>Curated top picks this week</p>
        </div>
      </div>
      <div className={styles.trendingGptBodyAlignment}>
        <>
          {loader ? (
            <div className={styles.trendingGptGrid}>
              {[1, 2, 3, 4, 5, 6].map((item,index) => {
                return (
                  <div className={styles.browserAllCardGridItem}>
                    <GptStoreCard loading={loader} key={index}/>
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              { !loader && gptData?.length > 0 ? (
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
