import React from 'react'
import styles from './othersection.module.scss';
import Categoriescard from '../categoriescard';
export default function Othersection() {
    return (
        <div>
            <div className={styles.othersectionAlignment}  >
                <div className={styles.title}>
                    <h5>
                        <span>Other</span>
                    </h5>
                </div>
                <div className={styles.grid}>
                    {
                        [...Array(6)].map(() => {
                            return (
                                <Categoriescard />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
