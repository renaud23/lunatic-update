import type { LunaticState } from '../type'

const compose = <V>(
  ...functions: Array<(acc: LunaticState, action: V) => LunaticState>
) => {
  return functions.reverse().reduce(
    function (next, current) {
      return (state, action) => next(current(state, action), action)
    },
    (value: LunaticState) => value,
  )
}

export default compose
