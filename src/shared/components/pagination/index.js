"use client"
import React, { useState } from "react";
import styles from "./pagination.module.scss";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "@/store/ApiSlice/gptSlice";

const PaginationArrow = "/assets/icons/pagination-arrow.svg";

export default function Pagination({ nPages, currentPage }) {
  const pageNumbers = Array.from({ length: nPages }, (_, i) => i + 1);
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <div
          className={styles.arrow}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <div>
            <img loading="lazy" src={PaginationArrow} alt="PaginationArrow" />
          </div>
        </div>
      )}

      {pageNumbers.map((page) => {
        if (page === currentPage) {
          return (
            <div
              className={styles.paginationBoxAlignment}
              key={page}
              onClick={() => handlePageChange(page)}
            >
              <p className={`${styles.count} ${styles.active}`}>{page}</p>
            </div>
          );
        } else if (
          page === 1 ||
          page === nPages ||
          (page >= currentPage - 1 && page <= currentPage + 1)
        ) {
          return (
            <div
              key={page}
              className={styles.paginationBoxAlignment}
              onClick={() => handlePageChange(page)}
            >
              <p className={styles.count}>{page}</p>
            </div>
          );
        } else if (
          (page === currentPage - 2 && currentPage > 4) ||
          (page === currentPage + 2 && currentPage < nPages - 3)
        ) {
          return (
            <div key={page} className={styles.paginationBoxAlignment}>
              <p className={styles.count}>{"..."}</p>
            </div>
          );
        }
        return null;
      })}

      {currentPage < nPages && (
        <div
          className={styles.arrow}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <div className={classNames(styles.paginationDetailsBox, styles.lastPage)}>
            <img loading="lazy" src={PaginationArrow} alt="PaginationArrow" />
          </div>
        </div>
      )}
    </div>
  );
}
