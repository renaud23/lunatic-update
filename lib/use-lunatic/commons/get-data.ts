import { CALCULATED, COLLECTED, EXTERNAL } from '../../constants'
import type { VariablesByType } from '../reducer/reduce-on-init'
import type { LunaticState, LunaticValues } from '../type'
import { interpretAllCalculatedVariables } from './calculated-variables'

/**
 * Extract the value from a questionnaire
 *
 * used by the "getData" method from the state at the end of a form
 */
export const getQuestionnaireData = ({
  variables,
  withRefreshedCalculated,
}: {
  variables: LunaticState['variables']
  withRefreshedCalculated: boolean
}) => {
  const builtVariables = Object.entries(variables).reduce(
    (acc, [k, { value, type }]) => {
      // TODO: refine for management
      if (type === COLLECTED)
        return {
          ...acc,
          COLLECTED: {
            ...acc.COLLECTED,
            [k]: {
              EDITED: null,
              FORCED: null,
              INPUTED: null,
              PREVIOUS: null,
              COLLECTED: value,
            },
          },
        }
      if (
        type === EXTERNAL ||
        (type === CALCULATED && !withRefreshedCalculated)
      )
        return { ...acc, [type]: { ...acc[type], [k]: value } }
      return acc
    },
    { EXTERNAL: {}, CALCULATED: {}, COLLECTED: {} } as VariablesByType,
  )
  if (!withRefreshedCalculated) return builtVariables
  const flattenBuiltVariables = Object.entries(builtVariables).reduce(
    (acc, [type, v]) => {
      if (type === COLLECTED) {
        const collectedVariables = Object.entries(v).reduce(
          (accCol, [k, { COLLECTED: c }]) => ({ ...accCol, [k]: c }),
          {},
        )
        return { ...acc, ...collectedVariables }
      }
      return { ...acc, ...v }
    },
    {} as LunaticValues,
  )
  const flattenCalculatedVariables = interpretAllCalculatedVariables({
    variables,
    builtVariables: flattenBuiltVariables,
  })
  const calculatedVariables = Object.entries(flattenCalculatedVariables).reduce(
    (acc, [k, v]) => ({ ...acc, [k]: v }),
    {},
  )
  return { ...builtVariables, [CALCULATED]: calculatedVariables }
}
