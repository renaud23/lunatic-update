import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import useLunatic from '../use-lunatic'
import type { LunaticData, LunaticError } from '../use-lunatic/type'
import type { LunaticSource } from '../use-lunatic/type-source'
import type { UseLunaticParams } from '../use-lunatic/use-lunatic'
import {
  type OrchestatorContext,
  OrchestratorStatus,
  Provider,
} from './orchestratorContext'

function alwaysTrue() {
  return true
}

function nothing() {}

type Hooks = {
  beforeNextPage: (args: UseLunaticInterface) => boolean
  beforePreviousPage: (args: UseLunaticInterface) => boolean
  afterNextPage: (args: UseLunaticInterface) => void
  afterPreviousPage: (args: UseLunaticInterface) => void
}

export type OrchestratorProps = {
  source: LunaticSource
  data: LunaticData
} & Partial<UseLunaticParams> &
  Partial<Hooks>

export type UseLunaticInterface = ReturnType<typeof useLunatic>

export type LunaticCompiledErrors = {
  currentErrors: Record<string, LunaticError[]> | undefined
  isCritical: boolean
}

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
    beforeNextPage = alwaysTrue,
    beforePreviousPage = alwaysTrue,
    afterNextPage = nothing,
    afterPreviousPage = nothing,
  } = props

  const startNextPage = useRef(false)
  const startPreviousPage = useRef(false)
  const [errors, setErrors] = useState<LunaticCompiledErrors>()

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

  const lunaticResults = useLunatic(source, data, paramsIn)

  const { goNextPage, goPreviousPage, compileControls, pageTag } =
    lunaticResults
  const handleCompileControls = useCallback(() => {
    const e = compileControls()
    setErrors(e)
    return e
  }, [compileControls])

  /** Hooks in Orchestator&Lunatic pipeline */

  const handleGoNextPage = useCallback(() => {
    if (
      beforeNextPage({
        ...lunaticResults,
        compileControls: handleCompileControls,
      })
    ) {
      startNextPage.current = true
      goNextPage()
    } else {
      startNextPage.current = false
    }
  }, [beforeNextPage, goNextPage, lunaticResults, handleCompileControls])

  const handleGoPreviousPage = useCallback(() => {
    if (
      beforePreviousPage({
        ...lunaticResults,
        compileControls: handleCompileControls,
      })
    ) {
      startPreviousPage.current = true
      goPreviousPage()
    }
  }, [
    beforePreviousPage,
    goPreviousPage,
    handleCompileControls,
    lunaticResults,
  ])

  useEffect(() => {
    if (startNextPage.current) {
      startNextPage.current = false
      setErrors(undefined)
      afterNextPage(lunaticResults)
    } else if (startPreviousPage.current) {
      startPreviousPage.current = false
      afterPreviousPage(lunaticResults)
    }
  }, [afterNextPage, afterPreviousPage, lunaticResults, pageTag])

  /** */

  const args = useMemo<OrchestatorContext>(
    () => ({
      status: OrchestratorStatus.ACTIVATE,
      ...lunaticResults,
      errors,
      compileControls: handleCompileControls,
      goNextPage: handleGoNextPage,
      goPreviousPage: handleGoPreviousPage,
    }),
    [
      errors,
      handleCompileControls,
      handleGoNextPage,
      handleGoPreviousPage,
      lunaticResults,
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
