import { useMemo, useState } from 'react'

import type { LunaticError } from '../../../use-lunatic/type'
import type { LunaticComponentProps } from '../../type'
import createSearching from '../createSearching'
import { Suggester } from '../html/suggester'
import CheckStore from './CheckStore'
import { SuggesterStatus } from './SuggesterStatus'

type Props = Pick<
  LunaticComponentProps<'Suggester'>,
  | 'storeName'
  | 'idbVersion'
  | 'id'
  | 'className'
  | 'optionRenderer'
  | 'labelRenderer'
  | 'disabled'
  | 'readOnly'
  | 'value'
  | 'label'
  | 'description'
  | 'getSuggesterStatus'
> & {
  errors?: LunaticError[]
  onSelect: (v: string | null) => void
  workersBasePath?: string
}

export function IDBSuggester({
  storeName,
  idbVersion = '1',
  id,
  className,
  optionRenderer,
  labelRenderer,
  onSelect,
  disabled,
  value,
  label,
  description,
  getSuggesterStatus,
  errors,
  readOnly,
  workersBasePath,
}: Props) {
  const [store, setStore] = useState(undefined)

  const searching = useMemo(
    function () {
      if (store) {
        return createSearching(storeName, idbVersion, workersBasePath)
      }
      return undefined
    },
    [storeName, idbVersion, store, workersBasePath],
  )

  return (
    <SuggesterStatus
      storeName={storeName}
      getSuggesterStatus={getSuggesterStatus}
      label={label}
      description={description}
    >
      <CheckStore
        storeName={storeName}
        version={parseInt(idbVersion, 10)}
        setStore={setStore}
      >
        <Suggester
          id={id}
          className={className}
          optionRenderer={optionRenderer}
          labelRenderer={labelRenderer}
          onSelect={onSelect}
          searching={searching}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          label={label}
          description={description}
          errors={errors}
        />
      </CheckStore>
    </SuggesterStatus>
  )
}
