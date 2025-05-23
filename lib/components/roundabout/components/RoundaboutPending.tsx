import { createCustomizableLunaticField } from '../../commons'

export const RoundaboutPending = createCustomizableLunaticField(
  function RoundaboutPending() {
    return <div className="roundabout-pending">Pending...</div>
  },
  'RoundaboutPending',
)
