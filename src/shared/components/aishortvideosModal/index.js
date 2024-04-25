import React from "react";
import styles from "./aishortvideosModal.module.scss";
import Link from "next/link";
const AiLogo = "/assets/logo/logo-5.png";
const CloseIcon = "/assets/icons/close-white.svg";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import raw from "rehype-raw";
export default function AishortvideosModal({ item, setOpenModal ,SherebarRef  }) {
  return (
    <div className={styles.aishortvideosModal} >
      <div className={styles.modal} ref={SherebarRef}>
        <div className={styles.modalHeaderFlex}>
          <div className={styles.mobileView}>
            <div className={styles.modalTopHeaderAlignment}>
              <div className={styles.logo}>
                <img loading="lazy" src={AiLogo} alt="AiLogo" />
              </div>
              <div className={styles.modalTopHeaderName}>
                <h6> Find my ai tool</h6>
                <p>Findmyaitool </p>
              </div>
            </div>
          </div>
          <div className={styles.modalCloseMobile} onClick={() => setOpenModal(false)}>
            <img loading="lazy" src={CloseIcon} alt="CloseIcon" />
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.griditems}>
            
              <div className={styles.video}>
                <video autoPlay loop muted>
                  <source src={item.videoLink} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.griditems}>
           
            <div className={styles.WebView}>
              <div className={styles.modalTopHeaderAlignment}>
                <div className={styles.logo}>
                  <img loading="lazy" src={AiLogo} alt="AiLogo" />
                </div>
                <div className={styles.modalTopHeaderName}>
                  <h6> Find my ai tool</h6>
                  <p>Findmyaitool </p>
                </div>
              </div>
              <div className={styles.closeicon}>
              <img loading="lazy" src={CloseIcon} alt="CloseIcon" onClick={() => setOpenModal(false)} />
            </div>
            </div>
            <div className={styles.scrollbarSection}>
            <h2>{item?.title}</h2>
            <ReactMarkdown
                remarkPlugins={[gfm]}
                rehypePlugins={[raw]}
                children={item?.description}
                className={styles?.textWrap}
              />
            <p>
              <span>#aitools</span> <span>#aiediting</span> <span>#runwayml </span>
              <span> #videoediting </span> <span> #aftereffects</span>
            </p>
            </div>
            <div className={styles.lastText}>
              <p>{`Powered by ❤️ FindMyAITool`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
