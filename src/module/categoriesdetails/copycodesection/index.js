"use client";
import React from "react";
import styles from "./copycodesection.module.scss";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const FeaturedIcon = "/assets/icons/featured.svg";
const CopyIcon = "/assets/icons/copy.svg";

export default function Copycodesection() {
  const router = useRouter();

  const handleCopyCode = () => {
    const codeToCopy = `<a href="https://main.dn4tlmkqq1vdv.amplifyapp.com${router?.pathname}" target="_blank" class="findmyaitool_tag">
    <img  loading="lazy" src="https://findmyaitool.com/assets/embed-image/theme-light-featured.svg" alt="Vana Portrait | Featured on Findmyaitool" width="260px">
  </a>`;

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(codeToCopy)
        .then(() => {
          toast.success("Embed code copied");
        })
        .catch((error) => {
          console.error("Error copying code to clipboard: ", error);
        });
    } else {
      const tempTextArea = document.createElement("textarea");
      tempTextArea.value = codeToCopy;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand("copy");
      document.body.removeChild(tempTextArea);
      console.log("Code copied to clipboard");
    }
  };

  return (
    <div className={styles.copycodesectionAlignment}  >
      <div className="container">
        {/* <AnimatedSection animationType="fade-up" duration={600} delay={600}> */}
        <div className={styles.box}>
          <div className={styles.leftContnet}>
            <img loading="lazy" src={FeaturedIcon} alt="FeaturedIcon" />
            <span>Maximize Your Reach: Unleashing the Potential of Promote Your Tool</span>
          </div>
          <button onClick={() => handleCopyCode()} aria-label="Copy Embed Code">
            <img loading="lazy" src={CopyIcon} alt="CopyIcon" />
            Copy Embed Code
          </button>
        </div>
        {/* </AnimatedSection> */}
      </div>
    </div>
  );
}
