import { type ReactNode } from 'react'

import { createCustomizableLunaticField } from '../../commons'

export const RoundaboutItTitle = createCustomizableLunaticField(
  function RoundaboutItTitle({ label }: { label?: ReactNode }) {
    return <div className="roundabout-it-title">{label}</div>
  },
  'RoundaboutItTitle',
)
