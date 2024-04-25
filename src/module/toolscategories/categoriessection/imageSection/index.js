import React from "react";
import styles from "./imageSection.module.scss";
import Categoriescard from "../categoriescard";
export default function ImageSection({ item }) {
  return (
    <div
      className={styles.imageSectionAlignment}
      data-scroll
      data-scroll-section
      data-scroll-direction="horizontal"
    >
      <div className={styles.title}>
        <h5>
          <span>{item?.name}</span>
        </h5>
      </div>
      <div className={styles.grid}>
        {item?.aiToolSubCategory?.map((item) => {
          return <Categoriescard subCat={item} />;
        })}
      </div>
    </div>
  );
}
