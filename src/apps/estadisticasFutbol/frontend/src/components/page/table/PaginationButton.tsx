import Image from 'next/image'
import styles from '@/styles/components/page/table/paginationButton.module.scss'
import { useCustomSelector } from '@/store/connector'

type PaginationButtonProps = {
  type: 'left_full' | 'left' | 'right' | 'right_full'
  disabled: boolean
  onclick: () => void
}

export default function PaginationButton({
  type,
  disabled,
  onclick,
}: PaginationButtonProps) {
  const theme = useCustomSelector((state) => state.theme)

  return (
    <>
      <button
        disabled={disabled}
        onClick={onclick}
        className={`${styles.pagination_button} ${styles[theme]}`}
      >
        <Image
          src={`/assets/pagination/${type}_${theme}.svg`}
          height={24}
          width={24}
          alt={`${type.replace(/_/g, ' ')} pagination`}
        />
      </button>
    </>
  )
}
