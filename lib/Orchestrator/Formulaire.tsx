import { LunaticComponents, useGetComponents } from '../main'
import type { FilledLunaticComponentProps } from '../use-lunatic/commons/fill-components/fill-components'
import type { LunaticError } from '../use-lunatic/type'

type FormulaireProps = {
  componentProps?: () => Partial<
    FilledLunaticComponentProps & {
      errors: Record<string, LunaticError[]> | undefined
      disabled: boolean
    }
  >
}

export function Formulaire(props: FormulaireProps) {
  const getComponents = useGetComponents()
  const components = getComponents()

  const { componentProps } = props

  return (
    <form>
      <LunaticComponents
        components={components}
        componentProps={componentProps}
      />
    </form>
  )
}
