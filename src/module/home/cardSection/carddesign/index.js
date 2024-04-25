"use client";
import React, { useEffect } from "react";
import styles from "./carddesign.module.scss";
import CommonImage from "@/helpers/CommonImage";
import classNames from "classnames";
import Skeleton from "react-loading-skeleton";
const CardImage = "/assets/images/card-image.png";
const ProfileIcon = "/assets/icons/profile.svg";
import "react-loading-skeleton/dist/skeleton.css";
import LazyImage from "@/helpers/lazyImage";
import { useDispatch } from "react-redux";

import Link from "next/link";
import { setCategoryDetails } from "@/store/ApiSlice/aiToolsSlice";
const AiLogo = "/assets/logo/logo-5.png";

export default function Carddesign({
  name,
  description,
  icon,
  images,
  handleViewDetails,
  isFeatured,
  isSelected,
  loading,
  item,
}) {
  const dispatch = useDispatch();
  return (
    <div onClick={ ()=>{
       dispatch(setCategoryDetails({}));

    }}>
<Link href={item?.slugId ? `/tool/${item.slugId}` : "#"}>
        <div
          className={classNames(
            styles.homeCardDesign,
            isSelected && styles.activeHomeCard,
            styles.homeCardDesign
          )}
          onClick={handleViewDetails}
        >
          <div className={styles.cardImage} style={{ cursor: "pointer" }}>
            <div className={styles.cardMainImage}>
              <LazyImage
                image={{
                  src: images,
                  alt: "CardImage",
                }}
                className={styles.cardImageChild}
              />
            </div>
            {item?.isFeatured === true && (
              <div className={styles.featured}>
                <button aria-label="Sponsored">Sponsored </button>
              </div>
            )}
          </div>

          <>
            <div className={styles.details} style={{ cursor: "pointer" }}>
              <LazyImage
                image={{
                  src: item?.icon || icon,
                  alt: "CardImage",
                }}
                className={styles.cardImageChild}
              />

              <div className={styles.skeletonUi}>
                {loading ? (
                  <Skeleton className={styles.firsttext} baseColor="#232147" />
                ) : (
                  <p style={{ color: "white" }}>{name}</p>
                )}
                {loading ? (
                  <Skeleton
                    height={15}
                    width={"100%"}
                    borderRadius={10}
                    baseColor="#232147"
                  />
                ) : (
                  <span>{item?.subcategoryName}</span>
                )}
              </div>
            </div>
          </>
          {/* )} */}
        </div>
      </Link>
    </div>
  );
}
