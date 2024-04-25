"use client";
import React from "react";
import styles from "./authorProfileDetails.module.scss";
import Facebook from "@/assets/icons/facebook";
import Instragram from "@/assets/icons/instragram";
import Linkdin from "@/assets/icons/linkdin";
import Twitter from "@/assets/icons/twitter";
import Skeleton from "react-loading-skeleton";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function AuthorProfileDetails() {
  const router = useRouter();
  const lastPathname = router?.pathname?.substring(router?.pathname?.lastIndexOf("/") + 1);
  const cleanedPathname = lastPathname?.split("-").join(" ");
  const { getallauthore, blogLoading } = useSelector((state) => state.blog);
  return (
    <div>
      {blogLoading ? (
        <>
          <div className={styles.authorProfileDetailsSection}>
            <Skeleton
              className={styles.authorProfileProfileImg}
              baseColor="#232147"
            />
            <div style={{ display: "inline-block" }}>
              <Skeleton height={30} width={200} baseColor="#232147" />

              <div className={styles.skeletonflex}>
                {[...Array(4)].map((_, index) => (
                  <Skeleton baseColor="#232147" className={styles.icon} />
                ))}
              </div>
              <Skeleton height={20} width={400} baseColor="#232147" count={2} />
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          {getallauthore
            ?.filter((item) => {
              let isAuthorMatch =
                item?.attributes?.author_name?.includes(
                  cleanedPathname
                );
              return isAuthorMatch;
            })
            ?.slice(0, 1)
            ?.map((item) => {
              let authoreImg =
                `https://cms.findmyaitool.com` +
                item?.attributes?.author_profile?.data?.attributes?.url;
              let AuthoreName = item?.attributes?.author_name;
              let Socialmedialink = item?.attributes?.social_media;
              return (
                <div className={styles.authorProfileDetailsSection}>
                  <div className={styles.authorProfileProfileImg}>
                    <img src={authoreImg} alt="ProfileImg" />
                  </div>
                  <div className={styles.authorProfileDetailsAlignment}>
                    <h1>{AuthoreName}</h1>
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
                          {link?.social_media_name === "Twitter" && <Twitter />}
                          {link?.social_media_name === "Facebook" && (
                            <Facebook />
                          )}
                        </a>
                      ))}
                    </div>
                    <p>
                      If you are looking for an innovative tool to assist with
                      software engineering tasks, then Devin.ai might be just
                      what you need. Devin is an AI software engineer created by
                      Cognition, a company dedicated to enhancing human
                      engineers' work rather than replacing them.
                    </p>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
}
