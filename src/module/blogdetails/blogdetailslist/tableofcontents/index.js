"use client";
import React, { useState } from "react";
import styles from "./tableofcontents.module.scss";
import { useParams, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { marked } from "marked";
import Blogdetailslist from "..";
import Skeleton from "react-loading-skeleton";

export default function Tableofcontents({ slug }) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState(null);
  // const { slug } = useParams();
  const lastPathname = pathname.substring(pathname.lastIndexOf("/") + 1);
  const { getAllBlog, blogLoading } = useSelector((state) => state.blog);
  const { getAllArtical ,ArticleLoading } = useSelector((state) => state.article);

  const handleScrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  let data =
    pathname.includes("/article") || pathname.includes("/article")
      ? getAllArtical
      : getAllBlog;
  return (
    <div className={styles.tableofcontents}>
      {blogLoading || ArticleLoading? (
        <>
          <Skeleton
            className={styles.tableofcontentsSkeleton}
            baseColor="#232147"
          />
        </>
      ) : (
        <>
          <h6>Table Of Contents</h6>
        </>
      )}
      {blogLoading || ArticleLoading? (
        <>
          <Skeleton
            className={styles.tableofcontentsListSkeleton}
            count={5}
            baseColor="#232147"
          />
        </>
      ) : (
        <>
          <div className={styles.allListAlignment}>
            {data
              .filter(
                (item) =>
                  item?.attributes?.slug?.toLowerCase() ===
                  lastPathname?.toLowerCase()
              )
              .map((blog, index) => {
                const htmlContent = marked(blog?.attributes?.markdownContent);
                const div = document.createElement("div");
                div.innerHTML = htmlContent;

                const titleElements = div.querySelectorAll("h1, h2, h3");
                const titleMatches = Array.from(titleElements).map(
                  (titleElement, titleIndex) => {
                    const text = titleElement.innerText;
                    return (
                      <div
                        className={`${styles.textGrid} ${
                          activeSection === text ? styles.active : ""
                        }`}
                        key={titleIndex}
                        onClick={() => handleScrollToSection(text)}
                      >
                        <div className={styles.icon}></div>
                        <span>{text}</span>
                      </div>
                    );
                  }
                );

                return (
                  <React.Fragment key={index}>{titleMatches}</React.Fragment>
                );
              })}
          </div>
        </>
      )}
      {/* <Blogdetailslist id={id}/> */}
    </div>
  );
}
