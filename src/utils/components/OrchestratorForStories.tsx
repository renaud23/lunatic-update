import { Formulaire, Orchestrator } from '../../../lib/main'
import type { LunaticData } from '../../../lib/use-lunatic/type'
import type { LunaticSource } from '../../../lib/use-lunatic/type-source'
import { Sidebar } from './sidebar/Sidebar'

type OrchestratorForStoriesProps = {
  source?: LunaticSource
  data?: LunaticData
  navigation?: boolean
}

export function OrchestratorForStories(props: OrchestratorForStoriesProps) {
  const { source, data } = props

  return (
    <div className="container grid grid-cols-[1fr_300px] gap-4">
      <Orchestrator source={source} data={data}>
        <Formulaire />
        <Sidebar source={source} />
      </Orchestrator>
    </div>
  )
}
