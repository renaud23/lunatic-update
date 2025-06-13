import type { Duration } from '@lib/main'
import type { LunaticSource } from '@lib/use-lunatic/type-source'
import { OrchestratorForStories } from '@src/utils/components/OrchestratorForStories'
import type { Meta, StoryObj } from '@storybook/react'

import source from './source.json'
import sourceDuration from './sourceDuration.json'

const meta: Meta<typeof Duration> = {
  title: 'Components/Duration',
  component: OrchestratorForStories,
}

export default meta

type Story = StoryObj<typeof OrchestratorForStories>

export const TimeDuration: Story = {
  args: {
    source: source as unknown as LunaticSource,
    data: {},
    navigation: true,
  },
}

export const DateDuration: Story = {
  args: {
    source: sourceDuration as unknown as LunaticSource,
    data: {},
    navigation: true,
  },
}
