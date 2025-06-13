import { ComboBox } from '@lib/components/commons'

import { type DropdownProps } from '../dropdown'
import { SimpleLabelRenderer } from './simpleLabelRenderer'
import { SimpleOptionRenderer } from './simpleOptionRenderer'

export function DropdownSimple({
  id,
  disabled,
  options,
  onSelect,
  className,
  value,
  label,
  errors,
  description,
  readOnly,
}: DropdownProps) {
  return (
    <ComboBox
      id={id}
      className={className}
      disabled={disabled}
      readOnly={readOnly}
      options={options}
      editable={false}
      onSelect={onSelect}
      optionRenderer={SimpleOptionRenderer}
      labelRenderer={SimpleLabelRenderer}
      value={value}
      label={label}
      errors={errors}
      description={description}
    />
  )
}
