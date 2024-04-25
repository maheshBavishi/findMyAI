"use client";
import React, { useEffect, useState } from "react";
import styles from "./toolsdetailsBreadcrumbs.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import LazyLoad from "@/helpers/lazyLoad";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getAiTools } from "@/store/ApiSlice/aiToolsSlice";
import { AsyncPaginate } from "react-select-async-paginate";
import Linkdin from "@/assets/icons/linkdin";
const RightIcon = "/assets/icons/breadcrumbs -right.svg";
const SearchIon = "/assets/icons/search-icon.svg";
import Facebook from "@/assets/icons/facebook";
import Instragram from "@/assets/icons/instragram";
import Twitter from "@/assets/icons/twitter";
import { useRouter } from "next/router";
export default function ToolsdetailsBreadcrumbs({ categoryToolsDetails }) {
  const { categoryDetails, loading } = useSelector((state) => state.aiTools);
  const handleNavigate = (data) => {
    router.push(data);
  };
  const dispatch = useDispatch();
  const [searchTools, setSearchTools] = useState({});
  const router = useRouter();

  const lastPathname = router?.pathname?.substring(router?.pathname?.lastIndexOf("/") + 1);
  const encodedName = decodeURIComponent(lastPathname);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "5px",
      border: "none",
      color: "#fff",
      width: ` 100%`,
      height: ` 55px`,
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    }),
    option: (provided, state) => ({
      ...provided,
      border: "none",
      backgroundColor: state.isFocused
        ? "rgba(255, 255, 255, 0.08)"
        : "#252438",
      color: state.isFocused ? "#fff" : "#fff",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "white",
      paddingLeft: "50px", // Change the color of the placeholder here
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "#252438",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "white",
      paddingLeft: "50px",
    }),
    input: (provided, state) => ({
      ...provided,
      color: "white",
      paddingLeft: "50px",
    }),
  };
  async function loadOptions(search, loadedOptions, { page }) {
    let url;
    if (search) {
      url = `https://api.findmyaitool.com/api/v1/aiTool/get-aiTool?isLive=true&search=${search}&page=${page}&limit={20}`;
    } else {
      url = `https://api.findmyaitool.com/api/v1/aiTool/get-aiTool?isLive=true&page=${page}`;
    }

    const response = await fetch(url);
    const responseJSON = await response.json();
    const data = responseJSON?.payload?.aiTool?.map((item) => {
      return {
        value: item._id,
        label: item.title,
        sulgId: item?.slugId,
      };
    });
    return {
      options: data,
      hasMore: !search && data?.length > 0 ? true : false,
      additional: {
        page: page + 1,
      },
    };
  }
  const handleOnChangeCategory = (e) => {
    setSearchTools({ ...searchTools, seachvalue: e, searchid: e?.value });

    if (e?.sulgId) {
      router.push(`/tool/${e?.sulgId}`);
    }
  };
  return (
    <LazyLoad id={"ToolsdetailsBreadcrumbs"}>
      <div className={styles.toolsdetailsBreadcrumbsSection}>
        <div className={styles.toolsdetailsBreadcrumbsAlignment}>
          <div className={styles.topBarLeft}>
            {loading ? (
              <>
                <div className={styles.skeletonUi}>
                  <Skeleton
                    className={styles.breadcrumbSkeleton}
                    width={100}
                    baseColor="#232147"
                  />
                  <img loading="lazy" src={RightIcon} alt="RightIcon" />
                  <Skeleton
                    className={styles.breadcrumbSkeleton}
                    width={100}
                    baseColor="#232147"
                  />
                  <img loading="lazy" src={RightIcon} alt="RightIcon" />
                  <Skeleton
                    className={styles.breadcrumbSkeleton}
                    width={100}
                    baseColor="#232147"
                  />
                </div>
              </>
            ) : (
              <>
                {(categoryToolsDetails?.item?.aiToolSubCategoryId?.name ||
                  categoryToolsDetails?.item?.title) && (
                  <p
                    className={styles.breadcrumbName}
                    onClick={() => handleNavigate("/browse-tools")}
                  >
                    AI Tools List
                    <img loading="lazy" src={RightIcon} alt="RightIcon" />
                  </p>
                )}
                {categoryToolsDetails?.item?.aiToolSubCategoryId && (
                  <p
                    className={styles.breadcrumbName}
                    onClick={() =>
                      handleNavigate(
                        `/category/${categoryToolsDetails?.item?.aiToolSubCategory?.[0]?.slugId}`
                      )
                    }
                  >
                    {categoryToolsDetails?.item?.aiToolSubCategory?.[0]?.name ??
                      `Other`}{" "}
                    <img loading="lazy" src={RightIcon} alt="RightIcon" />
                  </p>
                )}
                {categoryToolsDetails?.item?.title && (
                  <p className={styles.breadcrumbName}>
                    {categoryToolsDetails?.item?.title}
                  </p>
                )}
              </>
            )}
          </div>

          <div className={styles.gptSearchAlignment}>
            <AsyncPaginate
              name="seachvalue"
              className="dropdown-input"
              value={searchTools?.seachvalue}
              loadOptions={loadOptions}
              onChange={handleOnChangeCategory}
              additional={{
                page: 1,
              }}
              placeholder="Search Public Tools Here...."
              styles={customStyles}
            />

            <div className={styles.searchIon}>
              <img loading="lazy" src={SearchIon} alt="SearchIon" />
            </div>
          </div>
        </div>
      
      </div>
    </LazyLoad>
  );
}
