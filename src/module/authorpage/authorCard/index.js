import React from "react";
import styles from "./authorCard.module.scss";
import moment from "moment";
const CardDemoImg = "/assets/images/author-img.png";
const CalenderIcon = "/assets/icons/calender-icon.svg";
const ProfileImg = "/assets/images/profile-image.svg";
const RightToTop = "/assets/icons/top-right-arrow-2.svg";
const AiLogo = "/assets/logo/logo-5.png";
import Skeleton from "react-loading-skeleton";
import LazyImage from "@/helpers/lazyImage";
import Link from "next/link";

export default function AuthorCard({ item, loading }) {
  let authoreImg = `https://cms.findmyaitool.com` + item?.attributes?.author?.add_author?.data?.attributes?.author_profile?.data?.attributes?.url;
  let blogImg = `https://cms.findmyaitool.com` + item?.attributes.coverImage.data.attributes.url;
  let AuthoreName = item?.attributes?.author?.add_author?.data?.attributes?.author_name;
  const slug = item?.attributes?.slug;

  return (
    <div className={styles.authorCardSection}>
      <Link href={slug ? `/blog/${slug}` : "#"}>
        {loading ? (
          <>
            <Skeleton baseColor="#cccccc29" className={styles.cardImgAlignment} />
          </>
        ) : (
          <>
            <div className={styles.cardImgAlignment}>
              {/* <img src={blogImg ?? AiLogo} alt="CardDemoImg" /> */}

              <LazyImage
                image={{
                  src: blogImg,
                  alt: `blogImg`,
                }}
                className={styles.cardImageChild}
              />
            </div>
          </>
        )}

        <div className={styles.authorCardBottomAlignment}>
          <div>
            <div className={styles.bottomTopALignment}>
              <div className={styles.leftSideFlexAlignment}>
                {loading ? (
                  <>
                    <Skeleton baseColor="#cccccc29" className={styles.skeletonDate} />
                  </>
                ) : (
                  <>
                    <div className={styles.leftSideBoxAlignment}>
                      <span>{item?.attributes?.blog_categories?.data[0]?.attributes?.title}</span>
                    </div>
                  </>
                )}
              </div>
              <p> </p>
              {loading ? (
                <>
                  <Skeleton baseColor="#cccccc29" className={styles.skeletonDate} />
                </>
              ) : (
                <>
                  <div className={styles.dateAlignment}>
                    <img src={CalenderIcon} alt="CalenderIcon" />
                    <span> {moment(item?.attributes?.createdAt).format("MMM DD YYYY")}</span>
                  </div>
                </>
              )}
            </div>
            {loading ? (
              <>
                <Skeleton baseColor="#cccccc29" className={styles.skeletonPlayer} />
              </>
            ) : (
              <>
                <h6>{item?.attributes?.title}</h6>
              </>
            )}
          </div>
        </div>
      </Link>
      <div className={styles.authorBottomProfileDetails}>
        <div className={styles.leftSideAlignment}>
          {loading ? (
            <>
              <Skeleton baseColor="#cccccc29" className={styles.skeletonAuthorProfile} />
            </>
          ) : (
            <>
              <div className={styles.authorProfile}>
                {/* <img src={authoreImg ?? AiLogo} alt="ProfileImg" /> */}

                <LazyImage
                  image={{
                    src: authoreImg,
                    alt: `authoreImg`,
                  }}
                  className={styles.cardImageChild}
                />
              </div>
            </>
          )}
          {loading ? (
            <>
              <Skeleton baseColor="#cccccc29" className={styles.skeletonAuthorNameAlignment} />
            </>
          ) : (
            <>
              <div className={styles.profileNameAlignment}>
                <a href={`/authors-list`}>
                  <p>{AuthoreName}</p>
                </a>
              </div>
            </>
          )}
        </div>
        {loading ? (
          <>
            <Skeleton baseColor="#cccccc29" className={styles.skeletonReadMore} />
          </>
        ) : (
          <>
            <div className={styles.rightSideAlignment}>
              <a href={`/blog/${slug}`}>
                Read More <img src={RightToTop} alt="RightToTop" />
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
