import { useGetComponents, useGetData } from '@lib/orchestrator/hook'

function logging(v: unknown) {
  console.log(v)
}

export function Logger() {
  const getData = useGetData()
  const getComponent = useGetComponents()

  return (
    <>
      <div className="flex gap-2 w-full">
        <button
          className="btn btn-warning grow"
          onClick={() => {
            logging(getComponent())
          }}
        >
          Log components
        </button>
        <button
          className="btn btn-warning grow"
          onClick={() => logging(getData(false))}
        >
          Log data
        </button>
      </div>
    </>
  )
}
