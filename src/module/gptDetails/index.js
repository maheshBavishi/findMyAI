"use client";
import React, { useEffect } from "react";
import styles from "./gptDetails.module.scss";
import FeaturesFunctions from "./featuresFunctions";
import { usePathname, useRouter } from "next/navigation";
import { GetGpt, setGptDetails } from "@/store/ApiSlice/gptSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useState } from "react";
import ShareModal from "./shareModal";
import { AsyncPaginate } from "react-select-async-paginate";
import { AddBookMark, getBookMark } from "@/store/ApiSlice/bookmarkSlice";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
const RightIcon = "/assets/icons/breadcrumbs -right.svg";
const SearchIon = "/assets/icons/search-icon.svg";
const EarthIcon = "/assets/icons/earth-icon.svg";
const ShareIcon = "/assets/icons/share-icon.svg";
const ButtonRightArrow = "/assets/icons/top-right-arrow.svg";
const RangeIcon = "/assets/icons/range-icon-white.svg";
const AddBookMarkIcon = "/assets/images/bookmark.svg";
const RemoveBookmarkIcon = "/assets/images/addbookmark.svg";
import "react-loading-skeleton/dist/skeleton.css";
import LazyImage from "@/helpers/lazyImage";
import Nodatashow from "@/shared/components/nodatashow";
import LazyLoad from "@/helpers/lazyLoad";
import GptMetaTag from "./gptMetaData";
import SubcategoryGpt from "../gptCategory/subcategoryGpt";
import ReleatedcategoryGpts from "./SubcategoryGpt";
import { getSession } from "@/helpers/authHelper";
const GptIcon = "/assets/icons/gpt-icon.svg";
export default function GptDetails() {
  const pathname = usePathname();
  const [searchTools, setSearchTools] = useState({});
  const lastPathname = pathname.substring(pathname.lastIndexOf("/") + 1);
  const [shareModal, setShareModal] = useState(false);
  const [gptLoading, setLodar] = useState(false);
  // const { tokendata } = useSelector((state) => state.auth);
  const tokendata = getSession()?.access_token;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [gptDetails, setGptDetails] = useState({});
  const { getBookMarkData, BookMarkCount, BookMarkLoading } = useSelector(
    (state) => state.bookmark
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const [relatedGptLoader, setRelatedGptLoader] = useState(false);

  const handleGetData = () => {
    setLodar(true);
    setRelatedGptLoader(true);
    dispatch(
      GetGpt({
        search: lastPathname,
        selectedData: "false",
      })
    )
      .unwrap()
      .then((res) => {
        setGptDetails(res?.payload?.app?.[0]);
        setLodar(false);
        if (gptDetails?.category?.[0]?.name) {
          setRelatedGptLoader(true);
        } else {
          setRelatedGptLoader(false);
        }
      })
      .catch((err) => {
        setLodar(false);
        setRelatedGptLoader(false);
      });
  };
  useEffect(() => {
    handleGetData();
  }, [searchTools]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "5px",
      border: "none",
      color: "#fff",
      width: ` 100%`,
      height: ` 55px`,
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    }),
    option: (provided, state) => ({
      ...provided,
      border: "none",
      backgroundColor: state.isFocused
        ? "rgba(255, 255, 255, 0.08)"
        : "#252438",
      color: state.isFocused ? "#fff" : "#fff",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "white",
      paddingLeft: "50px", // Change the color of the placeholder here
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "#252438",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "white",
      paddingLeft: "50px",
    }),
    input: (provided, state) => ({
      ...provided,
      color: "white",
      paddingLeft: "50px",
    }),
  };
  async function loadOptions(search, loadedOptions, { page }) {
    const response = await fetch(
      `https://api.findmyaitool.com/api/v1/app/get-app?search=${search}&status=approved&page=${page}`
    );
    const responseJSON = await response.json();
    const data = responseJSON?.payload?.app?.map((item) => {
      return {
        value: item._id,
        label: item.projectName,
        slugId: item.slugId,
      };
    });
    return {
      options: data,
      hasMore: !search && data?.length > 0 ? true : false,
      additional: {
        page: page + 1,
      },
    };
  }
  const handleOnChangeCategory = (e) => {
    setSearchTools({ ...searchTools, seachvalue: e, searchid: e?.value });

    if (e?.slugId) {
      router.push(`/gpt-store/${e?.slugId}`);
    }
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
        appId: gptDetails?._id,
      };

      try {
        await dispatch(AddBookMark(body))
          .unwrap()
          .then((res) => {
            if (res?.success === true) {
              getBookMarkApi({ appId: gptDetails?._id });

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
    dispatch(getBookMark({ appId: gptDetails?._id ,type: `app` }));
  };

  useEffect(() => {
    if (tokendata) {
      getBookMarkApi();
    }
  }, []);

  useEffect(() => {
    const isItemBookmarked = getBookMarkData?.find((item) => {
      return item.appId?._id === gptDetails?._id;
    });
    setIsBookmarked(!!isItemBookmarked);
  }, [getBookMarkData]);

  return (
    <LazyLoad id={"GptDetails"}>
      {!gptLoading && gptDetails === undefined ? (
        <>
          <Nodatashow />
        </>
      ) : (
        <>
          {!gptLoading && gptDetails !== undefined && (
            <GptMetaTag gptDetails={gptDetails} />
          )}
          <div className={styles.gptDetailsSection}>
            <div className="container">
              <div className={styles.gptDetailsTopBar}>
                {gptLoading ? (
                  <>
                    <div className={styles.skeletonUi}>
                      <Skeleton
                        className={styles.breadcrumbSkeleton}
                        width={100}
                        baseColor="#232147"
                      />
                      <img loading="lazy" src={RightIcon} alt="RightIcon" />
                      <Skeleton
                        className={styles.breadcrumbSkeleton}
                        width={100}
                        baseColor="#232147"
                      />
                      <img loading="lazy" src={RightIcon} alt="RightIcon" />
                      <Skeleton
                        className={styles.breadcrumbSkeleton}
                        width={100}
                        baseColor="#232147"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div className={styles.topBarLeft}>
                      <Link href="/gpt-store">
                        <p className={styles.breadcrumbName}>
                          GPT Store{" "}
                          <img loading="lazy" src={RightIcon} alt="RightIcon" />
                        </p>
                      </Link>
                      {gptDetails?.categoryId && (
                        <Link
                          href={`/gpt-category/${gptDetails?.category?.[0]?.slugId}`}
                        >
                          <p className={styles.breadcrumbName}>
                            {gptDetails?.category?.[0]?.name}
                            <img
                              loading="lazy"
                              src={RightIcon}
                              alt="RightIcon"
                            />
                          </p>
                        </Link>
                      )}
                      <a className={styles.breadcrumbName}>
                        {gptDetails?.projectName}
                      </a>
                    </div>
                  </>
                )}
                {gptLoading ? (
                  <>
                    <Skeleton
                      className={styles.gptSearchAlignment}
                      baseColor="#232147"
                    />
                  </>
                ) : (
                  <>
                    <div className={styles.gptSearchAlignment}>
                      <AsyncPaginate
                        name="seachvalue"
                        className="dropdown-input"
                        value={searchTools?.seachvalue}
                        loadOptions={loadOptions}
                        onChange={handleOnChangeCategory}
                        additional={{
                          page: 1,
                        }}
                        placeholder="Search Public GPTs Here...."
                        styles={customStyles}
                      />

                      <div className={styles.searchIon}>
                        <img loading="lazy" src={SearchIon} alt="SearchIon" />
                      </div>
                    </div>{" "}
                  </>
                )}
              </div>

              <div className={styles.gptDetailsHeaderAlignment}>
                <div className={styles.gptDetailsHeaderFlex}>
                  <div className={styles.gptProfileAlignment}>
                    {gptLoading ? (
                      <>
                        <Skeleton
                          className={styles.gptProfileImg}
                          width={100}
                          baseColor="#232147"
                        />
                      </>
                    ) : (
                      <>
                        <div>
                          <div className={styles.gptProfileImg}>
                            <LazyImage
                              image={{
                                src: gptDetails?.icon,
                                alt: "GptImg",
                              }}
                              className={styles.cardImageChild}
                            />
                            {/* </div> */}
                            <div className={styles.gptIconAlignment}>
                              <img src={GptIcon} alt="GptIcon" />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {gptLoading ? (
                      <>
                        <div className={styles.skeletonUi}>
                          <Skeleton
                            className={styles.first}
                            baseColor="#232147"
                          />
                          <Skeleton
                            className={styles.second}
                            baseColor="#232147"
                          />
                          <Skeleton
                            className={styles.third}
                            baseColor="#232147"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={styles.gptProfileDetailsAlignment}>
                          <h1>{gptDetails?.projectName}</h1>
                          <span>{gptDetails?.category?.[0]?.name}</span>

                          <div className={styles.authorDetailsAlignment}>
                            <div className={styles.leftSideAlignment}>
                              <img
                                loading="lazy"
                                src={RangeIcon}
                                alt="RangeIcon"
                              />
                              <p> {gptDetails?.conversationCounts}</p>
                            </div>
                            <p>@{gptDetails?.authorName}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className={styles.gptRightSideAlignment}>
                    <div className={styles.topOptionAlignment}>
                      {/* <div className={styles.optionIcon}>
                        <a href={gptDetails?.websiteLink} target="_blank">
                          <img loading="lazy" src={EarthIcon} alt="EarthIcon" />
                        </a>
                      </div> */}

                      <div
                        className={styles.optionIcon}
                        onClick={() => setShareModal(true)}
                      >
                        <img loading="lazy" src={ShareIcon} alt="ShareIcon" />
                      </div>
                    </div>
                    <div className={styles.topBottomFlexAlignment}>
                      <div className={styles.topOptionButton}>
                        {gptLoading ? (
                          <>
                            <Skeleton
                              baseColor="#232147"
                              className={styles.bookMarkSkeleton}
                            />
                          </>
                        ) : (
                          <a href={gptDetails?.websiteLink} target="_blank">
                            <button>
                              Try GPT{" "}
                              <img
                                src={ButtonRightArrow}
                                alt="ButtonRightArrow"
                              />
                            </button>{" "}
                          </a>
                        )}
                      </div>
                      {BookMarkLoading ? (
                        <>
                          <Skeleton
                            className={styles.bookMarkSkeleton}
                            baseColor="#232147"
                          />
                        </>
                      ) : (
                        <div
                          className={styles.bookMarkbutton}
                          onClick={() => handleOnAddBookMark()}
                        >
                          {/* <div className={styles.bookMarkIcon}> */}
                          {/* <BookMarkNew /> */}
                          <img
                            src={
                              isBookmarked
                                ? RemoveBookmarkIcon
                                : AddBookMarkIcon
                            }
                            alt="BookmarkIcon"
                          />
                          {/* </div> */}
                          <p>{BookMarkCount ? BookMarkCount : 0}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.gptListAlignment}>
                  {gptLoading ? (
                    <>
                      <Skeleton
                        className={styles.gptListAlignment}
                        baseColor="#232147"
                      />
                    </>
                  ) : (
                    <>
                      <p>{gptDetails?.description}</p>
                    </>
                  )}
                </div>
              </div>

              <FeaturesFunctions gptDetails={gptDetails} />
              <ReleatedcategoryGpts
                gptDetails={gptDetails}
                setRelatedGptLoader={setRelatedGptLoader}
                relatedGptLoader={relatedGptLoader}
              />
            </div>
          </div>
        </>
      )}

      {shareModal && (
        <ShareModal setShareModal={setShareModal} shareModal={shareModal} />
      )}
    </LazyLoad>
  );
}
