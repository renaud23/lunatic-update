import { createCustomizableLunaticField } from '../commons'
import type { LunaticComponentProps } from '../type'

function Description({ description }: LunaticComponentProps<'Question'>) {
  if (!description) {
    return null
  }
  return <span>{description}</span>
}

export const QuestionInformation = createCustomizableLunaticField(
  function QuestionInformation(props: LunaticComponentProps<'Question'>) {
    const { label, description } = props

    if (label) {
      return (
        <>
          <div className="lunatic-alert-information">
            {label}
            <Description description={description} />
          </div>
        </>
      )
    }
    return null
  },
  'QuestionInformation',
)
