import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'View on GitHub',
    brandUrl: 'https://github.com/isoppp/playground.isoppp.com',
    brandImage: undefined,
    brandTarget: '_self',
  }),
})
