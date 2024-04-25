"use client";
import React, { useEffect, useState } from "react";
import TopBar from "../topBar";
import Navbar from "../navbar";
import Footer from "../footer";
import store, { persistor } from "@/store";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import client from "@/helpers/apolloClient";
import { ApolloProvider } from "@apollo/client";
import ProgressBar from "../ProgressBar";
import { getSession } from "@/helpers/authHelper";
import isEmpty from "@/helpers/common";
import Nodatashow from "../nodatashow";
import NoDataFound from "../nodatafound";
import { useRouter } from "next/router";

export default function Wrapper({ children }) {
  const router = useRouter();
  const tokenData = getSession()?.access_token;
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  const isValidRoute =
    [
      "/",
      "/ai-shorts-videos",
      "/auth/purchase/receipt",
      "/auth/purchase/featured-tool",
      "/browse-tools",
      "/contact-us",
      "/hire-us-development",
      "/popular-tools",
      "/privacy-policy",
      "/submit-tool",
      "/submitai-form",
      "/terms-services",
      "/browse-all-gpts",
      "/gpt-store",
      "/blog",
      "/gpt-category",
      "/category",
      "/authors-list",
    ]?.includes(router?.pathname) || router.query;


  if (!isValidRoute && !tokenData) {
    return <NoDataFound />;
  } else if (
    !isValidRoute &&
    !["/user/bookmark", "/user/gpt-bookmark"].includes(router?.pathname)
  ) {
    return <NoDataFound />;
  } else {
    return (
      <div>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <Toaster position="top-right" reverseOrder={false} />

              <>
                <ProgressBar pathname={router?.pathname} />
                <TopBar />
                <Navbar />
              </>

              <div data-scroll className="details-layout">
                {children}
              </div>

              <Footer />
            </PersistGate>
          </Provider>
        </ApolloProvider>
      </div>
    );
  }
}
