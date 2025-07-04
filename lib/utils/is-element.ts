import { type ReactElement, isValidElement } from 'react'

function isElement<P = unknown>(element: unknown): element is ReactElement<P> {
  return isValidElement(element)
}

export { isElement }
