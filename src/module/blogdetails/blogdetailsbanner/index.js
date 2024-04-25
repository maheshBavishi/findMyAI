"use client";
import React from "react";
import styles from "./blogdetailsbanner.module.scss";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import LazyImage from "@/helpers/lazyImage";
import LazyLoad from "@/helpers/lazyLoad";
import { useRouter } from "next/router";
const BlogdetailsImage = "/assets/images/blog-details.png";
export default function Blogdetailsbanner() {
  const { getAllBlog, blogLoading } = useSelector((state) => state.blog);
  const { getAllArtical, ArticleLoading } = useSelector(
    (state) => state.article
  );
  const router = useRouter();

  const lastPathname = router?.pathname.substring(router?.pathname.lastIndexOf("/") + 1);
  let data = router?.pathname.includes("/article") ? getAllArtical : getAllBlog;
  return (
    <LazyLoad id={"Blogdetailsbanner"}>
      <>
        {blogLoading ? (
           <div className="container">
          <Skeleton baseColor="#cccccc29" className={styles.blogSkeleton} />
          </div>
        ) : (
          <>
            {data
              .filter(
                (item, idx) =>
                  item?.attributes?.slug.toLowerCase() ===
                  lastPathname.toLowerCase()
              )
              ?.map((blog, index) => {
                let blogCoverImg =
                  `https://cms.findmyaitool.com` +
                  blog?.attributes?.coverImage?.data?.attributes?.url;
                return (
                  <>
                  <div className="container">
                    <div className={styles.blogdetailsbanner}>
                      <div className={styles.image}>
                        <LazyImage
                          image={{
                            src: blogCoverImg ? blogCoverImg : BlogdetailsImage,
                            alt: "BlogdetailsImage",
                          }}
                          className={styles.cardImageChild}
                        />
                      </div>
                    </div>
                    </div>
                  </>
                );
              })}
          </>
        )}
      </>
    </LazyLoad>
  );
}
