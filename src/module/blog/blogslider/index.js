"use client";
import React, { useEffect, useState } from "react";
import styles from "./blogslider.module.scss";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { getArticle } from "@/store/ApiSlice/articleSlice";
import { getBlog } from "@/store/ApiSlice/blogSlice";
import Skeleton from "react-loading-skeleton";
import LazyImage from "@/helpers/lazyImage";
import { useRouter } from "next/router";

export default function Blogslider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { getpaginationBlog, blogLoading } = useSelector((state) => state.blog);
  const { getpaginationArticle, ArticleLoading } = useSelector((state) => state.article);
  const [blogData, setBlogData] = useState([]);
  const [articleData, setArticleData] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();
  let data = router?.pathname?.includes("/article") ? articleData : blogData;

  useEffect(() => {
    router?.pathname.includes("/article")
      ? dispatch(getArticle({}))
        .then((res) => {
          setArticleData(res?.payload?.articles?.data);
        })
        .catch((error) => { })
      : dispatch(getBlog({}))
        .then((res) => {
          setBlogData(res?.payload?.blogs?.data);
        })
        .catch((error) => { });
  }, []);

  return (
    <div className={styles.blogsliderAlignment}>
      <div className="container">
        {
          <>
            {" "}
            {data?.length >= 2 ? (
              <Slider {...settings}>
                {data?.map((item, index) => {
                  let blogCoverImg = `https://cms.findmyaitool.com` + item?.attributes?.coverImage?.data?.attributes?.url;
                  return (
                    <div className={styles.sliderBox} key={index}>
                      <div className={styles.image}>
                        <LazyImage
                          image={{
                            src: blogCoverImg,
                            alt: `BlogImage`,
                          }}
                          className={styles.cardImageChild}
                        />
                      </div>
                      {/* <img src={blogCoverImg} alt={`Blog ${index + 1}`} /> */}
                    </div>
                  );
                })}
              </Slider>
            ) : (
              data?.length > 0 && (
                <div className={styles.sliderBox}>
                  {data?.map((item, index) => {
                    let blogCoverImg = `https://cms.findmyaitool.com` + item?.attributes?.coverImage?.data?.attributes?.url;
                    return (
                      <div className={styles.image}>
                        <LazyImage
                          image={{
                            src: blogCoverImg,
                            alt: `BlogImage`,
                          }}
                          className={styles.cardImageChild}
                        />
                      </div>
                    );
                  })}
                </div>
              )
            )}{" "}
          </>
        }
      </div>
    </div>
  );
}
