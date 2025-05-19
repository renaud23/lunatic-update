import { useMemo } from 'react'

import type { LunaticState } from '../type'
import fillComponents from './fill-components'
import getComponentsFromState from './get-components-from-state'

function useComponentsFromState(state: LunaticState) {
  return useMemo(
    function () {
      const { pager, pages, isInLoop } = state
      const components = getComponentsFromState({ pager, pages, isInLoop })
      const filled = fillComponents(components, state)
      return filled.filter(({ conditionFilter }) => {
        return conditionFilter !== undefined ? conditionFilter : true
      })
    },
    [state],
  )
}

export default useComponentsFromState
