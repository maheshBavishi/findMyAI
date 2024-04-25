"use client";
import React, { useState } from "react";
import styles from "./gptStoreCard.module.scss";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setGptDetails } from "@/store/ApiSlice/gptSlice";
import LazyImage from "@/helpers/lazyImage";
import Link from "next/link";
const GptLogo = "/assets/images/gpt-1.png";
const RangeIcon = "/assets/icons/range-icon-white.svg";
export default function GptStoreCard({ loading, item }) {

  return (
    <div className={styles.gptStoreCardBox} >
      <Link href={item?.slugId ? `/gpt-store/${item?.slugId}` : "#"}>
        <div className={styles.gptStoreCardGrid}>
          <>
            <div className={styles.gtpLogoImg}>
              <LazyImage
                image={{
                  src: item?.icon,
                  alt: "GptImg",
                }}
                className={styles.cardImageChild}
              />
              {/* </div> */}
            </div>
          </>

          <div className={styles.gptCardDetails}>
            <div>
              {loading ? (
                <div style={{ marginBottom: "10px" }}>
                  <Skeleton baseColor="#cccccc29" />
                </div>
              ) : (
                <div>
                  <h3> {item?.projectName}</h3>
                  <span> {item?.category?.[0]?.name || item?.category}</span>
                </div>
              )}
              {loading ? (
                <div style={{ marginBottom: "10px" }}>
                  <Skeleton baseColor="#cccccc29" />
                </div>
              ) : (
                <>
                  <p>{item?.description}</p>
                </>
              )}{" "}
            </div>
            {loading ? (
              <Skeleton
                baseColor="#cccccc29"
                className={styles.gptCardBottomDetails}
              />
            ) : (
              <>
                <div className={styles.gptCardBottomDetails}>
                  <h6 className={styles.gptBookmarkDesign}>
                    @{item?.authorName}
                  </h6>

                  <>
                    <div className={styles.starAlignment}>
                      <img loading="lazy" src={RangeIcon} alt="RangeIcon" />

                      <span>{item?.conversationCounts ?? 4.3}</span>
                    </div>
                  </>
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
