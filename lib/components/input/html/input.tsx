import { type ChangeEventHandler, type ReactNode, useCallback } from 'react'

import classnames from 'classnames'

import type { LunaticError } from '../../../use-lunatic/type'
import { Errors, Label, createCustomizableLunaticField } from '../../commons'

type Props = {
  label?: ReactNode
  onChange: (v: string) => void
  description?: string
  errors?: LunaticError[]
  value?: string | null
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  maxLength?: number
  id?: string
}

function Input({
  value,
  onChange,
  disabled,
  required,
  maxLength,
  label,
  description,
  id,
  errors,
  readOnly,
}: Props) {
  const labelId = `label-${id}`

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    function (e) {
      const value = e.target.value
      onChange(value)
    },
    [onChange],
  )
  return (
    <div className={classnames('lunatic-input')}>
      <Label htmlFor={id} id={labelId} description={description}>
        {label}
      </Label>
      <input
        id={id}
        aria-labelledby={labelId}
        autoComplete="off"
        type="text"
        disabled={disabled}
        readOnly={readOnly}
        value={checkValue(value)}
        onChange={handleChange}
        aria-required={required}
        required={required}
        maxLength={maxLength}
        aria-invalid={!!errors}
      />
      <Errors errors={errors} />
    </div>
  )
}

function checkValue(value?: unknown) {
  return (value ?? '').toString()
}

export default createCustomizableLunaticField(Input, 'Input')
