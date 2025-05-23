import { Button, useNavigation, usePagination } from '@lib/main'

type NavigationProps = {
  enabled?: boolean
  maxPage?: string
}

function isDisabled(maxPage?: string) {
  return maxPage ? parseInt(maxPage) < 2 : true
}

export function Navigation(props: NavigationProps) {
  const { enabled, maxPage } = props
  const { goNextPage, goPreviousPage, goToPage } = useNavigation()
  const { isFirstPage, isLastPage } = usePagination()

  if (enabled) {
    return (
      <>
        <div className="join mb-2 w-full">
          <Button
            label="Previous"
            className="btn join-item btn-block shrink btn-primary"
            disabled={isFirstPage}
            onClick={goPreviousPage}
          />
          <Button
            className="btn join-item btn-block shrink btn-primary"
            label="Next"
            disabled={isLastPage}
            onClick={goNextPage}
          />
        </div>
        <form
          className="join w-full"
          onSubmit={(e) => {
            e.preventDefault()
            const page = `${e.currentTarget.querySelector('input')!.valueAsNumber}`
            goToPage({
              page,
            })
          }}
        >
          <label className="input join-item">
            <span className="label">Page</span>
            <input
              type="number"
              placeholder="1"
              disabled={isDisabled(maxPage)}
            />
          </label>
          <button
            type="submit"
            className="join-item btn btn-neutral"
            disabled={isDisabled(maxPage)}
          >
            Reach
          </button>
        </form>
      </>
    )
  }
  return null
}
