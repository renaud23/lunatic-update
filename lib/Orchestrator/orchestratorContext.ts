import { createContext, useContext } from 'react'

import type { LunaticCompiledErrors, UseLunaticInterface } from './Orchestrator'
import type { OELCallback, OELPredicate } from './useEventsListerner'

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
  getData: UseLunaticInterface['getData']
  status: OrchestratorStatus
  pageTag?: UseLunaticInterface['pageTag']
  isLastPage: UseLunaticInterface['isLastPage']
  isFirstPage: UseLunaticInterface['isFirstPage']
  pager?: UseLunaticInterface['pager']

  errors: LunaticCompiledErrors

  OELListeners: {
    BeforeNextPage: OELPredicate
    AfterNextPage: OELCallback
    BeforePreviousPage: OELPredicate
    AfterPreviousPage: OELCallback
  }
}

const initial: OrchestatorContext = {
  status: OrchestratorStatus.EMPTY,
  goNextPage: () => {},
  goPreviousPage: () => {},
  goToPage: () => {},
  getComponents: () => [],
  compileControls: () => ({ currentErrors: undefined, isCritical: false }),
  getData: () => ({ CALCULATED: {}, COLLECTED: [], EXTERNAL: [] }),
  pageTag: undefined,
  pager: undefined,
  isLastPage: false,
  isFirstPage: false,
  errors: { currentErrors: undefined, isCritical: false },

  OELListeners: {
    BeforeNextPage: () => true,
    AfterNextPage: () => {},
    BeforePreviousPage: () => true,
    AfterPreviousPage: () => {},
  },
}

const orchestratorContext = createContext<OrchestatorContext>(initial)

export const { Provider, Consumer } = orchestratorContext

export function useOrchestratorContext() {
  return useContext(orchestratorContext)
}
