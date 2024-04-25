"use client";
import React, { useState } from "react";
import styles from "./promoteworkHack.module.scss";
import CopyIcon from "@/assets/icons/copyIcon";
import ShareIcon from "@/assets/icons/shareIcon";
import toast from "react-hot-toast";
import ShareModal from "@/module/gptDetails/shareModal";
import LazyLoad from "@/helpers/lazyLoad";
const Logo = "/assets/logo/bg-logo.svg";
import {  useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function PromoteWorkHack() {
  const router = useRouter();
  const [shareModal, setShareModal] = useState(false);

  const handleCopyCode = () => {
    const codeToCopy = `<a href="https://main.dn4tlmkqq1vdv.amplifyapp.com${router?.pathname}" target="_blank" class="findmyaitool_tag">
    <img  loading="lazy" src="https://client-assets-rh.s3.ap-south-1.amazonaws.com/images/profileImg/svg-1713784651703" alt="Vana Portrait | Featured on Findmyaitool" width="260px">
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
    <LazyLoad id={"PromoteWorkHack"}>
      <div className={styles.promteWorkHardSection}>
        <div className={styles.promteWorkHardBox}>
          <div className="container">
            <div className={styles.promteWorkHardFlex}>
              <div className={styles.promteWorkHardLeftSide}>
                <h2>Promote WorkHack</h2>
                <p>Maximize Your Reach: Unleashing the Potential of Promote Your Tool</p>
                <div className={styles.bottomDetailsAlignment}>
                  <div>
                    <img src={Logo} alt="Logo" />
                  </div>

                  <div className={styles.copyEmbedAlignment} onClick={() => handleCopyCode()}>
                    <p>Copy Embed Code</p>
                    <CopyIcon />
                  </div>
                </div>
              </div>

              <div className={styles.promteWorkHardRightSide}>
                <div className={styles.shareButtonAlignment} onClick={() => setShareModal(true)}>
                  <p>Share on</p>
                  <ShareIcon />
                </div>

                <div className={styles.socialIcon}>
                  {/* <a href="https://www.facebook.com/findmyaitool.official" target="_blank">
                    <Facebook />
                  </a>
                  <a href="https://www.instagram.com/findmyaitool/" target="_blank">
                    <Instragram />
                  </a>
                  <a href="https://www.linkedin.com/company/findmyaitool" target="_blank">
                    <Linkdin />
                  </a>
                  <a href="https://twitter.com/findmyaitool" target="_blank">
                    <Twitter />
                  </a> */}
          
                </div>
              </div>
            </div>
          </div>
        </div>
        {shareModal && <ShareModal setShareModal={setShareModal} shareModal={shareModal} />}
      </div>
    </LazyLoad>
  );
}
