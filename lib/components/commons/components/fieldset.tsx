import { type PropsWithChildren, type ReactNode } from 'react'

import classnames from 'classnames'

import type { LunaticBaseProps } from '../../type'
import createCustomizableLunaticField from '../create-customizable-field'
import safetyLabel from '../safety-label'
import Description from './description'

type Props = PropsWithChildren<{
  legend?: ReactNode
  description?:
    | LunaticBaseProps['description']
    | { label: string; declarationType: string }[]
  className?: string
}>

export function Fieldset({ children, legend, description, className }: Props) {
  return (
    <fieldset className={classnames(className)}>
      <legend>
        {safetyLabel(legend)}
        <Description value={description} />
      </legend>
      {children}
    </fieldset>
  )
}

export default createCustomizableLunaticField(Fieldset, 'Fieldset')
