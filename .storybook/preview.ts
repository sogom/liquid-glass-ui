import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#080612' },
        { name: 'light', value: '#f0f0f0' },
      ],
    },
    layout: 'centered',
    a11y: {
      test: 'todo'
    }
  },
};

export default preview;