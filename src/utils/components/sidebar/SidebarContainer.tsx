import type { PropsWithChildren } from 'react'

export function SidebarContainer(props: PropsWithChildren) {
  return (
    <aside className="space-y-4 card card-border border-base-300 p-2">
      <div className="space-y-4">{props.children}</div>
    </aside>
  )
}
