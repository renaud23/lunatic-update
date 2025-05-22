import { LunaticInput as Input } from '@lib/components/input/lunatic-input'
import type { LunaticSource } from '@lib/use-lunatic/type-source'
import { OrchestratorForStories } from '@src/utils/OrchestratorForStories'
import type { Meta, StoryObj } from '@storybook/react'

import data from './data.json'
import source from './source.json'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: OrchestratorForStories,
}

export default meta

type Story = StoryObj<typeof OrchestratorForStories>

export const Primary: Story = {
  args: {
    source: source as unknown as LunaticSource,
    data,
  },
}
