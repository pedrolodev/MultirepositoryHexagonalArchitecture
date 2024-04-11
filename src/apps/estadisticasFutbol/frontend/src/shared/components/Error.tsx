'use client'
import { useCustomSelector } from '@/store/connector'
import React, { ReactNode } from 'react'

interface ErrorProps {
  children: ReactNode
  msg: string
}

const Error = ({ children, msg }: ErrorProps) => {
  const { error } = useCustomSelector((state) => state.layout)

  return <>{!error ? children : <span>{msg}</span>}</>
}

export default Error
