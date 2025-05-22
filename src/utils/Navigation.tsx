import type { PropsWithChildren } from 'react'

import { Button, useNavigation, usePagination } from '@lib/main'

type NavigationProps = {
  enabled?: boolean
}

export function Navigation(props: NavigationProps) {
  const { enabled } = props
  const { goNextPage, goPreviousPage } = useNavigation()
  const { isFirstPage, isLastPage } = usePagination()
  if (enabled) {
    return (
      <div style={{ margin: '2px 2px' }}>
        <Button
          label="Previous"
          disabled={isFirstPage}
          onClick={goPreviousPage}
        />
        <Button label="Next" disabled={isLastPage} onClick={goNextPage} />
      </div>
    )
  }
  return null
}
