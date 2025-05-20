import { type FunctionComponent } from 'react'

import type { ComboBoxOptionType } from '../combo-box.type'
import ComboBoxLabelSelection from './combo-box-label-selection'

export type LabelSelectionProps = {
  /**
   * @deprecated use createCustomizableField with ComboboxLabelRenderer as name.
   */
  labelRenderer?: FunctionComponent<{
    option?: ComboBoxOptionType
    placeholder?: string
    search?: string
    disabled?: boolean
  }>
  placeholder?: string
  selectedIndex?: number
  options: Array<ComboBoxOptionType>
  search?: string
  disabled?: boolean
  readOnly?: boolean
}

export function LabelSelection({
  labelRenderer: Renderer,
  placeholder,
  selectedIndex,
  options,
  search,
  disabled,
  readOnly,
}: LabelSelectionProps) {
  const option =
    selectedIndex !== undefined ? options[selectedIndex] : undefined
  const LabelSelectionComponent = Renderer ?? ComboBoxLabelSelection

  return (
    <LabelSelectionComponent
      option={option}
      placeholder={placeholder}
      search={search}
      disabled={disabled}
      readOnly={readOnly}
    />
  )
}

export default LabelSelection
