"use client";
import React from "react";
import Link from "next/link";
import styles from "./categoriescard.module.scss";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { setScrollCategory, setSubcategoryId } from "@/store/ApiSlice/aiToolsSlice";
import Skeleton from "react-loading-skeleton";
const RightIcon = "/assets/icons/right-sm.svg";
import "react-loading-skeleton/dist/skeleton.css";

export default function Categoriescard({ subCat, loading }) {
  const dispatch = useDispatch();
  const route = useRouter();
  const handleViewCategoryDetails = (id, item) => {

      // route?.push(`/category/${item?.name.split(" ").join("--")}`);
      dispatch(setSubcategoryId(id));
    
    
    
      dispatch(setScrollCategory(""))

  };
  const pathname = usePathname();
  return (
    <Link href={`/category/${subCat?.slugId}`} className={styles.linkAlignment}>

    <div
      className={styles.categoriescard}
      onClick={() => {
        handleViewCategoryDetails(subCat?._id, subCat);
      }}
    >
      <div className={styles.textGrid}>
        <div className={styles.cardSkeletonUi}>
          {loading ? (
            <>
              <Skeleton className={styles.skeltoncardHeding} baseColor="#cccccc29" />
            </>
          ) : (
            <span>{subCat?.name}</span>
          )}

          {loading ? (
            <Skeleton className={styles.cardText} baseColor="#cccccc29" />
          ) : (
            <>
              <p>{subCat?.description}</p>
            </>
          )}
        </div>
        <img  loading="lazy" src={RightIcon} alt="RightIcon" />
      </div>
      <div className={styles.cardSkeletonUi}>
        {loading ? (
          <Skeleton className={styles.countSkelton} baseColor="#cccccc29" />
        ) : (
          <>
            <div className={styles.countNuberAlignment}>
              <span>{subCat?.appCount || subCat?.aiToolCount}</span>
            </div>
          </>
        )}
      </div>
    </div>
    </Link>
  );
}
