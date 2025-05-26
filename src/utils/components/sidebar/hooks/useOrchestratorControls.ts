import { useCallback, useState } from 'react'

import { useControls, useEventsListener } from '@lib/main'
import { buildBeforeNextPage } from '@lib/orchestrator/useEventsListerner'

export function useOrchestratorControls() {
  const [onWarning, setOnWarning] = useState(false)
  const compile = useControls()

  const beforeNextPage = useCallback(() => {
    const { currentErrors, isCritical } = compile()
    if (onWarning && !isCritical) {
      setOnWarning(false)
      return true
    } else if (currentErrors) {
      setOnWarning(!isCritical)
      return false
    }
    return true
  }, [compile, onWarning])

  useEventsListener(buildBeforeNextPage(beforeNextPage))
}
