import React from 'react'
import styles from './toolscategoriesbanner.module.scss';
import AnimatedSection from '@/shared/components/Animation/AnimatedSection';
export default function Toolscategoriesbanner() {
  return (
    <div className={styles.toolscategoriesbanner}  >
      <div className='container'>
        <div className={styles.title}>
        {/* <AnimatedSection animationType="fade-up" duration={600} delay={400}> */}
          <h3>AI <span>Tools</span> Categories</h3>
          {/* </AnimatedSection> */}
        {/* <AnimatedSection animationType="fade-up" duration={600} delay={500}> */}
          <p>
            Streamline your search and find the best AI solutions to enhance your operations, improve customer experiences
            and drive growth.
          </p>
          {/* </AnimatedSection> */}
        </div>
      </div>
    </div>
  )
}
