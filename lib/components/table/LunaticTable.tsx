import { Errors } from '../commons'
import { getComponentErrors } from '../commons/components/errors/errors'
import { Table, Tbody } from '../commons/components/html-table'
import LunaticComponent from '../commons/components/lunatic-component-with-label'
import type { LunaticComponentProps } from '../type'
import { Header } from './Header'
import { TableOrchestrator } from './TableOrchestrator'

export function LunaticTable(props: LunaticComponentProps<'Table'>) {
  const {
    id,
    handleChange,
    value,
    body,
    header,
    executeExpression,
    iteration,
    errors,
    missing,
    declarations,
    missingResponse,
    management,
    description,
    label,
  } = props

  return (
    <LunaticComponent
      id={id}
      label={label}
      declarations={declarations}
      missing={missing}
      missingResponse={missingResponse}
      management={management}
      description={description}
      handleChange={handleChange}
    >
      <Table id={id}>
        <Header id={id} header={header} />
        <Tbody>
          <TableOrchestrator
            id={id}
            body={body}
            executeExpression={executeExpression}
            handleChange={handleChange}
            iteration={iteration}
            value={value}
          />
        </Tbody>
      </Table>
      <Errors errors={getComponentErrors(errors, id)} />
    </LunaticComponent>
  )
}
