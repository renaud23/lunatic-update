import type { LunaticComponentProps } from '../type'
import { BlockForLoop } from './BlockForLoop'
import { RosterForLoop } from './rosterForLoop/RosterForLoop'

const LoopTypes = {
  rosterForLoop: 'RosterForLoop',
  blockForLoop: 'Loop',
}

export function Loop(props: LunaticComponentProps<'Loop' | 'RosterForLoop'>) {
  const Component = getComponent(props.componentType)
  if (!Component) {
    return null
  }
  return <Component {...(props as any)} />
}

function getComponent(componentType?: string) {
  switch (componentType) {
    case LoopTypes.blockForLoop:
      return BlockForLoop
    case LoopTypes.rosterForLoop:
      return RosterForLoop
    default:
      return null
  }
}
