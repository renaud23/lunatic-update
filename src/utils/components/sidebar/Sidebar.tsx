import type { LunaticSource } from '@lib/use-lunatic/type-source'

import { Logger } from './Logger'
import { Navigation } from './Navigation'
import { Pager } from './Pager'
import { SidebarContainer } from './SidebarContainer'

type SidebarProps = {
  source?: LunaticSource
}

export function Sidebar(props: SidebarProps) {
  const { source } = props
  return (
    <SidebarContainer>
      <Navigation enabled={true} maxPage={source?.maxPage} />
      <Pager />
      <Logger />
    </SidebarContainer>
  )
}
