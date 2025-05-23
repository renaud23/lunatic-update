import { type PropsWithChildren } from 'react'

import { createCustomizableLunaticField } from '../../commons'

export const RoundaboutContainer = createCustomizableLunaticField(
  function RoundaboutContainer({ children }: PropsWithChildren<{}>) {
    return <div className="lunatic-roundabout">{children}</div>
  },
  'RoundaboutContainer',
)
