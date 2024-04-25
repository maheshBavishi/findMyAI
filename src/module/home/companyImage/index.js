import React from "react";
import styles from "./companyImage.module.scss";
const Icon1 = "/assets/images/s-logo1.png";
const Icon2 = "/assets/images/s-logo2.png";
const Icon3 = "/assets/images/s-logo3.png";
const Icon4 = "/assets/images/s-logo4.png";
const Icon5 = "/assets/images/s-logo5.png";
const Icon6 = "/assets/images/s-logo6.png";
const Icon7 = "/assets/images/s-logo7.png";
const Icon8 = "/assets/images/s-logo8.png";
const Icon9 = "/assets/images/s-logo9.png";
// const Icon10 = "/assets/images/s-logo10.png";
// const Icon11 = "/assets/images/s-logo11.png";
// const Icon12 = "/assets/images/s-logo12.png";
import Marquee from "react-fast-marquee";
import LazyLoad from "@/helpers/lazyLoad";
export default function CompanyImage() {
  return (
    <LazyLoad id={"CompanyImage"}>
      <div className={styles.companyImage}  >
        {/* <div className="container-md"> */}
        <div className={styles.imageAlignment}>
          <Marquee gradient={false} className="marquee">
            <img loading="lazy" src={Icon1} alt="Icon1" />
            <img loading="lazy" src={Icon2} alt="Icon2" />
            <img loading="lazy" src={Icon3} alt="Icon3" />
            <img loading="lazy" src={Icon4} alt="Icon4" />
            <img loading="lazy" src={Icon5} alt="Icon5" />
            <img loading="lazy" src={Icon6} alt="Icon6" />
            <img loading="lazy" src={Icon7} alt="Icon7" />
            <img loading="lazy" src={Icon8} alt="Icon8" />
            <img loading="lazy" src={Icon9} alt="Icon9" />
            {/* <img  loading="lazy" src={Icon10} alt="Icon10" />
          <img  loading="lazy" src={Icon11} alt="Icon11" />
          <img  loading="lazy" src={Icon12} alt="Icon12" /> */}
            <img loading="lazy" src={Icon1} alt="Icon1" />
            <img loading="lazy" src={Icon2} alt="Icon2" />
            <img loading="lazy" src={Icon3} alt="Icon3" />
            <img loading="lazy" src={Icon4} alt="Icon4" />
            <img loading="lazy" src={Icon5} alt="Icon5" />
            <img loading="lazy" src={Icon6} alt="Icon6" />
            <img loading="lazy" src={Icon7} alt="Icon7" />
            <img loading="lazy" src={Icon8} alt="Icon8" />
            <img loading="lazy" src={Icon1} alt="Icon1" />
            <img loading="lazy" src={Icon2} alt="Icon2" />
            <img loading="lazy" src={Icon3} alt="Icon3" />
            <img loading="lazy" src={Icon4} alt="Icon4" />
            <img loading="lazy" src={Icon5} alt="Icon5" />
            <img loading="lazy" src={Icon6} alt="Icon6" />
            <img loading="lazy" src={Icon7} alt="Icon7" />
            <img loading="lazy" src={Icon8} alt="Icon8" />
            <img loading="lazy" src={Icon9} alt="Icon9" />
            {/* <img  loading="lazy" src={Icon10} alt="Icon10" />
          <img  loading="lazy" src={Icon11} alt="Icon11" />
          <img  loading="lazy" src={Icon12} alt="Icon12" /> */}
          </Marquee>
        </div>
        {/* </div> */}
      </div>
    </LazyLoad>
  );
}
