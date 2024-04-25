"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./navbar.module.scss";
const Logo = "/assets/logo/logo2.svg";
const GoogleLogo = "/assets/icons/google-icon.svg";
import Link from "next/link";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import GoogleWithLogin from "@/module/auth/googlewithlogin";
import { setToken } from "@/store/ApiSlice/authSlice";
import useOnClickOutside from "@/hook/useOnClickOutside";
import { setCurrentPage } from "@/store/ApiSlice/gptSlice";
import { setScrollCategory } from "@/store/ApiSlice/aiToolsSlice";
import { getSession } from "@/helpers/authHelper";
import { useRouter } from "next/router";
const MessageIcon = "/assets/icons/message.svg";
const LogoutIcon = "/assets/images/logout.svg";
const MenuIcon = "/assets/icons/menu-icon.svg";
const CloseIcon = "/assets/icons/close-white-icon.svg";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [scrollY, setScrollY] = useState(0);
  const data = getSession();
  const userInfo = data;
  const firstName = userInfo?.userInfo?.fname;
  // const { tokendata } = useSelector((state) => state.auth);
  const isToken = getSession()?.access_token;
  const [mobileViewSidebar, setMobileViewSidebar] = useState(false);


  useEffect(() => {
    const onScroll = () => {
      const scrolling = window.scrollY;
      setScrollY(scrolling);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to track dropdown visibility
  const dropdownContainerRef = useRef();

  const createAvatar = (name) => {
    if (!name) return "";
    const initials = name.charAt(0).toUpperCase();
    return initials;
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };
  useOnClickOutside(dropdownContainerRef, () => setDropdownVisible(false));
  const logout = () => {
    dispatch(setToken(""));
    localStorage.clear();
    setDropdownVisible(false);
    dispatch(setCurrentPage(1));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <header
      className={classNames(styles.header, scrollY > 100 ? styles.app : "")}
    >
      <div className="container">
        <div className={styles.headerAlignment}>
          <div className={styles.leftContent}>
            <div
              className={styles.mobileViewMenu}
              onClick={() => setMobileViewSidebar(true)}
            >
              <img loading="lazy" src={MenuIcon} alt="MenuIcon" />
            </div>
            <Link href="/">
              <img loading="lazy" src={Logo} alt="Logo" />
            </Link>
            <nav>
              <Link
                href="/"
                className={router?.pathname === "/" ? styles.activeClass : ""}
              >
                Home
              </Link>
              <div onClick={() => dispatch(setScrollCategory(""))}>
                <Link
                  href="/category"
                  className={
                    router?.pathname === "/category" || router?.pathname.includes("/category")
                      ? styles.activeClass
                      : ""
                  }
                >
                  Categories
                </Link>
              </div>
              <Link
                href="/gpt-store"
                className={
                  router?.pathname === "/gpt-store" ||
                    router?.pathname === "/browse-all-gpts" ||
                    router?.pathname.includes("/gpt-category")
                    ? styles.activeClass
                    : ""
                }
              >
                GPT Store
              </Link>
              <Link
                href="/ai-shorts-videos"
                className={
                  router?.pathname === "/ai-shorts-videos" ? styles.activeClass : ""
                }
              >
                Shorts Video{" "}
              </Link>
              <Link
                href="/blog"
                className={
                  router?.pathname === "/blog" || router?.pathname.includes("blog")
                    ? styles.activeClass
                    : ""
                }
              >
                Blog
              </Link>
              <Link
                href="/submit-tool"
                className={
                  router?.pathname === "/submit-tool" ? styles.activeClass : ""
                }
              >
                Submit AI Tool
              </Link>
            </nav>
          </div>

          <div className={styles.rightContent}>
            <div>
              {isToken ? (
                <div
                  style={{ position: "relative" }}
                  ref={dropdownContainerRef}
                >
                  <button onClick={toggleDropdown} aria-label="FirstName">
                    <div className={styles?.avatar}>
                      {createAvatar(firstName)}
                    </div>
                    <p>{firstName}</p>
                  </button>
                  <div
                    className={
                      dropdownVisible
                        ? classNames(styles.toggleDropdownmenu, styles.show)
                        : classNames(styles.toggleDropdownmenu)
                    }
                  >
                    <button
                      onClick={() => {
                        router.push("/user/bookmark");
                        setDropdownVisible(false);
                        dispatch(setCurrentPage(1));
                      }}
                      aria-label=" Bookmark Tools"
                      className={styles.secondButon}
                    >
                      <img loading="lazy" src={MessageIcon} alt="GoogleLogo" />
                      Bookmark Tools
                    </button>

                    <button
                      className={styles.secondButon}
                      onClick={() => {
                        router.push("/user/gpt-bookmark");
                        setDropdownVisible(false);
                        dispatch(setCurrentPage(1));
                      }}
                      aria-label=" Bookmark GPTs"
                    >
                      <img loading="lazy" src={MessageIcon} alt="GoogleLogo" />
                      Bookmark GPTs
                    </button>

                    <button
                      onClick={() => {
                        logout();
                      }}
                      className={styles.secondButon}
                      aria-label="Logout"
                    >
                      <img loading="lazy" src={LogoutIcon} alt="GoogleLogo" />
                      Logout{" "}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* <GoogleWithLogin text={"Login"} /> */}
                </>
              )}
            </div>
          </div>
        </div>
        {mobileViewSidebar && (
          <div className={styles.mobileViewSidebarWrapper}></div>
        )}
        <div
          className={
            mobileViewSidebar
              ? classNames(styles.mobileViewSidebar, styles.openSidebarMenu)
              : classNames(styles.mobileViewSidebar, styles.closeSidebarMenu)
          }
        >
          <div className={styles.mobileViewMenuHeader}>
            <Link href="/">
              <div
                className={styles.logo}
                onClick={() => setMobileViewSidebar(false)}
              >
                <img loading="lazy" src={Logo} alt="Logo" />
              </div>
            </Link>
            <div
              className={styles.closeIcon}
              onClick={() => setMobileViewSidebar(false)}
            >
              <img loading="lazy" src={CloseIcon} alt="CloseIcon" />
            </div>
          </div>
          <div className={styles.mobileMenuOptionDetails}>
            <Link href="/">
              <p
                className={mobileViewSidebar ? styles.activeMenu : ""}
                onClick={() => setMobileViewSidebar(false)}
              >
                Home
              </p>
            </Link>
            <Link href="/category">
              <p
                className={mobileViewSidebar ? styles.activeMenu : ""}
                onClick={() => setMobileViewSidebar(false)}
              >
                AI Tools Category
              </p>
            </Link>
            <Link href="/gpt-store">
              <p
                className={mobileViewSidebar ? styles.activeMenu : ""}
                onClick={() => setMobileViewSidebar(false)}
              >
                GPT Store
              </p>
            </Link>
            <Link href="/ai-shorts-videos">
              <p
                className={mobileViewSidebar ? styles.activeMenu : ""}
                onClick={() => setMobileViewSidebar(false)}
              >
                AI Shorts Video
              </p>
            </Link>
            <Link href="/blog">
              <p
                className={mobileViewSidebar ? styles.activeMenu : ""}
                onClick={() => setMobileViewSidebar(false)}
              >
                Blog
              </p>
            </Link>
            <Link href="/submit-tool">
              <p
                className={mobileViewSidebar ? styles.activeMenu : ""}
                onClick={() => setMobileViewSidebar(false)}
              >
                Submit AI Tool
              </p>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
