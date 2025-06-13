import { type ReactNode, useEffect, useState } from 'react'

import type { ComboBoxOptionType } from '@lib/components/commons/components/combo-box/combo-box.type'
import classnames from 'classnames'

import { getLabel } from './filterTools/getLabel'
import { lettersMatching } from './filterTools/lettersMatching'
import { preparePrefix } from './filterTools/prepare-prefix'

type Props = {
  option: ComboBoxOptionType
  selected?: boolean
  search?: string
}

function hightlightSearch(label: ReactNode, prefix: string | undefined) {
  const labelText = getLabel(label)
  const initLetters = lettersMatching(labelText, prefix)
  return labelText
    .split('')
    .reduce(
      ({ letters, stack }, c) => {
        const m = preparePrefix(c)
        const [first, ...rest] = letters
        if (m === first) {
          return {
            letters: rest,
            stack: [...stack, { char: c, className: 'prefix' }],
          }
        }

        return {
          letters,
          stack: [...stack, { char: c, className: 'normal' }],
        }
      },
      {
        letters: initLetters,
        stack: [] as Array<{ char: string; className: string }>,
      },
    )
    .stack.reduce(
      ({ last, stack }, { char, className }) => {
        if (!last) {
          return { last: className, stack: [{ part: char, className }] }
        }
        if (last !== className) {
          return {
            last: className,
            stack: [{ part: char, className }, ...stack],
          }
        }
        const [first, ...rest] = stack
        return {
          last: className,
          stack: [{ ...first, part: `${first.part}${char}` }, ...rest],
        }
      },
      {
        last: undefined as undefined | string,
        stack: [] as Array<{ part: string; className: string }>,
      },
    )
    .stack.reverse()
}

export function WritableOptionRenderer({ option, selected, search }: Props) {
  const [parts, setParts] = useState(
    [] as Array<{ part: string; className: string }>,
  )
  const { value, label } = option

  useEffect(
    function () {
      setParts(hightlightSearch(label, search))
    },
    [search, label],
  )

  if (parts?.length) {
    return (
      <div className={classnames('lunatic-dropdown-option', { selected })}>
        <span className="id">{value}</span>
        <span>&nbsp;&#x2014;&nbsp;</span>
        <span className="label">
          {parts.map(({ part, className }, i) => (
            <span className={className} key={i}>
              {part}
            </span>
          ))}
        </span>
      </div>
    )
  }
  return (
    <div className={classnames('lunatic-dropdown-option', { selected })}>
      <span className="id">{value}</span>
    </div>
  )
}
