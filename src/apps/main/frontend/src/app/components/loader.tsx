'use client'
import React from 'react'
import styles from './loader.module.css'

interface LoaderProps {
      type?: 'bar' | 'circle'
}

const Loader = ({ type = 'bar' }: LoaderProps) => {
      return (
            <div className={`${styles[`loader_animation_${type}`]}`}>
                  <div className={` ${styles[`loader_${type}`]}`} />
            </div>
      )
}

export default Loader
