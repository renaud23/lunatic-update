import type { Preview } from '@storybook/react'
import { initialize, mswLoader } from 'msw-storybook-addon'

import '../lib/styles/main.scss'
import './story.css'

initialize()

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
}

export default preview
