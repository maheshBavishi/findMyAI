"use client";
import React, { useEffect, useState } from "react";
import Categoriesdetailsbreadcrumbs from "./categoriesdetailsbreadcrumbs";
import Categoriesinformation from "./categoriesinformation";
import Copycodesection from "./copycodesection";
import Categoriestextsection from "./categoriestextsection";
import Categoriestools from "./categoriestools";
import { useDispatch, useSelector } from "react-redux";
import { getAiTools, setCategoryDetails } from "@/store/ApiSlice/aiToolsSlice";
import Loader from "@/shared/components/Loader";
import DefaultErrorPage from "next/error";
import Metadata from "./metadata";
import { useRouter } from "next/router";

export default function Categoriesdetails() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loader, setLodar] = useState(false);
  const { categoryDetails, loading } = useSelector((state) => state.aiTools);
  const pathParts = router?.pathname?.split("/");
  const lastPart = pathParts[pathParts.length - 1];
  const trimmedLastPart = lastPart.trim();

  let fetchedItem;
  const handleOnGetData = () => {
    setLodar(true);
    dispatch(getAiTools({ search: trimmedLastPart.split("--").join(" ") }))
      .then((results) => {
        fetchedItem = results?.payload?.payload?.aiTool?.[0];
        dispatch(
          setCategoryDetails({
            item: fetchedItem,
          })
        );
        setLodar(false);
      })
      .catch((error) => {
        setLodar(false);
      });
  };
  useEffect(() => {
    handleOnGetData();
  }, []);
  return (
    <div>
<Metadata/>
      {loader ? (
        <Loader />
      ) : categoryDetails?.item ? (
        <>
          <Categoriesdetailsbreadcrumbs />
          <Categoriesinformation />
          <Copycodesection />
          <Categoriestextsection />
          <Categoriestools />
        </>
      ) : (
        <DefaultErrorPage />
      )}
    </div>
  );
}
