import type { ComboBoxOptionType } from '@lib/components/commons/components/combo-box/combo-box.type'
import classnames from 'classnames'

type Props = {
  option: ComboBoxOptionType
  selected?: boolean
}

export function SimpleOptionRenderer({ option, selected }: Props) {
  const { value, label } = option

  if (label && typeof label === 'string' && label.length) {
    return (
      <div className={classnames('lunatic-dropdown-option', { selected })}>
        <span className="id">{value}</span>
        <span>&nbsp;&#x2014;&nbsp;</span>
        <span className="label">{label}</span>
      </div>
    )
  }
  return (
    <div className={classnames('lunatic-dropdown-option', { selected })}>
      <span className="id">{label}</span>
    </div>
  )
}
