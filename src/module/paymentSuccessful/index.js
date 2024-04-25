"use client";
import React, { useEffect } from "react";
import styles from "./paymentSuccessful.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getPathMatch } from "next/dist/shared/lib/router/utils/path-match";
import { AuthCodeValidation, getPayment } from "@/store/ApiSlice/restAllSlice";
import { useSearchParams } from "next/navigation";
import Error from "next/error";
import { useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import Nodatashow from "@/shared/components/nodatashow";
const SuccessIcon = "/assets/icons/success-icon.svg";
const ProfileImg = "/assets/images/profile-image.svg";
const CardImg = "/assets/images/card-img.png";

export default function PaymentSuccessful() {
  const dispatch = useDispatch();
  const params = useSearchParams();
  const transactionId = params.get("authcode");
  const [paymentData, setPaymentData] = useState({});
  const [validation, setValidation] = useState(true);
  const [loading, setLoader] = useState(false);

  useEffect(() => {
    const handleOnAuthCodeValidation = async () => {
      try {
        setLoader(true);
        const response = await dispatch(
          AuthCodeValidation({ type: "receipt", authcode: transactionId })
        );
        if (response?.payload?.success) {
          setLoader(false);

          const paymentResponse = await dispatch(
            getPayment({ link: transactionId })
          );
          const paymentPayload = paymentResponse?.payload?.payload;
          if (
            paymentPayload &&
            paymentPayload.payments &&
            paymentPayload.payments.length > 0
          ) {
            setPaymentData(paymentPayload.payments[0]);
            setValidation(true);
            setLoader(false);
          } else {
            setValidation(false);
          }
        } else {
          setValidation(false);
          setLoader(false);
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

  const createAvatar = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };
  if (!validation) {
    return <Nodatashow />;
  } else {
    return (
      <div className={styles.paymentSuccessFullSection}>
        <div className="container">
          <div className={styles.paymentSuccessBg}>
            <div className={styles.paymentMain}>
              <div className={styles.paymentTopDetails}>
                <div className={styles.successIcon}>
                  {loading ? (
                    <Skeleton
                      baseColor="#cccccc29"
                      circle={true}
                      height={60}
                      width={60}
                    />
                  ) : (
                    <img loading="lazy" src={SuccessIcon} alt="SuccessIcon" />
                  )}
                </div>
                <div>
                  {loading ? (
                    <>
                      <h4>
                        {" "}
                        <Skeleton
                          baseColor="#cccccc29"
                          height={26}
                          width={150}
                        />
                      </h4>
                      <p>
                        <Skeleton
                          baseColor="#cccccc29"
                          height={16}
                          width={200}
                        />
                      </p>
                    </>
                  ) : (
                    <>
                      <h4>Payment Success!</h4>
                      <p>Thank you for your transfer</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.paymentBottomDetails}>
              {loading ? (
                <>
                  <div className={styles.paymentProfileDetails}>
                    <Skeleton
                      baseColor="#cccccc29"
                      height={58}
                      width={58}
                      circle={true}
                    />

                    <div>
                      <h6>
                        <Skeleton
                          baseColor="#cccccc29"
                          height={26}
                          width={200}
                        />
                      </h6>
                      <p>
                        <Skeleton
                          baseColor="#cccccc29"
                          height={16}
                          width={200}
                        />
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className={styles.paymentProfileDetails}>
                  <div className={styles.paymentProfileImg}>
                    <div className={styles?.avatar}>
                      {createAvatar(paymentData?.uid?.fname)}
                    </div>
                  </div>
                  <div>
                    <h6>{paymentData?.uid?.fname}</h6>
                    <p>{paymentData?.uid?.email}</p>
                  </div>
                </div>
              )}

              {loading ? (
                <div className={styles.priceAlignment}>
                  <h5>$00.00</h5>
                </div>
              ) : (
                <div className={styles.priceAlignment}>
                  <h5>${paymentData?.subscriptionPlanData?.price}</h5>
                </div>
              )}

              <>
                <div className={styles.notesAlignment}>
                  <span>NOTE</span>
                  <p>
                    You will also be sent the submission tool link & feature
                    tool to your registered Gmail address. If you haven't
                    received an email, you can reach out to us at
                    info@findmyaitool.com.
                  </p>
                </div>
                {loading ? (
                  <div className={styles.submitButton}>
                    <div className={styles.buttonAlignment}>
                      <Skeleton baseColor="#cccccc29" height={50} width={355} />
                    </div>
                  </div>
                ) : (
                  paymentData?.subscriptionPlanData?.name !==
                    "Featured Plan" && (
                    <Link href={`/submitai-form?authCode=${transactionId}`}>
                      <div className={styles.submitButton}>
                        <div className={styles.buttonAlignment}>
                          <button aria-label="Click here for Submit Your tool">
                            Click here for Submit Your tool
                          </button>
                        </div>
                      </div>
                    </Link>
                  )
                )}

                {loading ? (
                  <div className={styles.submitButton}>
                    <div className={styles.buttonAlignment}>
                      <Skeleton baseColor="#cccccc29" height={50} width={355} />
                    </div>
                  </div>
                ) : (
                  paymentData?.subscriptionPlanData?.name !== "Basic Plan" && (
                    <Link
                      href={`/auth/purchase/featured-tool?authCode=${transactionId}`}
                    >
                      <div className={styles.submitButton}>
                        <div className={styles.buttonAlignment}>
                          <button aria-label="Click here to feature Your tool">
                            Click here to feature Your tool
                          </button>
                        </div>
                      </div>
                    </Link>
                  )
                )}
              </>

              <div className={styles.paymentCardBoxAlignemnt}>
                {loading ? (
                  <>
                    <div className={styles.cardImg}>
                      <Skeleton baseColor="#cccccc29" height={34} width={50} />
                    </div>
                    <div className={styles.paymentCardDetails}>
                      <Skeleton baseColor="#cccccc29" height={20} width={150} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.cardImg}>
                      <img loading="lazy" src={CardImg} alt="cardImg" />
                    </div>
                    <div className={styles.paymentCardDetails}>
                      <h6>PAYMENT VIA CARD</h6>
                    </div>
                  </>
                )}
              </div>

              {loading ? (
                <div className={styles.paidButton}>
                  {" "}
                  <Skeleton baseColor="#cccccc29" height={50} width={100} />
                </div>
              ) : (
                <div className={styles.paidButton}>
                  <button aria-label="Paid">Paid</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
