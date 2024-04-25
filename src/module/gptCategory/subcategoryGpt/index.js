"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Gpt from "../gptCategoriescard/gpt";
import { GetGpt, GetGptCategoryData } from "@/store/ApiSlice/gptSlice";
import GptBanner from "../gptBanner";
import { useRouter } from "next/router";

export default function SubcategoryGpt() {
  const { GptCount } = useSelector((state) => state.gpt);
  const [search, setSearch] = useState("");
  const [subcategoryData, setSubCatData] = useState("");
  const {page} = useSelector((state) => state.gpt);
  const nPages = Math.ceil(GptCount / 12);
  const dispatch = useDispatch();
  const router = useRouter();
  const lastPathname = router?.pathname.substring(router?.pathname.lastIndexOf("/") + 1);
  useEffect(() => {
    dispatch(
      GetGptCategoryData({ search: lastPathname.split("--").join(" ") })
    ).then((res) => {
      setSubCatData(res?.payload?.payload?.categorys?.[0])
    });
  }, []);
  const handleOnSearch = (e) => {
  
    const value = e.target.value.trim(); 
    if (value !== "") {
      setSearch(value);
      setTimeout(() => {
          handleSearchClick(value); 
        }, 2000);
    } else {
      setSearch("");
    }
  };
 
  const handleSearchClick = (search) => {
    dispatch(
      GetGpt({
        page: 1,
        limit: 12,
        status: "approved",
        search: search,
        category: lastPathname,
        selectedData:true

      })
    ).then((res) => {});
  };

  const titleTag = document.getElementsByTagName("title");

  if (titleTag) {
    titleTag[0].innerText = lastPathname.split("--").join(" ");
  }
  const metaDescription = document.querySelector('meta[name="description"]');

  if (metaDescription) {
    metaDescription.setAttribute('content', subcategoryData?.description);
  }
  const ogurl = document.querySelector('meta[property="og:url"]');

  if (ogurl) {
    const newOgUrl = `https://findmyaitool.com${router?.pathname}`
    ogurl.setAttribute('content', newOgUrl);
}  
  return (
    <div>
      <GptBanner
        handleOnSearch={handleOnSearch}
        search={search}
        handleSearchClick={handleSearchClick}
        description={subcategoryData?.description}
      />
      <Gpt page={page}  nPages={nPages} />
    </div>
  );
}
