"use client ";
import React, { useEffect } from "react";
import styles from "./relatedblogs.module.scss";
import { useParams, usePathname, useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import { getAuthor, getBlogForHomePage } from "@/store/ApiSlice/blogSlice";
const Arrow = "/assets/icons/top-right-arrow.svg";
import { useDispatch, useSelector } from "react-redux";

export default function Relatedblogs() {
  const pathname = usePathname();
  const { slug } = useParams();
  const lastPathname = pathname.substring(pathname.lastIndexOf("/") + 1);
  const { getAllArtical, ArticleLoading } = useSelector(
    (state) => state.article
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogForHomePage({}))
      .then((res) => {})
      .catch(() => {});
  }, [pathname]);
  const { getAllHomeBlog, blogLoading } = useSelector((state) => state.blog);
  const router = useRouter();
  const handleOnViewBlog = (blog) => {
    const slug = blog?.attributes?.slug;

    if (slug) {
      pathname.includes("/article")
        ? router.push(`/article/${slug}`)
        : router.push(`/blog/${slug}`);
    }
  };
  let data = pathname.includes("/article") ? getAllArtical : getAllHomeBlog;
  return (
    <div className={styles.relatedblogs}>
      {blogLoading || ArticleLoading ? (
        <>
          <Skeleton className={styles.reletesSkeleton} baseColor="#232147" />
        </>
      ) : (
        <>
          <h6>
            Related {pathname.includes("/article") ? "article’s" : "blog’s"}
          </h6>
        </>
      )}
      {blogLoading || ArticleLoading ? (
        <>
          <Skeleton
            className={styles.reletesListSkeleton}
            baseColor="#232147"
            count={5}
          />
        </>
      ) : (
        <>
          <div className={styles.allListalignment}>
            {data
              ?.filter(
                (item, idx) =>
                  item.attributes?.slug?.toLowerCase() !==
                  lastPathname?.toLowerCase()
              )
              ?.slice(0, 4)
              ?.map((blog, index) => {
                return (
                  <>
                    <div
                      className={styles.text}
                      key={index}
                      onClick={() => handleOnViewBlog(blog)}
                    >
                      <p>
                        {blog.attributes.title}{" "}
                        <img loading="lazy" src={Arrow} alt="Arrow" />
                      </p>
                    </div>
                  </>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}
