"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "../copywriting/aitoolslist/aitoolslist.module.scss";
import Filter from "@/shared/components/filter";
import Toolsdropdown from "@/shared/components/toolsdropdown";
import Carddesign from "@/module/home/cardSection/carddesign";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import Pagination from "@/shared/components/pagination";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/shared/components/Loader";
import { useRouter } from "next/navigation";
import { getAiTools, setCategoryDetails } from "@/store/ApiSlice/aiToolsSlice";
import Filtermodal from "@/shared/components/filtermodal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Nodatashow from "@/shared/components/nodatashow";
import useOnClickOutside from "@/hook/useOnClickOutside";
const Nodata = "/assets/icons/no-data-vector.svg";

export default function PopularTools() {
  let duration = 100;
  const { getAllAiTools, loading, count, subCategoryId } = useSelector(
    (state) => state.aiTools
  );
  const { page } = useSelector((state) => state.gpt);
  const [CloseModal, setCloseModal] = useState(false);
  const route = useRouter();
  const nPages = Math.ceil(count / 12);
  const [filterModal, setFilterModal] = useState(false);
  const [tag, setTag] = useState("");
  const [filterData, setFilterData] = useState({ priceing: [], features: [] });
  const dispatch = useDispatch();
  const handleViewDetails = (item) => {
    sessionStorage.setItem("currentPage", page.toString());
    route?.push(`/tool/${item?.slugId}`);
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

  const isFirstRender = useRef(true);

  useEffect(() => {
    if ((isFirstRender.current || !filterModal) && !CloseModal) {
      dispatch(
        getAiTools({
          page: filterData && tag ? 1 : page,
          limit: 12,
          status: "approved",
          // isPopular: tag === "popular" ? true : false,
          ...(tag === "Popular" && { isPopular: true }),
          ...(tag == "Verified" && { isVerified: true }),
          pricing: filterData.priceing,
          features: filterData.features,
          selectedData: true
        })
      )
        .then((res) => { })
        .catch((err) => { });
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    window.scrollTo(0, (document.body.clientHeight * 0.1) - (window.innerHeight * 0.1))

  }, [page, filterModal, filterData, tag]);
  const type = document.querySelector('meta[property="og:type"]');
  if (type) {
      type.setAttribute('content', "software");
  }
  const handleOnClick = () => {
    setFilterModal(!filterModal);
  };

  return (
    <div
      className={styles.aitoolslistAllContnetAlignment}
      data-scroll
      data-scroll-section
      data-scroll-direction="horizontal"
    >
      {filterModal && (
        <Filtermodal
          filterModal={filterModal}
          setFilterModal={setFilterModal}
          setFilterData={setFilterData}
          filterData={filterData}
          setCloseModal={setCloseModal}

        />
      )}
      <div className="container">
        <div className={styles.aitoolslistHeaderAlignment}>
          <Filter onClick={handleOnClick} />

          <h2>
            Popular <span>Tools</span>
          </h2>
          <Toolsdropdown setTag={setTag} setCloseModal={setCloseModal}
          />
        </div>

        <div>
          {loading ? (
            <div className={styles.grid}>
              {[...Array(12)].map((_, index) => (
                <Carddesign
                  loading={loading}
                />
              ))}
            </div>) : (
            <>
              {getAllAiTools && getAllAiTools.length > 0 ? (
                <>
                  <div className={styles.grid}>
                    {getAllAiTools.map((aiTool, index) => {
                      duration = duration + (index ? 200 : 0);
                      return (
                        <div
                          onClick={() => handleViewDetails(aiTool)}
                          key={index}
                        >

                          <Carddesign
                            images={aiTool?.images?.[0]}
                            name={aiTool?.title}
                            description={aiTool?.aiToolSubCategoryId?.name}
                            icon={aiTool?.icon}
                            isFeatured={aiTool?.isFeatured}
                            item={aiTool}

                          />
                        </div>
                      );
                    })}
                  </div>
                  {count > 12 && (
                    <Pagination
                      nPages={nPages}
                      currentPage={page}
                    />
                  )}
                </>
              ) : (
                <>
                  <Nodatashow/>
                </>
              )}
            </>
          )}
           
        </div>

      </div>
    </div>
  );
}
