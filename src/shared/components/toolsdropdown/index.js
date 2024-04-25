import React, { useRef, useState } from "react";
import styles from "./toolsdropdown.module.scss";
import Link from "next/link";
import useOnClickOutside from "@/hook/useOnClickOutside";
const NoteIcon = "/assets/icons/note.svg";
const FrameIcon = "/assets/icons/Frame.svg";
const PopularIcon = "/assets/icons/Popular.svg";
const DropdownArrowIcon = "/assets/icons/dropdown-arrow.svg";

export default function Toolsdropdown({ setTag, setCloseModal ,ref}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    name: "New",
    icon: NoteIcon,
  });
  const dropdownContainerRef = useRef();

  useOnClickOutside(dropdownContainerRef, () => setIsOpen(false));
  const options = [
    { name: "New", icon: NoteIcon },
    { name: "Popular", icon: PopularIcon },
    { name: "Verified", icon: FrameIcon },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setCloseModal(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setTag(option.name);
    setIsOpen(false);
    setCloseModal(false);
  };

  return (
    <div className={styles.toolsdropdown}>
      <button onClick={toggleDropdown} aria-label="Selected Option">
        <>
          <img loading="lazy" src={selectedOption.icon} alt={selectedOption.name + "Icon"} />
          <div className={styles.dropdownNameAlignment}>
            <p>{selectedOption.name}</p>

            <img loading="lazy" src={DropdownArrowIcon} alt="DropdownArrowIcon" />
          </div>
        </>
      </button>
      {isOpen && (
        <div className={styles.dropdownContent} ref={dropdownContainerRef}>
          {options
            ?.filter((option) => option.name !== selectedOption?.name) // Filter out the selected option
            ?.map((option) => {
              return (
                <div className={styles.dropdownDetailsBox} key={option.name} onClick={() => handleOptionClick(option)}>
                  <img loading="lazy" src={option.icon ? option.icon : NoteIcon} alt={option.name + "Icon"} />
                  <p>{option.name} </p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
