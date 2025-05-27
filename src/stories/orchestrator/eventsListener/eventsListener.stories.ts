import type { Meta, StoryObj } from '@storybook/react'

import { App } from './application/App'

const meta: Meta<typeof App> = {
  title: 'Orchestrator',
  component: App,
}

export default meta

type Story = StoryObj<typeof App>

export const EventsListener: Story = {
  args: {},
}
