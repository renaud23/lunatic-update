import { type PropsWithChildren } from 'react'

import classnames from 'classnames'

export function LunaticIcon({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return <i className={classnames('lunatic-icon', className)}>{children}</i>
}
