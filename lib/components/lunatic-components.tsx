import {
  Fragment,
  type PropsWithChildren,
  type ReactNode,
  forwardRef,
  useRef,
} from 'react'

import { useAutoFocus } from '../hooks/use-auto-focus'
import * as lunaticComponents from '../main'
import type { FilledLunaticComponentProps } from '../use-lunatic/commons/fill-components/fill-components'

type LunaticComponentsConatainerType = PropsWithChildren<{
  autoFocusKey?: string
}>

const LunaticComponentsContainer = forwardRef<
  HTMLDivElement,
  LunaticComponentsConatainerType
>(function Container(
  { children, autoFocusKey }: LunaticComponentsConatainerType,
  ref,
) {
  if (autoFocusKey) {
    return <div ref={ref}>{children}</div>
  }
  return <>{children}</>
})

type Props<T extends Record<string, unknown>> = {
  // List of components to display (coming from getComponents)
  components: FilledLunaticComponentProps[]
  // Key that trigger autofocus when it changes (pageTag)
  autoFocusKey?: string
  // Returns the list of extra props to add to components
  componentProps?: (component: FilledLunaticComponentProps) => T
  // Add additional wrapper around each component
  wrapper?: (
    props: PropsWithChildren<FilledLunaticComponentProps & T>,
  ) => ReactNode
}

/**
 * Entry point for orchestrators, this component display the list of fields
 */
export function LunaticComponents<T extends Record<string, unknown>>({
  components,
  autoFocusKey,
  componentProps,
  wrapper = ({ children }) => (
    <div className="lunatic lunatic-component">{children}</div>
  ),
}: Props<T>) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const hasComponents = components.length > 0

  useAutoFocus(wrapperRef, hasComponents ? autoFocusKey : undefined)

  return (
    <LunaticComponentsContainer ref={wrapperRef} autoFocusKey={autoFocusKey}>
      {components.map((component, k) => {
        const props = {
          ...component,
          ...componentProps?.(component),
        }
        return (
          <Fragment key={'id' in component ? component.id : `index-${k}`}>
            {wrapper({
              children: <LunaticComponent {...props} />,
              ...props,
            })}
          </Fragment>
        )
      })}
    </LunaticComponentsContainer>
  )
}

type ItemProps = FilledLunaticComponentProps

function LunaticComponent(props: ItemProps) {
  if (props.componentType in lunaticComponents) {
    // Component is too dynamic to be typed
    const Component = (lunaticComponents as Record<string, any>)[
      props.componentType
    ]
    return <Component {...props} />
  }
  return <>{props.componentType} Required!</>
}
