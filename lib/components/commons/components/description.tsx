import React, { type ReactNode } from 'react'

import classnames from 'classnames'

type Props = {
  value?: ReactNode | Array<{ label: ReactNode; declarationType: string }>
  className?: string
}

function OneDescription({
  value,
  className,
}: {
  value?: ReactNode
  className?: string
}) {
  if (
    (typeof value === 'string' && value.length > 0) ||
    React.isValidElement(value)
  ) {
    return (
      <span className={classnames('label-description', className)}>
        {value}
      </span>
    )
  }

  return null
}

function Description({ value, className }: Props) {
  if (Array.isArray(value)) {
    return (
      <>
        {value.map(({ label, declarationType }, index) => (
          <OneDescription
            key={`description-${index}`}
            value={label}
            className={classnames(className, declarationType)}
          />
        ))}
      </>
    )
  }
  return <OneDescription value={value} className={classnames(className)} />
}

Description.defaultProps = {
  className: undefined,
  value: undefined,
}

export default Description
