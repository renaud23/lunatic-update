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

export function useEventsListener(id: string, e: OELEvents) {
  const { OELListeners } = useOrchestratorContext()
  const { type, action } = e
  if (id !== 'default') {
    if (type === OELTypeName.BeforeNextPage) {
      OELListeners.BeforeNextPage[id] = action
    } else if (type === OELTypeName.AfterNextPage) {
      OELListeners.AfterNextPage[id] = action
    } else if (type === OELTypeName.BeforePreviousPage) {
      OELListeners.BeforePreviousPage[id] = action
    } else if (type === OELTypeName.AfterPreviousPage) {
      OELListeners.AfterPreviousPage[id] = action
    }
  }
}

export function executeAllPredicates(
  all: Record<string, OELPredicate> & { default: OELPredicate },
) {
  const { default: def, ...other } = all
  if (Object.keys(other).length) {
    const status = Object.values(other).reduce((a, predicate) => {
      return a && predicate()
    }, true)
    return status
  } else {
    return def()
  }
}

export function executeAllCallbacks(
  all: Record<string, OELCallback> & { default: OELCallback },
) {
  const { default: def, ...other } = all

  if (Object.keys(other).length) {
    return Object.values(other).forEach((callback) => {
      callback()
    })
  } else {
    return def()
  }
}
