"use client";
import React, { useEffect } from "react";
import styles from "./article.module.scss";
import ViewAll from "@/shared/components/viewAll";
import ArticlesAndBlogCard from "../articlesAndBlogCard";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { getArticle, getArticleForHome } from "@/store/ApiSlice/articleSlice";
import LazyLoad from "@/helpers/lazyLoad";
import Nodatashow from "@/shared/components/nodatashow";
const Nodata = "/assets/icons/no-data-vector.svg";

export default function Article() {
  let duration = 100;
  const dispatch = useDispatch();
  const { getAllArtical, ArticleLoading } = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(getArticleForHome({}))
      .unwrap()
      .then(() => {})
      .catch(() => {});
  }, []);

  return (
    <LazyLoad id={"Article"}>
      <div className={styles.articleAlignment}  >
        <div className="container">
          {/* <AnimatedSection animationType="fade-up" duration={800} delay={400}> */}
          <div className={styles.headerAlignment}>
            <div className={styles.title}>
              <div>
                {/* <AnimatedSection animationType="fade-up" duration={800} delay={400}> */}
                <h2>Articles</h2>
                <p>Discover Insights, Learn, and Stay Updated with Our Easy-to-Read Content</p>
              </div>
            </div>
            <div className={styles.webViewAll}>
              <Link href="/article">
                <ViewAll />
              </Link>
            </div>
          </div>

          {ArticleLoading ? (
            <>
              <div className={styles.grid}>
                {[...Array(3)].map((_, index) => (
                  <ArticlesAndBlogCard loading={ArticleLoading} />
                ))}
              </div>
            </>
          ) : (
            <>
              {getAllArtical?.length > 0 ? (
                <>
                  <div className={styles.grid}>
                    {getAllArtical?.slice(0, 3).map((item, index) => {
                      duration = duration + (index ? 200 : 0);
                      return <ArticlesAndBlogCard item={item} path={"article"} />;
                    })}
                  </div>
                </>
              ) : (
                <>
                  <Nodatashow/>
                </>
              )}

              <div className={styles.mobileViewAll}>
                <Link href="/article">
                  <ViewAll />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </LazyLoad>
  );
}
