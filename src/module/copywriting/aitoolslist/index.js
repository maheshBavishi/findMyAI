"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./aitoolslist.module.scss";
import Filter from "@/shared/components/filter";
import Toolsdropdown from "@/shared/components/toolsdropdown";
import Carddesign from "@/module/home/cardSection/carddesign";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import Pagination from "@/shared/components/pagination";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/shared/components/Loader";
import { usePathname, useRouter } from "next/navigation";
import { getAiTools, setCategoryDetails } from "@/store/ApiSlice/aiToolsSlice";
import Filtermodal from "@/shared/components/filtermodal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useOnClickOutside from "@/hook/useOnClickOutside";
import LazyLoad from "@/helpers/lazyLoad";
import Nodatashow from "@/shared/components/nodatashow";
const Nodata = "/assets/icons/no-data-vector.svg";

export default function Aitoolslist({ nPages, page }) {
  let duration = 100;
  const { getAllAiTools, loading, count, subCategoryId } = useSelector(
    (state) => state.aiTools
  );

  const pathname = usePathname();
  const lastPathname = pathname.substring(pathname.lastIndexOf("/") + 1);
  const route = useRouter();
  const [filterData, setFilterData] = useState({ priceing: [], features: [] });
  const [filterModal, setFilterModal] = useState(false);
  const [CloseModal, setCloseModal] = useState(false);
  const dropdownContainerRef = useRef();
  useOnClickOutside(dropdownContainerRef, () => setCloseModal(false));
  const [tag, setTag] = useState("");
  const dispatch = useDispatch();
  const handleViewDetails = (item) => {
    route?.push(`/tool/${item?.slugId}`);
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if ((isFirstRender.current || !filterModal) && !CloseModal) {
      dispatch(
        getAiTools({
          page: page,
          limit: 12,
          status: "approved",
          pricing: filterData.priceing,
          features: filterData.features,
          ...(tag === "Popular" && { isPopular: true }),
          ...(tag == "Verified" && { isVerified: true }),
          ...(pathname.includes("/category") && {
            aiToolSubCategory: lastPathname,
          }),
          ...(pathname === "/popular-tools" && { isPopular: true }),
          selectedData: true
        })
      ).then((res) => setCloseModal(false));
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

  }, [page, filterModal, filterData, tag]);
  useEffect(() => {
    // Scroll to the top of the component when the page changes
    componentRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [page])
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
  const componentRef = useRef(null);
  return (
    <LazyLoad id={"Aitoolslist"}>
      <div
      ref={componentRef}
        className={styles.aitoolslistAllContnetAlignment}
        data-scroll
        data-scroll-section
        data-scroll-direction="horizontal"
      >
        <div className="container" >
          {filterModal && (
            <Filtermodal
              filterModal={filterModal}
              setFilterModal={setFilterModal}
              setFilterData={setFilterData}
              filterData={filterData}
              setCloseModal={setCloseModal}
            />
          )}
          {/* <AnimatedSection animationType="fade-up" duration={600} delay={400}> */}
          <div className={styles.aitoolslistHeaderAlignment}>
            <div className={styles.webview}>
              <Filter onClick={handleOnClick} />
            </div>
            <h2>
              AI Tools <span>List</span>
            </h2>
            <div className={styles.webview}  >
              <Toolsdropdown setTag={setTag} setCloseModal={setCloseModal}  />
            </div>
          </div>
          {/* </AnimatedSection> */}

          <div className={styles.mobileViewDetailsFilter}>
            <Filter onClick={handleOnClick} />
            <Toolsdropdown setTag={setTag} setCloseModal={setCloseModal} />
          </div>

          <div>
            {loading ? (
              <div className={styles.grid}>
                {[...Array(12)].map((_, index) => (
                  <Carddesign loading={loading} />
                ))}
              </div>
            ) : (
              <>
                {getAllAiTools && getAllAiTools.length > 0 ? (
                  <div className={styles.grid}>
                    {getAllAiTools?.slice(0, 12)?.map((aiTool, index) => {
                      duration = duration + (index ? 200 : 0);
                      return (
                        <div
                          onClick={() => handleViewDetails(aiTool)}
                          key={index}
                        >
                          {/* <AnimatedSection
                        animationType="fade-up"
                        duration={500}
                        delay={duration}
                      > */}
                          <Carddesign
                            images={aiTool?.images?.[0]}
                            name={aiTool?.title}
                            description={aiTool?.aiToolSubCategoryId?.name}
                            icon={aiTool?.icon}
                            isFeatured={aiTool?.isFeatured}
                            item={aiTool}
                          />
                          {/* </AnimatedSection> */}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <Nodatashow/>
                )}
              </>
            )}
          </div>

          {/* <AnimatedSection animationType="fade-up" duration={600} delay={500}> */}
          {(count > 12 && getAllAiTools.length > 0) && <Pagination nPages={nPages} currentPage={page} />}
          {/* </AnimatedSection> */}
        </div>
      </div>
    </LazyLoad>
  );
}
