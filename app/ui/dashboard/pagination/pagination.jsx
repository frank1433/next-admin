import React from 'react'
import styles from './pagination.module.css'
function pagination() {
  return (
    <div className={styles.container}>
        <button className={styles.button} disabled>Prev</button>
        <button className={styles.button}>Next</button>
    </div>
  )
}

export default pagination