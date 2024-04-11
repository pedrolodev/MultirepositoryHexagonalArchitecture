'use client'
import styles from '@/styles/components/page/table/footerTable.module.scss'
import GenericSelectCheckbox from '@/shared/components/GenericSelectCheckbox'
import GenericSelect from '@/shared/components/GenericSelect'
import PaginationButton from './PaginationButton'
import { Column } from '@tanstack/react-table'
import { PartidoOutput } from '../../../../../../../Contexts/EstadisticasFutbol/types/Partidos/partido'

type FooterTableProps = {
  currentPageIndex: number
  maxPageIndex: number
  columns: Column<PartidoOutput, unknown>[]
  rowsLength: number
  setPageIndex: (index: number) => void
  setPageSize: (size: number) => void
}

export default function FooterTable({
  currentPageIndex,
  maxPageIndex,
  columns,
  rowsLength,
  setPageIndex,
  setPageSize,
}: FooterTableProps) {
  const pageSizeOptions = ['5', '10', '20', '30', '40', '50'].map((ps) => {
    return { label: ps, value: ps }
  })

  return (
    <>
      <div className={styles.container_pagination_buttons}>
        <PaginationButton
          type="left_full"
          disabled={currentPageIndex < 1}
          onclick={() => setPageIndex(0)}
        />
        <PaginationButton
          type="left"
          disabled={currentPageIndex < 1}
          onclick={() => setPageIndex(currentPageIndex - 1)}
        />
        <PaginationButton
          type="right"
          disabled={currentPageIndex === maxPageIndex}
          onclick={() => setPageIndex(currentPageIndex + 1)}
        />
        <PaginationButton
          type="right_full"
          disabled={currentPageIndex === maxPageIndex}
          onclick={() => setPageIndex(maxPageIndex)}
        />
        <strong>
          {currentPageIndex + 1}/{maxPageIndex + 1}
        </strong>
        <span className={styles.rows}>
          {' | '}
          {rowsLength} filas
        </span>
      </div>

      <div className={styles.page_size}>
        <GenericSelect
          optionDefault={pageSizeOptions[1]}
          options={pageSizeOptions}
          onChange={(selectedPageSize) =>
            setPageSize(Number(selectedPageSize?.value))
          }
        />
      </div>

      <div className={styles.column_selection}>
        <GenericSelectCheckbox
          placeholder="Columnas"
          options={columns.map((column) => {
            return {
              label: column.id,
              value: column.id,
              onChange: column.getToggleVisibilityHandler(),
            }
          })}
        />
      </div>
    </>
  )
}
