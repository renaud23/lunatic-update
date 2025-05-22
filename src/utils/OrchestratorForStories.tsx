import { Formulaire, Orchestrator } from '../../lib/main'
import type { LunaticData } from '../../lib/use-lunatic/type'
import type { LunaticSource } from '../../lib/use-lunatic/type-source'
import { Navigation } from './Navigation'

type OrchestratorForStoriesProps = {
  source?: LunaticSource
  data?: LunaticData
  navigation?: boolean
}

export function OrchestratorForStories(props: OrchestratorForStoriesProps) {
  const { source, data, navigation } = props
  return (
    <Orchestrator source={source} data={data}>
      <Formulaire />
      <Navigation enabled={navigation} />
    </Orchestrator>
  )
}
