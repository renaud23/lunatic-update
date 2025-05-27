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
import { executeAllCallbacks, executeAllPredicates } from './useEventsListerner'

type Hooks = {
  beforeNextPage: (args?: Partial<UseLunaticInterface>) => boolean
  beforePreviousPage: (args?: Partial<UseLunaticInterface>) => boolean
  afterNextPage: (args?: Partial<UseLunaticInterface>) => void
  afterPreviousPage: (args?: Partial<UseLunaticInterface>) => void
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

const nullErrors = { currentErrors: undefined, isCritical: false }

const fromProps = 'FROM_PROPS'

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
    beforeNextPage,
    beforePreviousPage,
    afterNextPage,
    afterPreviousPage,
  } = props

  const startNextPage = useRef(false)
  const startPreviousPage = useRef(false)
  const OELListeners = useRef<OrchestatorContext['OELListeners']>({
    AfterNextPage: { default: () => {} },
    AfterPreviousPage: { default: () => {} },
    BeforeNextPage: { default: () => true },
    BeforePreviousPage: { default: () => true },
  })
  const [errors, setErrors] = useState<LunaticCompiledErrors>(nullErrors)

  useEffect(() => {
    if (beforeNextPage) {
      OELListeners.current.BeforeNextPage[fromProps] = beforeNextPage
    }
    if (beforePreviousPage) {
      OELListeners.current.BeforePreviousPage[fromProps] = beforePreviousPage
    }
    if (afterNextPage) {
      OELListeners.current.AfterNextPage[fromProps] = afterNextPage
    }
    if (afterPreviousPage) {
      OELListeners.current.AfterPreviousPage[fromProps] = afterPreviousPage
    }
  }, [afterNextPage, afterPreviousPage, beforeNextPage, beforePreviousPage])

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

  /** useLunatic */
  const lunaticResults: UseLunaticInterface = useLunatic(source, data, paramsIn)

  /** Hooks in Orchestator&Lunatic pipeline */
  const { goNextPage, goPreviousPage, compileControls, pageTag } =
    lunaticResults
  const handleCompileControls = useCallback(() => {
    const e = compileControls()
    setErrors(e)
    return e
  }, [compileControls])

  const handleGoNextPage = useCallback(() => {
    if (executeAllPredicates(OELListeners.current.BeforeNextPage)) {
      startNextPage.current = true
      goNextPage()
    } else {
      startNextPage.current = false
    }
  }, [goNextPage])

  const handleGoPreviousPage = useCallback(() => {
    if (executeAllPredicates(OELListeners.current.BeforePreviousPage)) {
      startPreviousPage.current = true
      goPreviousPage()
    } else {
      startPreviousPage.current = false
    }
  }, [goPreviousPage])

  useEffect(() => {
    if (startNextPage.current) {
      setErrors(nullErrors)
      startNextPage.current = false
      executeAllCallbacks(OELListeners.current.AfterNextPage)
    } else if (startPreviousPage.current) {
      setErrors(nullErrors)
      startPreviousPage.current = false
      executeAllCallbacks(OELListeners.current.AfterPreviousPage)
    }
  }, [startPreviousPage, lunaticResults, pageTag])

  /** context arguments */
  const forContext = useMemo<OrchestatorContext>(
    () => ({
      status: OrchestratorStatus.ACTIVATE,
      ...lunaticResults,
      errors,
      compileControls: handleCompileControls,
      goNextPage: handleGoNextPage,
      goPreviousPage: handleGoPreviousPage,
      OELListeners: OELListeners.current,
    }),
    [
      errors,
      handleCompileControls,
      handleGoNextPage,
      handleGoPreviousPage,
      lunaticResults,
    ],
  )

  return <Provider value={forContext}>{children}</Provider>
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
