import { LunaticInput as Input } from '@lib/components/input/lunatic-input'
import type { LunaticSource } from '@lib/use-lunatic/type-source'
import { OrchestratorForStories } from '@src/utils/components/OrchestratorForStories'
import type { Meta, StoryObj } from '@storybook/react'

import source from './source.json'

const meta: Meta<typeof Input> = {
  title: 'Components/Roundabout',
  component: OrchestratorForStories,
}

export default meta

type Story = StoryObj<typeof OrchestratorForStories>

export const Default: Story = {
  args: {
    source: source as unknown as LunaticSource,
    data: {},
    navigation: true,
  },
}
