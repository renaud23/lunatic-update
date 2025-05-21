import { createCustomizableLunaticField } from '../../../commons'
import {
  RadioGroup,
  type RadioGroupProps,
} from '../../../radio/html/radio-group'

export const CheckboxOne = createCustomizableLunaticField(function CheckboxOne({
  options,
  value,
  id,
  label,
  description,
  onSelect,
  errors,
  shortcut,
}: RadioGroupProps) {
  return (
    <RadioGroup
      id={id}
      className="lunatic-checkbox-one"
      options={options}
      value={value}
      errors={errors}
      label={label}
      description={description}
      onSelect={onSelect}
      checkboxStyle={true}
      shortcut={shortcut}
    />
  )
}, 'CheckboxOne')
