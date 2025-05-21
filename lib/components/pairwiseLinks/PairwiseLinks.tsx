import DeclarationsAfterText from '../Declarations/DeclarationsAfterText'
import DeclarationsBeforeText from '../Declarations/DeclarationsBeforeText'
import DeclarationsDetachable from '../Declarations/DeclarationsDetachable'
import NothingToDisplay from '../commons/components/nothing-to-display'
import type { LunaticComponentProps } from '../type'
import { LinksOrchestrator } from './LinksOrchestrator'

export function PairwiseLinks({
  declarations,
  components,
  handleChange,
  value,
  missing,
  shortcut,
  features,
  preferences,
  management,
  executeExpression,
  xAxisIterations,
  yAxisIterations,
  id,
  symLinks,
}: LunaticComponentProps<'PairwiseLinks'>) {
  const nbRows = xAxisIterations * yAxisIterations

  if (nbRows <= 1) {
    return <NothingToDisplay />
  }

  return (
    <>
      <DeclarationsBeforeText declarations={declarations} id={id} />
      <DeclarationsAfterText declarations={declarations} id={id} />
      <LinksOrchestrator
        id={id}
        components={components}
        handleChange={handleChange}
        nbRows={nbRows}
        value={value}
        className="pairwise-link"
        management={management}
        missing={missing}
        shortcut={shortcut}
        features={features}
        preferences={preferences}
        executeExpression={executeExpression}
        xAxisIterations={xAxisIterations}
        yAxisIterations={yAxisIterations}
        symLinks={symLinks}
      />
      <DeclarationsDetachable declarations={declarations} id={id} />
    </>
  )
}
