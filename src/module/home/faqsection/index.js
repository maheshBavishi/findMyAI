"use client";
import React, { useState } from "react";
import styles from "./faqsection.module.scss";
import classNames from "classnames";
import AnimatedSection from "@/shared/components/Animation/AnimatedSection";
import LazyLoad from "@/helpers/lazyLoad";
const PlusIcon = "/assets/icons/plus.svg";
const MinusIcon = "/assets/icons/minus-icon.svg";

export default function Faqsection() {
  const faqsData = [
    {
      question: "What is the FindMyAiTool and how can it be used?",
      answer:
        "The FindMyAiTool is a list of ai tools of software tools that assist in developing and implementing AI projects. It includes programming libraries, frameworks, and SDKs to create AI-based applications, algorithms, and models.\n\n " +
        "Users such as individuals, businesses, and researchers can use the directory to find the tools best suited to their needs. The directory provides information on the features, benefits, and limitations of each tool, making it a valuable resource for those interested in AI technology.\n\n " +
        "By browsing through the directory, users can access relevant information on various AI tools and select the appropriate ones for their projects.",
    },
    {
      question: "What are the benefits of using the FindMyAiTool?",
      answer:
        "The FindMyAiTool provides several benefits to individuals, businesses, and researchers working with AI technology.\n\n" +
        "Firstly, it provides a comprehensive collection of software tools, frameworks, and SDKs, making it easier to find and compare different AI solutions.\n\n" +
        "Secondly, the directory provides information on the features, benefits, and limitations of each tool, enabling users to make informed decisions on selecting the appropriate tools for their projects.\n\n" +
        "Thirdly, using the directory saves time and effort that would have been spent on searching for relevant AI tools. Lastly, it can aid in promoting collaboration and knowledge-sharing among AI professionals and enthusiasts.",
    },
    {
      question: "How can businesses and individuals use the FindMyAiTool for AI development?",
      answer:
        "The FindMyAiTool can be a useful resource for businesses and individuals engaged in AI development. They can browse through the directory to find appropriate tools and platforms that match their specific requirements.\n\n" +
        "The directory provides comprehensive information about various AI tools, including their features, benefits, and limitations, making it easier to make informed decisions on tool selection.\n\n" +
        "Additionally, the directory can aid in keeping up-to-date with the latest AI tools and technologies, providing opportunities for innovation and staying ahead of competitors. Overall, the AI Tools Directory serves as a valuable reference for anyone involved in AI development, offering a wide range of resources and knowledge.",
    },
    {
      question: "Is FindMyAiTool  Constantly Updated On This Website?",
      answer: "Yes, We Aim To Keep FindMyAiTool  Up-To-Date With The Latest Advancements. Regular Updates May Include Improvements To Performance, New Features, And Optimizations.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <LazyLoad id={"Faqsection"}>
      <div className={styles.faqsectionAlignment}  >
        <div className="container">
          <div className={styles.title}>
            {/* <AnimatedSection animationType="fade-up" duration={800} delay={400}> */}
            <h2>
              Frequently <span>Asked</span> Questions
            </h2>
            {/* </AnimatedSection> */}
          </div>
          <div className={styles.boxcenterAlignment}>
            {faqsData.map((item, index) => (
              <div className={classNames(styles.mainBox)} key={index}>
                <div className={styles.header}>
                  <div className={styles.text}>
                    <h5>{`0${index + 1}`}</h5>
                    <h5>{item?.question}</h5>
                  </div>
                  <div className={classNames(styles.icon, openIndex === index ? styles.iconsColorChange : "")} onClick={() => handleToggle(index)}>
                    <img src={openIndex === index ? MinusIcon : PlusIcon} alt={openIndex === index ? "MinusIcon" : "PlusIcon"} />
                  </div>
                </div>
                <div className={classNames(styles.body, openIndex === index ? styles.showData : styles.hideData)}>
                  <div className={styles.bodyTextGrid}>
                    <div></div>
                    {item?.answer.split("\n").map((paragraph, pIndex) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LazyLoad>
  );
}
