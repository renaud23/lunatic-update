import { type ReactNode } from 'react'

import { createCustomizableLunaticField } from '../commons'

type Props = {
  id: string
  label?: ReactNode
}

export const FilterDescription = createCustomizableLunaticField(
  function FilterDescription({ id, label }: Props) {
    return (
      <div
        id={`filter-description-${id}`}
        aria-label={`filter-description`}
        className="filter-description-lunatic"
      >
        {label}
      </div>
    )
  },
  'FilterDescription',
)
