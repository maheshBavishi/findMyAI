"use client";

import React, { useEffect, useState } from "react";
import ToolsdetailsBreadcrumbs from "./toolsdetailsBreadcrumbs";
import styles from "./toolsdetails.module.scss";
import dynamic from "next/dynamic";
import { getAiTools, setCategoryDetails } from "@/store/ApiSlice/aiToolsSlice";
import { useDispatch, useSelector } from "react-redux";
import ToolsDetailsMain from "./toolsdetailsmain";
import ToolsDetailsAllDetails from "./toolsdetailsallDetails";
import Metadata from "../categoriesdetails/metadata";
import LazyLoad from "@/helpers/lazyLoad";
import Nodatashow from "@/shared/components/nodatashow";
import { useRouter } from "next/router";
const Categoriestools = dynamic(() =>
  import("../categoriesdetails/categoriestools")
);
const ExploreGptTools = dynamic(() => import("../home/exploregptTools"));
const PromoteWorkHack = dynamic(() => import("./promoteworkHack"));

export default function ToolsDetails() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [categoryToolsDetails, setCategoryToolsDetails] = useState({});
  const { categoryDetails, loading } = useSelector((state) => state.aiTools);
  const pathParts = router?.pathname.split("/");
  const lastPart = pathParts[pathParts.length - 1];
  const trimmedLastPart = lastPart.trim();
  const [loader, setLoader] = useState(false);
  const [ToolLoader, setToolsLoader] = useState(false);

  const handleOnGetData = async () => {
    setLoader(true);
    setToolsLoader(true);

    dispatch(getAiTools({ search: trimmedLastPart, selectedData: "false" }))
      .then((res) => {
        if (res?.payload?.success === true) {
          const fetchedItem = res?.payload?.payload?.aiTool?.[0];
          dispatch(setCategoryDetails({ item: fetchedItem }));
          setCategoryToolsDetails({ item: fetchedItem });
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      })
      .finally(() => {
        setToolsLoader(false);
      });
  };

  useEffect(() => {
    handleOnGetData();
  }, []);

  return (
    <LazyLoad id={"ToolsDetails"}>
      <div className={styles.toolsCategoryAlignment}>
        {!ToolLoader && categoryToolsDetails?.item === undefined ? (
          <>
            <Nodatashow />
          </>
        ) : (
          <>
            <div className="container">
              {!ToolLoader && categoryToolsDetails?.item !== undefined && <Metadata />}
              <ToolsdetailsBreadcrumbs
                categoryToolsDetails={categoryToolsDetails}
              />
              <ToolsDetailsMain categoryToolsDetails={categoryToolsDetails} />
              <ToolsDetailsAllDetails
                categoryToolsDetails={categoryToolsDetails}
                loader={loader}
                setLoader={setLoader}
              />
            </div>
            <PromoteWorkHack />
            <div className="container">
              <Categoriestools categoryToolsDetails={categoryToolsDetails} />
            </div>
            <ExploreGptTools />
          </>
        )}
      </div>
    </LazyLoad>
  );
}
