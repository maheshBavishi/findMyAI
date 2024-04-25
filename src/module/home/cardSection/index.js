"use client";
import React, { useEffect, useState } from "react";
import styles from "./cardSection.module.scss";
import Carddesign from "./carddesign";
import { useDispatch, useSelector } from "react-redux";
import { getAiTools, setCategoryDetails } from "@/store/ApiSlice/aiToolsSlice";
import { useRouter } from "next/navigation";
import "react-loading-skeleton/dist/skeleton.css";
import LazyLoad from "@/helpers/lazyLoad";
import Nodatashow from "@/shared/components/nodatashow";
const Nodata = "/assets/icons/no-data-vector.svg";

export default function CardSection() {
  const route = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.aiTools);
  const [finalDisplyArray, setFinalDisplyArray] = useState([]);

  const chunkArray = (arr, size) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArray.push(arr.slice(i, i + size));
    }
    return chunkedArray;
  };

  useEffect(() => {
    dispatch(getAiTools({ page: 1, limit: 8, status: "approved" ,"selectedData" : true}))
      .then((res) => {
        let toolData = res?.payload?.payload?.aiTool;
        const randomIndexes = new Set();

        while (randomIndexes.size < 8) {
          randomIndexes.add(Math.floor(Math.random() * toolData.length));
        }

        const randomData = Array.from(randomIndexes).map(
          (index) => toolData[index]
        );
        const chunkedData = chunkArray(randomData, 2);
        setFinalDisplyArray(chunkedData);
      })
      .catch((err) => {
      });
  }, []);

  return (
    <LazyLoad id={"CardSection"}>
      <div
        className={styles.cardSectionAlignment}
        data-scroll
        data-scroll-section
        data-scroll-direction="horizontal"
      >
        <div className="container">
          {loading ? (
            <div className={styles.grid}>
              {[...Array(4)].map((_, index) => (
                <div className={styles.gridItems}>
                  <Carddesign loading={loading} />
                  <Carddesign loading={loading} />
                </div>
              ))}
            </div>
          ) : (
            <>
              {finalDisplyArray?.length > 0  && !loading? (
                <>
                  <div className={styles.grid}>
                    {finalDisplyArray?.map((item, index) => {
                      let duration = 100 + (index ? 200 : 0); // Initialize duration here
                      // const featuredItems = item.filter(aiTool => aiTool.isFeatured);
                      return (
                        <div className={styles.gridItems} key={index}>
                          {/* <AnimatedSection
                          animationType="fade-up"
                          duration={500}
                          delay={duration}
                        > */}
                          {item?.map((aiTool, idx) => {
                            return (
                              <div key={idx}>
                                <Carddesign
                                  images={aiTool?.images?.[0]}
                                  name={aiTool?.title}
                                  description={
                                    aiTool?.aiToolSubCategoryId?.name
                                  }
                                  icon={aiTool?.icon}
                                  item={aiTool}
                                  isFeatured={aiTool?.isFeatured}
                                />
                              </div>
                            );
                          })}
                          {/* </AnimatedSection> */}
                        </div>
                      );
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
