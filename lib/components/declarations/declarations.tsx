import { createCustomizableLunaticField } from '../commons'
import type { LunaticBaseProps } from '../type'
import { Declaration } from './Declaration'

export type DeclarationsProps = {
  id?: string
  type?: 'AFTER_QUESTION_TEXT' | 'BEFORE_QUESTION_TEXT' | 'DETACHABLE'
  declarations?: LunaticBaseProps['declarations']
}

export const Declarations = createCustomizableLunaticField(
  function Declarations({
    id,
    type = 'AFTER_QUESTION_TEXT',
    declarations,
  }: DeclarationsProps) {
    const filtered =
      declarations?.filter(({ position }) => position === type) ?? []
    if (filtered.length === 0) return null

    return (
      <div id={`declarations-${id}-${type}`} className="declarations-lunatic">
        {filtered.map(({ id: idD, label, declarationType }) => (
          <Declaration key={`${idD}`} type={declarationType.toLowerCase()}>
            {label}
          </Declaration>
        ))}
      </div>
    )
  },
  'Declarations',
)
