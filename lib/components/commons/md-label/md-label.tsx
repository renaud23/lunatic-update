import type { ComponentProps } from 'react'
import { Fragment } from 'react'

import ReactMarkdown from 'react-markdown'

import { voidFunction } from '../../../utils/function'
import Link from './link'

const DEFAULT_LOG_FUNCTION = voidFunction

type Props = { expression: string; logFunction?: typeof DEFAULT_LOG_FUNCTION }

const MdLabel = ({ expression, logFunction = DEFAULT_LOG_FUNCTION }: Props) => (
  <ReactMarkdown
    children={expression}
    components={renderComponentsFor(expression, { logFunction })}
  />
)

const renderComponentsFor = (
  expression: string,
  extraProps: {
    logFunction: typeof DEFAULT_LOG_FUNCTION
  },
): ComponentProps<typeof ReactMarkdown>['components'] => {
  const components = {
    p: Fragment,
    br: 'br',
    a: (props) => (
      <Link {...({ ...extraProps, ...props } as ComponentProps<typeof Link>)} />
    ),
  } satisfies ComponentProps<typeof ReactMarkdown>['components']

  if (/\n\n/.test(expression)) {
    return {
      ...components,
      p: 'p',
    }
  }

  return components
}

export default MdLabel
