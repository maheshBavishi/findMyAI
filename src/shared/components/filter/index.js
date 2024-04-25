"use client";
import React, { useEffect, useState } from "react";
import styles from "./filter.module.scss";
import Filtermodal from "../filtermodal";
import { getAiTools } from "@/store/ApiSlice/aiToolsSlice";
const FilterIcon = "/assets/icons/filter.svg";
export default function Filter({ onClick }) {

  return (
    <>
      <div className={styles.filterbutton}>
        <button onClick={onClick} aria-label="Filter">
          <img  loading="lazy" src={FilterIcon} alt="FilterIcon" />
          <span>Filter</span>
        </button>
      </div>
    </>
  );
}
