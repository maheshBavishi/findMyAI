"use client";
import React, { useEffect, useState } from "react";
import styles from "./browserAllGptsCard.module.scss";
import GptStoreCard from "@/module/gptStore/gptStoreCard";
import { useDispatch, useSelector } from "react-redux";
import { GetGpt } from "@/store/ApiSlice/gptSlice";
import Pagination from "@/shared/components/pagination";
import LazyLoad from "@/helpers/lazyLoad";
import Nodatashow from "@/shared/components/nodatashow";
const Nodata = "/assets/icons/no-data-vector.svg";

export default function BrowserAllGptsCard() {
  const { GetGptData, gptLoading ,GptCount  ,page} = useSelector((state) => state.gpt);

  const nPages = Math.ceil(GptCount / 12);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetGpt({ page: page , limit:12,        selectedData:true
    }));
    window.scrollTo(0, (document.body.clientHeight * 0.3) - (window.innerHeight * 0.3))

  }, [page]);
  return (
    <LazyLoad id={"BrowserAllGptsCard"}>

    <div className={styles.browserAllCardDetailsAlignment}>
      <div className="container-xl">
        <div >
          {gptLoading ? (
            <div className={styles.browserAllCardGrid}>
              {[...Array(12)].map(() => {
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
                <div className={styles.browserAllCardGrid}>
                  {GetGptData?.map((item) => (
                      <GptStoreCard key={item.id} item={item} />
                  ))}
   
                </div>
              ) : (
                <Nodatashow/>
               )}
            </>
          )}
     
        </div>
      </div>
        {GptCount > 12 && (
          <div style={{marginTop:"40px"}}>

            <Pagination
              nPages={nPages}
              currentPage={page}
            />
          </div>
      )}
    </div>
    </LazyLoad>
  );
}
