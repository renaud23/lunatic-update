import { createCustomizableLunaticField } from '../../commons'
import Description from '../../commons/components/description'
import type { LunaticBaseProps } from '../../type'

export const Sequence = createCustomizableLunaticField(function Sequence({
  label,
  id,
  style,
  description,
}: Pick<LunaticBaseProps<string>, 'id' | 'label' | 'style' | 'description'>) {
  return (
    <>
      <div className="sequence-lunatic" id={`sequence-${id}`} style={style}>
        {label}
      </div>
      <Description value={description} />
    </>
  )
}, 'Sequence')
