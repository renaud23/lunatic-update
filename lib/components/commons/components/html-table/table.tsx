import { type PropsWithChildren } from 'react'

import classnames from 'classnames'

import createCustomizableLunaticField from '../../create-customizable-field'

type Props = PropsWithChildren<{
  className?: string
  id?: string
}>

function Table({ className, id, children }: Props) {
  return (
    <table
      id={`table-${id}`}
      className={classnames('lunatic-table', className)}
    >
      {children}
    </table>
  )
}

export const LunaticTable = createCustomizableLunaticField(Table, 'Table')
