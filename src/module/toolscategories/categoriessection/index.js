"use client";
import React, { useEffect } from "react";
import styles from "./categoriessection.module.scss";
import Categoriescard from "./categoriescard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAiToolsCategory,
  setSubCategoryDetails,
  setSubcategoryId,
} from "@/store/ApiSlice/aiToolsSlice";
import { usePathname, useRouter } from "next/navigation";
import { setCurrentPage } from "@/store/ApiSlice/gptSlice";
import Skeleton from "react-loading-skeleton";
import Nodatashow from "@/shared/components/nodatashow";
const Nodata = "/assets/icons/no-data-vector.svg";

export default function Categoriessection() {
  const dispatch = useDispatch();
  const route = useRouter();
  const { getAiToolsCategoryData, categoryLoader, scrollcategory } =
    useSelector((state) => state.aiTools);
  useEffect(() => {
    dispatch(getAiToolsCategory({ status: "active", limit: 50 }));
    dispatch(setCurrentPage(1));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (getAiToolsCategoryData?.length > 0 && scrollcategory) {
        const element = document.getElementById(scrollcategory);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }, 1000);
  }, [getAiToolsCategoryData]);



  return (
    <div
      className={styles.categoriessectionAllContnetAlignment}
      data-scroll
      data-scroll-section
      data-scroll-direction="horizontal"
    >
      <div className="container">
        <div className={styles.categoryHeadingAlignment}>
          <h1>AI Tools Categories</h1>
          <p>
            Streamline your search and find the best AI solutions to enhance
            your operations, improve customer experiences and drive growth.
          </p>
        </div>
        {categoryLoader ? (
          <>
            <div className={styles.headingSkeletion}>
              <Skeleton className={styles.skeletionTilte} baseColor="#232147" />
            </div>
            <div className={styles.grid}>
              {[...Array(6)].map((_, index) => (
                <>
                  <Categoriescard loading={categoryLoader} />
                </>
              ))}
            </div>
          </>
        ) : (
          <>
            {getAiToolsCategoryData?.length > 0 ? (
              <>
                {" "}
                {getAiToolsCategoryData?.map((category, i) => {
                  return (
                    <div
                      key={i}
                      className={styles.categoryAllSubDetailsAlignment}
                      id={category?.name.toLowerCase()}
                    >
                      {category?.aiToolSubCategoryCount > 0 && (
                        <div className={styles.title}>
                          <h2>{category?.name}</h2>
                        </div>
                      )}

                      {category?.aiToolSubCategory?.length > 0 &&
                      category?.aiToolSubCategoryCount > 0 ? (
                        <div className={styles.grid}>
                          {category?.aiToolSubCategory
                            ?.filter((subCat) => subCat.status === "active")
                            ?.map((subCat, j) => (
                              <Categoriescard key={j} subCat={subCat} />
                            ))}
                        </div>
                      ) : (
                        <>
                        
                        </>
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <>
              <Nodatashow/>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
