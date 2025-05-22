import { LunaticInput as Input } from '@lib/components/input/lunatic-input'
import type { LunaticSource } from '@lib/use-lunatic/type-source'
import { OrchestratorForStories } from '@src/utils/OrchestratorForStories'
import { getVariableValue } from '@src/utils/tools'
import type { Meta, StoryObj } from '@storybook/react'

import source from './source.json'

const meta: Meta<typeof Input> = {
  component: OrchestratorForStories,
}

export default meta

type Story = StoryObj<typeof OrchestratorForStories>

export const Primary: Story = {
  args: {
    source: source as unknown as LunaticSource,
    data: {
      COLLECTED: {
        NOM: getVariableValue('Renaud'),
      },
    },
  },
}
