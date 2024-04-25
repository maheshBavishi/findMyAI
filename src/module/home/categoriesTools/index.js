"use client";
import React, { useEffect, useState } from "react";
import styles from "./categoriesTools.module.scss";
import ViewAll from "@/shared/components/viewAll";
import Carddesign from "../cardSection/carddesign";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import { useDispatch, useSelector } from "react-redux";
import { getAiTools, setCategoryDetails } from "@/store/ApiSlice/aiToolsSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authHeader } from "@/helpers/authHelper";
import LazyLoad from "@/helpers/lazyLoad";
import Nodatashow from "@/shared/components/nodatashow";
const Nodata = "/assets/icons/no-data-vector.svg";

export default function CategoriesTools() {
  let duration = 100;
  const { getAllAiTools, loading } = useSelector((state) => state.aiTools);

  const dispatch = useDispatch();
  const route = useRouter();

  useEffect(() => {
    dispatch(getAiTools({ page: 1, limit: 8, status: "approved", isPopular: true ,selectedData: true}));
  }, []);
  const handleViewDetails = (item) => {
    // route?.push("/categoriesdetails");
    route?.push(`/tool/${item?.slugId}`);
    // route?.push(`/tools-details/${item?.title.split(" ").join("--")}`.toLowerCase()`);
  };

  return (
    <LazyLoad id={"CategoriesTools"}>
      <div className={styles.categoriesToolsAlignment}  >
        <div className="container">
          <div className={styles.titleAlignment}>

            <div className={styles.title}>
              <div>
                <h2>Popular AI Tools</h2>
                <p>Discover the Best AI Tools Making Your Life Easier and More Efficient.</p>
              </div>
            </div>
            <div className={styles.webViewAll}>
              <Link href="/popular-tools">
                <ViewAll />
              </Link>
            </div>
          </div>
          {loading ? (
            <>
              <div className={styles.grid}>
                {[...Array(4)].map((_, index) => (
                  <Carddesign loading={loading} />
                ))}
              </div>
            </>
          ) : (
            <>
              {getAllAiTools?.length > 0 ? (
                <>
                  <div className={styles.grid}>
                    {getAllAiTools?.slice(0,8)?.map((aiTool, index) => {
                      duration = duration + (index ? 200 : 0);
                      return (
                        <div onClick={() => handleViewDetails(aiTool)} key={index}>
                          <Carddesign images={aiTool?.images?.[0]} name={aiTool?.title} description={aiTool?.aiToolSubCategoryId?.name} icon={aiTool?.icon} isFeatured={aiTool?.isFeatured} item={aiTool}/>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <Nodatashow/>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </LazyLoad>
  );
}
