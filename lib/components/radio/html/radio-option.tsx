import { type ReactNode, useCallback, useEffect, useRef } from 'react'

import classnames from 'classnames'

// import KeyboardEventHandler from 'react-keyboard-event-handler';
import { voidFunction } from '../../../utils/function'
import { Label, createCustomizableLunaticField } from '../../commons'
import {
  CheckboxChecked,
  CheckboxUnchecked,
  RadioChecked,
  RadioUnchecked,
} from '../../commons/icons'

export type Props = {
  id: string
  value?: string | null
  description?: ReactNode
  onClick?: (v: string | null) => void
  checkboxStyle?: boolean
  shortcut?: boolean
  checked?: boolean
  disabled?: boolean
  readOnly?: boolean
  onKeyDown?: (v: { key: string; index: number }) => void
  index?: number
  labelledBy?: string
  label?: ReactNode
  codeModality?: string
  invalid?: boolean
}

function getIcon(checked?: boolean, checkboxStyle?: boolean) {
  if (checked) {
    if (checkboxStyle) {
      return CheckboxChecked
    }
    return RadioChecked
  }
  if (checkboxStyle) {
    return CheckboxUnchecked
  }
  return RadioUnchecked
}

export const RadioOption = createCustomizableLunaticField(function RadioOption({
  checked,
  onClick = voidFunction,
  value = null,
  id,
  disabled,
  onKeyDown = voidFunction,
  index = -1,
  labelledBy,
  checkboxStyle,
  label,
  description,
  //   shortcut,
  codeModality,
  readOnly,
  invalid,
}: Props) {
  const spanEl = useRef<HTMLSpanElement>(null)
  const Icon = getIcon(checked, checkboxStyle)
  const tabIndex = checked ? 0 : -1

  const onClickOption = useCallback(() => {
    if (disabled || readOnly) {
      return
    }
    // on checkboxStyle, clicking on checked value unchecks it, so it acts as if empty answer was clicked
    if (checkboxStyle && checked) {
      onClick(null)
    } else {
      onClick(value)
    }
  }, [checkboxStyle, checked, disabled, onClick, readOnly, value])

  const handleKeyDown = useCallback(
    function (e: { key: string }) {
      const { key } = e
      onKeyDown({ key, index })
      spanEl.current?.blur()
    },
    [onKeyDown, index, spanEl],
  )

  useEffect(
    function () {
      const { current } = spanEl
      if (current && checked) {
        current.focus()
      }
    },
    [checked, spanEl, value],
  )

  return (
    <>
      <div className="lunatic-radio-group-option">
        <div
          className={classnames('radio-modality', 'radio-modality-block', {
            checked,
            disabled,
            readOnly,
          })}
        >
          <span
            id={id}
            role="radio"
            className="lunatic-input-radio"
            aria-checked={checked}
            tabIndex={tabIndex}
            onClick={onClickOption}
            onKeyDown={handleKeyDown}
            aria-labelledby={labelledBy}
            ref={spanEl}
            aria-invalid={invalid}
          >
            <Icon />
            <Label id={labelledBy} htmlFor={id} description={description}>
              {codeModality && (
                <span className="code-modality">
                  {codeModality.toUpperCase()}
                </span>
              )}
              {label}
            </Label>
          </span>
        </div>
      </div>

      {/* shortcut && codeModality && (
				<KeyboardEventHandler
					handleKeys={[codeModality]}
					onKeyEvent={(key, e) => {
						e.preventDefault();
						onClickOption();
					}}
					handleFocusableElements
				/>
			)*/}
    </>
  )
}, 'RadioOption')
