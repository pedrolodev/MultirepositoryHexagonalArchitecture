'use client'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { PartidoOutput } from '../../../../../../Contexts/EstadisticasFutbol/types/Partidos/partido'
import { useCustomSelector } from '../../store/connector'
import styles from '@/styles/components/page/table.module.scss'
import formatUTCMadrid from '@/lib/shared/formatUtc'
import FooterTable from './table/FooterTable'
import Loader from '@/shared/components/Loader'
import estadisticaToTableColumn from '@/lib/app/page/table/estadisticaToTableColumn'
import Error from '@/shared/components/Error'
import eventoToTableColumn from '@/lib/app/page/table/eventoToTableColumn'

export default function RenderTable() {
  const data = useCustomSelector((state) => state.dataFiltered)
  const theme = useCustomSelector((state) => state.theme)
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'fecha', desc: false },
  ])
  const [columnVisibility, setColumnVisibility] = useState({})
  const columns = useMemo<ColumnDef<PartidoOutput>[]>(() => {
    const baseColumns: ColumnDef<PartidoOutput>[] = [
      {
        accessorKey: 'fecha',
        header: () => <span>Fecha</span>,
        cell: (date) =>
          formatUTCMadrid(date.getValue() as string, 'dd/MM/yyyy HH:mm'),
      },
      {
        accessorKey: 'jornada',
        header: () => 'Jornada',
      },
      {
        accessorFn: (row) => row.local.name,
        id: 'Local',
        cell: (localName) => localName.getValue(),
        header: () => <span>Local</span>,
      },
      {
        accessorFn: (row) => row.visitante.name,
        id: 'Visitante',
        cell: (visitanteName) => visitanteName.getValue(),
        header: () => <span>Visitante</span>,
      },

      eventoToTableColumn(
        ['Gol de ', 'Gol de (p.p)', 'Gol de falta', 'Gol de penalti'],
        'Resultado',
        '-'
      ),
    ]
    if (
      data.filter((partido) => partido.estadisticas.length !== 0).length > 0
    ) {
      baseColumns.push(
        estadisticaToTableColumn('Posesión del balón', 'Posesión'),
        estadisticaToTableColumn('Faltas', 'Faltas'),
        estadisticaToTableColumn('Fueras de juego', 'Fueras de Juego'),
        estadisticaToTableColumn('Paradas del portero', 'Paradas'),
        estadisticaToTableColumn('Saques de esquina', 'Córners'),
        estadisticaToTableColumn('Tarjetas Amarillas', 'Amarillas'),
        estadisticaToTableColumn('Tarjetas Rojas', 'Rojas'),
        estadisticaToTableColumn('Total tiros', 'Tiros Total'),
        estadisticaToTableColumn('Tiros a puerta', 'Tiros puerta'),
        estadisticaToTableColumn('Tiros al palo', 'Tiros palo'),
        estadisticaToTableColumn('Tiros fuera', 'Tiros fuera')
      )
    }
    return baseColumns
  }, [data])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // debugTable: true,
  })

  return (
    <div className={styles.container}>
      <Error msg="Sucedió un error inesperado">
        <Loader type="circle" condition={data.length !== 0}>
          <div className={styles.container_table}>
            <table className={styles.table}>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    className={`${styles[theme]} ${styles.table_header}`}
                    key={headerGroup.id}
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <th key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder ? null : (
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? 'cursor-pointer select-none'
                                  : '',
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: ' 🔼',
                                desc: ' 🔽',
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          )}
                        </th>
                      )
                    })}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, 50)
                  .map((row) => {
                    return (
                      <tr
                        className={`${styles[theme]} ${styles.row}`}
                        key={row.id}
                      >
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <td key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
          <div className={styles.container_pagination}>
            <FooterTable
              currentPageIndex={table.getState().pagination.pageIndex}
              maxPageIndex={table.getPageCount() - 1}
              columns={table.getAllLeafColumns()}
              rowsLength={data.length}
              setPageIndex={table.setPageIndex}
              setPageSize={table.setPageSize}
            />
          </div>
        </Loader>
      </Error>
    </div>
  )
}
