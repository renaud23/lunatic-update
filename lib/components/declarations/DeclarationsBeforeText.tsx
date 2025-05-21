import { Declarations, type DeclarationsProps } from './Declarations'
import { DECLARATION_POSITIONS } from './declarationPositions'

function DeclarationsBeforeText(props: Omit<DeclarationsProps, 'type'>) {
  return <Declarations type={DECLARATION_POSITIONS.before} {...props} />
}

export default DeclarationsBeforeText
