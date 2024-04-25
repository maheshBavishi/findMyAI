"use client";
import React, { useEffect, useState } from "react";
import styles from "./featuredyourtool.module.scss";
import Featuredyourtoolbanner from "./featuredyourtoolbanner";
import Featuredyourtoolcard from "./featuredyourtoolcard";
import FeaturedToolsBottom from "./featuredToolsBottom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  getAiTools,
  setSelectedDatesData,
  updateAiTools,
} from "@/store/ApiSlice/aiToolsSlice";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import Error from "next/error";
import { AuthCodeValidation, getPayment } from "@/store/ApiSlice/restAllSlice";
import { getSession } from "@/helpers/authHelper";
import Nodatashow from "@/shared/components/nodatashow";

export default function Featuredyourtool() {
  const params = useSearchParams();
  const transactionId = params.get("authCode");
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTool, setSelectedTool] = useState([]);
  const [className, setClassName] = useState(null);
  // const { tokendata } = useSelector((state) => state.auth);
  const tokendata = getSession()?.access_token;
  const userId = getSession()?.userInfo;
  const [validation, setValidation] = useState(true);
  const dispatch = useDispatch();
  const route = useRouter();
  let toastCount = 0;
  useEffect(() => {
    const handleOnAuthCodeValidation = async () => {
      try {
        const response = await dispatch(
          AuthCodeValidation({
            type: "featured-aiTool",
            authcode: transactionId,
          })
        );
        if (response?.payload?.success) {
          setValidation(true);
        } else {
          setValidation(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setValidation(false);
      }
    };
    if (transactionId) {
      handleOnAuthCodeValidation();
    }
  }, [dispatch, transactionId]);
  const handleOnSubmit = () => {
    if (!tokendata) {
      toast.error("Please login to use services");
    } else if (selectedDates?.length === 0) {
      if (toastCount < 3) {
        toast.error("Please select featured date ");
        toastCount++;
      }
    } else {
      if (selectedTool && selectedDates?.length > 0) {
        const formData = new FormData();
        formData.append("isFeatured", true);
        formData.append("transactionId", transactionId);

        if (selectedDates[0]) {
          const featuredStartDate = moment(selectedDates[0])
            // .add(1, "days")
            .format("YYYY-MM-DD");
          formData.append("featuredStartDate", featuredStartDate);
        }
        dispatch(
          updateAiTools({
            body: formData,
            tokendata: tokendata,
            id: selectedTool?._id,
          })
        ).then((res) => {
          if (res?.payload?.success === true) {
            toast.success("Your tool has been featured");
            dispatch(setSelectedDatesData(res?.payload?.payload));
            route.push("/");
            dispatch(
              getAiTools({
                page: 1,
                limit: 12,
                status: "approved",
                uid: userId?._id,
                selectedData: true,
              })
            );
          } else {
            toast.error("Your tool has not been featured");
          }
        });
      }
    }
  };
  if (!validation) {
    return <Nodatashow />;
  }
  return transactionId && validation ? (
    <div>
      <Featuredyourtoolbanner
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
      />
      <Featuredyourtoolcard
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        setSelectedTool={setSelectedTool}
        selectedTool={selectedTool}
        setClassName={setClassName}
        className={className}
      />
      <FeaturedToolsBottom
        handleOnSubmit={handleOnSubmit}
        selectedDates={selectedDates}
        selectedTool={selectedTool}
      />
    </div>
  ) : (
    <Error statusCode={404} />
  );
}
