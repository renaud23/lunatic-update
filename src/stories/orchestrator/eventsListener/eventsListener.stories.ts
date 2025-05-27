import type { LunaticSource } from '@lib/use-lunatic/type-source'
import { OrchestratorForStories } from '@src/utils/components/OrchestratorForStories'
import type { Meta, StoryObj } from '@storybook/react'

import { App } from './App'
import source from './source.json'

const meta: Meta<typeof App> = {
  title: 'Orchestrator',
  component: App,
}

export default meta

type Story = StoryObj<typeof App>

export const EventsListener: Story = {
  args: {
    source: source as unknown as LunaticSource,
    data: {},
    navigation: true,
  },
}
