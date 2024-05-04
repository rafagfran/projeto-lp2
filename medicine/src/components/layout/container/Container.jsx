import React from 'react'
import Style from '../../../styles/components/layout/container/Container.module.css'

const Container = ({children}) => {
  return (
    <section className={Style.container}>
      {children}
    </section>
  )
}

export default Container