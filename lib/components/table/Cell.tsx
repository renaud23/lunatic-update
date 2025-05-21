import type {
  LunaticComponentDefinition,
  LunaticExpression,
} from '../../use-lunatic/type'
import { OrchestratedComponent } from '../commons'
import { collecteValue } from '../commons/collecteValue'
import { Td } from '../commons/components/html-table'
import type { LunaticBaseProps } from '../type'

type Props = {
  content:
    | LunaticComponentDefinition
    | { label: LunaticExpression; rowspan?: number; colspan?: number }
  id: string
  executeExpression: LunaticBaseProps['executeExpression']
  iteration?: number
  value: Record<string, unknown>
  row?: string | number
  index?: string | number
  handleChange: LunaticBaseProps['handleChange']
  errors?: LunaticBaseProps['errors']
}

export function Cell({
  content,
  id,
  executeExpression,
  iteration,
  value,
  row,
  index,
  handleChange,
  errors,
}: Props) {
  if ('componentType' in content) {
    const valueField = collecteValue(content, value)
    return (
      <Td id={id} row={row} index={index}>
        <OrchestratedComponent
          id={id}
          component={content}
          handleChange={handleChange}
          value={valueField}
          executeExpression={executeExpression}
          iteration={iteration}
          errors={errors}
        />
      </Td>
    )
  }

  const getLabel = () => {
    try {
      return executeExpression(content.label, { iteration })
    } catch (e) {
      return (e as any).toString()
    }
  }

  return (
    <Td
      id={id}
      row={row}
      index={index}
      rowSpan={content.rowspan}
      colSpan={content.colspan}
    >
      {getLabel()}
    </Td>
  )
}
