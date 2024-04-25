"use client";
import React, { useEffect } from "react";
import Blogdetailsbanner from "./blogdetailsbanner";
import Blogdetailslist from "./blogdetailslist";
import { useParams, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "@/store/ApiSlice/blogSlice";
import Loader from "@/shared/components/Loader";
import { NextSeo } from "next-seo";

export default function Blogdetails() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { blogLoading } = useSelector((state) => state.blog);
  const lastPathname = pathname.substring(pathname.lastIndexOf("/") + 1);

  useEffect(() => {
    dispatch(getBlog({ slug: lastPathname }))
      .then((res) => {})
      .catch(() => {});
  }, [pathname]);

  return (
    <div>
      <Blogdetailsbanner />
      <Blogdetailslist />
    </div>
  );
}
