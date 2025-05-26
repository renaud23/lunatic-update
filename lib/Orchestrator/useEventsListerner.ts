import type { UseLunaticInterface } from './Orchestrator'
import { useOrchestratorContext } from './orchestratorContext'

enum OELTypeName {
  BeforeNextPage = 'BeforeNextPage',
  AfterNextPage = 'AfterNextPage',
  BeforePreviousPage = 'BeforePreviousPage',
  AfterPreviousPage = 'AfterPreviousPage',
}

export type OELCallback = (args?: Partial<UseLunaticInterface>) => void
export type OELPredicate = (args?: Partial<UseLunaticInterface>) => boolean

type OELBeforeNextPage = {
  type: OELTypeName.BeforeNextPage
  action: OELPredicate
}

type OELAfterNextPage = {
  type: OELTypeName.AfterNextPage
  action: OELCallback
}

type OELBeforePreviousPage = {
  type: OELTypeName.BeforePreviousPage
  action: OELPredicate
}

type OELAfterPreviousPage = {
  type: OELTypeName.AfterPreviousPage
  action: OELCallback
}

type OELEvents =
  | OELBeforeNextPage
  | OELAfterNextPage
  | OELBeforePreviousPage
  | OELAfterPreviousPage

export const buildBeforeNextPage = (
  action: OELPredicate,
): OELBeforeNextPage => ({
  type: OELTypeName.BeforeNextPage,
  action,
})

export const buildAfterNextPage = (action: OELCallback): OELAfterNextPage => ({
  type: OELTypeName.AfterNextPage,
  action,
})

export const buildBeforePreviousPage = (
  action: OELPredicate,
): OELBeforePreviousPage => ({
  type: OELTypeName.BeforePreviousPage,
  action,
})

export const buildAfterPreviousPage = (
  action: OELCallback,
): OELAfterPreviousPage => ({
  type: OELTypeName.AfterPreviousPage,
  action,
})

export function useEventsListener(e: OELEvents) {
  const { OELListeners } = useOrchestratorContext()
  const { type, action } = e

  if (type === OELTypeName.BeforeNextPage) {
    OELListeners.BeforeNextPage = action
  } else if (type === OELTypeName.AfterNextPage) {
    OELListeners.AfterNextPage = action
  } else if (type === OELTypeName.BeforePreviousPage) {
    OELListeners.BeforePreviousPage = action
  } else if (type === OELTypeName.AfterPreviousPage) {
    OELListeners.AfterPreviousPage = action
  }
}
