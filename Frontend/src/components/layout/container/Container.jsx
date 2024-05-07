import React from 'react'
import styles from '../../../styles/components/layout/container/Container.module.css'

const Container = ({children}) => {
  return (
    <section className={styles.container}>
      <div className={styles.body}>
        {children}
      </div>
    </section>
  )
}

export default Container