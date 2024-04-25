"use client";

import React, { useEffect, useState } from "react";
import Copywritingbanner from "./copywritingbanner";
import Aitoolslist from "./aitoolslist";
import { useDispatch, useSelector } from "react-redux";
import {
  getAiTools,
  getAiToolsSubCategory,
} from "@/store/ApiSlice/aiToolsSlice";
import { useRouter } from "next/router";

export default function Copywriting() {
  const { count, getAllAiTools } = useSelector((state) => state.aiTools);
  const { page } = useSelector((state) => state.gpt);
  const [search, setSearch] = useState("");
  const nPages = Math.ceil(count / 12);
  const dispatch = useDispatch();
  const router = useRouter();
  const lastPathname = router?.pathname.substring(router?.pathname.lastIndexOf("/") + 1);
  const [subcategoryData, setSubCatData] = useState("");

  const handleOnSearch = (e) => {
    const value = e.target.value.trim();
    if (value !== "") {
      setSearch(value);
      handleSearchClick(value);
    } else {
      setSearch("");
    }
  };
  useEffect(() => {
    dispatch(
      getAiToolsSubCategory({ search: lastPathname.split("--").join(" ") })
    ).then((res) => {
      setSubCatData(res?.payload?.payload?.AI_TOOL_SUB_CATEGORY?.[0]);
    });
  }, []);
  const handleSearchClick = (search) => {
    dispatch(
      getAiTools({
        page: 1,
        limit: 12,
        status: "approved",
        search: search,
        aiToolSubCategory: lastPathname,
        selectedData: true,
      })
    ).then((res) => {});
  };

  const titleTag = document.getElementsByTagName("title");

  if (titleTag) {
    titleTag[0].innerText = lastPathname.split("--").join(" ");
  }
  const metaDescription = document.querySelector('meta[name="description"]');

  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      getAllAiTools?.[0]?.aiToolSubCategoryId?.descriptio
    );
  }
  const ogurl = document.querySelector('meta[property="og:url"]');

  if (ogurl) {
    const newOgUrl = `https://findmyaitool.com${router?.pathname}`;
    ogurl.setAttribute("content", newOgUrl);
  }
  return (
    <div>
      <Copywritingbanner
        handleOnSearch={handleOnSearch}
        search={search}
        handleSearchClick={handleSearchClick}
        description={subcategoryData?.description}
      />
      <Aitoolslist page={page} nPages={nPages} />
    </div>
  );
}
