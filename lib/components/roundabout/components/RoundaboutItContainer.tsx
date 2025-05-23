import { type PropsWithChildren } from 'react'

import { createCustomizableLunaticField } from '../../commons'

export const RoundaboutItContainer = createCustomizableLunaticField(
  function RoundaboutItContainer({ children }: PropsWithChildren<{}>) {
    return <div className="roundabout-iteration-title">{children}</div>
  },
  'RoundaboutItContainer',
)
