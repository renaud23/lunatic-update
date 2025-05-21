import { Declarations, type DeclarationsProps } from './Declarations'
import { DECLARATION_POSITIONS } from './declarationPositions'

function DeclarationsAfterText(props: Omit<DeclarationsProps, 'type'>) {
  return <Declarations type={DECLARATION_POSITIONS.after} {...props} />
}

export default DeclarationsAfterText
