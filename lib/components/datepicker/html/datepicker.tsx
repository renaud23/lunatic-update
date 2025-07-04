import { type ChangeEventHandler, type ReactNode, useCallback } from 'react'

import type { LunaticError } from '../../../use-lunatic/type'
import { Errors, Label, createCustomizableLunaticField } from '../../commons'
import DatepickerContainer from './DatepickerContainer'
import DatepickerInput from './DatepickerInput'

type Props = {
  label?: ReactNode
  description?: ReactNode
  errors?: LunaticError[]
  disabled?: boolean
  readOnly?: boolean
  min?: string
  max?: string
  id?: string
  value?: string
  onChange: (s: string) => void
}

export const Datepicker = createCustomizableLunaticField(function Datepicker({
  disabled,
  readOnly,
  value = '',
  onChange,
  id,
  min,
  max,
  label,
  errors,
  description,
}: Props) {
  const labelId = `lunatic-datepicker-${id}`
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    function (e) {
      const value = e.target.value
      onChange(value)
    },
    [onChange],
  )

  return (
    <DatepickerContainer>
      <Label htmlFor={id} id={labelId} description={description}>
        {label}
      </Label>
      <DatepickerInput
        id={id}
        labelId={labelId}
        readOnly={readOnly}
        disabled={disabled}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        invalid={!!errors}
      />
      <Errors errors={errors} />
    </DatepickerContainer>
  )
}, 'Datepicker')
