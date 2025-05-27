import { Formulaire, Orchestrator } from '@lib/main'
import type { LunaticSource } from '@lib/use-lunatic/type-source'

import { AlertControls } from './AlertControls'
import { Navigation } from './Navigation'
import source from './source.json'

const data = {}

export function App() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Orchestrator source={source as unknown as LunaticSource} data={data}>
        <AlertControls />
        <Formulaire displayErrors={true} />
        <Navigation />
      </Orchestrator>
    </div>
  )
}
