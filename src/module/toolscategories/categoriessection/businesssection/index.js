import React from "react";
import styles from "./businesssection.module.scss";
import Categoriescard from "../categoriescard";
export default function Businesssection() {
  return (
    <div>
      <div
        className={styles.businesssectionAlignment}
        data-scroll
        data-scroll-section
        data-scroll-direction="horizontal"
      >
        <div className={styles.title}>
          <h5>
            <span>Business</span>
          </h5>
        </div>
        <div className={styles.grid}>
          {[...Array(12)].map(() => {
            return <Categoriescard />;
          })}
        </div>
      </div>
    </div>
  );
}
