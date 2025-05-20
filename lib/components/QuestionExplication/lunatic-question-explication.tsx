import LunaticComponent from '../commons/components/lunatic-component-without-label'
import type { LunaticComponentProps } from '../type'
import { QuestionExplication } from './html/question-explication'

function empty() {}

export function LunaticQuestionExplication({
  id,
  label,
  description,
  bgColor,
}: LunaticComponentProps<'QuestionExplication'>) {
  return (
    <LunaticComponent
      id={id}
      label={label}
      handleChange={empty}
      description={description}
      value={undefined}
    >
      <QuestionExplication
        label={label}
        id={id}
        description={description}
        bgColor={bgColor}
      />
    </LunaticComponent>
  )
}
