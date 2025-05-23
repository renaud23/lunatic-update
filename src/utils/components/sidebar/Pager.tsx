import { usePagination } from '@lib/main'

function transformPager(pager?: Record<string, unknown>) {
  if (pager) {
    return Object.entries(pager).map(([k, v]) => {
      return (
        <li className="flex gap-2" key={k}>
          <span>{k}</span>{' '}
          <span className="dot-leader">{JSON.stringify(v)}</span>
        </li>
      )
    })
  }
  return null
}

export function Pager() {
  const { pager, pageTag } = usePagination()
  return (
    <>
      <h3 className="text-lg font-bold mb-4">Pager</h3>
      <ul className="flex flex-col">
        <li className="flex gap-2">
          <span>PageTag</span>
          <span className="dot-leader">{JSON.stringify(pageTag)}</span>
        </li>
        {transformPager(pager)}
      </ul>
    </>
  )
}
