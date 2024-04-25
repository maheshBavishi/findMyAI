import React from "react";
import styles from './featuredToolsBottom.module.scss';
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import moment from "moment";
import LazyLoad from "@/helpers/lazyLoad";

export default function FeaturedToolsBottom({ handleOnSubmit, selectedTool, selectedDates }) {
  const { selectedDatesData } = useSelector((state) => state.aiTools);

  const formatDate = (date) => {
    return moment(date).format("MMMM DD, YYYY");
  };

  return (
    <LazyLoad id={"FeaturedToolsBottom"}>
      {selectedTool && selectedDates.length > 0 ? (
        <div className="featuredToolsBottom-section">
          <div className="container">
            <div className="notes-box-alignment">
              <h6>Note:</h6>
              <p>
                Your <span> {selectedTool?.title}Ai tool</span> tool has already been featured from <span>{selectedDates.length > 0 ? formatDate(selectedDates[0]) : formatDate(moment())}</span> to{" "}
                <span>{selectedDates.length > 1 ? formatDate(selectedDates[1]) : formatDate(moment().add(7, "days"))}</span>
              </p>
            </div>
            <div className="featured-button-alignment">
              <button onClick={() => handleOnSubmit()} aria-label="Save your Featured Tool">
                Save your Featured Tool
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </LazyLoad>
  );
}
