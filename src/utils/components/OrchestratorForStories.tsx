import { useCallback } from 'react'

import { Formulaire, Orchestrator } from '../../../lib/main'
import type { LunaticData } from '../../../lib/use-lunatic/type'
import type { LunaticSource } from '../../../lib/use-lunatic/type-source'
import { Sidebar } from './sidebar/Sidebar'

type OrchestratorForStoriesProps = {
  source?: LunaticSource
  data?: LunaticData
  navigation?: boolean

  filterDescription?: boolean
}

export function OrchestratorForStories(props: OrchestratorForStoriesProps) {
  const { source, data, filterDescription } = props

  const componentProps = useCallback(() => {
    return { filterDescription }
  }, [filterDescription])

  return (
    <div className="container grid grid-cols-[1fr_300px] gap-4">
      <Orchestrator source={source} data={data}>
        <Formulaire displayErrors={true} componentProps={componentProps} />
        <Sidebar source={source} />
      </Orchestrator>
    </div>
  )
}
