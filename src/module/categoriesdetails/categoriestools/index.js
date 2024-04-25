"use client";
import React, { useEffect, useState } from "react";
import styles from "./categoriestools.module.scss";
import Carddesign from "@/module/home/cardSection/carddesign";
import { useDispatch, useSelector } from "react-redux";
import { getAiTools, setToolLoader } from "@/store/ApiSlice/aiToolsSlice";
import LazyLoad from "@/helpers/lazyLoad";
import Nodatashow from "@/shared/components/nodatashow";
import { useRouter } from "next/router";
export default function Categoriestools({ categoryToolsDetails }) {
  const { loading, categoryDetails, toolsloader } = useSelector(
    (state) => state.aiTools
  );
  const dispatch = useDispatch();
  const [toolsData, setToolsData] = useState([]);
  const [loader, setLoader] = useState(false);
  const route = useRouter();
  const lastPathname = route?.pathname?.substring(route?.pathname?.lastIndexOf("/") + 1);
  const [hasCalledGetPopularTools, setHasCalledGetPopularTools] =
    useState(false);
  const getPopularTools = async () => {
    setLoader(true);
    try {
      dispatch(setToolLoader(false));
      const res = await dispatch(
        getAiTools({
          page: 1,
          limit: 9,
          status: "approved",
          // ...(route?.pathname?.includes("tool") && {
          //   aiToolSubCategory:
          //     categoryToolsDetails?.item?.aiToolSubCategory?.[0]?.name,
          // }),
          selectedData: true,
        })
      );
      setLoader(false);

      setToolsData(res?.payload?.payload?.aiTool);
      dispatch(setToolLoader(true));
    } catch (error) {
      console.error("Error fetching popular tools:", error);
      setLoader(false);

      dispatch(setToolLoader(true));
    }
  };

  useEffect(() => {
    if (categoryToolsDetails?.item?.aiToolSubCategoryId && !hasCalledGetPopularTools) {
      dispatch(setToolLoader(false));
      getPopularTools();
      setHasCalledGetPopularTools(true);
    }
  }, [categoryToolsDetails, hasCalledGetPopularTools]);

  return (
    <LazyLoad id={"Categoriestools"}>
      <div
        className={styles.categoriestoolsallContnetAlignment}
        data-scroll
        data-scroll-section
        data-scroll-direction="horizontal"
      >
        <div className={styles.headingAlignment}>
          <h4>Releated AI Tools</h4>
          <p>
            Explore related AI tools for diverse applications and enhanced
            productivity
          </p>
        </div>
        {loader || loading ? (
          <div className={styles.grid}>
            {[...Array(8)].map((_, index) => (
              <Carddesign loading={loader} />
            ))}
          </div>
        ) : (
          <>
            {toolsData && toolsData?.length > 0 && !loader ? (
              <>
                <div className={styles.grid}>
                  {toolsData
                    .filter((item) => {
                      return item?.slugId != lastPathname;
                    })
                    ?.slice(0, 8)
                    ?.map((aiTool, index) => {
                      return (
                        <div key={index}>
                          <Carddesign
                            images={aiTool?.images?.[0]}
                            name={aiTool?.title}
                            description={aiTool?.aiToolSubCategory?.[0]?.name}
                            icon={aiTool?.icon}
                            isFeatured={aiTool?.isFeatured}
                            item={aiTool}
                          />
                        </div>
                      );
                    })}
                </div>
              </>
            ) : (
              <Nodatashow />
            )}
          </>
        )}
      </div>
    </LazyLoad>
  );
}
