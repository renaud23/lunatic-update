import type { Orchestrator } from '@lib/main'
import { OrchestratorForStories } from '@src/utils/components/OrchestratorForStories'
import type { Meta, StoryObj } from '@storybook/react'

import { App } from './application/App'

const meta: Meta<typeof Orchestrator> = {
  title: 'Orchestrator',
  component: App,
}

export default meta

type Story = StoryObj<typeof OrchestratorForStories>

export const Controls: Story = {
  args: {},
}
