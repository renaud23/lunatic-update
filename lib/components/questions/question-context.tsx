import { createCustomizableLunaticField } from '../commons'
import type { LunaticComponentProps } from '../type'

function Description({ description }: LunaticComponentProps<'Question'>) {
  if (!description) {
    return null
  }
  return <span>{description}</span>
}

export const QuestionContext = createCustomizableLunaticField(
  function QuestionContext(props: LunaticComponentProps<'Question'>) {
    const { label, description } = props

    if (label) {
      return (
        <>
          <div className="lunatic-call-out">
            {label}
            <Description description={description} />
          </div>
        </>
      )
    }
    return null
  },
  'QuestionContext',
)
