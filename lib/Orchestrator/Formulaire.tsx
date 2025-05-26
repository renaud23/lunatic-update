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
    <form className="card w-150 bg-base-100 shadow-sm min-h-50 p-5">
      <LunaticComponents
        components={components}
        componentProps={getComponentsProps}
      />
    </form>
  )
}
