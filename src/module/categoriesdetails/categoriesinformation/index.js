"use client";
import React, { useEffect, useState } from "react";
import styles from "./categoriesinformation.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AddBookMark, getBookMark } from "@/store/ApiSlice/bookmarkSlice";
import toast, { useToasterStore } from "react-hot-toast";
import { getAiTools, setCategoryDetails } from "@/store/ApiSlice/aiToolsSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getSession } from "@/helpers/authHelper";
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

export default function Categoriesinformation() {
  const { categoryDetails, loading } = useSelector((state) => state.aiTools);
  const { getBookMarkData } = useSelector((state) => state.bookmark);
  // const { tokendata } = useSelector((state) => state.auth);
  const tokendata = getSession()?.access_token;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const dispatch = useDispatch();

  const handleOnGetData = () => {
    dispatch(getAiTools({ search: categoryDetails?.item?.title }))
      .then((results) => {
        const fetchedItem = results?.payload?.payload?.aiTool?.[0];
        dispatch(
          setCategoryDetails({
            item: fetchedItem,
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching AI tools:", error);
      });
  };
  let toastCount = 0;
  const handleOnAddBookMark = async () => {
    if (!tokendata) {
      if (toastCount < 3) {
        toast.error("Please login to save to bookmark");
        toastCount++;
      }
    } else {
      const body = {
        aiToolId: categoryDetails?.item?._id,
      };

      try {
        await dispatch(AddBookMark(body))
          .unwrap()
          .then((res) => {
            if (res?.success === true) {
              getBookMarkApi();
              handleOnGetData();

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
    dispatch(getBookMark({}));
  };

  useEffect(() => {
    if (tokendata) {
      getBookMarkApi();
    }
  }, []);

  useEffect(() => {
    const isItemBookmarked = getBookMarkData?.find((item) => {
      return item.aiToolId?._id === categoryDetails?.item?._id;
    });
    setIsBookmarked(!!isItemBookmarked);
  }, [getBookMarkData]);
  const pricing = categoryDetails?.item?.pricing;
  const features = categoryDetails?.item?.features;

  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 3;

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((item, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <div className={styles.categoriesinformationAlignment}>
      <div className="container">
        <div className={styles.grid}>
          {/* <AnimatedSection animationType="fade-up" duration={600} delay={450}> */}
          <div className={styles.griditems}>
            <div className={styles.image}>
              <img
                loading="lazy"
                src={
                  categoryDetails?.item?.images?.[0]
                    ? categoryDetails?.item?.images?.[0]
                    : CategoriesinformationImg
                }
                alt="CategoriesinformationImg"
              />
            </div>
          </div>
          {/* </AnimatedSection> */}
          {/* <AnimatedSection animationType="fade-up" duration={600} delay={500}> */}
          <div className={styles.griditems}>
            <div className={styles.profile}>
              <img
                loading="lazy"
                src={categoryDetails?.item?.icon}
                alt="ProfileIcon"
              />
              <div>
                <p>{categoryDetails?.item?.title}</p>
                <span>{categoryDetails?.item?.aiToolSubCategoryId?.name}</span>
              </div>
            </div>
            <div className={styles.textStyle}>
              <p>{categoryDetails?.item?.description}</p>
            </div>

            {categoryDetails?.item?.couponDeals && (
              <div>
                <div className={styles.deal}>
                  <img loading="lazy" src={DealIcon} alt="deal icon" />
                  <p> {categoryDetails?.item?.couponDeals}</p>
                </div>
              </div>
            )}
            {categoryDetails?.item?.pricing && (
              <div>
                {pricing && (
                  <div className={styles.twoContentAlignment}>
                    {pricing.map((pricing, index) => (
                      <button
                        key={index}
                        className={styles.active}
                        aria-label="pricing"
                      >
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
                        {pricing}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            {categoryDetails?.item?.features && (
              <div>
                {features && (
                  <div className={styles.twoContentAlignment}>
                    {features.map((feature, index) => (
                      <button key={index} aria-label="feature">
                        <img
                          src={
                            feature === "Waitlist"
                              ? WaitlistIcon
                              : feature === "Mobile App"
                              ? MobileIcon
                              : feature === "API"
                              ? APIIcon
                              : feature === "Discord Community"
                              ? DiscordIcon
                              : feature === "Open Source"
                              ? OpenSourceIcon
                              : BrowserIcon
                          }
                          alt={`${feature} Icon`}
                        />
                        {feature}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div>
              {categoryDetails?.item?.planDeals && (
                <div>
                  <p style={{ color: "white", marginBottom: "5px" }}>
                    Starting at just {categoryDetails?.item?.planDeals}
                  </p>
                </div>
              )}
            </div>
            <div className={styles.buttongrid}>
              <a
                href={
                  categoryDetails?.item?.websiteLink
                    ? categoryDetails?.item?.websiteLink
                    : ""
                }
                target="_blank"
              >
                <button className={styles.activeButton} aria-label="Visit">
                  <img loading="lazy" src={VisitIcon} alt="VisitIcon" />
                  Visit
                </button>
              </a>
              {loading ? (
                <Skeleton height={40} baseColor="#232147" />
              ) : (
                <button
                  onClick={() => handleOnAddBookMark()}
                  aria-label="Bookmark"
                >
                  <img
                    loading="lazy"
                    src={isBookmarked ? RemoveBookmarkIcon : AddBookMarkIcon}
                    alt="BookmarkIcon"
                  />
                  {categoryDetails?.item?.bookmarkCount}
                </button>
              )}
            </div>
          </div>
          {/* </AnimatedSection> */}
        </div>
      </div>
    </div>
  );
}
