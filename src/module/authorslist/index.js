"use client";
import React, { useEffect } from "react";
import styles from "./authorslist.module.scss";
import Facebook from "@/assets/icons/facebook";
import Instragram from "@/assets/icons/instragram";
import Linkdin from "@/assets/icons/linkdin";
import Twitter from "@/assets/icons/twitter";
const DemoImg = "/assets/images/demoimg.jpg";
const AiLogo = "/assets/logo/logo-5.png";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

import { useDispatch, useSelector } from "react-redux";
import { getAuthor, getAuthoreBlog, getBlog } from "@/store/ApiSlice/blogSlice";
import PaginatedList from "../home/blog/PaginatedList";
import LazyImage from "@/helpers/lazyImage";

export default function AuthorsList() {
  const { getAllBlog, getallauthore, blogauthorloading, getpaginationauthore } =
    useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const count = getallauthore?.length;

  useEffect(() => {
    dispatch(getAuthor({}))
      .unwrap()
      .then(() => {})
      .catch(() => {});
  }, []);
  return (
    <div className={styles.authorsListSection}>
      <div className="container">
        <div className={styles.authorsListHeading}>
          <h1>
            <span>Authors</span>
          </h1>
          <p>
            Discover engaging content crafted by talented blog authors, offering
            insights, opinions, and expertise on various topics and subjects.
          </p>
        </div>

        <div className={styles.authoorsListDetails}>
          <div className={styles.authoorsListGrid}>
            {blogauthorloading ? (
              [...Array(15)].map((_, index) => (
                <div className={styles.authoorsListGridItem}>
                  <Skeleton
                    baseColor="#232147"
                    className={styles.autorImgBox}
                    height={166}
                  />
                  <Skeleton
                    baseColor="#232147"
                    className={styles.skeletopnNameAlignment}
                  />

                  <div className={styles.skeletonflex}>
                    {[...Array(4)].map((_, index) => (
                      <Skeleton baseColor="#232147" className={styles.icon} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <>
                {getpaginationauthore?.map((item, i) => {
                  let authoreImg =
                    `https://cms.findmyaitool.com` +
                    item?.attributes?.author_profile?.data?.attributes?.url;
                  let AuthoreName = item?.attributes?.author_name;
                  let Socialmedialink = item?.attributes?.social_media;
                  let authorName = AuthoreName?.split(" ")?.join("-");
                  let cleanedPathname = authorName?.replace(/^-+|-+$/g, "");
                  return (
                    <div className={styles.authoorsListGridItem} key={i}>
                      <Link href={`/authors-list/${cleanedPathname}`}>
                        <div>
                          <div className={styles.autorImgBox}>
                            {/* <img src={authoreImg ?? AiLogo} alt="Authoreimg" /> */}
                            <LazyImage
                                      image={{
                                        src: authoreImg ,
                                        alt: `authoreImg`,
                                      }}
                                      className={styles.cardImageChild}
                                    />
                          </div>
                          <div className={styles.authorNameDetailsAlignment}>
                            <h4>{AuthoreName}</h4>
                          </div>
                        </div>
                      </Link>
                      <div className={styles.socialAlignment}>
                        {Socialmedialink?.map((link) => (
                          <a
                            key={link?.id}
                            href={link?.social_media_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialAlignment}
                          >
                            {link?.social_media_name === "LinkedIn" && (
                              <Linkdin />
                            )}
                            {link?.social_media_name === "Instagram" && (
                              <Instragram />
                            )}
                            {link?.social_media_name === "Twitter" && (
                              <Twitter />
                            )}
                            {link?.social_media_name === "Facebook" && (
                              <Facebook />
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
        {count > 12 && <PaginatedList data={getallauthore} itemsPerPage={12} />}
      </div>
    </div>
  );
}
