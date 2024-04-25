"use client";
import React, { useEffect, useState } from "react";
import Aitoolslistbanner from "./aitoolslistbanner";
import Aitoolslist from "../copywriting/aitoolslist";
import { useDispatch, useSelector } from "react-redux";
import { getAiTools, setSearchTools } from "@/store/ApiSlice/aiToolsSlice";

export default function Aitoolslistindex() {
  const { count, searchTools } = useSelector((state) => state.aiTools);
  const { page } = useSelector((state) => state.gpt);

  const nPages = Math.ceil(count / 12);
  const dispatch = useDispatch();

  const handleOnSearch = (e) => {
    const value = e.target.value.trim();
    if (value !== "") {
      dispatch(setSearchTools(value));
      handleSearch(value);
    } else {
      dispatch(setSearchTools(""));
    }
  };
  const handleSearchClick = () => { };
  const handleSearch = (search) => {
    dispatch(
      getAiTools({
        page: page,
        limit: 12,
        status: "approved",
        search: search,
        selectedData: true,
      })
    )
      .unwrap()
      .then((res) => { });
  };
  const type = document.querySelector('meta[property="og:type"]');
  if (type) {
    type.setAttribute('content', "software");
  }
  return (
    <div>
      <Aitoolslistbanner
        handleOnSearch={handleOnSearch}
        search={searchTools}
        handleSearchClick={handleSearchClick}
      />
      <Aitoolslist page={page} nPages={nPages} />
    </div>
  );
}
