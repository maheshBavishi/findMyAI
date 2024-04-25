"use client";
import React, { useEffect } from "react";
import styles from "./home.module.scss";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "@/store/ApiSlice/gptSlice";
import LazyLoad from "@/helpers/lazyLoad";
const Herobanner = dynamic(() => import("./herobanner"));
const CompanyImage = dynamic(() => import("./companyImage"));
const CardSection = dynamic(() => import("./cardSection"));
const Trendingaishortsvideo = dynamic(() => import("./trendingaishortsvideo"));
const Testimonial = dynamic(() => import("./testimonial"));
const Toolssection = dynamic(() => import("./toolssection"));
const CategoriesTools = dynamic(() => import("./categoriesTools"));
const GetInTouch = dynamic(() => import("./getInTouch"));
const Article = dynamic(() => import("./article"));
const Blog = dynamic(() => import("./blog"));
const ExploreGptTools = dynamic(() => import("./exploregptTools"));
const Faqsection = dynamic(() => import("./faqsection"));
export default function Homeindex() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage(1));
    window.scrollTo(0, 0);
    }, []);

  return (
    <LazyLoad id={"HomePage"}>

    <div className={styles.homePageAlignment}>
      
      <Herobanner />
      <CompanyImage />
      <CardSection />
      <Trendingaishortsvideo />
      <Toolssection />
      <CategoriesTools />
      <ExploreGptTools />
      <Testimonial />
      {/* <GetInTouch /> */}
      {/* <Article /> */}
      <Blog />
      <Faqsection />
    </div>
    </LazyLoad>

  );
}
