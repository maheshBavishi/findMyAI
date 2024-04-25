import React from 'react'
import styles from './codesection.module.scss';
import Categoriescard from '../categoriescard';
export default function Codesection() {
  return (
    <div>
       <div className={styles.codesectionAlignment}  >
      <div className={styles.title}>
        <h5>
            <span>Code</span>
        </h5>
      </div>
      <div className={styles.grid}>
       {
        [...Array(6)].map(()=> {
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
