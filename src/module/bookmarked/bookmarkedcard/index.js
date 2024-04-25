"use client";
import React, { useEffect, useState } from "react";
import styles from "./bookmarkedcard.module.scss";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import Carddesign from "@/module/home/cardSection/carddesign";
import { GetBookMarkData, Id, getBookMark } from "@/store/ApiSlice/bookmarkSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@/shared/components/pagination";
import Loader from "@/shared/components/Loader";
import { setCategoryDetails } from "@/store/ApiSlice/aiToolsSlice";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import Nodatashow from "@/shared/components/nodatashow";
const Nodata = "/assets/icons/no-data-vector.svg";

export default function Bookmarkedcard() {
  let duration = 100;
  const { getBookMarkData, BookMarkLoading, BookMarkCount } = useSelector(
    (state) => state.bookmark
  );
  const nPages = Math.ceil(BookMarkCount / 12);

  const route = useRouter();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getBookMark({
        page: page,
        limit: 12,
        type: `aiTool`,
        uid: Id

      })
    );
        window.scrollTo(0, (document.body.clientHeight * 0.4) - (window.innerHeight * 0.4))

  }, [page]);
  const handleViewDetails = (item) => {
    route?.push(`/tool/${item?.slugId}`);
  };

  return (
    <div className={styles.bookmarkedcardAllContnetAlignment}>
      <div className="container">
        {BookMarkLoading ? (
          <Loader />
        ) : (
          <>
            {" "}
            {getBookMarkData?.length > 0 ? (
              <>
                <div className={classNames(styles.fourGrid)}>
                  {" "}
                  {getBookMarkData?.map((aiTool, index) => {
                    duration = duration + (index ? 200 : 0);
                    return (
                      // <AnimatedSection
                      //   animationType="fade-up"
                      //   duration={400}
                      //   delay={duration}
                      //   key={index}
                      // >
                      <div
                        key={index}
                        onClick={() => handleViewDetails(aiTool?.aiToolId)}
                      >
                        <Carddesign
                          images={aiTool?.aiToolId?.images?.[0]}
                          name={aiTool?.aiToolId?.title}
                          description={
                            aiTool?.aiToolId?.aiToolSubCategoryId?.name
                          }
                          icon={aiTool?.aiToolId?.icon}
                          loading={BookMarkLoading}
                          item={aiTool?.aiToolId}
                        />
                      </div>
                      // </AnimatedSection>
                    );
                  })}{" "}
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
        <Pagination
          nPages={nPages}
          currentPage={page}
          setCurrentPage={setPage}
        />
      )}
    </div>
  );
}
