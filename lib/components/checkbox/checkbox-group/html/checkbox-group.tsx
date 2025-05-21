import { type ReactNode } from 'react'

import type { LunaticError } from '../../../../use-lunatic/type'
import {
  Errors,
  Fieldset,
  createCustomizableLunaticField,
} from '../../../commons'
import { type CheckboxGroupOption } from '../lunatic-checkbox-group'
import { CheckboxGroupContent } from './checkbox-group-content'

type Props = {
  options: CheckboxGroupOption[]
  errors?: LunaticError[]
  id: string
  label?: ReactNode
  description?: ReactNode
  shortcut?: boolean
}

export const CheckboxGroup = createCustomizableLunaticField(
  function CheckboxGroup({
    options,
    id,
    label,
    description,
    errors,
    shortcut,
  }: Props) {
    return (
      <Fieldset
        className="lunatic-checkbox-group"
        legend={label}
        description={description}
      >
        <CheckboxGroupContent
          id={id}
          options={options}
          shortcut={shortcut}
          invalid={!!errors}
        />
        <Errors errors={errors} />
      </Fieldset>
    )
  },
  'CheckboxGroup',
)
