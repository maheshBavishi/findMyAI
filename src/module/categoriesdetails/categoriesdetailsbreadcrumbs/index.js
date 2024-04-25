"use client";

import React from "react";
import styles from "./categoriesdetailsbreadcrumbs.module.scss";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const RightIcon = "/assets/icons/breadcrumbs -right.svg";
export default function Categoriesdetailsbreadcrumbs() {
  const { categoryDetails } = useSelector((state) => state.aiTools);
  const router = useRouter();
  const handleNavigate = (data) => {
    router.push(data);
  };
  return (
    <div
      className={styles.categoriesdetailsbreadcrumbs}
      data-scroll
      data-scroll-section
      data-scroll-direction="horizontal"
    >
      {/* <AnimatedSection animationType="fade-up" duration={600} delay={400}> */}
      <div className="container">
        <div className={styles.alignment}>
          <span onClick={() => handleNavigate("/browse-tools")}>
            AI Tools List
          </span>
          <img  loading="lazy" src={RightIcon} alt="RightIcon" />
          <span
            onClick={() =>
              handleNavigate(
                `/category/${categoryDetails?.item?.aiToolSubCategoryId?.name
                  .split(" ")
                  .join("--")}`
              )
            }
          >
            {categoryDetails?.item?.aiToolSubCategoryId?.name ?? `Other`}
          </span>
          <img  loading="lazy" src={RightIcon} alt="RightIcon" />
          <span>{categoryDetails?.item?.title}</span>
        </div>
      </div>
      {/* </AnimatedSection> */}
    </div>
  );
}
