import React from 'react'
import styles from './nodatashow.module.scss';
const SearchIcon = '/assets/icons/search-lg.svg';
export default function Nodatashow() {
  return (
    <div className={styles.nodatashowAlignment}>
        <div className={styles.iconCenteralignment}>
            <img src={SearchIcon} alt='SearchIcon'/>
        </div>
        <h2>No results found</h2>
        <span>
        Oops! We couldn't find any results matching your search. 
        </span>
        <span>Please try again with different keywords or filters.</span>
    </div>  
  )
}
