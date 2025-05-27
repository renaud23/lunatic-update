import { createCustomizableLunaticField } from '../../commons'
import type { LunaticBaseProps } from '../../type'

type SummaryTitleProps = Pick<LunaticBaseProps<string>, 'label'>

export const SummaryTitle = createCustomizableLunaticField(
  function SummaryTitle(props: SummaryTitleProps) {
    const { label } = props
    if (label) {
      return <div className="lunatic-summary-label">{label}</div>
    }

    return null
  },
  'SummaryTitle',
)
