import { type PropsWithChildren } from 'react'

import classnames from 'classnames'

import createCustomizableLunaticField from '../commons/create-customizable-field'

type Props = PropsWithChildren<{ type: string }>

export const Declaration = createCustomizableLunaticField(function Declaration({
  children,
  type,
}: Props) {
  return (
    <div
      data-testid="declaration"
      className={classnames(
        'declaration-lunatic',
        `declaration-${type.toLowerCase()}`,
      )}
    >
      {children}
    </div>
  )
}, 'Declaration')
