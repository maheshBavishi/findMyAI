"use client";
import React, { useEffect } from "react";
import styles from "./blog.module.scss";
import ArticlesAndBlogCard from "../articlesAndBlogCard";
import ViewAll from "@/shared/components/viewAll";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { getBlog, getBlogForHomePage } from "@/store/ApiSlice/blogSlice";
import LazyLoad from "@/helpers/lazyLoad";
import Nodatashow from "@/shared/components/nodatashow";
import AuthorCard from "@/module/authorpage/authorCard";
const Nodata = "/assets/icons/no-data-vector.svg";

export default function Blog() {
  let duration = 100;
  const dispatch = useDispatch();
  const { getAllHomeBlog, blogLoading } = useSelector((state) => state.blog);
  useEffect(() => {
    dispatch(getBlogForHomePage({}))
      .then(() => { })
      .catch(() => { });
  }, []);
  return (
    <LazyLoad id={"Blog"}>
      <div className={styles.blogAllAlignment}  >
        <div className="container">
          {/* <AnimatedSection animationType="fade-up" duration={800} delay={400}> */}
          <div className={styles.headerAlignment}>
            <div className={styles.title}>
              <div>
                <h2>Blogs</h2>
                <p>Explore AI's wonders, learn, and stay updated with our insightful AI blogs.</p>
              </div>
            </div>
            <div className={styles.webViewAll}>
              <Link href="/blog">
                <ViewAll />
              </Link>
            </div>
          </div>
          {blogLoading ? (
            <>
              <div className={styles.grid}>
                {[...Array(3)].map((_, index) => (
                  <AuthorCard loading={blogLoading} />
                ))}
              </div>
            </>
          ) : (
            <>
              {getAllHomeBlog?.length > 0 ? (
                <>
                  <div className={styles.grid}>
                    {getAllHomeBlog?.slice(0, 3)?.map((item, index) => {
                      return <AuthorCard item={item} loading={blogLoading} />;
                    })}
                  </div>
                </>
              ) : (
                <>
                  <Nodatashow />
                </>
              )}
            </>
          )}

          <div className={styles.mobileViewAll}>
            <Link href="/blog">
              <ViewAll />
            </Link>
          </div>
        </div>
      </div>
    </LazyLoad>
  );
}
