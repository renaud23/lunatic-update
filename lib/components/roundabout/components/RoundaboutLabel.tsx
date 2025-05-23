import { type ReactNode } from 'react'

import { createCustomizableLunaticField } from '../../commons'

export const RoundaboutLabel = createCustomizableLunaticField(
  function RoundaboutLabel({ value }: { value?: ReactNode }) {
    return <div className="roundabout-label">{value}</div>
  },
  'RoundaboutLabel',
)
