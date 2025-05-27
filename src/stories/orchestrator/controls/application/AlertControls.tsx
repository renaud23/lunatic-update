import { useErrors } from '@lib/orchestrator/hook'

export function AlertControls() {
  const { currentErrors } = useErrors()
  if (currentErrors) {
    const items = Object.values(currentErrors)
      .flat()
      .map(({ errorMessage }, index) => <li key={index}>{errorMessage}</li>)

    return (
      <div role="alert" className="alert alert-vertical sm:alert-horizontal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info h-6 w-6 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3>Des erreurs sont présentes sur la page</h3>
          <div className="text-xs">
            <ul style={{ display: 'block' }}>{items}</ul>
          </div>
        </div>
      </div>
    )
  }
  return null
}
