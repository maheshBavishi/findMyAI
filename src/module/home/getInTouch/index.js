import React from "react";
import styles from "./getInTouch.module.scss";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import Link from "next/link";
import LazyLoad from "@/helpers/lazyLoad";
const ButtonArrow = "/assets/icons/contact-us-arrow.svg";
export default function GetInTouch() {
  return (
    <LazyLoad id={"GetInTouch"}>
      <div className={styles.getInTouchAlignment}  >
        {/* <AnimatedSection animationType="fade-up" duration={800} delay={400}> */}
        <div className="container">
          <div className={styles.box}>
            <h4>Get In Touch</h4>
            <p>Get in touch today for solutions that matter. Contact us for personalized assistance and expert guidance. Your queries, our priority.</p>
            <div className={styles.btnCenteralignment}>
              <Link href={"/contact-us"}>
                <button aria-label="Contact Us ">
                  Contact Us <img loading="lazy" src={ButtonArrow} alt="ButtonArrow" />
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* </AnimatedSection> */}
      </div>
    </LazyLoad>
  );
}
