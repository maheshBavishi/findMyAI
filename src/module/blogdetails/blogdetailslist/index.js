"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./blogdetailslist.module.scss";
import Relatedblogs from "./relatedblogs";
import Tableofcontents from "./tableofcontents";
import { useParams, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import moment from "moment";
import { marked } from "marked";
import { NextSeo } from "next-seo";
import Skeleton from "react-loading-skeleton";
import LazyLoad from "@/helpers/lazyLoad";
import BlogMetaTag from "../blogmetatag";
import Metadata from "@/module/categoriesdetails/metadata";
const ProfileImg = "/pu";

// Blogdetailslist component
export default function Blogdetailslist() {
  const titleRef = useRef(null);
  const { slug } = useParams();
  const { getAllBlog, blogLoading } = useSelector((state) => state.blog);
  const { getAllArtical, ArticleLoading } = useSelector(
    (state) => state.article
  );
  const pathname = usePathname();
  const lastPathname = pathname.substring(pathname.lastIndexOf("/") + 1);

  let data = pathname.includes("/article") ? getAllArtical : getAllBlog;

  const sidebarData = data?.map((item) => {
    const content = item?.attributes?.markdownContent?.split("\n\n");

    const formattedContent = content?.map((paragraph) => {
      return paragraph.split("**\n");
    });

    return {
      content: formattedContent,
    };
  });

  return (
    <LazyLoad id={"Blogdetailslist "}>
      <div
        className={styles.blogdetailslistalignment}
        data-scroll
        data-scroll-section
        data-scroll-direction="horizontal"
      >
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.griditems}>
              <Relatedblogs />
              <Tableofcontents slug={slug} />
            </div>
            {blogLoading || ArticleLoading ? (
              <div>
                <Skeleton
                  className={styles.blogdetailslistalignmentHeadingSkeleton}
                  baseColor="#232147"
                />{" "}
                <Skeleton
                  className={styles.datedetailslistalignmentHeadingSkeleton}
                  baseColor="#232147"
                />{" "}
                <Skeleton
                  className={styles.skeletonTiltlePragaraph}
                  baseColor="#232147"
                />
                <Skeleton
                  className={styles.skeletonPragaraph}
                  baseColor="#232147"
                  count={5}
                />
                <Skeleton
                  className={styles.skeletonTiltlePragaraph}
                  baseColor="#232147"
                />
                <Skeleton
                  className={styles.skeletonPragaraph}
                  baseColor="#232147"
                  count={5}
                />
              </div>
            ) : (
              <>
                <div className={styles.griditems}>
                  {data
                    .filter((item) => {
                      return (
                        item.attributes.slug.toLowerCase() ===
                        lastPathname?.toLowerCase()
                      );
                    })
                    ?.map((blog, index) => {
                      let htmlContent;
                      if (blog?.attributes?.markdownContent) {
                        htmlContent = marked(blog?.attributes?.markdownContent);
                      }
                      const div = document.createElement("div");
                      div.innerHTML = htmlContent;
                      const titleElements = div.querySelectorAll("h1, h2, h3");
                      Array.from(titleElements).map((item) => {
                        item.id = item.innerText;
                      });

                      const titleTag = document.getElementsByTagName("title");
                      if (titleTag) {
                        titleTag[0].innerText = blog?.attributes?.seo?.title;
                      }
                      const metaDescription = document.querySelector(
                        'meta[name="description"]'
                      );
                      const type = document.querySelector('meta[property="og:type"]');
                      if (type) {
                          type.setAttribute('content', "article");
                      }
                      if (metaDescription) {
                        metaDescription.setAttribute(
                          "content",
                          blog?.attributes?.seo?.description
                        );
                      }
                      let authoreImg =
                        `https://cms.findmyaitool.com` +
                        blog?.attributes?.author?.add_author?.data?.attributes
                          ?.author_profile?.data?.attributes?.url;
                      return (
                        <React.Fragment key={index}>
                          <BlogMetaTag item={blog?.attributes} />
                          <div className={styles.maintitle} ref={titleRef}>
                            <h1 id={`section-${index}`}>
                              {blog?.attributes?.title}
                            </h1>
                          </div>
                          <div className={styles.postedDate}>
                            <p>
                              <span>Published on :</span>{" "}
                              {moment(blog?.attributes?.createdAt).format(
                                "MMM DD YYYY"
                              )}
                            </p>
                            <a href="/authors-list">
                              {/* <span>Author :</span>{" "} */}
                              <p>
                                <div className={styles.authorPtofile}>
                                  <img src={authoreImg} alt="profile" />
                                </div>
                                {blog?.attributes?.author?.add_author?.data
                                  .attributes?.author_name ?? "Findmyai"}
                              </p>
                            </a>
                          </div>{" "}
                          <div className={styles.alltextAlignment}>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: marked?.parse(div?.innerHTML || ""),
                              }}
                            ></p>
                          </div>
                        </React.Fragment>
                      );
                    })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </LazyLoad>
  );
}
