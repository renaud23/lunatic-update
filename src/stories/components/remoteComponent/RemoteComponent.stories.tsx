import type { RemoteComponent } from '@lib/main'
import type { LunaticSource } from '@lib/use-lunatic/type-source'
import { OrchestratorForStories } from '@src/utils/components/OrchestratorForStories'
import type { Meta, StoryObj } from '@storybook/react'
import { HttpResponse, delay, http } from 'msw'

import source from './source.json'

const meta: Meta<typeof RemoteComponent> = {
  title: 'Components/RemoteComponent',
  component: OrchestratorForStories,
}

export default meta

type Story = StoryObj<typeof OrchestratorForStories>

export const Success: Story = {
  args: {
    source: source as unknown as LunaticSource,
    data: {},
    navigation: true,
  },
  parameters: {
    msw: {
      handlers: [
        http.get(
          'http://api-questionnaire/api/recensement/adresse/departement/:DEP/commune/:COM/zc/:ZC/rang-l/:RANGL/rang-a/:RANGA',
          async () => {
            await delay(200)
            return HttpResponse.json({
              NUMVOI_LOC_SUGG: '14',
              BISTER_LOC_SUGG: null,
              TYPEVOI_LOC_SUGG: 'rue',
              NOMVOI_LOC_SUGG: 'de Picpus',
              RESPONSE: true,
            })
          },
        ),
      ],
    },
  },
}

export const Fail: Story = {
  args: {
    source: source as unknown as LunaticSource,
    data: {},
    navigation: true,
  },
  parameters: {
    msw: {
      handlers: [
        http.get(
          'http://api-questionnaire/api/recensement/adresse/departement/:DEP/commune/:COM/zc/:ZC/rang-l/:RANGL/rang-a/:RANGA',
          async () => {
            await delay(200)
            return HttpResponse.json({
              NUMVOI_LOC_SUGG: null,
              BISTER_LOC_SUGG: null,
              TYPEVOI_LOC_SUGG: null,
              NOMVOI_LOC_SUGG: null,
              RESPONSE: false,
            })
          },
        ),
      ],
    },
  },
}
