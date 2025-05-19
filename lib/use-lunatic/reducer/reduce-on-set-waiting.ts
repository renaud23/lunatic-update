import { type ActionOnSetWaiting } from '../actions'
import type { LunaticState } from '../type'

function reduceOnSetWaiting(
  state: LunaticState,
  action: ActionOnSetWaiting,
): LunaticState {
  const { payload } = action
  const { status } = payload
  return { ...state, waiting: status }
}

export default reduceOnSetWaiting
