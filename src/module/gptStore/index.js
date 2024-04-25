"use client";
import React, { useEffect } from "react";
import GptStoreBanner from "./gptStoreBanner";
import GptStoreLogo from "./gptStoreLogo";
import FeaturedGPT from "./featuredGPT";
import TrendingGPT from "./trendingGPT";
import GptFsq from "./gptfsq";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTools } from "@/store/ApiSlice/aiToolsSlice";
import {
  GetGpt,
  setCurrentPage,
  setGptLoader,
  setScrollGptCategory,
  setSearchGpts,
} from "@/store/ApiSlice/gptSlice";
import { usePathname, useRouter } from "next/navigation";
import { isEmpty } from "@/helpers/common";

export default function GptStore() {
  const { searchGpts, gpt } = useSelector((state) => state.gpt);
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const cleanedPathname = pathname.substring(1);

  const handleOnSearch = (e) => {
    const value = e?.target?.value?.trim();
    if (!isEmpty(value)) {
      dispatch(setSearchGpts(value));
      setTimeout(() => {
        router?.push(`/browse-all-gpts`);
      }, 1000);
    }
  };
  useEffect(() => {
    dispatch(setCurrentPage(1));
    dispatch(setSearchGpts(""));
    dispatch(setScrollGptCategory(""));
  }, []);

  return (
    <div>
      <GptStoreBanner handleOnSearch={handleOnSearch} search={searchGpts} />
      <GptStoreLogo />
      <FeaturedGPT />
      <div className="container">
        <TrendingGPT />
      </div>
      <GptFsq />
    </div>
  );
}
