import { type ReactNode, useCallback, useState } from 'react'

import { ComboBox } from '@lib/components/commons'
import type { ComboBoxOptionType } from '@lib/components/commons/components/combo-box/combo-box.type'
import type { LunaticError } from '@lib/use-lunatic/type'

import { filterOptions } from './filterTools/filterOptions'
import { WritableLabelRenderer } from './writableLabelRenderer'
import { WritableOptionRenderer } from './writableOptionRenderer'

type Props = {
  id?: string
  disabled?: boolean
  options: ComboBoxOptionType[]
  onSelect: (v: string | null) => void
  className?: string
  value: string | null
  label?: ReactNode
  errors?: LunaticError[]
  description?: ReactNode
  readOnly?: boolean
}

export function DropdownWritable({
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
}: Props) {
  const [filtered, setFiltered] = useState(options)

  const onChange = useCallback(
    function (search: string | null) {
      if (search) {
        setFiltered(filterOptions(options, search))
      } else {
        setFiltered(options)
      }
      onSelect(null)
    },
    [options, onSelect],
  )

  return (
    <ComboBox
      id={id}
      className={className}
      disabled={disabled}
      readOnly={readOnly}
      options={filtered}
      onSelect={onSelect}
      onChange={onChange}
      optionRenderer={WritableOptionRenderer}
      labelRenderer={WritableLabelRenderer}
      editable={true}
      value={value}
      label={label}
      errors={errors}
      description={description}
    />
  )
}
