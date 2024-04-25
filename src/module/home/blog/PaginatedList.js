"use client";
import { setGraphqlAuthore, setGraphqlBlogs } from "@/store/ApiSlice/blogSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../shared/components/pagination/pagination.module.scss";
import classNames from "classnames";
import { setGraphqlAricals } from "@/store/ApiSlice/articleSlice";
import { setCurrentPage } from "@/store/ApiSlice/gptSlice";
import { useRouter } from "next/router";
const PaginationArrow = "/assets/icons/pagination-arrow.svg";

const PaginatedList = ({ data, itemsPerPage }) => {
  const { page: currentPage } = useSelector((state) => state.gpt);
  const dispatch = useDispatch();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let paginationData = data?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const router = useRouter();

  useEffect(() => {
    if (router?.pathname === "/article") {
      dispatch(setGraphqlAricals(paginationData || filterData?.slice(0, 9)));
    } else if (router?.pathname === "/blog") {
      dispatch(setGraphqlBlogs(paginationData || filterData?.slice(0, 9)));
    } else if (router?.pathname === "/authors-list") {
      dispatch(setGraphqlAuthore(paginationData || filterData?.slice(0, 9)));
    } else {
      dispatch(setGraphqlBlogs(paginationData || filterData?.slice(0, 9)));
    }
    window.scrollTo(0, 0);

  }, [router?.pathname, currentPage]);

  useEffect(() => {
    if (router?.pathname === "/article") {
      dispatch(setGraphqlAricals(paginationData));
    } else if (router?.pathname === "/blog") {
      dispatch(setGraphqlBlogs(paginationData));
    } else if (router?.pathname === "/authors-list") {
      dispatch(setGraphqlAuthore(paginationData));
    } else {
      dispatch(setGraphqlBlogs(paginationData));
    }
  }, [router?.pathname, currentPage]);

  const paginate = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const renderPaginationButtons = () => {
    const pageNumbers = Math.ceil(data?.length / itemsPerPage);

    return (
      <div className={styles.pagination}>
        {currentPage > 1 && (
          <div className={styles.arrow}>
            <div onClick={() => paginate(currentPage - 1)}>
              <img loading="lazy" src={PaginationArrow} alt="PaginationArrow" />
            </div>
          </div>
        )}
        {Array.from({ length: pageNumbers }, (_, i) => i + 1).map((number) => (
          <div
            className={classNames(styles.paginationBoxAlignment, {
              [styles.active]: currentPage === number,
            })}
            key={number}
            onClick={() => paginate(number)}
          >
            <div className={styles.count}>{number}</div>
          </div>
        ))}

        {currentPage !== pageNumbers && (
          <div className={styles.arrow}>
            <div
              className={classNames(
                styles.paginationDetailsBox,
                styles.lastPage
              )}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === pageNumbers}
            >
              <img loading="lazy" src={PaginationArrow} alt="PaginationArrow" />
            </div>
          </div>
        )}
      </div>
    );
  };

  return <div>{renderPaginationButtons()}</div>;
};

export default PaginatedList;
