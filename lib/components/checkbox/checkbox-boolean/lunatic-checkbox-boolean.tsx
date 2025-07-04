import { getComponentErrors } from '../../commons/components/errors/errors'
import LunaticComponent from '../../commons/components/lunatic-component-without-label'
import useOnHandleChange from '../../commons/use-on-handle-change'
import type { LunaticComponentProps } from '../../type'
import { CheckboxBoolean } from './html/checkbox-boolean'

export function LunaticCheckboxBoolean({
  value,
  id,
  // options,
  disabled,
  handleChange,
  response,
  errors,
  label,
  preferences,
  declarations,
  missing,
  missingResponse,
  management,
  description,
}: LunaticComponentProps<'CheckboxBoolean'>) {
  const onChange = useOnHandleChange({ handleChange, response, value })

  return (
    <LunaticComponent
      id={id}
      preferences={preferences}
      declarations={declarations}
      value={value}
      missing={missing}
      missingResponse={missingResponse}
      management={management}
      description={description}
      handleChange={handleChange}
    >
      <CheckboxBoolean
        id={id}
        checked={value ?? false}
        onClick={onChange}
        disabled={disabled}
        label={label}
        errors={getComponentErrors(errors, id)}
      />
    </LunaticComponent>
  )
}
