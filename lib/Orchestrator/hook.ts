import { useMemo } from 'react'

import {
  OrchestratorStatus,
  useOrchestratorContext,
} from './orchestratorContext'

const ERROR =
  'Unitialize Orchestrator context. Add Orchestrator component in tree parent'

export function useNavigation() {
  const { goToPage, goNextPage, goPreviousPage, status } =
    useOrchestratorContext()

  if (status === OrchestratorStatus.EMPTY) {
    throw new Error(ERROR)
  }

  const args = useMemo(
    () => ({ goToPage, goPreviousPage, goNextPage }),
    [goNextPage, goPreviousPage, goToPage],
  )

  return args
}

export function useComponents() {
  const context = useOrchestratorContext()

  if (context.status === OrchestratorStatus.EMPTY) {
    throw new Error(ERROR)
  }

  return context.getComponents
}

export function useControls() {
  const { status } = useOrchestratorContext()

  if (status === OrchestratorStatus.EMPTY) {
    throw new Error(ERROR)
  }
}
