export function getVariableValue<T>(t: T) {
  return {
    COLLECTED: t,
    EDITED: null,
    FORCED: null,
    INPUTED: null,
    PREVIOUS: null,
  }
}
