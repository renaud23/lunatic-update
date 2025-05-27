import type { FilterDescription } from '@lib/main'
import type { LunaticSource } from '@lib/use-lunatic/type-source'
import { OrchestratorForStories } from '@src/utils/components/OrchestratorForStories'
import type { Meta, StoryObj } from '@storybook/react'

import sourceOptions from './source-options.json'
import source from './source.json'

const meta: Meta<typeof FilterDescription> = {
  title: 'Components/FilterDescription',
  component: OrchestratorForStories,
}

export default meta

type Story = StoryObj<typeof OrchestratorForStories>

export const Default: Story = {
  args: {
    source: source as unknown as LunaticSource,
    data: {},
    navigation: true,
    filterDescription: true,
  },
}

export const Options: Story = {
  args: {
    source: sourceOptions as unknown as LunaticSource,
    data: {},
    navigation: true,
    filterDescription: true,
  },
}
