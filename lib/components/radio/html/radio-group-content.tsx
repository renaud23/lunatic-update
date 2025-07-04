import { type ReactNode } from 'react'

import { voidFunction } from '../../../utils/function'
import { getShortcutKey } from '../../checkbox/commons/getShortcutKey'
import { useOptionsKeydown } from '../../commons'
import { RadioOption } from './radio-option'

export type Props = {
  options: { description?: ReactNode; label: ReactNode; value: string }[]
  id?: string
  value?: string | null
  description?: ReactNode
  onClick?: (v: string | null) => void
  checkboxStyle?: boolean
  shortcut?: boolean
  disabled?: boolean
  readOnly?: boolean
  invalid?: boolean
}

export function RadioGroupContent({
  options,
  value,
  id,
  onClick = voidFunction,
  checkboxStyle = false,
  shortcut,
  disabled,
  readOnly,
  invalid,
}: Props) {
  const onKeyDown = useOptionsKeydown(options, onClick)
  const maxIndex = options.length
  return (
    <>
      {options.map(function (option, index) {
        const { value: valueOption, label, description } = option
        const radioId = `lunatic-radio-${id}-${valueOption}`
        const codeModality = getShortcutKey(index, maxIndex)
        return (
          <RadioOption
            key={radioId}
            id={radioId}
            index={index}
            checked={value === valueOption}
            onClick={onClick}
            value={valueOption}
            onKeyDown={onKeyDown}
            checkboxStyle={checkboxStyle}
            label={label}
            description={description}
            codeModality={shortcut ? codeModality : undefined}
            shortcut={shortcut}
            disabled={disabled}
            readOnly={readOnly}
            invalid={invalid}
          />
        )
      })}
    </>
  )
}
