"use client";
import React, { useEffect } from "react";
import styles from "./featuresFunctions.module.scss";
import PromptStarters from "../promptStarters";
import { useDispatch, useSelector } from "react-redux";
import { GetGptCategoryData, GetGptMainCategoryData, setScrollGptCategory } from "@/store/ApiSlice/gptSlice";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
const Arrow = "/assets/icons/top-right-arrow.svg";
export default function FeaturesFunctions({gptDetails}) {
  const { GptCategoryData, gptLoading, GptMainCategoryData } = useSelector((state) => state.gpt);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetGptCategoryData({ status: "active", limit: 8}));
  }, []);
  const regex = /'name':\s*'([^']*)',\s*'description':\s*'([^']*)'/g;
  let match;
  const features = [];

  while ((match = regex.exec(gptDetails?.featuresAndFunctions)) !== null) {
    const [, name, description] = match;
    features.push({ name, description });
  }

  return (
    <div className={styles.featureFunctionSection}>
      <div className={styles.featureFunctionGrid}>
        <div className={styles.featureFunctionLeft}>
          {gptLoading ? (
            <>
              <Skeleton className={styles.featureFunctionLeft} baseColor="#232147" />
            </>
          ) : (
            <>
              <h2>Features and Functions</h2>
            </>
          )}
          {gptLoading ? (
            <>
              <Skeleton className={styles.featureFunctionLeft} baseColor="#232147" />
            </>
          ) : (
            <>
              <p>Enhance Your Journey with Cutting-Edge Features and Functions</p>
            </>
          )}

          <div className={styles.featureFunctionBox}>
            {gptLoading ? (
              <>
                <Skeleton className={styles.featureFunctionBox} baseColor="#232147" />
              </>
            ) : (
              <>
                {features?.length > 0 ? (
                  <>
                    <ul>
                      {features?.map((item) => {
                        return (
                          <li>
                            {item?.name}
                            <p>{item?.description}</p>
                          </li>
                        );
                      })}
                    </ul>{" "}
                  </>
                ) : (
                  <ul>
                    <li>
                      <p style={{ color: "white" }}>No Features and Functions Found</p>
                    </li>
                  </ul>
                )}
              </>
            )}
          </div>

          <PromptStarters />
        </div>

        <div className={styles.featureFunctionRight}>
          <div className={styles.gptCategoryBox}>
            {gptLoading ? (
              <>
                <Skeleton className={styles.featureFunctionLeft} baseColor="#232147" />
              </>
            ) : (
              <>
                <h4>GPTs Categories</h4>{" "}
              </>
            )}
            <div className={styles.gptCategoryListDetails}>
              {gptLoading ? (
                <>
                  <Skeleton className={styles.skelttonCategory} baseColor="#232147" count={5} />
                </>
              ) : (
                <>
                  <ul>
                    {GptCategoryData?.map((item, index) => {
                      return (
                        <>
                          <li >
                            <Link href={`/gpt-category/${item?.slugId}`}>
                              <p>
                                {item?.name} <img loading="lazy" src={Arrow} alt="Arrow" />
                              </p>
                            </Link>
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
