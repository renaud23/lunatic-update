import { Formulaire, Orchestrator } from '../../lib/main'
import type { LunaticData } from '../../lib/use-lunatic/type'
import type { LunaticSource } from '../../lib/use-lunatic/type-source'

type OrchestratorForStoriesProps = {
  source?: LunaticSource
  data?: LunaticData
}

export function OrchestratorForStories(props: OrchestratorForStoriesProps) {
  const { source, data } = props
  return (
    <Orchestrator source={source} data={data}>
      <Formulaire />
    </Orchestrator>
  )
}
