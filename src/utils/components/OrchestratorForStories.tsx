import { useCallback, useState } from 'react'

import {
  Formulaire,
  type LunaticCompiledErrors,
  Orchestrator,
  type UseLunaticInterface,
} from '../../../lib/main'
import type { LunaticData } from '../../../lib/use-lunatic/type'
import type { LunaticSource } from '../../../lib/use-lunatic/type-source'
import { Sidebar } from './sidebar/Sidebar'

type OrchestratorForStoriesProps = {
  source?: LunaticSource
  data?: LunaticData
  navigation?: boolean
}

function useOrchestratorControls() {
  const [errors, setErrors] = useState<LunaticCompiledErrors>()

  const beforeNextPage = useCallback(
    (args: UseLunaticInterface) => {
      const { compileControls } = args
      // s'il y a déjà des erreurs
      if (errors?.currentErrors) {
        if (errors.isCritical) {
          return false
        }
        setErrors(undefined)
        return true
      }
      // sinon on test s'il y en a
      const newErrors = compileControls()
      setErrors(newErrors)
      if (newErrors.currentErrors) {
        return false
      }

      return true
    },
    [errors],
  )

  return { beforeNextPage, errors }
}

export function OrchestratorForStories(props: OrchestratorForStoriesProps) {
  const { source, data } = props

  const { beforeNextPage } = useOrchestratorControls()

  return (
    <div className="container grid grid-cols-[1fr_300px] gap-4">
      <Orchestrator source={source} data={data} beforeNextPage={beforeNextPage}>
        <Formulaire />
        <Sidebar source={source} />
      </Orchestrator>
    </div>
  )
}
