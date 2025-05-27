import { useNavigation, usePagination } from '@lib/main'

export function Navigation() {
  const { goPreviousPage, goNextPage } = useNavigation()
  const { isLastPage, isFirstPage } = usePagination()
  return (
    <div className="join" role="group">
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
        Continuer
      </button>
    </div>
  )
}
