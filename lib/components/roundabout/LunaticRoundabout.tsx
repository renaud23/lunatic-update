import { useCallback } from 'react'

import type { LunaticComponentProps } from '../type'
import { Roundabout } from './Roundabout'

/**
 *  Logique fonctionnelle et immuable du composant
 */
export function LunaticRoundabout({
  iterations,
  expressions,
  goToPage,
  page,
  label,
  locked,
}: LunaticComponentProps<'Roundabout'>) {
  const goToIteration = useCallback(
    function (iteration: number) {
      goToPage({
        page,
        subPage: 0,
        iteration,
        nbIterations: iterations,
      })
    },
    [goToPage, page, iterations],
  )

  return (
    <Roundabout
      label={label}
      expressions={expressions}
      iterations={iterations}
      goToIteration={goToIteration}
      locked={locked}
    />
  )
}
