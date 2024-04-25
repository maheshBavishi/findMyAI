"use client";
import React, { useRef } from "react";
import styles from "./shareModal.module.scss";
import classNames from "classnames";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon
} from "react-share";
import useOnClickOutside from "@/hook/useOnClickOutside";
import { useRouter } from "next/router";
const ColseIcon = "/assets/icons/close-icon.svg";


export default function ShareModal({ shareModal, setShareModal, shareIndex }) {
  const router = useRouter();
  let url 
  const SherebarRef = useRef();
  useOnClickOutside(SherebarRef, () => {
    setShareModal(false);
  });
  url = `https://main.dn4tlmkqq1vdv.amplifyapp.com${router?.pathname}`

  return (
    <div
      className={
        shareModal
          ? classNames(styles.shareModalWrapper, styles.openModal)
          : classNames(styles.shareModalWrapper, styles.closeModal)
      }
    >
      <div className={styles.shareModalWrapperBoxAlignment} ref={SherebarRef}>
        <div className={styles.closeAlignment}>
          <div
            onClick={() => {
              setShareModal(false);
            }}
            className={styles.iconAlignmen}
          >
            <img  loading="lazy" src={ColseIcon} alt="colse" />
          </div>
        </div>
        <div className={styles.headingALignment}>
          <h4>Share with your network</h4>
          <p>
            Anyone who has the link can view this gpt.
          </p>
        </div>

        <div className={styles.shareModalBodyAlignment}>
          <div className={styles.optionAlignment}>
            <div className={styles.optionImg}>
              <FacebookShareButton
                url={`${url}`}
                className="Demo__some-network__share-button"
              >
                <FacebookIcon size={38} round />
              </FacebookShareButton>
            </div>
            <p>Facebook</p>
          </div>
          <div className={styles.optionAlignment}>
            <div className={styles.optionImg}>
              <WhatsappShareButton
                url={`${url}`}
                separator=":: "
                className="Demo__some-network__share-button"
              >
                <WhatsappIcon size={38} round />
              </WhatsappShareButton>
            </div>
            <p>WhatsApp</p>
          </div>
          <div className={styles.optionAlignment}>
            <div className={styles.optionImg}>
              <TwitterShareButton
                url={`${url}`}
                className="Demo__some-network__share-button"
              >
                <XIcon size={38} round />
              </TwitterShareButton>
            </div>
            <p>Twitter</p>
          </div>
          <div className={styles.optionAlignment}>
            <div className={styles.optionImg}>
              <LinkedinShareButton
                url={`${url}`}
                className="Demo__some-network__share-button"
              >
                <LinkedinIcon size={38} round />
              </LinkedinShareButton>{" "}
            </div>
            <p>LinkedIn</p>
          </div>
        </div>
      </div>
    </div>
  );
}
