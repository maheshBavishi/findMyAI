"use client";
import React, { useEffect, useState } from "react";
import styles from "./exploregptTools.module.scss";
import ViewAll from "@/shared/components/viewAll";
import Carddesign from "../cardSection/carddesign";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import { useDispatch, useSelector } from "react-redux";
import { getAiTools, setCategoryDetails } from "@/store/ApiSlice/aiToolsSlice";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { authHeader } from "@/helpers/authHelper";
import LazyLoad from "@/helpers/lazyLoad";
import GptStoreCard from "@/module/gptStore/gptStoreCard";
import { GetGpt } from "@/store/ApiSlice/gptSlice";
import Nodatashow from "@/shared/components/nodatashow";
const Nodata = "/assets/icons/no-data-vector.svg";

export default function ExploreGptTools() {
  let duration = 100;
  const { GetGptData, gptLoading } = useSelector((state) => state.gpt);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetGpt({ page: 1, limit: 6 ,        selectedData:true
    }));
  }, []);
  const handleViewDetails = (item) => {
    const encodedName = encodeURIComponent(item?.projectName);
    router?.push(`/gpt-store/${item?.slugId}`);
  };

  return (
    <LazyLoad id={"ExploreGptTools"}>
      <div
        className={styles.categoriesToolsAlignment}
        data-scroll
        data-scroll-section
        data-scroll-direction="horizontal"
      >
        <div className="container">
          <div className={styles.titleAlignment}>
            <div className={styles.title}>
              <div>
                <h2>Explore GPT's</h2>
                <p>
                  Simplify Complexity with Explore GPT: Your Path to Effortless
                  Understanding.
                </p>
              </div>
            </div>
            {/* {pathname.includes("/tools-details") ? null : (
              <div className={styles.webViewAll}>
                <Link href="/gpt-store">
                  <ViewAll />
                </Link>
              </div>
            )} */}

          </div>
          {gptLoading ? (
            <>
              <div className={styles.grid}>
                {[...Array(6)].map((_, index) => (
                  <GptStoreCard loading={gptLoading} />
                ))}
              </div>
            </>
          ) : (
            <>
              {GetGptData?.length > 0 ? (
                <>
                  <div className={styles.grid}>
                    {GetGptData?.map((item,index) => {
                      duration = duration + (index ? 200 : 0)
                      return(
                        <div onClick={() => handleViewDetails(item)}>
                          <GptStoreCard key={item.id} item={item} />
                        </div>
                      )
                  
                      })}
                  </div>
                </>
              ) : (
                <Nodatashow />
               )}
            </>
          )}
        </div>
      </div>
    </LazyLoad>
  );
}
