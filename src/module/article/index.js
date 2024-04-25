"use client";
import React, { useEffect, useState } from "react";
import styles from "./article.module.scss";
import ArticlesAndBlogCard from "../home/articlesAndBlogCard";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import { useDispatch, useSelector } from "react-redux";
import Blogbanner from "../blog/blogbanner";
import { getArticle } from "@/store/ApiSlice/articleSlice";
import useDebounce from "@/hook/useDebounce";
import PaginatedList from "../home/blog/PaginatedList";
import Loader from "@/shared/components/Loader";
import Blogslider from "../blog/blogslider";
import LazyLoad from "@/helpers/lazyLoad";
import Nodatashow from "@/shared/components/nodatashow";
const Nodata = "/assets/icons/no-data-vector.svg";
export default function Article() {
  const { getpaginationArticle, getAllArtical, ArticleLoading } = useSelector((state) => state.article);
  const [search, setSearch] = useState("");
  const count = getpaginationArticle?.length;
  const dispatch = useDispatch();

  const handleOnSearch = (e) => {
    setSearch(e.target.value);
  };
  const searchData = useDebounce(search, 1000);
  useEffect(() => {
    handleSearch();
  }, [searchData]);
  const handleSearch = () => {
    dispatch(getArticle({ text: search }))
      .then((res) => {})
      .catch(() => {});
  };
  let duration = 100;
  return (
    <>
      <LazyLoad id={"Article"}>
        <Blogbanner handleOnSearch={handleOnSearch} search={search} setSearch={setSearch} />
        {!search && <Blogslider />}
        <div className="container">
          <div className={styles.articleAllContnetAlignment}>
            {/* <div className={styles.pagetitle}>
            <h1>
              <span>Articles</span>
            </h1>
          </div> */}
            <div>
              {ArticleLoading ? (
                <>
                  {" "}
                  <div className={styles.grid}>
                    {[...Array(3)].map((_, index) => (
                      <ArticlesAndBlogCard loading={ArticleLoading} />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {getpaginationArticle?.length > 0 ? (
                    <div className={styles.grid}>
                      {getpaginationArticle.map((items, index) => {
                        duration = duration + (index ? 200 : 0);
                        return <ArticlesAndBlogCard item={items} path={"article"} />;
                      })}
                    </div>
                  ) : (
                    <>
                    <Nodatashow/>
                    </>
                  )}
                </>
              )}
            </div>
            {count > 12 && <PaginatedList data={getAllArtical} itemsPerPage={12} />}
          </div>
        </div>
      </LazyLoad>
    </>
  );
}
