import { type ReactNode } from 'react'

import {
  Th as HtmlTh,
  Thead as HtmlThead,
  Tr as HtmlTr,
} from '../commons/components/html-table'

type Props = {
  id?: string
  header?: Array<{ label?: ReactNode; colspan?: number; rowspan?: number }>
}

export function Header({ id, header }: Props) {
  if (!Array.isArray(header)) {
    return null
  }
  const content = header.map(function ({ label, rowspan, colspan }, index) {
    return (
      <HtmlTh
        id={id}
        row={0}
        index={index}
        rowSpan={rowspan}
        colSpan={colspan}
        key={index}
      >
        {label}
      </HtmlTh>
    )
  })
  return (
    <HtmlThead id={id}>
      <HtmlTr id={id} row={0}>
        {content}
      </HtmlTr>
    </HtmlThead>
  )
}
