import { type MouseEventHandler, type PropsWithChildren } from 'react'

import classnames from 'classnames'

import { prevent } from '../../utils/dom'
import { isElement } from '../../utils/isElement'
import { createCustomizableLunaticField } from '../commons/createCustomizableField'

type Props = PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLInputElement>
  className?: string
  disabled?: boolean
  label?: string
  value?: string
  type?: 'button' | 'submit' | 'reset'
}>

export function LunaticButton({
  children,
  onClick,
  disabled,
  label,
  className,
  value,
  type = 'button',
}: Props) {
  const handleClick = prevent(onClick)

  if (isElement(children) || value)
    return (
      <button
        disabled={disabled}
        type={type}
        className={classnames('button-lunatic', className, { disabled })}
        onClick={handleClick}
        value={value}
      >
        {children}
      </button>
    )

  return (
    <>
      <input
        disabled={disabled}
        type="button"
        className={classnames('button-lunatic', className, { disabled })}
        value={label ?? children?.toString()}
        onClick={handleClick}
      />
    </>
  )
}

export const Button = createCustomizableLunaticField(LunaticButton, 'Button')
