import React, { useEffect, useState } from "react";
import styles from "./prisingDetails.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubscriptionPlan,
  getSubscriptionPlan,
} from "@/store/ApiSlice/subscriptionPlanSlice";
import Nodatashow from "@/shared/components/nodatashow";
import Skeleton from "react-loading-skeleton";
const RightSign = "/assets/icons/right-check-sign.svg";
const closeSign = "/assets/icons/close-sign.svg";
const Nodata = "/assets/icons/no-data-vector.svg";

export default function PrisingDetails() {
  const { getAllplan } = useSelector((state) => state.subscriptionPlan);

  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(getSubscriptionPlan({}));
    setLoading(false);
  }, []);
  const handlePurchesPlan = (item) => {
    setLoading(true);
    setSelectedPlan(item);

    dispatch(addSubscriptionPlan({ id: item?._id }))
      .unwrap()
      .then((res) => {
        window.open(res?.payload, "_self");
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <div className={styles.prisingSection}>
      <div>
        {loading ? (
          <div className={styles.prisingGrid}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div className={styles.prisingGridItem} key={i}>
                <Skeleton
                  height={500}
                  baseColor="#cccccc29"
                  // baseColor="hsl(0deg 0% 100% / 12%"
                  // highlightColor="hsl(0deg 0% 100% / 12%"
                />
              </div>
            ))}
          </div>
        ) : getAllplan?.length > 0 ? (
          <div className={styles.prisingGrid}>
            {getAllplan.map((item, i) => {
              return (
                <>
                  <div className={styles.prisingGridItem}>
                    <div className={styles.prisingBox}>
                      <div className={styles.prisingTop}>
                        <h6>{item?.name}</h6>
                        <span>Submit Tool</span>
                        <div className={styles.priceDetails}>
                          <p>${item?.price}</p>
                          <span>One Time Fee</span>
                        </div>
                      </div>
                      <div className={styles.prisignPlanList}>
                        <div className={styles.listName}>
                          <div className={styles.prisingIcon}>
                            <img
                              loading="lazy"
                              src={
                                item?.name === "Featured Plan"
                                  ? closeSign
                                  : RightSign
                              }
                              alt="RightSign"
                            />
                          </div>
                          <p>Submit one AI tool for listing.</p>
                        </div>
                        <div className={styles.listName}>
                          <div className={styles.prisingIcon}>
                            <img
                              loading="lazy"
                              src={
                                item?.name === "Basic Plan"
                                  ? closeSign
                                  : RightSign
                              }
                              alt="closeSign"
                            />
                          </div>
                          <p>
                            Displaying the tool at the top of that category for
                            7 days.{" "}
                          </p>
                        </div>
                        <div className={styles.listName}>
                          <div className={styles.prisingIcon}>
                            <img
                              loading="lazy"
                              src={
                                item?.name === "Basic Plan"
                                  ? closeSign
                                  : RightSign
                              }
                              alt="closeSign"
                            />
                          </div>
                          <p>
                            Tool will be featured on the website's homepage on a
                            rotating basis for 7 days.{" "}
                          </p>
                        </div>
                        <div className={styles.listName}>
                          <div className={styles.prisingIcon}>
                            <img
                              loading="lazy"
                              src={RightSign}
                              alt="RightSign"
                            />
                          </div>
                          <p>Standard support.</p>
                        </div>
                      </div>
                      <div className={styles.selectButton}>
                        <button
                          onClick={() => handlePurchesPlan(item)}
                          aria-label="select Plan"
                        >
                          Select Plan
                          {selectedPlan === item && planLoader && (
                            <span className={styles.loader}></span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        ) : (
          <>
            <Nodatashow />
          </>
        )}
      </div>
    </div>
  );
}
