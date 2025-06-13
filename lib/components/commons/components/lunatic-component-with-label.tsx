import { Fragment, type ReactNode } from 'react'

import DeclarationsBeforeText from '@lib/components/declarations/DeclarationsBeforeText'
import DeclarationsDetachable from '@lib/components/declarations/DeclarationsDetachable'
import { DECLARATION_POSITIONS } from '@lib/components/declarations/declarationPositions'

import type { LunaticBaseProps } from '../../type'
import FieldContainer from './field-container'
import Label from './label'
import Missing from './missing'
import VariableStatus from './variable-status'

/**
 * Returns declarations with "after" position if exists, return description otherwise
 */
function getDescription({
  declarations,
  description,
}: Pick<LunaticBaseProps, 'description' | 'declarations'>) {
  if (Array.isArray(declarations)) {
    const found = declarations.filter(
      (v) => v.position === DECLARATION_POSITIONS.after,
    )
    if (found.length) {
      return found
    }
  }

  return description
}

type Props = {
  children: ReactNode
  componentType?: string
  paginatedLoop?: boolean
  handleChange: (
    response: { name: string },
    value: any,
    args?: Record<string, unknown>,
  ) => void
} & Pick<
  LunaticBaseProps,
  | 'description'
  | 'declarations'
  | 'management'
  | 'id'
  | 'label'
  | 'missingResponse'
  | 'missing'
>

function LunaticComponentWithLabel(props: Props) {
  const { id, label, declarations, children, management, description } = props
  const labelId = `label-${id}`
  const Wrapper = management ? VariableStatus : Fragment
  return (
    <Wrapper>
      <DeclarationsBeforeText declarations={declarations} id={id} />
      <FieldContainer>
        <Label
          htmlFor={id}
          id={labelId}
          description={getDescription({ declarations, description })}
        >
          {label}
        </Label>
        {children}
      </FieldContainer>
      <DeclarationsDetachable declarations={declarations} id={id} />
      <Missing {...props} />
    </Wrapper>
  )
}

export default LunaticComponentWithLabel
