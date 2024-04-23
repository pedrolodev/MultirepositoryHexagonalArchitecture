'use client'
import styles from '@/styles/components/page/sections.module.scss'
import { useCustomSelector } from '@/store/connector'
import Chart from './Chart'
import RenderTable from './Table'

export default function Sections() {
  const sidebar = useCustomSelector((state) => state.layout.sidebar)

  return (
    <section
      className={`${styles.sections} ${
        sidebar === 'hidden' ? styles.sidebar_hidden : styles.sidebar_visible
      }`}
    >
      <section className={styles.chart}>
        <Chart />
      </section>
      <section className={styles.table}>
        <RenderTable />
      </section>
    </section>
  )
}
