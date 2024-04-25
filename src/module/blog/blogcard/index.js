"use client";
import React, { useEffect, useState } from "react";
import styles from "./blogcard.module.scss";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import ArticlesAndBlogCard from "@/module/home/articlesAndBlogCard";
import Pagination from "@/shared/components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "@/store/ApiSlice/blogSlice";
import Loader from "@/shared/components/Loader";
import PaginatedList from "@/module/home/blog/PaginatedList";
import Nodatashow from "@/shared/components/nodatashow";
import AuthorCard from "@/module/authorpage/authorCard";
const Nodata = "/assets/icons/no-data-vector.svg";

export default function Blogcard() {
  let duration = 100;
  const { getAllBlog, getpaginationBlog, blogLoading } = useSelector((state) => state.blog);

  const dispatch = useDispatch();
  const count = getAllBlog?.length;
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    dispatch(getBlog())
      .unwrap()
      .then(() => {
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
  }, []);

  return (
    <div className={styles.blogcardAllAlignment}>
      <div className="container">
        {blogLoading ? (
          <div className={styles.grid}>
            {[...Array(6)].map((_, index) => (
              <ArticlesAndBlogCard loading={blogLoading} />
            ))}
          </div>
        ) : (
          <>
            {getpaginationBlog?.length > 0 ? (
              <>
                <div className={styles.grid}>
                  {getpaginationBlog?.slice(0, 12)?.map((blog, index) => {
                    duration = duration + (index ? 200 : 0);
                    return <AuthorCard item={blog} />;
                  })}
                </div>
              </>
            ) : (
              <Nodatashow/>
            )}
          </>
        )}
      </div>
      <div style={{marginTop:"30px"}}>

      {count > 9 && <PaginatedList data={getAllBlog} itemsPerPage={9} />}
      </div>
    </div>
  );
}
