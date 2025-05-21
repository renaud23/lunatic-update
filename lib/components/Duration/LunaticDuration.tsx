import { useOnHandleChange } from '../commons'
import LunaticComponent from '../commons/components/lunatic-component-without-label'
import type { LunaticComponentProps } from '../type'
import { DurationInput } from './durationInput'

export function LunaticDuration(props: LunaticComponentProps<'Duration'>) {
  const {
    value,
    label,
    format,
    handleChange,
    response,
    id,
    preferences,
    declarations,
    missing,
    missingResponse,
    management,
    description,
  } = props

  const onChange = useOnHandleChange({
    handleChange,
    response,
    value: value ?? '',
  })

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
      <div className="container">
        {label}
        <DurationInput value={value} format={format} onChange={onChange} />
      </div>
    </LunaticComponent>
  )
}
