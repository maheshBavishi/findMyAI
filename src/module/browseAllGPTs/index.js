"use client";

import React, { useEffect } from "react";
import styles from "./browseAllGPTs.module.scss";
import BrowseAllGPTsBanner from "./browseAllGPTsBanner";
import BrowserAllGptsCard from "./browserAllGptsCard";
import { setsearchGpts } from "@/store/ApiSlice/aiToolsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import useDebounce from "@/hook/useDebounce";
import { GetGpt, setSearchGpts } from "@/store/ApiSlice/gptSlice";
import { isEmpty } from "@/helpers/common";
export default function BrowseAllGPTs() {
  const { searchGpts } = useSelector((state) => state.gpt);
  const dispatch = useDispatch();
  const debouncedSearch = useDebounce(searchGpts, 1000);
  const handleOnSearch = (e) => {
    const value = e?.target?.value;
    if (!isEmpty(value)) {
      dispatch(setSearchGpts(value));
    } else {
      dispatch(setSearchGpts(""));
    }
  };
  useEffect(() => {
    const handleSearch = (searchGpts) => {
      dispatch(
        GetGpt({
          search: debouncedSearch,
          page: 1,
          limit: 12,
          selectedData: true,
        })
      )
        .unwrap()
        .then((res) => {});
    };
    handleSearch();
  }, [debouncedSearch]);

  return (
    <div>
      <BrowseAllGPTsBanner
        handleOnSearch={handleOnSearch}
        search={searchGpts}
      />
      <BrowserAllGptsCard />
    </div>
  );
}
