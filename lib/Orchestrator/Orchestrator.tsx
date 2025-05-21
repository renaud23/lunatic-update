import { type PropsWithChildren, useMemo } from 'react'

import useLunatic from '../use-lunatic'
import type { LunaticData } from '../use-lunatic/type'
import type { LunaticSource } from '../use-lunatic/type-source'
import type { UseLunaticParams } from '../use-lunatic/use-lunatic'
import {
  type OrchestatorContext,
  OrchestratorStatus,
  Provider,
} from './orchestratorContext'

export type OrchestratorProps = {
  source: LunaticSource
  data: LunaticData
} & Partial<UseLunaticParams>

export type UseLunaticInterface = ReturnType<typeof useLunatic>

function OrchestratorOnReady(props: PropsWithChildren<OrchestratorProps>) {
  const {
    source,
    data,
    children,
    custom,
    onChange,
    getReferentiel,
    autoSuggesterLoading,
    initialPage,
    workersBasePath,
  } = props

  const paramsIn = useMemo<Partial<UseLunaticParams>>(
    () => ({
      custom,
      onChange,
      getReferentiel,
      autoSuggesterLoading,
      initialPage,
      workersBasePath,
    }),
    [
      custom,
      onChange,
      getReferentiel,
      autoSuggesterLoading,
      initialPage,
      workersBasePath,
    ],
  )

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
  const { source, data, children, ...rest } = props

  if (data && source) {
    return (
      <OrchestratorOnReady source={source} data={data} {...rest}>
        {children}
      </OrchestratorOnReady>
    )
  }
  return null
}
