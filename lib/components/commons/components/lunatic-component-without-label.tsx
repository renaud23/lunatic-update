import { type ReactElement, cloneElement } from 'react'

import {
  DECLARATION_POSITIONS,
  DeclarationsBeforeText,
  DeclarationsDetachable,
} from '../../declarations'
import type { LunaticBaseProps } from '../../type'
import FieldContainer from './field-container'
import Missing from './missing'
import VariableStatus from './variable-status'

type Props = {
  children: ReactElement
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
  | 'preferences'
  | 'value'
  | 'missing'
>

function LunaticComponent(props: Props) {
  const { id, declarations, children, management, description, handleChange } =
    props
  const content = (
    <>
      <DeclarationsBeforeText declarations={declarations} id={id} />
      <FieldContainer>
        {cloneElement<any>(children, {
          description: getDescription({ declarations, description }),
        })}
      </FieldContainer>
      <DeclarationsDetachable declarations={declarations} id={id} />
      <Missing {...props} handleChange={handleChange} />
    </>
  )
  return management ? <VariableStatus>{content}</VariableStatus> : content
}

function getDescription({
  declarations,
  description,
}: {
  declarations: LunaticBaseProps['declarations']
  description: LunaticBaseProps['description']
}) {
  if (Array.isArray(declarations)) {
    return declarations.filter(
      (declaration) => declaration.position === DECLARATION_POSITIONS.after,
    )
  }

  return description
}

export default LunaticComponent
