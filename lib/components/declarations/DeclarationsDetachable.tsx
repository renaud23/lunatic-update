import { Declarations, type DeclarationsProps } from './Declarations'
import { DECLARATION_POSITIONS } from './declarationPositions'

function DeclarationsDetachable(props: Omit<DeclarationsProps, 'type'>) {
  return <Declarations type={DECLARATION_POSITIONS.detachable} {...props} />
}

export default DeclarationsDetachable
