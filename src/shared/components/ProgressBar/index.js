"use client";
import React, { useState, useEffect } from "react";
import styles from "./progreasbar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { GetStaticeMetatag } from "@/store/ApiSlice/restAllSlice";

const ProgressBar = ({ pathname }) => {
  const { loading, categoryLoader } = useSelector((state) => state.aiTools);
  const { gptLoading } = useSelector((state) => state.gpt);
  const { blogLoading } = useSelector((state) => state.blog);
  const { videoloading } = useSelector((state) => state.aiToolsshortvideo);
  const { BookMarkLoading } = useSelector((state) => state.bookmark);
  const { ArticleLoading } = useSelector((state) => state.article);
  const { getstaticemetatag } = useSelector((state) => state.restall);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetStaticeMetatag());
  }, []);
  const cleanedPathname = pathname?.substring(1);

  useEffect(() => {
    const data =
      getstaticemetatag?.find((item) => item.url === cleanedPathname) ||
      getstaticemetatag?.find((item) => item.url === "home");

    if (data) {
      const { metaTitle, metaKeywords, metaDescription } = data;

      const titleTag = document.querySelector("title");
      if (titleTag) titleTag.innerText = `${metaTitle} `;

      const metaKeywordsTag = document.querySelector('meta[name="keywords"]');
      if (metaKeywordsTag)
        metaKeywordsTag.setAttribute("content", metaKeywords);

      const metaDescriptionTag = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescriptionTag)
        metaDescriptionTag.setAttribute("content", metaDescription);
    }
  }, [getstaticemetatag, cleanedPathname]);

  return (
    <>
      {(blogLoading ||
        gptLoading ||
        loading ||
        categoryLoader ||
        videoloading ||
        ArticleLoading ||
        BookMarkLoading) && (
        <>
          <div className={styles.mappingloader}></div>

          <div className={styles.spinner}></div>
        </>
      )}
    </>
  );
};

export default ProgressBar;
