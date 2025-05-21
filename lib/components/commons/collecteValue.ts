import type { LunaticComponentDefinition } from '../../use-lunatic/type'

function collecteResponseValue(
  response: unknown,
  value?: Record<string, unknown>,
): unknown {
  if (
    value &&
    typeof response === 'object' &&
    response &&
    'name' in response &&
    typeof response.name === 'string' &&
    response.name in value
  ) {
    return value[response.name]
  }

  return undefined
}

function collecteArrayResponseValue(
  responses: unknown[],
  value?: Record<string, unknown>,
): unknown[] {
  const [response, ...rest] = responses

  if (response) {
    return [
      collecteResponseValue(response, value),
      collecteArrayResponseValue(rest, value),
    ]
  }
  return []
}

export function collecteValue(
  component: LunaticComponentDefinition,
  value?: Record<string, unknown>,
) {
  if ('responses' in component && Array.isArray(component.responses)) {
    return collecteArrayResponseValue(
      component.responses.map((v) => v.response),
      value,
    )
  }
  if ('response' in component) {
    return collecteResponseValue(component.response, value)
  }
  return {}
}
