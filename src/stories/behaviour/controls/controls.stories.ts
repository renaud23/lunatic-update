import { LunaticInput as Input } from '@lib/components/input/lunatic-input'
import type { LunaticSource } from '@lib/use-lunatic/type-source'
import { OrchestratorForStories } from '@src/utils/components/OrchestratorForStories'
import type { Meta, StoryObj } from '@storybook/react'

import simple from './V2_ControlesNonNum_horsBoucle_PasPageFin.json'

const meta: Meta<typeof Input> = {
  title: 'Behaviour/controls',
  component: OrchestratorForStories,
}

export default meta

type Story = StoryObj<typeof OrchestratorForStories>

export const Simple: Story = {
  args: {
    source: simple as unknown as LunaticSource,
    data: {},
    navigation: true,
  },
}
