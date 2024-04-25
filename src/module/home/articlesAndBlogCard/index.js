"use client";
import React from "react";
import styles from "./articlesAndBlogCard.module.scss";
const BlogImage = "/assets/images/blog-image.png";
const CalenderIcon = "/assets/icons/calender.svg";
const LineIcon = "/assets/icons/line.svg";
import "react-loading-skeleton/dist/skeleton.css";

import Link from "next/link";
import moment from "moment";
import CommonImage from "@/helpers/CommonImage";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import LazyImage from "@/helpers/lazyImage";
const EyeIcon = "/assets/icons/eye.svg";
export default function ArticlesAndBlogCard({ item, path, loading }) {
  let blogAttributes = item?.attributes;
  let blogCoverImg =
    `https://cms.findmyaitool.com` +
    item?.attributes?.coverImage?.data?.attributes?.url;
  let blogTitle =
    blogAttributes?.title?.length > 30
      ? blogAttributes?.title?.slice(0, 30) + "..."
      : blogAttributes?.title;
  const slug = item?.attributes?.slug;
  return (
    <>
      <div className={styles.articlesAndBlogCard}>
        <Link href={path === "article" ? `/article/${slug}` : `/blog/${slug}`}>
          <div className={styles.articalesSkeleton}>
            {/* {loading ? (
              <Skeleton className={styles.skeletonArticalCard} baseColor="#cccccc29" />
            ) : (
              <>
                <div className={styles.image}>
                  <CommonImage src={blogCoverImg ? blogCoverImg : BlogImage} alt="BlogImage" />
                  <Image src={blogCoverImg} width={100} height={300} />
                </div>
              </>
            )} */}

            <div className={styles.image}>
              <LazyImage
                image={{
                  src: blogCoverImg,
                  alt: `BlogImage`,
                }}
                className={styles.cardImageChild}
              />
            </div>
          </div>

          <div className={styles.detailsAlignment}>
            <div className={styles.articalesSkeleton}>
              {loading ? (
                <Skeleton
                  className={styles.skeletonHeading}
                  baseColor="#cccccc29"
                />
              ) : (
                <h3>{blogTitle}</h3>
              )}
            </div>
            <div className={styles.line}></div>
            <div className={styles.articalesSkeleton}>
              {loading ? (
                <Skeleton
                  className={styles.skeletonDate}
                  baseColor="#cccccc29"
                />
              ) : (
                <>
                  <div className={styles.lastContnetAlignment}>
                    <div className={styles.icontext}>
                      <CommonImage src={CalenderIcon} alt="CalenderIcon" />

                      <span>
                        {moment(item?.attributes?.createdAt).format(
                          "MMM DD YYYY"
                        )}
                      </span>
                      <span>
                        {
                          item?.attributes?.author?.add_author?.data?.attributes
                            ?.author_name
                        }
                      </span>
                    </div>
                    {/* <img  loading="lazy" src={LineIcon} alt="LineIcon" /> */}
                    <div className={styles.icontext}>
                      {/* <img  loading="lazy" src={EyeIcon} alt="EyeIcon" /> */}
                      {/* <span>8K Viewers</span> */}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className={styles.articalesSkeleton}>
              {loading ? (
                <Skeleton
                  className={styles.skeletonButton}
                  baseColor="#cccccc29"
                />
              ) : (
                <>
                  <div className={styles.button}>
                    <button aria-label="Read More">Read More</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
