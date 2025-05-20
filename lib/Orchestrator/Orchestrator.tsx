import { type FunctionComponent, type PropsWithChildren, useMemo } from 'react'

import useLunatic from '../use-lunatic'
import type { LunaticData } from '../use-lunatic/type'
import type { LunaticSource } from '../use-lunatic/type-source'
import {
  type OrchestatorContext,
  OrchestratorStatus,
  Provider,
} from './orchestratorContext'

type CustomType = Record<string, FunctionComponent<unknown>>
export type OrchestratorProps = {
  source: LunaticSource
  data: LunaticData
  custom?: CustomType
}

export type UseLunaticInterface = ReturnType<typeof useLunatic>

function OrchestratorOnReady(props: PropsWithChildren<OrchestratorProps>) {
  const { source, data, custom, children } = props

  const paramsIn = useMemo(() => ({ custom }), [custom])

  const {
    getComponents,
    goPreviousPage,
    goNextPage,
    goToPage,
    compileControls,
    pager,
    pageTag,
    isFirstPage,
    isLastPage,
  } = useLunatic(source, data, paramsIn)

  const args = useMemo<OrchestatorContext>(
    () => ({
      status: OrchestratorStatus.ACTIVATE,
      getComponents,
      goPreviousPage,
      goNextPage,
      goToPage,
      compileControls,
      pager,
      pageTag,
      isFirstPage,
      isLastPage,
    }),
    [
      compileControls,
      getComponents,
      goNextPage,
      goPreviousPage,
      goToPage,
      isFirstPage,
      isLastPage,
      pageTag,
      pager,
    ],
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
