import { type PropsWithChildren, type ReactNode } from 'react'

import { createCustomizableLunaticField } from '../../commons'

type ResponsesValue = Array<{
  label: ReactNode
  value: ReactNode
  id: string
}>

function ListResponses({
  title,
  children,
  id,
}: PropsWithChildren<{ title: ReactNode; id?: string }>) {
  return (
    <div className="lunatic-summary-responses-iteration" id={id}>
      {title}
      <ul>{children}</ul>
    </div>
  )
}

function Responses({ values }: { values?: ResponsesValue }) {
  if (!values) {
    return null
  }
  return (
    <>
      {values.map(({ label, value }, index) => {
        return (
          <li key={`response-${index}`}>
            {label} : {value}
          </li>
        )
      })}
    </>
  )
}

export const SummaryResponses = createCustomizableLunaticField(
  function SummaryResponses({
    sections,
  }: {
    sections: Array<{
      title?: ReactNode
      values?: ResponsesValue
      id?: string
    }>
  }) {
    const visibleSections = sections.filter((s) => s)
    return (
      <>
        {visibleSections.map((section, index) => {
          const { title, values, id } = section
          return (
            <ListResponses key={`${id}-${index}`} title={title}>
              <Responses values={values} />
            </ListResponses>
          )
        })}
      </>
    )
  },
  'SummaryResponses',
)
