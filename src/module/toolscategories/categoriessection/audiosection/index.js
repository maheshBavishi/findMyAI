import React from 'react'
import styles from './audiosection.module.scss';
import Categoriescard from '../categoriescard';
export default function Audiosection() {
    return (
        <div className={styles.audiosectionAlignment}  >
            <div className={styles.title}>
                <h5>
                    <span>Audio</span>
                </h5>
            </div>
            <div className={styles.grid}>
                {
                    [...Array(5)].map(() => {
                        return (
                            <Categoriescard />
                        )
                    })
                }
            </div>
        </div>
    )
}
