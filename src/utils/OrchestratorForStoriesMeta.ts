import type { Meta, StoryObj } from '@storybook/react'

import { OrchestratorForStories } from './OrchestratorForStories'

export const OrchestratorMeta: Meta<typeof OrchestratorForStories> = {
  component: OrchestratorForStories,
  args: {},
  argTypes: {},
}

export type OrchestratorStory = StoryObj<typeof OrchestratorForStories>
