"use client";
import React, { useEffect } from "react";
import styles from "./authorpage.module.scss";
import AuthorProfileDetails from "./authorProfileDetails";
import AutthorTab from "./autthorTab";
import AuthorAllDetails from "./authorAllDetails";
const RightIcon = "/assets/icons/breadcrumbs -right.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAuthor, getAuthoreBlog, getBlogForHomePage } from "@/store/ApiSlice/blogSlice";
import { useRouter } from "next/router";

export default function Authorindex() {
  const dispatch = useDispatch();
  const router = useRouter();
  const lastPathname = router?.pathname?.substring(router?.pathname?.lastIndexOf("/") + 1);
  const cleanedPathname = lastPathname?.split("-").join(" ");
  const { getallauthore, blogLoading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAuthor({ text: cleanedPathname }))
      .then(() => { })
      .catch(() => { });
  }, []);



  return (

    <div className={styles.authorSection}>

      <div className="container">
        <div className={styles.authorBreadcrumbsSection}>
          <div className={styles.authorBreadcrumbsAlignment}>
            <div className={styles.topBarLeft}>
              <>
                <a href="/" className={styles.breadcrumbName}>
                  Home
                  <img loading="lazy" src={RightIcon} alt="RightIcon" />
                </a>

                <a href="/authors-list" className={styles.breadcrumbName}>
                  Authors
                  <img loading="lazy" src={RightIcon} alt="RightIcon" />
                </a>

                <p className={styles.breadcrumbName}>{cleanedPathname}</p>
              </>
            </div>
          </div>
        </div>

        <AuthorProfileDetails />
        <AutthorTab />
        <AuthorAllDetails />
      </div>
    </div>

  );
}
