"use client";
import React, { useEffect, useState } from "react";
import styles from "./featuredyourtoolcard.module.scss";
import Carddesign from "@/module/home/cardSection/carddesign";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/shared/components/pagination";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import Loader from "@/shared/components/Loader";
import { getAiTools, updateAiTools } from "@/store/ApiSlice/aiToolsSlice";
import moment from "moment";
import toast from "react-hot-toast";
import LazyLoad from "@/helpers/lazyLoad";
import Nodatashow from "@/shared/components/nodatashow";
import { getSession } from "@/helpers/authHelper";
const Nodata = "/assets/icons/no-data-vector.svg";

export default function Featuredyourtoolcard({
  selectedDates,
  setSelectedDates,
  setSelectedTool,
  selectedTool,
  // className,
  // setClassName
}) {
  const dispatch = useDispatch();
  const { getAllAiTools, count, loading } = useSelector(
    (state) => state.aiTools
  );
  const { page } = useSelector((state) => state.gpt);

  // const { tokendata } = useSelector((state) => state.auth);
  const tokendata = getSession()?.access_token;

  const params = useSearchParams();
  const transactionId = params.get("transactionId");
  const userId = getSession()?.userInfo;
  const nPages = Math.ceil(count / 12);
  useEffect(() => {
    if (!tokendata) {
      toast.error("Please login to show your features tools ");
    } else {
      dispatch(
        getAiTools({
          page: page,
          limit: 12,
          uid: userId?._id,
          selectedData: true,
        })
      );
    }
    window.scrollTo(
      0,
      document.body.clientHeight * 0.3 - window.innerHeight * 0.3
    );
  }, [page, tokendata]);

  const handleView = (item) => {
    setSelectedTool(item);
    // setClassName(item?._id)
  };

  return (
    <LazyLoad id={"Featuredyourtoolcard"}>
      <div className={styles.featuredyourtoolcardAllContnetAlignment}>
        <div className="container">
          <div className={styles.titleAlignment}>
            {/* <h3>
            <span>Featured</span> Your Tools
          </h3> */}
          </div>{" "}
          <div>
            {loading ? (
              <div className={styles.grid}>
                {[...Array(12)].map((_, index) => (
                  <Carddesign loading={loading} />
                ))}
              </div>
            ) : (
              <>
                {tokendata && getAllAiTools?.length > 0 ? (
                  <>
                    <div className={styles.grid}>
                      {getAllAiTools?.map((aiTool, index) => {
                        return (
                          <div key={index}>
                            <Carddesign
                              images={aiTool?.images?.[0]}
                              name={aiTool?.title}
                              description={aiTool?.aiToolSubCategoryId?.name}
                              icon={aiTool?.icon}
                              handleViewDetails={() => handleView(aiTool)}
                              isSelected={selectedTool === aiTool._id} // Pass isSelected prop
                              item={aiTool}
                            />
                          </div>
                        );
                      })}
                    </div>
                    {count > 12 && (
                      <Pagination nPages={nPages} currentPage={page} />
                    )}
                  </>
                ) : (
                  <Nodatashow />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </LazyLoad>
  );
}
