import type { LunaticError } from '../../../use-lunatic/type'
import { createCustomizableLunaticField } from '../../commons'
import type { LunaticComponentProps } from '../../type'
import { DropdownSimple } from './dropdown-simple/dropdown-simple'
import { DropdownWritable } from './dropdown-writable/dropdown-writable'

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
