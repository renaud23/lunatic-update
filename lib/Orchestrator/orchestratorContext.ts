import { createContext, useContext } from 'react'

import type { UseLunaticInterface } from './Orchestrator'

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
}

const initial: OrchestatorContext = {
  status: OrchestratorStatus.EMPTY,
  goNextPage: () => {},
  goPreviousPage: () => {},
  goToPage: () => {},
  getComponents: () => [],
  compileControls: () => ({ currentErrors: undefined, isCritical: false }),
}

const orchestratorContext = createContext<OrchestatorContext>(initial)

export const { Provider, Consumer } = orchestratorContext

export function useOrchestratorContext() {
  return useContext(orchestratorContext)
}
