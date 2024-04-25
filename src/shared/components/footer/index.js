"use client";
import React, { useEffect, useState } from "react";
import styles from "./footer.module.scss";
import Subscribe from "./subscribe";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { PostSubscribe, getSocialLinks } from "@/store/ApiSlice/restAllSlice";
import toast from "react-hot-toast";
import { getSession } from "@/helpers/authHelper";
const LinkdinIcon = "/assets/icons/linkdin.svg";
const FacebookIcon = "/assets/icons/facebook.svg";
const TwitterIcon = "/assets/icons/twitter.svg";
const FooterImg = "/assets/images/footer-img.png";
const EmailIcon = "/assets/icons/email-icon.svg";
const Logo = "/assets/logo/logo2.svg";
const SocialIcon1 = "/assets/icons/social-icon-1.svg";
const SocialIcon2 = "/assets/icons/social-icon-2.svg";
const SocialIcon3 = "/assets/icons/social-icon-3.svg";
const SocialIcon4 = "/assets/icons/social-icon-4.svg";
const SocialIcon5 = "/assets/icons/social-icon-5.svg";
const PhoneIcon = "/assets/icons/contact-icon.svg";
const FooterEmailIcon = "/assets/icons/blue-email-icon.svg";
const FooterBgImg = "/assets/images/footer-bg-img.png";
export default function Footer() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { socialLinks } = useSelector((state) => state.restall);
  const [values, setValues] = useState({});
  // const { tokendata } = useSelector((state) => state.auth);
  const tokendata = getSession()?.access_token;
  const pathname = usePathname();
  useEffect(() => {
    dispatch(getSocialLinks());
  }, []);
  const handleOnClick = (item) => {
    router.push(item);
  };

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleOnSubscribe = () => {
    if (!values?.email || values?.email === "") {
      toast.error("Please enter email");
    } else if (!values?.email?.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      toast.error("Please enter a valid email address!");
    } else if (!tokendata) {
      // Check if token data is missing and form is valid
      toast.error("Please login to use services");
    } else {
      // Check if form is valid and token data is present
      const body = {
        email: values.email, // Corrected variable name
      };
      dispatch(PostSubscribe(body))
        .then((res) => {
          if (res?.payload?.success == true) {
            toast.success(res.payload?.message);
            setValues({ email: "" });
          } else {
            toast.error(res?.payload?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.payload?.message);
        });
    }
  };

  return (
    <div>
      <footer className={styles.footer}>
        <div className="container">
          {pathname === "/" && (
            <>
              <div className={styles.footerBoxALignment}>
                <div className={styles.footerImg}>
                  <img loading="lazy" src={FooterImg} alt="FooterImg" />
                </div>
                <div className={styles.footerRightSIde}>
                  <h3>Stay tuned!</h3>
                  <p>
                    Get the latest articles and business updates that you need
                    to know, you’ll even get special recommendations weekly.
                  </p>

                  <div className={styles.searchInputAlignment}>
                    <div className={styles.subscribeInput}>
                      <div className={styles.emailBox}>
                        <img loading="lazy" src={EmailIcon} alt="EmailIcon" />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter your email"
                        name="email"
                        value={values?.email}
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                    <div className={styles.subscribeButton}>
                      <button
                        onClick={() => {
                          handleOnSubscribe();
                        }}
                        aria-label="Subscribe"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className={styles.footerAlignment}>
            <div className={styles.footerGrid}>
              <div className={styles.footerLeftSide}>
                <div onClick={() => router.push("/")}>
                  <img loading="lazy" src={Logo} alt="Logo" />
                </div>
                <p>
                  FindMyAITool is a website dedicated to providing a
                  comprehensive list of AI tools to assist individuals and
                  businesses in finding the most suitable AI tool for their
                  specific requirements.
                </p>
                <div className={styles.socialIconFlex}>
                  <a
                    href="https://www.instagram.com/findmyaitool/"
                    target="_blank"
                    className={styles.socialIconAlignment}
                  >
                    <img loading="lazy" src={SocialIcon1} alt="insta" />
                  </a>
                  <a
                    href="https://www.facebook.com/findmyaitool.official"
                    target="_blank"
                    className={styles.socialIconAlignment}
                  >
                    <img loading="lazy" src={SocialIcon2} alt="facebook" />
                  </a>
                  <a
                    href="https://twitter.com/findmyaitool
"
                    target="_blank"
                    className={styles.socialIconAlignment}
                  >
                    <img loading="lazy" src={SocialIcon3} alt="twiter" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/findmyaitool"
                    target="_blank"
                    className={styles.socialIconAlignment}
                  >
                    <img loading="lazy" src={SocialIcon4} alt="linkdin" />
                  </a>
                  <a
                    href="https://www.producthunt.com/products/findmyaitool?utm_source=badge-featured&utm_medium=badge#findmyaitool"
                    target="_blank"
                    className={styles.socialIconAlignment}
                  >
                    <img loading="lazy" src={SocialIcon5} alt="producthunt" />
                  </a>
                </div>
              </div>
              <div className={styles.footerLinkAlignment}>
                <div>
                  <h2>Useful Links</h2>
                  <a href="/">Home</a>
                  <a href="/category">AI Tools Category</a>
                  <a href="/blog">Blog </a>
                  <a href="/submit-tool">Submit AI Tool</a>
                  <a href="/gpt-store">GPT Store</a>
                </div>
                <div>
                  <h2>Company</h2>
                  <a href="/hire-us-development">Hire Us</a>
                  <a href="/contact-us">Contact Us</a>
                  <a href="/sitemap.xml" target="_blank">
                    Sitemap
                  </a>
                  <a href="/blog-sitemap.xml" target="_blank">
                    Blog Sitemap
                  </a>
                  <a href="/tool-sitemap.xml" target="_blank">
                    Tool Sitemap
                  </a>
                  <a
                    href="/gpt-sitemap.xml
"
                    target="_blank"
                  >
                    GPT Sitemap
                  </a>
                  <a href="/terms-services">Terms & Condition</a>

                  <a href="/privacy-policy">Privacy Policy</a>
                </div>
                <div>
                  <h2>Contact Us</h2>
                  <div className={styles.concateAlignment}>
                    {" "}
                    <div className={styles.iconAlignment}>
                      <img loading="lazy" src={PhoneIcon} alt="PhoneIcon" />
                    </div>
                    <a href="callto:(+91) 98563 25460">(+91) 98563 25460</a>
                  </div>
                  <div className={styles.concateAlignment}>
                    {" "}
                    <div className={styles.iconAlignment}>
                      <img
                        loading="lazy"
                        src={FooterEmailIcon}
                        alt="FooterEmailIcons"
                      />
                    </div>
                    <a href="mailto:info@findmytool.com">info@findmytool.com</a>
                  </div>
                </div>
              </div>
              {/* <Subscribe /> */}
            </div>
          </div>
          <div className={styles.copyRightAlignment}>
            <p>
              Copyright Find My AI Tools © 2024 All Rights Reserved by{" "}
              <span>NexGen AI Technologies</span> Team.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
