import DeclarationsAfterText from '../Declarations/DeclarationsAfterText'
import DeclarationsBeforeText from '../Declarations/DeclarationsBeforeText'
import DeclarationsDetachable from '../Declarations/DeclarationsDetachable'
import { createCustomizableLunaticField } from '../commons'
import type { LunaticComponentProps } from '../type'

export const Subsequence = createCustomizableLunaticField(function Subsequence({
  id,
  declarations,
  label,
}: LunaticComponentProps<'Subsequence'>) {
  return (
    <>
      <DeclarationsBeforeText declarations={declarations} id={id} />
      <div
        aria-label={`subsequence-${id}`}
        className="subsequence-lunatic"
        id={`subsequence-${id}`}
      >
        {label}
      </div>
      <DeclarationsAfterText declarations={declarations} id={id} />
      <DeclarationsDetachable declarations={declarations} id={id} />
    </>
  )
}, 'Subsequence')
