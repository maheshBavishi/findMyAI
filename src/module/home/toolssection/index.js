"use client";

import React, { useEffect } from "react";
import styles from "./toolssection.module.scss";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import ViewAll from "@/shared/components/viewAll";
import { useDispatch, useSelector } from "react-redux";
import {
  getAiToolsCategory,
  setScrollCategory,
} from "@/store/ApiSlice/aiToolsSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LazyLoad from "@/helpers/lazyLoad";
import Nodatashow from "@/shared/components/nodatashow";

const Nodata = "/assets/icons/no-data-vector.svg";

export default function Toolssection() {
  let duration = 100;
  const dispatch = useDispatch();
  const route = useRouter();
  const { getAiToolsCategoryData } = useSelector((state) => state.aiTools);

  useEffect(() => {
    dispatch(getAiToolsCategory({ page: 1, limit: 8 , }));
  }, []);

  const handleScrollToSection = async (id) => {
    await dispatch(setScrollCategory(id));
    route.push("/category");
  };

  return (
    <LazyLoad id={"Toolssection"}>
      <div className={styles.toolssectionAlignment}>
        <div className="container">
          <div className={styles.titleAlignment}>
            <div className={styles.title}>
              <div>
                <h2> AI Tool Categories</h2>
                <p>
                  Unlock innovation with our diverse range of cutting-edge
                  solutions{" "}
                </p>
              </div>
            </div>
            <div
              className={styles.webViewAll}
              onClick={() => handleScrollToSection(` `)}
            >
              <Link href={`/category`}>
                <ViewAll />
              </Link>
            </div>
          </div>
          <div>
            <div>
              {getAiToolsCategoryData?.length > 0 ? (
                <div className={styles.grid}>
                  {getAiToolsCategoryData?.map((category, i) => {
                    return (
                      <div
                        className={styles.newGridItem}
                        onClick={() => handleScrollToSection(category?.name?.toLowerCase())}
                      >
                        <div className={styles.boxTopIconBox}>
                          <img
                            loading="lazy"
                            src={category?.icon}
                            alt="category icon "
                            />
                        </div>
                        <h3>{category?.name}</h3>
                        <p>{category?.description}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>
                <Nodatashow/>
                </>
              )}
            </div>
          </div>

          <div className={styles.mobileViewAll}>
            <Link href="/category">
              <ViewAll />
            </Link>
          </div>
        </div>
      </div>
    </LazyLoad>
  );
}
