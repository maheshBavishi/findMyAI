"use client";
import React, { useEffect, useState } from "react";
import Blogbanner from "./blogbanner";
import Blogslider from "./blogslider";
import Blogcard from "./blogcard";
import { getBlog } from "@/store/ApiSlice/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/shared/components/Loader";
import { useQuery } from "@apollo/client";
import GET_ALL_BLOG_DATA from "@/graphql/query/getAllBlogData";
import useDebounce from "@/hook/useDebounce";
import { setCurrentPage } from "@/store/ApiSlice/gptSlice";
import LazyLoad from "@/helpers/lazyLoad";
import { useRouter } from "next/router";

export default function Blogindex() {
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const handleOnSearch = (e) => {
    
    setSearch(e.target.value);
  };
  const router = useRouter();
  const cleanedPathname = router?.pathname.substring(1);

  const searchData = useDebounce(search, 1000);
  useEffect(() => {
    handleSearch();
  }, [searchData]);
  const handleSearch = () => {
    setLoader(true);
    dispatch(getBlog({ text: search }))
      .then((res) => {
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
  };
  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, []);
  const type = document.querySelector('meta[property="og:type"]');
  if (type) {
      type.setAttribute('content', "article");
  }
  return (
    <LazyLoad id={"BlogPage"}>
      <div>
        <Blogbanner
          handleOnSearch={handleOnSearch}
          search={search}
          setSearch={setSearch}
        />
        {/* {!search && <Blogslider />} */}

        <Blogcard />
      </div>
    </LazyLoad>
  );
}
