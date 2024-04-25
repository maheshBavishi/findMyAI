"use client";
import React, { useEffect } from "react";
import styles from "./featuredGPT.module.scss";
import ViewAll from "@/shared/components/viewAll";
import GptStoreCard from "../gptStoreCard";
import { useDispatch, useSelector } from "react-redux";
import { GetGpt } from "@/store/ApiSlice/gptSlice";
import Nodatashow from "@/shared/components/nodatashow";
const Nodata = "/assets/icons/no-data-vector.svg";

export default function FeaturedGPT() {
  const { GetGptData, gptLoading } = useSelector((state) => state.gpt);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetGpt({ page: 1, limit: 6 ,        selectedData:true
    }));
  }, []);
  return (
    <div className={styles.featuredGptSection}>
      <div className="container">
        <div className={styles.featuredGptHeading}>
          <div className={styles.headingName}>
            <h2>Featured GPTs</h2>
            <p>Curated top picks this week</p>
          </div>
        </div>
        <div className={styles.featuredGptBodyAlignment}>
          <>
            {gptLoading ? (
              <div className={styles.featuredGptGrid}>
                {[1, 2, 3, 4, 5, 6].map(() => {
                  return (
                    <div className={styles.browserAllCardGridItem}>
                      <GptStoreCard loading={gptLoading} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <>
                {GetGptData?.length > 0 ? (
                  <div className={styles.featuredGptGrid}>
                    {GetGptData.slice(0, 6)?.map((item) => (
                      <GptStoreCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <Nodatashow/>
                )}
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
}
