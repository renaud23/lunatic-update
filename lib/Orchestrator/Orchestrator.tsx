import { type PropsWithChildren, useMemo } from 'react'

import useLunatic from '../use-lunatic'
import type { LunaticData } from '../use-lunatic/type'
import type { LunaticSource } from '../use-lunatic/type-source'
import {
  type OrchestatorContext,
  OrchestratorStatus,
  Provider,
} from './orchestratorContext'

export type OrchestratorProps = {
  source: LunaticSource
  data: LunaticData
}

export type UseLunaticInterface = ReturnType<typeof useLunatic>

function OrchestratorOnReady(props: PropsWithChildren<OrchestratorProps>) {
  const { source, data, children } = props
  const {
    getComponents,
    goPreviousPage,
    goNextPage,
    goToPage,
    compileControls,
  } = useLunatic(source, data, {})

  const args = useMemo<OrchestatorContext>(
    () => ({
      status: OrchestratorStatus.ACTIVATE,
      getComponents,
      goPreviousPage,
      goNextPage,
      goToPage,
      compileControls,
    }),
    [compileControls, getComponents, goNextPage, goPreviousPage, goToPage],
  )

  return <Provider value={args}>{children}</Provider>
}

export function Orchestrator(
  props: PropsWithChildren<Partial<OrchestratorProps>>,
) {
  const { source, data, children } = props

  if (data && source) {
    return (
      <OrchestratorOnReady source={source} data={data}>
        {children}
      </OrchestratorOnReady>
    )
  }
  return null
}
