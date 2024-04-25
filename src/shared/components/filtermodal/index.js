"use client ";
import React, { useEffect, useState } from "react";
import styles from "./filtermodal.module.scss";

const CloseIcon = "/assets/icons/close-icon.svg";
const BrowserIcon = "/assets/icons/Browser.svg";
const FreeIcon = "/assets/images/Frame.png";
const FreeTrialIcon = "/assets/images/Frame (1).png";
const ContactforpriceingIcon = "/assets/images/Frame (2).png";
const Freemium = "/assets/images/Frame (3).png";
const DealIcon = "/assets/images/Frame (4).png";
const PaidIcon = "/assets/images/paid.png";
const WaitlistIcon = "/assets/images/email.png";
const MobileIcon = "/assets/images/mobile.png";
const APIIcon = "/assets/images/api.png";
const OpenSourceIcon = "/assets/images/opensource.png";
const DiscordIcon = "/assets/images/Frame (8).png";

export default function Filtermodal(props) {
  const { setFilterModal, setFilterData, filterData, setCloseModal } = props;

  const handlePricingCheckboxChange = (e) => {
    const value = e.target.value;
    if (filterData.priceing.includes(value)) {
      setFilterData({
        ...filterData,
        priceing: filterData.priceing.filter((item) => item !== value),
      });
    } else {
      setFilterData({
        ...filterData,
        priceing: [...filterData.priceing, value],
      });
    }
  };

  const handleFeaturesCheckboxChange = (e) => {
    const value = e.target.value;
    if (filterData.features.includes(value)) {
      setFilterData({
        ...filterData,
        features: filterData.features.filter((item) => item !== value),
      });
    } else {
      setFilterData({
        ...filterData,
        features: [...filterData.features, value],
      });
    }
  };

  const clearFilters = () => {
    setFilterData({ priceing: [], features: [] });
    setFilterModal(false);
    setCloseModal(false);
  };

  const applyFilters = () => {
    setFilterModal(false);
    setCloseModal(false);
  };

  const pricingOptions = [
    { option: "Free", icon: FreeIcon },
    { option: "Free Trial", icon: FreeTrialIcon },
    { option: "Contact for Pricing", icon: ContactforpriceingIcon },
    { option: "Freemium", icon: Freemium },
    { option: "Paid", icon: PaidIcon },
    { option: "Deals", icon: DealIcon }, // Assuming you have a deals icon
  ];
  const featureOptions = [
    { feature: "Waitlist", icon: WaitlistIcon },
    { feature: "Mobile App", icon: MobileIcon },
    { feature: "API", icon: APIIcon },
    { feature: "Browser Extension", icon: BrowserIcon },
    { feature: "Open Source", icon: OpenSourceIcon },
    { feature: "Discord Community", icon: DiscordIcon },
  ];
  const handleonModalClose = () => {
    setCloseModal(true);
    setFilterModal(false);
  };
  return (
    <div className={styles.filtermodalwrapper}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h6>
            <span>Select Filters</span> to Apply
          </h6>
          <div
            className={styles.closeIcon}
            onClick={() => {
              handleonModalClose();
            }}
          >
            <img loading="lazy" src={CloseIcon} alt="CloseIcon" />
          </div>
        </div>
        <div className={styles.modalbody}>
          <div className={styles.grid}>
            <div className={styles.griditems}>
              <h5>Pricing</h5>
              <div className={styles.allCheckboxContentAlignment}>
                {pricingOptions.map((item, i) => (
                  <div className={styles.checkboxText} key={i}>
                    <div className={styles.leftContent}>
                      <input type="checkbox" id={item?.option} value={item?.option} onChange={handlePricingCheckboxChange} checked={filterData?.priceing?.includes(item?.option)} />
                      <label htmlFor={item?.option}></label> {/* Empty label for checkbox */}
                    </div>
                    <div className={styles.rightContent}>
                      <label htmlFor={item?.option} className={styles.rightContentflex}>
                        {" "}
                        {/* Label for name */}
                        <img loading="lazy" src={item?.icon} alt="FreeIcon" />
                        <span>{item?.option}</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.griditems}>
              <h5>Features</h5>
              <div className={styles.allCheckboxContentAlignment}>
                {featureOptions.map((item, i) => (
                  <div className={styles.checkboxText} key={i}>
                    <div className={styles.leftContent}>
                      <input type="checkbox" id={item?.feature} value={item?.feature} onChange={handleFeaturesCheckboxChange} checked={filterData.features.includes(item?.feature)} />
                      <label htmlFor={item?.feature}></label> {/* Empty label for checkbox */}
                    </div>
                    <div className={styles.rightContent}>
                      <label htmlFor={item?.feature} className={styles.rightContentflex}>
                        {" "}
                        {/* Label for name */}
                        <img loading="lazy" src={item?.icon} alt="BrowserIcon" />
                        <span>{item?.feature}</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button onClick={clearFilters} aria-label="Clear">
            Clear
          </button>
          <button onClick={applyFilters} aria-label="Apply Filter">
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
}
