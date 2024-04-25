import React from 'react'
import styles from './videosection.module.scss';
import Categoriescard from '../categoriescard';
export default function Videosection() {
  return (
    <div>
       <div className={styles.videosectionAlignment}  >
      <div className={styles.title}>
        <h5>
            <span>Video</span>
        </h5>
      </div>
      <div className={styles.grid}>
       {
        [...Array(3)].map(()=> {
            return(
                <Categoriescard/>
            )
        })
       }
      </div>
    </div>
    </div>
  )
}
