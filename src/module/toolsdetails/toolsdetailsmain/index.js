"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddBookMark, getBookMark } from "@/store/ApiSlice/bookmarkSlice";
import toast, { useToasterStore } from "react-hot-toast";
import {
  getAiTools,
  setcategoryToolsDetails,
} from "@/store/ApiSlice/aiToolsSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const CategoriesinformationImg = "/assets/images/categoriesinformation-img.png";
const FreeIcon = "/assets/images/Frame.png";
const LockIcon = "/assets/icons/lock.svg";
const VisitIcon = "/assets/icons/Visit.svg";
const DealIcon = "/assets/images/Frame (4).png";
const AddBookMarkIcon = "/assets/images/bookmark.svg";
const RemoveBookmarkIcon = "/assets/images/addbookmark.svg";
const PaidIcon = "/assets/images/paid.png";
const FreeTrialIcon = "/assets/images/Frame (1).png";
const WaitlistIcon = "/assets/images/email.png";
const MobileIcon = "/assets/images/mobile.png";
const APIIcon = "/assets/images/api.png";
const OpenSourceIcon = "/assets/images/opensource.png";
const DiscordIcon = "/assets/images/Frame (8).png";
const BrowserIcon = "/assets/icons/Browser.svg";
const ContactforpriceingIcon = "/assets/images/Frame (2).png";
import styles from "./toolsdetailsmain.module.scss";
import Facebook from "@/assets/icons/facebook";
import Instragram from "@/assets/icons/instragram";
import Linkdin from "@/assets/icons/linkdin";
import Twitter from "@/assets/icons/twitter";
import BookMarkNew from "@/assets/icons/bookmarkNew";
import DiscountIcon from "@/assets/icons/discountIcon";
import LazyLoad from "@/helpers/lazyLoad";
import LazyImage from "@/helpers/lazyImage";
import { getSession } from "@/helpers/authHelper";
const BookMarkImg = "/assets/images/blog-image.png";
const RoundedCheckIcon = "/assets/icons/rounded-check.svg";
const ButtonRightArrow = "/assets/icons/top-right-arrow.svg";
export default function ToolsDetailsMain({ categoryToolsDetails }) {
  const { categoryDetails, loading, categoryLoader } = useSelector(
    (state) => state.aiTools
  );
  const { getBookMarkData, BookMarkLoading, BookMarkCount } = useSelector(
    (state) => state.bookmark
  );
  // const { tokendata } = useSelector((state) => state.auth);
  const tokendata = getSession()?.access_token;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const dispatch = useDispatch();

  let toastCount = 0;
  const handleOnAddBookMark = async () => {
    if (!tokendata) {
      toast.error("Please login to save to bookmark");
    } else {
      const body = {
        aiToolId: categoryToolsDetails?.item?._id,
      };

      try {
        await dispatch(AddBookMark(body))
          .unwrap()
          .then((res) => {
            if (res?.success === true) {
              getBookMarkApi();
              if (isBookmarked) {
                toast("Removed from bookmarks", {
                  icon: "🛈",
                });
              } else {
                toast.success("Added to bookmarks");
              }
            }
          });
      } catch (err) {
        console.error("Error adding bookmark:", err);
      }
    }
  };

  const getBookMarkApi = async () => {
    dispatch(
      getBookMark({ aiToolId: categoryToolsDetails?.item?._id, type: `aiTool` })
    );
  };

  useEffect(() => {
    if (tokendata) {
      getBookMarkApi();
    }
  }, [categoryToolsDetails]);

  useEffect(() => {
    const isItemBookmarked = getBookMarkData?.find((item) => {
      return item.aiToolId?._id === categoryToolsDetails?.item?._id;
    });
    setIsBookmarked(!!isItemBookmarked);
  }, [getBookMarkData]);

  const pricing = categoryToolsDetails?.item?.pricing;
  const features = categoryToolsDetails?.item?.features;
  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 1;

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((item, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <div className={styles.toolsDetailsMainSection}>
      <div className={styles.toolsDetailsHeaderFlex}>
        <div className={styles.toolsDetailsLeftSide}>
          {loading ? (
            <Skeleton baseColor="#232147" className={styles.toolsDetailsImg} />
          ) : (
            <>
              {categoryToolsDetails?.item?.icon && (
                <div className={styles.toolsDetailsImg}>
                  <LazyImage
                    image={{
                      src: categoryToolsDetails?.item?.icon,
                      alt: `icon`,
                    }}
                    className={styles.lazyImgAlignmnt}
                  />
                  {/* <img src={categoryToolsDetails?.item?.icon} alt="BookMarkImg" /> */}
                </div>
              )}
            </>
          )}

          <div className={styles.toolsDetailsNameAlignment}>
            {loading ? (
              <div className={styles.skeletonUi}>
                <Skeleton className={styles.first} baseColor="#232147" />
                <Skeleton className={styles.second} baseColor="#232147" />
              </div>
            ) : (
              <>
                {" "}
                <h1>{categoryToolsDetails?.item?.title}</h1>
                <span>
                  {categoryToolsDetails?.item?.aiToolSubCategory?.[0]?.name}
                </span>
              </>
            )}
            {loading ? (
              <>
                <div className={styles.skeletonflex}>
                  {[...Array(3)].map((_, index) => (
                    <Skeleton
                      baseColor="#232147"
                      height={30}
                      width={150}
                      count={1}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div>
                  {categoryToolsDetails?.item?.pricing && (
                    <div>
                      {pricing && (
                        <div className={styles.freeFlexAlignment}>
                          {pricing.map((pricing, index) => (
                            <div className={styles.freeBox}>
                              <div className={styles.checkIcon}>
                                <img
                                  src={
                                    pricing === "Free Trial"
                                      ? FreeTrialIcon
                                      : pricing === "Paid"
                                      ? PaidIcon
                                      : pricing === "Deals"
                                      ? DealIcon
                                      : pricing === "Freemium"
                                      ? LockIcon
                                      : pricing === "Free"
                                      ? FreeIcon
                                      : ContactforpriceingIcon
                                  }
                                  alt={`${pricing} Icon`}
                                />
                              </div>
                              <p> {pricing} </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.toolsDetailsRightSide}>
          <div className={styles.socialIconAlignment}>
            {categoryToolsDetails?.item?.facebookChannelLink && (
              <>
                <a
                  href={categoryToolsDetails?.item?.facebookChannelLink}
                  target="_blank"
                >
                  <Facebook />
                </a>
              </>
            )}
            {categoryToolsDetails?.item?.instagramChannelLink && (
              <>
                <a
                  href={categoryToolsDetails?.item?.instagramChannelLink}
                  target="_blank"
                >
                  <Instragram />
                </a>
              </>
            )}
            {categoryToolsDetails?.item?.linkedInChannelLink && (
              <>
                <a
                  href={categoryToolsDetails?.item?.linkedInChannelLink}
                  target="_blank"
                >
                  <Linkdin />
                </a>
              </>
            )}
            {categoryToolsDetails?.item?.twitterChannelLink && (
              <a
                href={categoryToolsDetails?.item?.twitterChannelLink}
                target="_blank"
              >
                <Twitter />
              </a>
            )}
          </div>
          {categoryToolsDetails?.item?.planDeals && (
            <div>
              <p>Starting at just {categoryToolsDetails?.item?.planDeals}</p>
            </div>
          )}
          <div className={styles.toolsDetailsButtonAlignment}>
            {loading ? (
              <div>
                <Skeleton
                  baseColor="#232147"
                  width={180}
                  height={48}
                  borderRadius={10}
                />
              </div>
            ) : (
              <>
                {categoryToolsDetails?.item?.websiteLink && (
                  <div className={styles.exportButton}>
                    {" "}
                    <a
                      href={
                        categoryToolsDetails?.item?.websiteLink
                          ? categoryToolsDetails?.item?.websiteLink
                          : ""
                      }
                      target="_blank"
                      rel="nofollow"
                    >
                      <button aria-label="Explore Website">
                        Explore Website{" "}
                        <img src={ButtonRightArrow} alt="ButtonRightArrow" />
                      </button>
                    </a>
                  </div>
                )}
              </>
            )}
            {loading || BookMarkLoading ? (
              <div>
                <Skeleton
                  baseColor="#232147"
                  width={180}
                  height={48}
                  borderRadius={10}
                />
              </div>
            ) : (
              <>
                <div
                  className={styles.bookMarkbutton}
                  onClick={() => handleOnAddBookMark()}
                >
                  <img
                    loading="lazy"
                    src={isBookmarked ? RemoveBookmarkIcon : AddBookMarkIcon}
                    alt="BookmarkIcon"
                    onClick={handleOnAddBookMark}
                  />
                  <div className={styles.bookMarkIcon}>
                    <p>{BookMarkCount ?? 0}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {categoryToolsDetails?.item?.couponDeals && (
        <div className={styles.toolsDiscountAlignment}>
          <div className={styles.toolsDiscountBox}>
            <DiscountIcon />
            <p> {categoryToolsDetails?.item?.couponDeals}</p>
          </div>
        </div>
      )}
    </div>
  );
}
