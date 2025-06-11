import type { ComponentSet } from '@lib/main'
import type { LunaticSource } from '@lib/use-lunatic/type-source'
import { OrchestratorForStories } from '@src/utils/components/OrchestratorForStories'
import type { Meta, StoryObj } from '@storybook/react'

import dataLoop from './data-loop.json'
import dataRoundabout from './data-roundabout.json'
import data from './data.json'
import sourceLoop from './source-loop.json'
import sourceRoundabout from './source-roundabout.json'
import source from './source.json'

const meta: Meta<typeof ComponentSet> = {
  title: 'Components/ComponentSet',
  component: OrchestratorForStories,
}

export default meta

type Story = StoryObj<typeof OrchestratorForStories>

export const Default: Story = {
  args: {
    source: source as unknown as LunaticSource,
    data,
    navigation: true,
  },
}

export const Roundabout: Story = {
  args: {
    source: sourceRoundabout as unknown as LunaticSource,
    data: dataRoundabout,
    navigation: true,
  },
}

export const Loop: Story = {
  args: {
    source: sourceLoop as unknown as LunaticSource,
    data: dataLoop,
    navigation: true,
  },
}
