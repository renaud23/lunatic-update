import type { LunaticComponentProps } from '../type'
import { Row } from './Row'

type Props = Pick<
  LunaticComponentProps<'Table'>,
  'body' | 'id' | 'executeExpression' | 'value' | 'handleChange' | 'iteration'
>
export function TableOrchestrator({
  body,
  id,
  executeExpression,
  value: valueMap,
  handleChange,
  iteration,
}: Props) {
  if (!Array.isArray(body)) {
    return null
  }
  return (
    <>
      {body.map(function (components, index) {
        return (
          <Row
            key={index}
            rowIndex={index}
            components={components}
            id={id}
            valueMap={valueMap}
            handleChange={handleChange}
            iteration={iteration}
            executeExpression={executeExpression}
          />
        )
      })}
    </>
  )
}
