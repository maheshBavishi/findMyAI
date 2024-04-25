"use client";
import React, { useState } from "react";
import styles from "./promptStarters.module.scss";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
const CopyIcon = "/assets/icons/copy-icon.svg";
const check = "/assets/images/check.png";

export default function PromptStarters() {
  const { gptDetails, gptLoading } = useSelector((state) => state.gpt);
  const prompts = gptDetails?.promptStater
    ? (() => {
        try {
          return JSON.parse(gptDetails.promptStater.replace(/'/g, '"'));
        } catch (error) {
          return [];
        }
      })()
    : [];

  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopyClick = (index, prompt) => {
    navigator.clipboard.writeText(prompt);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000); // Reset copied index after 1 second
  };
  return (
    <div className={styles.promptStartersSection}>
      <div className={styles.promptStartersHeading}>
        {gptLoading ? (
          <>
            <Skeleton
              className={styles.featureFunctionLeft}
              baseColor="#232147"
            />
          </>
        ) : (
          <>
            <h2>Prompt Starters</h2>{" "}
          </>
        )}
        {gptLoading ? (
          <>
            <Skeleton
              className={styles.featureFunctionLeft}
              baseColor="#232147"
            />
          </>
        ) : (
          <>
            <p>
              Unleash your creativity with our prompt starters, sparking ideas
              and inspiration right from the start.
            </p>{" "}
          </>
        )}
      </div>

      <div className={styles.promptStartersDetails}>
     
        <div className={styles.promptStartersBox}>
        {gptLoading ? (
              <>
                <Skeleton
                  className={styles.promptStartersBox}
                  baseColor="#232147"
                />
              </>
            ) : (
              <>
   <ul>
            {prompts?.length > 0 ? (
              <>
                {prompts?.map((prompt, index) => (
                  <li
                    key={index}
                    onClick={() => handleCopyClick(index, prompt)}
                  >
                    {" "}
                    {prompt}{" "}
                    <img
                      src={
                        copiedIndex !== null && index === copiedIndex
                          ? check
                          : CopyIcon
                      }
                      width="20px"
                      height="20px"
                      alt="CopyIcon"
                    />
                  </li>
                ))}
              </>
            ) : (
              <li>No Prompt Starters Found</li>
            )}
          </ul>         </>
            )}  
        
        </div>
      </div>
    </div>
  );
}
