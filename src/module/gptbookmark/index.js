"use client";
import React, { useEffect, useState } from "react";
import styles from "../bookmarked/bookmarkedcard/bookmarkedcard.module.scss";
import Carddesign from "@/module/home/cardSection/carddesign";
import { GetBookMarkData, Id, getBookMark } from "@/store/ApiSlice/bookmarkSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@/shared/components/pagination";
import Loader from "@/shared/components/Loader";
import { setCategoryDetails } from "@/store/ApiSlice/aiToolsSlice";
import { useRouter } from "next/navigation";
import Bookmarkedbanner from "../bookmarked/bookmarkedbanner";
import GptStoreCard from "../gptStore/gptStoreCard";
import Nodatashow from "@/shared/components/nodatashow";
const Nodata = "/assets/icons/no-data-vector.svg";

export default function GptBookmark() {
  let duration = 100;
  const { getBookMarkData, BookMarkLoading, BookMarkCount } = useSelector(
    (state) => state.bookmark
  );
  const nPages = Math.ceil(BookMarkCount / 12);
  const { page } = useSelector((state) => state.gpt);

  const route = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getBookMark({
        page: page,
        limit: 12,
        type: `app`,
        uid: Id
      })
    );
    window.scrollTo(0, (document.body.clientHeight * 0.3) - (window.innerHeight * 0.3))

  }, [page]);
  const handleViewDetails = (item) => {
    const encodedName = decodeURIComponent(item?.projectName);

    route?.push(
      `/gpt-store/${item?.slugId}`
    );
  };

  return (
    <>
      <Bookmarkedbanner />

      <div className={styles.bookmarkedcardAllContnetAlignment}>
        <div className="container">
          {BookMarkLoading ? (
            <Loader />
          ) : (
            <>
              {getBookMarkData?.length > 0 ? (
                         <>
                  <div className={styles.grid}>
                    {getBookMarkData?.map((gptdata, index) => {
                      duration = duration + (index ? 200 : 0);
                      return (
                     
                        <div
                          key={index}
                          onClick={() => handleViewDetails(gptdata?.appId)}
                        >
                          <GptStoreCard item={gptdata?.appId} />
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                 <Nodatashow/>
                </>
              )}
            </>
          )}
        </div>
        {BookMarkCount > 12 && (
          <Pagination nPages={nPages} currentPage={page} />
        )}
      </div>
    </>
  );
}
