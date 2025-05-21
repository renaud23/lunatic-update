import { CheckboxOption } from '../commons/checkbox-option'
import { type CheckboxGroupOption } from './lunatic-checkbox-group'

type Props = {
  id: string
  options: CheckboxGroupOption[]
}

export function CheckboxGroupContent({ options, id }: Props) {
  return (
    <>
      {options.map(function (option) {
        const { label, checked, name, onClick, description } = option
        const checkboxId = `lunatic-checkbox-${id}-${name}`

        return (
          <div className="lunatic-checkbox-group-option" key={checkboxId}>
            <CheckboxOption
              id={checkboxId}
              checked={checked}
              onClick={onClick}
              label={label}
              description={description}
            />
          </div>
        )
      })}
    </>
  )
}
