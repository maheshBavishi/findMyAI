"use client";

import React, { useEffect } from "react";
import styles from "./gptCategory.module.scss";
import GptCategoriescard from "./gptCategoriescard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAiToolsCategory,
  setSubCategoryDetails,
  setSubcategoryId,
} from "@/store/ApiSlice/aiToolsSlice";
import { useRouter } from "next/navigation";
import {
  GetGptCategoryData,
  GetGptMainCategoryData,
  setCurrentPage,
} from "@/store/ApiSlice/gptSlice";
import { getMainDefinition } from "@apollo/client/utilities";
import Categoriescard from "../toolscategories/categoriessection/categoriescard";
import Skeleton from "react-loading-skeleton";
import Nodatashow from "@/shared/components/nodatashow";
const Nodata = "/assets/icons/no-data-vector.svg";

export default function GptCategory() {
  const dispatch = useDispatch();
  const route = useRouter();
  const { GptCategoryData, gptLoading, GptMainCategoryData, scrollgptcategory } = useSelector(
    (state) => state.gpt
  );

  useEffect(() => {
    dispatch(GetGptMainCategoryData({ status: "active" }));
    dispatch(setCurrentPage(1));
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (GptMainCategoryData?.length > 0 && scrollgptcategory) {
        const element = document.getElementById(scrollgptcategory);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }, 1000);
  }, [GptMainCategoryData]);
  return (
    <div
      className={styles.gptCategoriessectionAllContnetAlignment}
      data-scroll
      data-scroll-section
      data-scroll-direction="horizontal"
    >
      <div className="container">
        <div className={styles.gptCategoryHeadingAlignment}>
          <h4>GPTs Categories</h4>
          <p>
            Streamline your search and find the best AI solutions to enhance
            your operations, improve customer experiences and drive growth.
          </p>
        </div>
        {gptLoading ? (
          <>
            <div className={styles.headingSkeletion}>
              <Skeleton className={styles.skeletionTilte} baseColor="#232147" />
            </div>
            <div className={styles.grid}>
              {[...Array(6)].map((_, index) => (
                <GptCategoriescard loading={gptLoading} />
              ))}
            </div>
          </>
        ) : (
          <>
            {GptMainCategoryData?.length > 0 ? (
              <>
                {GptMainCategoryData.map((category, i) => (
                  <>
                    {category.categoryCount > 0 && (
                      <div className={styles.gptCategoryAllSubDetailsAlignment} key={i} id={category.name.toLowerCase()}>
                        <div className={styles.title}>
                          <h4>{category.name}</h4>
                        </div>
                      </div>
                    )}

                    {category.category.length > 0 && category.categoryCount > 0 && (
                      <div className={styles.grid}>
                        {category.category.map((subcategory, j) => (
                          <GptCategoriescard key={j} subCat={subcategory} />
                        ))}
                      </div>
                    )}
                  </>
                ))}
              </>
            ) : (
              <Nodatashow />
            )}

          </>
        )}
      </div>
    </div>
  );
}
