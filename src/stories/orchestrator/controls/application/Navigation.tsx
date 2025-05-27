import { useNavigation, usePagination } from '@lib/main'

import { useOrchestratorControls } from './useOrchestratorControls'

export function Navigation() {
  const { goNextPage, goPreviousPage } = useNavigation()
  const { isLastPage, isFirstPage } = usePagination()

  useOrchestratorControls()

  return (
    <nav className="join">
      <button
        className="join-item btn btn-wide"
        disabled={isFirstPage}
        onClick={goPreviousPage}
      >
        Précédent
      </button>
      <button
        className="join-item btn btn-wide"
        disabled={isLastPage}
        onClick={goNextPage}
      >
        Suivant
      </button>
    </nav>
  )
}
