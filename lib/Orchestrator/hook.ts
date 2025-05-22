import { useMemo } from 'react'

import {
  OrchestratorStatus,
  useOrchestratorContext,
} from './orchestratorContext'

const ERROR =
  'Unitialize Orchestrator context. Add Orchestrator component in tree parent'

function useControlledContext() {
  const { status, ...rest } = useOrchestratorContext()
  if (status === OrchestratorStatus.EMPTY) {
    throw new Error(ERROR)
  }

  return rest
}

/**
 *
 * @returns
 */
export function useNavigation() {
  const { goToPage, goNextPage, goPreviousPage } = useControlledContext()

  const args = useMemo(
    () => ({ goToPage, goPreviousPage, goNextPage }),
    [goNextPage, goPreviousPage, goToPage],
  )

  return args
}

/**
 *
 * @returns
 */
export function useGetComponents() {
  return useControlledContext().getComponents
}

/**
 *
 * @returns
 */
export function useControls() {
  return useControlledContext().compileControls
}

/**
 *
 * @returns
 */
export function usePagination() {
  const { pager, isLastPage, isFirstPage, pageTag } = useControlledContext()

  const args = useMemo(
    () => ({ pager, isLastPage, isFirstPage, pageTag }),
    [pager, isLastPage, isFirstPage, pageTag],
  )

  return args
}

export function useErrors() {
  return useControlledContext().errors
}
