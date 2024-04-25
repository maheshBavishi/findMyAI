// "use client";
// import React from "react";
// import styles from "./searchbar.module.scss";
// import { useDispatch, useSelector } from "react-redux";
// import { setSearchTools } from "@/store/ApiSlice/aiToolsSlice";

// const SearchIcon = "/assets/icons/search.svg";
// export default function Searchbar({
//   placeholder,
//   search,
//   handleOnSearch,
//   handleSearchClick,
// }) {
//   const { getAllAiToolsName } = useSelector((state) => state.aiTools);
//   const dispatch = useDispatch();
//   const pathname = usePathname();
//   return (
//     <div className={styles.searchbar}>
//       <input
//         type="text"
//         name="search"
//         placeholder={placeholder}
//         onChange={handleOnSearch}
//         value={search}
//       />
//       <div className={styles.searchIcon} onClick={handleSearchClick}>
//         <img src={SearchIcon} alt="SearchIcon" />
//       </div>
//       {search && (
//         <>
//           {pathname === "/" && (
//             <div className={styles.searchbarDropdownDesign}>
//               <div className={styles.spacer}>
//                 {getAllAiToolsName?.map((item, i) => {
//                   return (
//                     <>
//                       <span
//                         onClick={() => {
//                           dispatch(setSearchTools(item?.title)),
//                             handleSearchClick();
//                         }}
//                       >
//                         {item?.title}
//                       </span>
//                     </>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./searchbar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTools } from "@/store/ApiSlice/aiToolsSlice";
import { usePathname, useRouter } from "next/navigation";
import SearchIcon from "@/assets/icons/SearchIcon";
import useOnClickOutside from "@/hook/useOnClickOutside";

export default function Searchbar({
  placeholder,
  search,
  handleOnSearch,
  handleSearchClick,
}) {
  const { getAllAiToolsName } = useSelector((state) => state.aiTools);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const route = useRouter();
  const dropdownContainerRef = useRef();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  useOnClickOutside(dropdownContainerRef, () => setDropdownVisible(false));

  // Filter the AI tools based on the search input
  const filteredAiTools = getAllAiToolsName?.filter((item) =>
    item?.title.toLowerCase().includes(search.toLowerCase())
  );
  const handleViewDetails = (item) => {
    route?.push(`/tool/${item?.slugId}`);
  };
  useEffect(() => {
    if (getAllAiToolsName?.length > 0) {
      setDropdownVisible(true);
    }
  }, [getAllAiToolsName]);
  return (
    <div className={styles.searchbar}>
      <input
        type="text"
        name="search"
        placeholder={placeholder}
        onChange={handleOnSearch}
        value={search}
      />
      <div className={styles.searchIcon} onClick={handleSearchClick}>
        <SearchIcon />
      </div>
      {search && (
        <>
          {pathname === "/" && getAllAiToolsName?.length > 0 && dropdownVisible && (
            <div
              className={styles.searchbarDropdownDesign}
              ref={dropdownContainerRef}
            >
              <div className={styles.spacer}>
                {filteredAiTools.length === 0 ? (
                  <span className={styles.notFoundMessage}>
                    No Results Found
                  </span>
                ) : (
                  filteredAiTools.map((item, i) => (
                    <span
                      key={i}
                      onClick={() => {
                        dispatch(setSearchTools(item?.title));
                        handleSearchClick();
                        handleViewDetails(item);
                      }}
                    >
                      {item?.title}
                    </span>
                  ))
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
