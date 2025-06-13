import { createCustomizableLunaticField } from '@lib/components/commons/createCustomizableField'
import type { LunaticComponentProps } from '@lib/components/type'
import type { LunaticError } from '@lib/use-lunatic/type'

import { DropdownSimple } from './dropdownSimple/dropdownSimple'
import { DropdownWritable } from './dropdownWritable/dropdownWritable'

export type DropdownProps = {
  onSelect: (v: string | null) => void
  className?: string
  readOnly?: boolean
  errors?: LunaticError[]
} & Pick<
  LunaticComponentProps<'Dropdown'>,
  'id' | 'disabled' | 'options' | 'writable' | 'value' | 'description' | 'label'
>

export const Dropdown = createCustomizableLunaticField(function Dropdown({
  id,
  disabled,
  options,
  onSelect,
  writable,
  className,
  value,
  description,
  label,
  errors,
  readOnly,
}: DropdownProps) {
  if (writable) {
    return (
      <DropdownWritable
        id={id}
        className={className}
        disabled={disabled}
        readOnly={readOnly}
        options={options}
        onSelect={onSelect}
        value={value}
        label={label}
        errors={errors}
        description={description}
      />
    )
  }
  return (
    <DropdownSimple
      id={id}
      className={className}
      disabled={disabled}
      readOnly={readOnly}
      options={options}
      onSelect={onSelect}
      value={value}
      label={label}
      errors={errors}
      description={description}
    />
  )
}, 'Dropdown')
