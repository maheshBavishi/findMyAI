import React from "react";
import styles from "./nodatafound.module.scss";
import Link from "next/link";
const SearchIcon = "/assets/icons/search-lg.svg";
export default function NoDataFound() {
  return (
    <div className={styles.nodatafoundAlignment}>
      <div className={styles.iconCenteralignment}>
        <img src={SearchIcon} alt="SearchIcon" />
      </div>
      <h2>404 - Page Not Found</h2>
      <span>The page you're looking for does not exist.</span>
      <Link href="/">
        <p>Go back to the homepage</p>
      </Link>
    </div>
  );
}
