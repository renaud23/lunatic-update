import type { Dropdown } from '@lib/main'
import type { LunaticData } from '@lib/use-lunatic/type'
import type { LunaticSource } from '@lib/use-lunatic/type-source'
import { OrchestratorForStories } from '@src/utils/components/OrchestratorForStories'
import type { Meta, StoryObj } from '@storybook/react'

import data from './data.json'
import source from './source.json'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: OrchestratorForStories,
}

export default meta

type Story = StoryObj<typeof OrchestratorForStories>

export const Default: Story = {
  args: {
    source: source as unknown as LunaticSource,
    data: data as LunaticData,
    navigation: true,
  },
}
