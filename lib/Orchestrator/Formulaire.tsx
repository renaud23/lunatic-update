import { useCallback } from 'react'

import { LunaticComponents, useGetComponents } from '../main'
import type { FilledLunaticComponentProps } from '../use-lunatic/commons/fill-components/fill-components'
import type { LunaticError } from '../use-lunatic/type'
import { useErrors } from './hook'

export type FormulaireProps = {
  displayErrors?: boolean
  componentProps?: () => Partial<
    FilledLunaticComponentProps & {
      errors: Record<string, LunaticError[]> | undefined
      disabled: boolean
    }
  >
}

const blank = {}

export function Formulaire(props: FormulaireProps) {
  const { componentProps, displayErrors } = props
  const getComponents = useGetComponents()
  const components = getComponents()

  const { currentErrors } = useErrors()

  /** props with control's errors */
  const getComponentsProps = useCallback(() => {
    if (componentProps) {
      return displayErrors
        ? componentProps()
        : { ...componentProps(), errors: currentErrors }
    }
    return displayErrors ? { errors: currentErrors } : blank
  }, [componentProps, currentErrors, displayErrors])

  return (
    <form>
      <LunaticComponents
        components={components}
        componentProps={getComponentsProps}
      />
    </form>
  )
}
