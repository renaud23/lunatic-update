import type { ReactNode } from 'react'

import type { LunaticError } from '../../../../use-lunatic/type'
import { voidFunction } from '../../../../utils/function'
import { Errors, createCustomizableLunaticField } from '../../../commons'
import { CheckboxOption } from '../../commons/checkbox-option'

type Props = {
  id: string
  checked?: boolean
  disabled?: boolean
  onClick?: (b: boolean) => void
  label?: ReactNode
  description?: ReactNode
  errors?: LunaticError[]
}

export const CheckboxBoolean = createCustomizableLunaticField(
  function CheckboxBoolean({
    checked,
    id,
    disabled,
    onClick,
    label,
    description,
    errors,
  }: Props) {
    return (
      <div className="lunatic-checkbox-boolean">
        <CheckboxOption
          disabled={disabled}
          checked={checked}
          id={id}
          onClick={onClick ?? voidFunction}
          label={label}
          description={description}
          invalid={!!errors}
        />
        <Errors errors={errors} />
      </div>
    )
  },
  'CheckboxBoolean',
)
