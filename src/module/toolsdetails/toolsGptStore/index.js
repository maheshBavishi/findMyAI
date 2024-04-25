import React, { useEffect } from "react";
import styles from "./toolsGptStore.module.scss";
import ViewAll from "@/shared/components/viewAll";
import GptStoreCard from "@/module/gptStore/gptStoreCard";
import { useDispatch, useSelector } from "react-redux";
import { GetGpt } from "@/store/ApiSlice/gptSlice";
export default function ToolsGptStores() {
  const { GetGptData, gptLoading } = useSelector((state) => state.gpt);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetGpt({ page: 1, limit: 6 ,        selectedData:true
    }));
  }, []);
  return (
    <div className={styles.toolsGptStoresSection}>
      <div className={styles.toolsGptStoresHeading}>
        <div className={styles.headingName}>
          <h4>Explore GPT's</h4>
          <p>Discover AI tools that are related to this help tool.</p>
        </div>
        <div>
          <ViewAll />
        </div>
      </div>

      <div className={styles.toolsGptStoresAlignment}>
        <div className={styles.toolsGptStoresGrid}>
          {GetGptData.slice(0, 6)?.map((item) => (
            <GptStoreCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
