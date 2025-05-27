import { useCallback, useState } from 'react'

import { buildBeforeNextPage, useControls, useEventsListener } from '@lib/main'

const idListener = 'CONTROLS_ORCHESTRATOR'

export function useOrchestratorControls() {
  const compile = useControls()
  const [onWarning, setOnWarning] = useState(false)

  const beforeNext = useCallback(() => {
    const { isCritical, currentErrors } = compile()
    if (onWarning && !isCritical) {
      setOnWarning(false)
      return true
    } else if (currentErrors) {
      setOnWarning(!isCritical)
      return false
    }
    return true
  }, [compile, onWarning])

  useEventsListener(idListener, buildBeforeNextPage(beforeNext))
}
