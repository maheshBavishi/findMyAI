"use client";
import React, { useEffect } from "react";
import styles from "./authorAllDetails.module.scss";
import AuthorCard from "../authorCard";
import { useDispatch, useSelector } from "react-redux";
import PaginatedList from "@/module/home/blog/PaginatedList";
import LazyLoad from "@/helpers/lazyLoad";
import Nodatashow from "@/shared/components/nodatashow";
import { useRouter } from "next/router";

export default function AuthorAllDetails() {
  const router = useRouter();
  const lastPathname = router?.pathname?.substring(router?.pathname?.lastIndexOf("/") + 1);
  const cleanedPathname = lastPathname?.split("-").join(" ");
  const { getAllBlog, blogLoading, getpaginationBlog } = useSelector(
    (state) => state.blog
  );
  const count = getAllBlog?.length;

  return (
    <LazyLoad id={AuthorAllDetails}>
      <div className={styles.authorAllDetailsSection}>
        <div >
          {blogLoading ? (
            <div className={styles.authorAllDetailsGrid}>
              {[...Array(6)].map((_, index) => (
                <AuthorCard loading={true} key={index}/>
              ))}
            </div>
          ) : (
            <>{
              getpaginationBlog?.length > 0 ? (<>
                <div className={styles.authorAllDetailsGrid}>
                  
                      {getpaginationBlog
                  ?.filter((item) => {
                    let isAuthorMatch =
                      item?.attributes?.author?.add_author?.data?.attributes?.author_name?.includes(
                        cleanedPathname
                      );
                    return isAuthorMatch;
                  })
                  .map((item,i) => {
                    return <AuthorCard item={item} key={i}/>;
                  })}
                  </div>            
              </>):(<>
                <Nodatashow/>

              </>)
            }
            </>
          )}
        </div>
      </div>
      <div style={{ marginTop: "40px" }}>
        {count > 9 && <PaginatedList data={getAllBlog} itemsPerPage={9} />}
      </div>
    </LazyLoad>
  );
}
