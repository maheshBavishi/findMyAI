"use client"
import React from 'react'
import styles from './bookmarkedbanner.module.scss';
import { useRouter } from 'next/router';
export default function Bookmarkedbanner() {
  const router = useRouter();

  return (
    <div className={styles.bookmarkedbanner}  >
    <div className='container'>
      <div className={styles.title}>
      {/* <AnimatedSection animationType="fade-up" duration={600} delay={400}> */}
        <h3>My  <span>Bookmarked</span>  {router?.pathname === "/user/gpt-bookmark" ? "GPT" :"AI Tools "} </h3>
        {/* </AnimatedSection> */}
      {/* <AnimatedSection animationType="fade-up" duration={600} delay={500}> */}
        <p>
        The AI tools you've saved as bookmarks can be deleted by clicking on the bookmark icon..
        </p>
        {/* </AnimatedSection> */}
      </div>
    </div>
  </div>

  )
}
