"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./submitAIToolForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addAiTool } from "@/store/ApiSlice/aiToolsSlice";
import { useRouter, useSearchParams } from "next/navigation";
import classNames from "classnames";
import Slider from "react-slick";
import toast from "react-hot-toast";
import useOnClickOutside from "@/hook/useOnClickOutside";
import "suneditor/dist/css/suneditor.min.css";

import { AsyncPaginate } from "react-select-async-paginate";
import SunEditor from "suneditor-react";
import LazyLoad from "@/helpers/lazyLoad";
import Error from "next/error";
import { AuthCodeValidation } from "@/store/ApiSlice/restAllSlice";
import { getSession } from "@/helpers/authHelper";
import Nodatashow from "@/shared/components/nodatashow";
const FreeIcon = "/assets/images/Frame.png";
const FreeTrialIcon = "/assets/images/Frame (1).png";
const ContactforpricingIcon = "/assets/images/Frame (2).png";
const Freemium = "/assets/images/Frame (3).png";
const DealIcon = "/assets/images/Frame (4).png";
const PaidIcon = "/assets/images/paid.png";
const LeftArrow = "/assets/icons/slider-left.svg";
const WaitlistIcon = "/assets/images/email.png";
const MobileIcon = "/assets/images/mobile.png";
const APIIcon = "/assets/images/api.png";
const OpenSourceIcon = "/assets/images/opensource.png";
const DiscordIcon = "/assets/images/Frame (8).png";
const BrowserIcon = "/assets/icons/Browser.svg";
const UploadIcon = "/assets/icons/upload-icon.svg";
const CloseIcon = "/assets/icons/close-icon.svg";
const FeaturesDataArray = [
  { name: "Waitlist", value: "waitlist", img: WaitlistIcon },
  { name: "Open Source", value: "waitlist", img: OpenSourceIcon },
  { name: "Mobile App", value: "waitlist", img: MobileIcon },
  { name: "API", value: "waitlist", img: APIIcon },
  { name: "Discord Community", value: "waitlist", img: DiscordIcon },
  { name: "Browser Extension", value: "waitlist", img: BrowserIcon },
];
const PricingDataArray = [
  { name: "Free", value: "waitlist", img: FreeIcon, type: "single" },
  { name: "Freemium", value: "waitlist", img: Freemium, type: "single" },
  { name: "Paid", value: "waitlist", img: PaidIcon, type: "single" },
  { name: "Free Trial", value: "waitlist", img: FreeTrialIcon, type: "single" },
  {
    name: "Contact for Pricing",
    value: "waitlist",

    img: ContactforpricingIcon,
    type: "single",
  },
  { name: "Deals", value: "waitlist", img: DealIcon, type: "single" },
];

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={styles.rightArrow} onClick={onClick}>
      <img loading="lazy" src={LeftArrow} alt="LeftArrow" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={styles.leftArrow} onClick={onClick}>
      <img loading="lazy" src={LeftArrow} alt="LeftArrow" />
    </div>
  );
}
export default function SubmitAiToolsForm() {
  const { aiToolSubCategory, getAiToolsCategoryData } = useSelector(
    (state) => state.aiTools
  );
  // const { tokendata } = useSelector((state) => state.auth);
  const tokendata = getSession()?.access_token;
  const [editorValues, setEditorValues] = useState({
    details: "",
    pros: "",
    cons: "",
  });

  const handleEditorChange = (content, editorId) => {
    setEditorValues((prevState) => ({
      ...prevState,
      [editorId]: content,
    }));

    // Conditionally reset errors based on editorId
    if (editorId === "details") {
      setErrors((errors) => ({ ...errors, details: "" }));
    } else if (editorId === "pros") {
      setErrors((errors) => ({ ...errors, pros: "" }));
    } else if (editorId === "cons") {
      setErrors((errors) => ({ ...errors, cons: "" }));
    }
  };

  const params = useSearchParams();
  const transactionId = params.get("authCode");
  const [aiFormData, setAiFormData] = useState({
    websiteimg: [],
    aiToolSubCategoryName: "Choose Subcategory",
    pricing: [],
  });
  const [errors, setErrors] = useState({});
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownBox, setDropdownBox] = useState(false);
  const [categorydropdownBox, setCategoryDropdownBox] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [isValidate, setValidation] = useState(true);

  const router = useRouter();
  const dispatch = useDispatch();

  const dropdownContainerRef = useRef();
  useOnClickOutside(dropdownContainerRef, () => {
    setCategoryDropdownBox(false);
  });
  const SubcategorydropdownContainerRef = useRef();
  useOnClickOutside(SubcategorydropdownContainerRef, () => {
    setDropdownBox(false);
  });
  useEffect(() => {
    const handleOnAuthCodeValidation = async () => {
      try {
        const response = await dispatch(
          AuthCodeValidation({
            type: "submit-aiTool",
            authcode: transactionId,
          })
        );
        if (response?.payload?.success) {
          setValidation(true);
        } else {
          setValidation(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setValidation(false);
      }
    };
    if (transactionId) {
      handleOnAuthCodeValidation();
    }
  }, [dispatch, transactionId]);
  const handleOnChange = (e, isIngleItem) => {
    const { name, value, checked } = e.target;

    if (name == "features") {
      let values = [
        ...(aiFormData?.features?.length > 0 ? aiFormData?.features : []),
      ];
      values = values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value];

      setAiFormData({ ...aiFormData, [name]: values });
    } else if (name === "pricing") {
      const silglePriceList = PricingDataArray.filter(
        (item) => item.type === "single"
      ).map((item2) => {
        return item2.name;
      });

      setAiFormData((preValue) => {
        let newValue = preValue.pricing;

        if (checked && isIngleItem) {
          newValue = newValue.filter((item) => !silglePriceList.includes(item));
          newValue.push(value);
        } else if (checked) {
          newValue.push(value);
        } else {
          newValue = newValue.filter((item) => item !== value);
        }

        return {
          ...preValue,
          pricing: newValue,
        };
      });
    } else if (name === "websiteimg") {
      const files = e.target.files;
      const maxSizePerImage = 7 * 1024 * 1024; // 7MB in bytes
      let updatedImages = [];

      Array.from(files).forEach((file) => {
        if (file.size <= maxSizePerImage) {
          updatedImages.push(file);
        } else {
          toast.error(`${file?.name} size more then to 7MB`);
        }
      });

      setAiFormData((prevFormData) => ({
        ...prevFormData,
        websiteimg: [...prevFormData.websiteimg, ...updatedImages],
      }));
    } else if (name === "aiToolCategoryId") {
      setAiFormData({
        ...aiFormData,
        aiToolCategoryId: value,
        aiToolSubCategoryId: {},
      });
    } else if (name === "websitelogo") {
      const file = e.target.files[0];
      const maxSize = 2 * 1024 * 1024;

      if (file) {
        if (file.size <= maxSize) {
          setAiFormData({ ...aiFormData, websitelogo: file });
          setErrors({ ...errors, [name]: "" });
          setImageErrors({
            ...imageErrors,
            [name]: " ",
          });
        } else {
          const validationErrors =
            "Website logo size should be less than or equal to 2MB.";

          setImageErrors({
            ...imageErrors,
            [name]: validationErrors,
          });
        }
      }
    } else {
      setAiFormData({ ...aiFormData, [name]: value });
    }

    setErrors({ ...errors, [name]: "" });
  };

  const handleRemoveImage = (indexToRemove) => {
    setAiFormData((prevFormData) => ({
      ...prevFormData,
      websiteimg: prevFormData.websiteimg.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 476,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  const validation = () => {
    let isFormValid = true;
    let newErrors = {};

    if (!aiFormData?.title) {
      isFormValid = false;
      newErrors.title = "Please enter title";
    }
    if (!editorValues?.details) {
      isFormValid = false;
      newErrors["details"] = "Please enter a detailed description";
    }
    if (!aiFormData?.description) {
      isFormValid = false;
      newErrors["description"] = "Please enter a short description";
    }

    // if (!editorValues?.cons) {
    //   isFormValid = false;
    //   newErrors["cons"] = "Please enter the disadvantages of your tools";
    // }
    // if (!editorValues?.pros) {
    //   isFormValid = false;
    //   newErrors["pros"] = "Please enter the advantages of your tools";
    // }
    if (aiFormData?.websiteimg?.length === 0) {
      isFormValid = false;
      newErrors["websiteimg"] = " Please add your website img";
    }
    if (!aiFormData?.websitelogo) {
      isFormValid = false;
      newErrors["websitelogo"] = " Please add your website logo";
    }

    if (
      !aiFormData?.aiToolSubCategoryId ||
      Object.keys(aiFormData?.aiToolSubCategoryId).length === 0
    ) {
      isFormValid = false;
      newErrors["aiToolSubCategoryId"] = "Please select your subcategory!";
    }

    if (!aiFormData?.websiteLink) {
      isFormValid = false;
      newErrors["websiteLink"] = " Please enter Website link";
    }
    if (!aiFormData?.pricing || aiFormData?.pricing?.length === 0) {
      isFormValid = false;
      newErrors["pricing"] = " Please select pricing";
    }
    if (!aiFormData?.features || aiFormData?.features?.length === 0) {
      isFormValid = false;
      newErrors["features"] = " Please select features";
    }
    setErrors(newErrors);
    return isFormValid;
  };

  const handleSubmit = () => {
    if (!tokendata) {
      toast.error("Please login to submit form");
    } else {
      if (validation()) {
        setLoading(true);
        let formdata = new FormData();
        Object.keys(aiFormData).forEach((key) => {
          if (key === "pricing") {
            aiFormData[key].map((item) => {
              return formdata.append("pricing[]", [item]);
            });
            // if (Array.isArray(aiFormData["pricing"])) {
            //   formdata.append("pricing", JSON.stringify(aiFormData["pricing"]));
            // }
            return;
          }
          if (key === "features") {
            aiFormData[key].map((item) => {
              return formdata.append("features[]", [item]);
            });
            // if (Array.isArray(aiFormData["features"])) {
            //   formdata.append(
            //     "features",
            //     JSON.stringify(aiFormData["features"])
            //   );
            // }
            return;
          }
        });
        formdata.append("title", aiFormData?.title);
        formdata.append("description", aiFormData?.description);
        formdata.append("details", editorValues?.details);
        // formdata.append("aiToolCategoryId", aiFormData?.aiToolCategoryId);
        formdata.append("status", "pending");

        formdata.append("aiToolSubCategoryId", aiFormData?.aiToolSubCategoryId);
        // formdata.append("pros", editorValues?.pros);
        // formdata.append("cons", editorValues?.cons);
        formdata.append("websiteLink", aiFormData?.websiteLink);
        if (transactionId) {
          formdata.append("authCode", transactionId);
        }
        if (aiFormData.couponDeals) {
          formdata.append("couponDeals", aiFormData.couponDeals);
        }
        if (aiFormData.instagramChannelLink) {
          formdata.append(
            "instagramChannelLink",
            aiFormData.instagramChannelLink
          );
        }
        if (aiFormData.linkedInChannelLink) {
          formdata.append(
            "linkedInChannelLink",
            aiFormData.linkedInChannelLink
          );
        }
        if (aiFormData.facebookChannelLink) {
          formdata.append(
            "facebookChannelLink",
            aiFormData.facebookChannelLink
          );
        }
        if (aiFormData.twitterChannelLink) {
          formdata.append("twitterChannelLink", aiFormData.twitterChannelLink);
        }
        if (aiFormData.youTubeChannelLink) {
          formdata.append("youTubeChannelLink", aiFormData.youTubeChannelLink);
        }
        if (aiFormData?.paidPlanDeals) {
          formdata.append("planDeals", aiFormData?.paidPlanDeals);
        }

        formdata.append("icon", aiFormData?.websitelogo);

        aiFormData.websiteimg.forEach((file) => {
          formdata.append("images", file);
        });

        dispatch(addAiTool({ body: formdata }))
          .then((res) => {
            if (res?.payload.result === 0) {
              toast.success("Your AI tool was successfully submitted.");
              setLoading(false);

              setAiFormData({ websiteimg: [] });
              setErrors({});
              router.push("/");
            } else {
              toast.error(res?.payload?.message);
              setLoading(false);
            }
          })
          .catch((err) => {
            setLoading(false);
          });
      }
    }
  };

  useEffect(() => {
    if (aiFormData?.aiToolCategoryId) {
      const findSubCategory = aiToolSubCategory.filter(
        (item) => item?.aiToolCategoryId?._id === aiFormData?.aiToolCategoryId
      );
      setSubcategoriesData(findSubCategory);
    } else {
      setSubcategoriesData({});
    }
  }, [aiFormData?.aiToolCategoryId]);
  async function loadOptions(search, loadedOptions, { page }) {
    const response = await fetch(
      `https://api.findmyaitool.com/api/v1/aiToolSubCategory/get-subCategory?page=${page}&status=active`
    );
    const responseJSON = await response.json();
    const data = responseJSON?.payload?.AI_TOOL_SUB_CATEGORY?.map((item) => {
      return {
        value: item._id,
        label: item.name,
      };
    });
    return {
      options: data,
      hasMore: data?.length > 0 ? true : false,
      additional: {
        page: page + 1,
      },
    };
  }
  const handleOnChangeCategory = (e) => {
    setAiFormData({
      ...aiFormData,
      aiToolSubCategoryName: e,
      aiToolSubCategoryId: e.value,
    });
    setErrors({ ...errors, aiToolSubCategoryId: " " });
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "5px",
      border: "none",
      color: "#fff",
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
      color: "rgba(255, 255, 255, 0.8)", // Change the color of the placeholder here
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "#252438",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "#fff", // Change the color of the selected value here
    }),
  };
  if (!isValidate) {
    return <Nodatashow />;
  }
  return transactionId && isValidate ? (
    <LazyLoad id={"SubmitAiToolsForm"}>
      <div className={styles.submitAiToolsFormSection}>
        <div className="container">
          <div className={styles.submitAiToolsFormAlignment}>
            <div className={styles.heading}>
              <h4>Submit AI Tool</h4>
              <p>
                We aim to review every tool within 7 days and inclide them in
                the directory.
              </p>
            </div>
            <div className={styles.submitAiToolsMainForm}>
              <div className={styles.grid}>
                <div className={styles.formBoxAlignment}>
                  <div className={styles.formInput}>
                    {aiFormData.websitelogo ? (
                      <div className={styles.uploadedImgAlignment}>
                        <img
                          className={styles.sliderImg}
                          src={
                            typeof aiFormData.websitelogo === "string"
                              ? aiFormData?.websitelogo
                              : URL.createObjectURL(aiFormData.websitelogo)
                          }
                          alt="websitelogo"
                        />

                        <div
                          className={styles.closeIconAlignment}
                          onClick={() => {
                            setAiFormData({ ...aiFormData, websitelogo: null });
                          }}
                        >
                          <img loading="lazy" src={CloseIcon} alt="CloseIcon" />
                        </div>
                      </div>
                    ) : (
                      <div className={styles.formInput}>
                        <label>Upload your website Logo</label>
                        <div className={styles.uploadedBoxAlignment}>
                          <img
                            loading="lazy"
                            src={UploadIcon}
                            alt="UploadIcon"
                          />
                          <p>Browse Files to upload</p>
                          <input
                            type="file"
                            name="websitelogo"
                            accept="image/*"
                            onChange={(e) => handleOnChange(e)}
                          />
                        </div>
                        {errors.websitelogo && (
                          <div className={styles.errormessage}>
                            <p>{errors.websitelogo}</p>
                          </div>
                        )}
                        {imageErrors.websitelogo && (
                          <div className={styles.errormessage}>
                            <p>{imageErrors.websitelogo}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.formBoxAlignment}>
                  <div className={styles.formInput}>
                    {aiFormData.websiteimg?.length === 0 ? (
                      <div>
                        <label>Upload your website Images</label>
                        <div className={styles.uploadedBoxAlignment}>
                          <img
                            loading="lazy"
                            src={UploadIcon}
                            alt="UploadIcon"
                          />
                          <p>Browse Files to upload</p>
                          <input
                            type="file"
                            name="websiteimg"
                            accept="image/*"
                            onChange={(e) => handleOnChange(e)}
                          />
                        </div>
                        {errors.websiteimg && (
                          <div className={styles.errormessage}>
                            <p>{errors.websiteimg}</p>
                          </div>
                        )}
                        {imageErrors.websiteimg && (
                          <div className={styles.errormessage}>
                            <p>{imageErrors.websiteimg}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={styles.formInput}>
                        {aiFormData.websiteimg &&
                          aiFormData.websiteimg.length > 0 &&
                          (aiFormData.websiteimg.length > 1 ? (
                            <div
                              className={classNames(
                                styles.uploadedImgAlignment,
                                styles.secondImg
                              )}
                            >
                              <Slider {...settings}>
                                {aiFormData.websiteimg.map((image, index) => (
                                  <div
                                    key={index}
                                    className={styles.imageContainer}
                                  >
                                    <img
                                      className={styles.sliderImg}
                                      src={
                                        typeof image === "string"
                                          ? image
                                          : URL.createObjectURL(image)
                                      }
                                      alt={`Uploaded Image ${index}`}
                                    />
                                    {/* Button to remove the image */}
                                    <div
                                      className={styles.closeIconAlignment}
                                      onClick={() => handleRemoveImage(index)}
                                    >
                                      <img
                                        loading="lazy"
                                        src={CloseIcon}
                                        alt="CloseIcon"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </Slider>
                            </div>
                          ) : (
                            aiFormData.websiteimg.map((image, index) => (
                              <div
                                key={index}
                                className={classNames(
                                  styles.uploadedImgAlignment,
                                  styles.secondImg
                                )}
                              >
                                <img
                                  className={styles.sliderImg}
                                  src={
                                    typeof image === "string"
                                      ? image
                                      : URL.createObjectURL(image)
                                  }
                                  alt={`Uploaded Image ${index}`}
                                />
                                {/* Button to remove the image */}
                                <div
                                  className={styles.closeIconAlignment}
                                  onClick={() => handleRemoveImage(index)}
                                >
                                  <img
                                    loading="lazy"
                                    src={CloseIcon}
                                    alt="CloseIcon"
                                  />
                                </div>
                              </div>
                            ))
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.grid}>
                <div>
                  <div className={styles.formBoxAlignment}>
                    <div className={styles.formInput}>
                      <label>Tool Name</label>
                      <div className={styles.input}>
                        <input
                          type="text"
                          placeholder="Tool Name"
                          name="title"
                          value={aiFormData.title}
                          onChange={(e) => handleOnChange(e)}
                        />
                      </div>
                      {errors.title && (
                        <div className={styles.errormessage}>
                          <p>{errors.title}</p>
                        </div>
                      )}
                    </div>
                    <div className={styles.formInput}>
                      <label>Website URL</label>
                      <div className={styles.input}>
                        <input
                          type="text"
                          placeholder="Website URL"
                          name="websiteLink"
                          value={aiFormData.websiteLink}
                          onChange={(e) => handleOnChange(e)}
                        />
                      </div>
                      {errors.websiteLink && (
                        <div className={styles.errormessage}>
                          <p>{errors.websiteLink}</p>
                        </div>
                      )}
                    </div>

                    <div className={styles.formInput}>
                      <label>Choose Category</label>
                      <AsyncPaginate
                        name="aiToolSubCategoryName"
                        className="dropdown-input"
                        value={aiFormData.aiToolSubCategoryName}
                        loadOptions={loadOptions}
                        onChange={handleOnChangeCategory}
                        styles={customStyles}
                        setvalues={aiFormData.aiToolSubCategoryName}
                        additional={{
                          page: 1,
                        }}
                        placeholder="Select Category"
                      />

                      {errors.aiToolSubCategoryId && (
                        <div className={styles.errormessage}>
                          <p>{errors.aiToolSubCategoryId}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.formBoxAlignment}>
                    <div className={styles.formInput}>
                      <label>Short Description</label>
                      <div className={styles.input}>
                        <textarea
                          placeholder="Write a short description of your tool"
                          name="description"
                          value={aiFormData.description}
                          onChange={(e) => handleOnChange(e)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className={styles.formBoxAlignment}>
                    <div className={styles.formInput}>
                      <label>Instagram social media link</label>
                      <div className={styles.input}>
                        <input
                          type="text"
                          placeholder="Instagram social media link"
                          name="instaChannelLink"
                          value={aiFormData.instaChannelLink}
                          onChange={(e) => handleOnChange(e)}
                        />
                      </div>
                    </div>
                    <div className={styles.formInput}>
                      <label>Facebook social media link</label>
                      <div className={styles.input}>
                        <input
                          type="text"
                          placeholder="Facebook social media link"
                          name="facebookChannelLink"
                          value={aiFormData.facebookChannelLink}
                          onChange={(e) => handleOnChange(e)}
                        />
                      </div>
                    </div>
                    <div className={styles.formInput}>
                      <label>Twitter social media link</label>
                      <div className={styles.input}>
                        <input
                          type="text"
                          placeholder="Twitter social media link"
                          name="twitterChannelLink"
                          value={aiFormData.twitterChannelLink}
                          onChange={(e) => handleOnChange(e)}
                        />
                      </div>
                    </div>
                    <div className={styles.formInput}>
                      <label>Linkdin social media link</label>
                      <div className={styles.input}>
                        <input
                          type="text"
                          placeholder="Linkdin social media link"
                          name="linkedInChannelLink"
                          value={aiFormData.linkedInChannelLink}
                          onChange={(e) => handleOnChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={styles.formBoxAlignment}>
                    <div className={styles.formOptionDetailsAlignment}>
                      <div
                        className={classNames(
                          styles.formInput,
                          styles.leftSide
                        )}
                      >
                        <label className={styles.secondPadding}>Pricing</label>
                        <div className={styles.otherOptionDetails}>
                          {PricingDataArray?.map((item, index) => {
                            return (
                              <div
                                className={styles.allOtherDetailsMain}
                                key={item.name}
                              >
                                <div className={styles.optionFlexAlignment}>
                                  <div>
                                    <input
                                      type="checkbox"
                                      id={item.name}
                                      name="pricing"
                                      value={item.name}
                                      checked={aiFormData.pricing?.includes(
                                        item.name
                                      )}
                                      onChange={(e) =>
                                        handleOnChange(e, item.type)
                                      }
                                    />

                                    <label htmlFor={item.name}></label>
                                  </div>
                                  <div
                                    className={styles.optionRightSideAlignment}
                                  >
                                    <label
                                      htmlFor={item?.name}
                                      className={styles.rightContentflex}
                                    >
                                      <img
                                        src={item.img}
                                        alt={`${item?.name}Icon`}
                                      />
                                      <p>{item?.name}</p>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {errors.pricing && (
                          <div className={styles.errormessage}>
                            <p>{errors.pricing}</p>
                          </div>
                        )}
                      </div>
                      <div
                        className={classNames(
                          styles.formInput,
                          styles.rightSide
                        )}
                      >
                        <label className={styles.secondPadding}>Features</label>
                        <div className={styles.otherOptionDetails}>
                          {FeaturesDataArray?.map((item) => {
                            return (
                              <div className={styles.allOtherDetailsMain}>
                                <div className={styles.optionFlexAlignment}>
                                  <div>
                                    <input
                                      type="checkbox"
                                      id={item.name}
                                      name="features"
                                      value={item.name}
                                      onChange={(e) => handleOnChange(e)}
                                    />
                                    <label htmlFor={item.name}></label>
                                  </div>
                                  <div
                                    className={styles.optionRightSideAlignment}
                                  >
                                    <label
                                      htmlFor={item?.name}
                                      className={styles.rightContentflex}
                                    >
                                      <img
                                        src={item?.img}
                                        alt={`${item?.name}Icon`}
                                      />
                                      <p>{item.name}</p>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {errors.features && (
                          <div className={styles.errormessage}>
                            <p>{errors.features}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={classNames(
                      styles.formBoxAlignment,
                      styles.formBoxAlignment
                    )}
                  >
                    <div className={styles.formInput}>
                      <label>Coupon Deals</label>
                      <div className={styles.input}>
                        <input
                          type="text"
                          placeholder="Get a disccount of X% by using the code ‘XXXXX’.  "
                          name="couponDeals"
                          value={aiFormData.couponDeals}
                          onChange={(e) => handleOnChange(e)}
                        />
                      </div>
                      {errors.couponDeals && (
                        <div className={styles.errormessage}>
                          <p>{errors.couponDeals}</p>
                        </div>
                      )}
                    </div>
                    <div className={styles.formInput}>
                      <label>Paid Plan Deals</label>
                      <div className={styles.input}>
                        <input
                          type="text"
                          placeholder="Starting at just $X/month"
                          name="paidPlanDeals"
                          value={aiFormData?.paidPlanDeals}
                          onChange={(e) => handleOnChange(e)}
                        />
                      </div>
                      {errors.paidPlanDeals && (
                        <div className={styles.errormessage}>
                          <p>{errors.paidPlanDeals}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.formBoxAlignment}>
                    <div className={styles.formInput}>
                      <label>Website youtube introduction video link</label>
                      <div className={styles.input}>
                        <input
                          type="text"
                          placeholder="Website youtube introduction video link"
                          name="youTubeChannelLink"
                          value={aiFormData.youTubeChannelLink}
                          onChange={(e) => handleOnChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.formBoxAlignment}>
                <div className={styles.formInput}>
                  <label> Description</label>
                  <div className={styles.input}>
                    <SunEditor
                      setOptions={{
                        buttonList: [
                          ["font", "fontSize", "formatBlock"],
                          [
                            "bold",
                            "underline",
                            "italic",
                            "strike",
                            "subscript",
                            "superscript",
                          ],
                          ["align", "horizontalRule", "list", "table"],
                          ["fontColor", "hiliteColor"],
                          ["outdent", "indent"],
                          ["undo", "redo"],
                          ["removeFormat"],
                          ["outdent", "indent"],
                          ["link"],
                          ["showBlocks"],
                        ],
                      }}
                      placeholder="Write a detailed description of your tool"
                      name="details"
                      className="custom-sun-editor"
                      onChange={(content) =>
                        handleEditorChange(content, "details")
                      }
                      background="red"
                    />
                  </div>
                  {errors.details && (
                    <div className={styles.errormessage}>
                      <p>{errors.details}</p>
                    </div>
                  )}
                </div>
                {/* <div className={styles.formInput}>
                <label>Pros</label>
                <div className={styles.input}>
              
                  <SunEditor
                    setOptions={{
                      buttonList: [
                        ["font", "fontSize", "formatBlock"],
                        [
                          "bold",
                          "underline",
                          "italic",
                          "strike",
                          "subscript",
                          "superscript",
                        ],
                        ["align", "horizontalRule", "list", "table"],
                        ["fontColor", "hiliteColor"],
                        ["outdent", "indent"],
                        ["undo", "redo"],
                        ["removeFormat"],
                        ["outdent", "indent"],
                        ["link"],
                        ["showBlocks"],
                      ],
                    }}
                    placeholder="Write a advantages of your tool"
                    onChange={(content) =>
                      handleEditorChange(content, "pros")
                    }
                    colorList="red"
                    fontSize="16px"
                  />
                </div>
                {errors.pros && (
                  <div className={styles.errormessage}>
                    <p>{errors.pros}</p>
                  </div>
                )}
              </div> */}

                {/* <div className={styles.formInput}>
                <label>Cons</label>
                <div className={styles.input}>
             
                  <SunEditor
                    setOptions={{
                      buttonList: [
                        ["font", "fontSize", "formatBlock"],
                        [
                          "bold",
                          "underline",
                          "italic",
                          "strike",
                          "subscript",
                          "superscript",
                        ],
                        ["align", "horizontalRule", "list", "table"],
                        ["fontColor", "hiliteColor"],
                        ["outdent", "indent"],
                        ["undo", "redo"],
                        ["removeFormat"],
                        ["outdent", "indent"],
                        ["link"],
                        ["showBlocks"],
                      ],
                    }}
                    placeholder="Write a disadvantages of your tool"
                    onChange={(content) =>
                      handleEditorChange(content, "cons")
                    }
                  />
                </div>
                {errors.cons && (
                  <div className={styles.errormessage}>
                    <p>{errors.cons}</p>
                  </div>
                )}
              </div> */}
              </div>

              {/* <div className={styles.formBoxAlignment}>
          <div className={styles.grid}></div>
          <div className={styles.formInput}>
            <label>Features</label>
            <div className={styles.otherOptionDetails}>
              {FeaturesDataArray?.map((item) => {
                return (
                  <div className={styles.allOtherDetailsMain}>
                    <div className={styles.optionFlexAlignment}>
                      <div>
                        <input type="checkbox" id={item.name} name="features" value={item.name} onChange={(e) => handleOnChange(e)} />
                        <label htmlFor={item.name}></label>
                      </div>
                      <div className={styles.optionRightSideAlignment}>
                        <img  loading="lazy" src={item?.img} alt={`${item?.name}Icon`} />
                        <p>{item.name}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.formButtonAlignment}>
            <button onClick={() => handleSubmit()}>Submit Your Tool</button>
          </div>
        </div> */}
            </div>
            <div className={styles.formButtonAlignment}>
              <div className={styles.button}>
                <button
                  onClick={() => handleSubmit()}
                  aria-label="Submit Your Tool"
                >
                  Submit Your Tool{" "}
                  {loading && (
                    <div>
                      <div className={styles.spinner}></div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LazyLoad>
  ) : (
    <Error statusCode={404} />
  );
}
