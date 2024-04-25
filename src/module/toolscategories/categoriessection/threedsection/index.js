import React from 'react'
import styles from './threedsection.module.scss';
import Categoriescard from '../categoriescard';
export default function Threedsection() {
  return (
    <div>
       <div className={styles.threedsectionAlignment}  >
      <div className={styles.title}>
        <h5>
            <span>3D</span>
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
