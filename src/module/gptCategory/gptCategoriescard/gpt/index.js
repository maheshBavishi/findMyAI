"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../../gptStore/featuredGPT/featuredGPT.module.scss";
import Pagination from "@/shared/components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import GptStoreCard from "@/module/gptStore/gptStoreCard";
import { GetGpt } from "@/store/ApiSlice/gptSlice";
import classNames from "classnames";
import Nodatashow from "@/shared/components/nodatashow";
import LazyLoad from "react-lazyload";
const Nodata = "/assets/icons/no-data-vector.svg";

export default function Gpt({ nPages, page, setPage }) {
  let duration = 100;
  const { GetGptData, gptLoading, GptCount } = useSelector(
    (state) => state.gpt
  );
  const pathname = usePathname();
  const lastPathname = pathname.substring(pathname.lastIndexOf("/") + 1);
  const route = useRouter();
  const [filterData, setFilterData] = useState({ priceing: [], features: [] });
  const [filterModal, setFilterModal] = useState(false);

  const [tag, setTag] = useState("");
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);
  const componentRef = useRef(null);

  useEffect(() => {
    if (isFirstRender.current || !filterModal) {
      dispatch(
        GetGpt({
          page: page,
          limit: 12,
          status: "approved",
          pricing: filterData.priceing,
          features: filterData.features,
          category: lastPathname.split("--").join(" "),
          selectedData: true,

          ...(tag === "Popular" && { isPopular: true }),
        })
      );
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, [page, filterModal, filterData, tag]);
  useEffect(() => {
    // Scroll to the top of the component when the page changes
    componentRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [page]);
  const handleOnClick = () => {
    setFilterModal(!filterModal);
  };
  const disableBodyScroll = () => {
    const body = document.body;
    if (body) {
      body.style.overflow = "hidden";
    }
  };
  const enableBodyScroll = () => {
    const body = document.body;
    if (body) {
      body.style.overflow = "auto";
    }
  };
  useEffect(() => {
    if (filterModal) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  }, [filterModal]);
  return (
    <div ref={componentRef}>
      <LazyLoad id={"Gpt"}>
        <div className={classNames(styles.featuredGptSection)}>
          <div className="container">
            <div className={styles.featuredGptBodyAlignment}>
              <div >
                {gptLoading ? (
                  <div className={styles.featuredGptGrid}>
                    {[...Array(12)].map(() => {
                      return (
                        <div className={styles.browserAllCardGridItem}>
                          <GptStoreCard loading={gptLoading} />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <>
                    {GetGptData?.length > 0 ? (
                      <div className={styles.featuredGptGrid}>
                        {GetGptData?.map((item) => (
                          <GptStoreCard key={item.id} item={item} />
                        ))}
                      </div>
                    ) : (
                      <Nodatashow />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "70px" }}>
          {GptCount > 12 && <Pagination nPages={nPages} currentPage={page} />}
        </div>
      </LazyLoad>
    </div>
  );
}
