"use client";

import React, { useEffect, useState } from "react";
import styles from "./featuredyourtoolbanner.module.scss";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
const DateIcon = "/assets/icons/date.svg";
import Flatpickr from "react-flatpickr";
import toast from "react-hot-toast";
import { use } from "marked";
import { useDispatch } from "react-redux";
import { getAiTools } from "@/store/ApiSlice/aiToolsSlice";
import moment from "moment";
import 'flatpickr/dist/flatpickr.css';
import LazyLoad from "@/helpers/lazyLoad";

export default function Featuredyourtoolbanner({
  selectedDates,
  setSelectedDates,
}) {
  const dispatch = useDispatch();

  // const formattedDates = selectedDates.map((date) => {
  //   const day = String(date.getDate())?.padStart(2, "0");
  //   const month = String(date.getMonth() + 1)?.padStart(2, "0");
  //   const year = date.getFullYear();
  //   return `${day}-${month}-${year}`;
  // });

  const handleDateChange = (date) => {
    const selectedDate = moment(date[0]);
    const today = moment().startOf("day");
    if (selectedDate.isBefore(today, "day")) {
      toast.error("Selected date should be today or later");
    } else {
      const startDate = date[0];
      let sevenDaysLaterDate = new Date(startDate);
      sevenDaysLaterDate.setDate(sevenDaysLaterDate.getDate() + 7);
      let data = [startDate, sevenDaysLaterDate];
      setSelectedDates(data);
    }
  };
  // useEffect(() => {
  //   if (selectedDates.length === 2) {
  //     dispatch(
  //       getAiTools({
  //         page: 1,
  //         limit: 10,
  //         status: "approved",
  //         isFeatured: true,
  //         // featuredStartDate: moment(selectedDates[0] + 1).format("YYYY-MM-DD"),
  //         // featuredEndDate: moment(selectedDates[1] + 1).format("YYYY-MM-DD"),
  //       })
  //     );
  //   }
  // }, [selectedDates]);

  return (
    <LazyLoad id={"Featuredyourtoolbanner"}>

    <div
      className={styles.featuredyourtoolbanner}
      data-scroll
      data-scroll-section
      data-scroll-direction="horizontal"
    >
      <div className="container">
        <div className={styles.title}>
          <h3>
            Featured Your Tool
          </h3>
         
          <p>
            Select one of your AI tools and choose the start date for its
            feature spotlight
          </p>
          <div className={styles.centnerAlignment}>
            <div className={styles.inputBox}>
              <Flatpickr
                value={selectedDates}
                placeholder="Select Date"
                onChange={handleDateChange}
                options={{
                  minDate: "today",
                  dateFormat: "d-m-Y",
                  //  minDate: "today",
                  maxDate: new Date().fp_incr(365), // Limit selectable dates to one year from now
                }}
              />

           <div className={styles.searchIcon}>
                <img  loading="lazy" src={DateIcon} alt="DateIcon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </LazyLoad>
  );
}
