"use client ";
import React, { useState } from "react";
import styles from "./subscribe.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { PostSubscribe } from "@/store/ApiSlice/restAllSlice";
import toast from "react-hot-toast";
import { getSession } from "@/helpers/authHelper";
const RightIcon = "/assets/icons/right-fill.svg";
export default function Subscribe() {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  // const { tokendata } = useSelector((state) => state.auth);
  const tokendata = getSession()?.access_token;

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
    <div className={styles.subscribeBox}>
      <h6>Subscribe</h6>
      <div className={styles.input}>
        <input
          placeholder="Email address"
          type="text"
          name="email"
          value={values?.email}
          onChange={(e) => handleOnChange(e)}
        />
        <div
          className={styles.sendButton}
          onClick={() => {
            handleOnSubscribe();
          }}
        >
          <img loading="lazy" src={RightIcon} alt="RightIcon" />
        </div>
      </div>
      <p>
        Stay up to date with our latest AI Tools List and New AI Tools by
        subscribing to our newsletter. Simply enter your email address below and
        click 'subscribe' to get started.
      </p>
    </div>
  );
}
