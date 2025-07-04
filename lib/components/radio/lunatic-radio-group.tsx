import { createCustomizableLunaticField } from '../commons'
import { getComponentErrors } from '../commons/components/errors/errors'
import LunaticComponent from '../commons/components/lunatic-component-without-label'
import useOnHandleChange from '../commons/use-on-handle-change'
import type { LunaticComponentProps } from '../type'
import { RadioGroup } from './html/radio-group'

export const LunaticRadioGroup = createCustomizableLunaticField(
  function LunaticRadioGroup(props: LunaticComponentProps<'Radio'>) {
    const {
      id,
      options,
      value,
      checkboxStyle,
      errors,
      handleChange,
      response,
      label,
      description,
      preferences,
      declarations,
      missingResponse,
      missing,
      shortcut,
      management,
      className = 'lunatic-radio-group',
      disabled,
      readOnly,
    } = props
    const onChange = useOnHandleChange({ handleChange, response, value })
    return (
      <LunaticComponent
        id={id}
        label={label}
        preferences={preferences}
        declarations={declarations}
        value={value}
        missingResponse={missingResponse}
        missing={missing}
        management={management}
        description={description}
        handleChange={handleChange}
      >
        <RadioGroup
          id={id}
          options={options}
          value={value}
          onSelect={onChange}
          checkboxStyle={checkboxStyle}
          errors={getComponentErrors(errors, id)}
          label={label}
          className={className}
          shortcut={shortcut}
          disabled={disabled}
          readOnly={readOnly}
        />
      </LunaticComponent>
    )
  },
  'LunaticRadioGroup',
)
