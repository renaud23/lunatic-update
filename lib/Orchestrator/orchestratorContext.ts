import { createContext, useContext } from 'react'

import type { LunaticCompiledErrors, UseLunaticInterface } from './Orchestrator'

export enum OrchestratorStatus {
  EMPTY = 'EMPTY',
  ACTIVATE = 'ACTIVATE',
}

export type OrchestatorContext = {
  getComponents: UseLunaticInterface['getComponents']
  goPreviousPage: UseLunaticInterface['goPreviousPage']
  goNextPage: UseLunaticInterface['goNextPage']
  goToPage: UseLunaticInterface['goToPage']
  compileControls: UseLunaticInterface['compileControls']
  status: OrchestratorStatus
  pageTag?: UseLunaticInterface['pageTag']
  isLastPage: UseLunaticInterface['isLastPage']
  isFirstPage: UseLunaticInterface['isFirstPage']
  pager?: UseLunaticInterface['pager']

  errors?: LunaticCompiledErrors
}

const initial: OrchestatorContext = {
  status: OrchestratorStatus.EMPTY,
  goNextPage: () => {},
  goPreviousPage: () => {},
  goToPage: () => {},
  getComponents: () => [],
  compileControls: () => ({ currentErrors: undefined, isCritical: false }),
  pageTag: undefined,
  pager: undefined,
  isLastPage: false,
  isFirstPage: false,
  errors: undefined,
}

const orchestratorContext = createContext<OrchestatorContext>(initial)

export const { Provider, Consumer } = orchestratorContext

export function useOrchestratorContext() {
  return useContext(orchestratorContext)
}
