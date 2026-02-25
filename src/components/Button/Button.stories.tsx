import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'accent'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: 'select',
      options: ['rounded', 'pill'],
    },
    intensity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
    },
    color: {
      control: 'color',
    },
    glow: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    size: 'md',
    shape: 'rounded',
  },
};

export const Solid: Story = {
  args: { children: 'Solid', variant: 'solid' },
};

export const Outline: Story = {
  args: { children: 'Outline', variant: 'outline' },
};

export const Ghost: Story = {
  args: { children: 'Ghost', variant: 'ghost' },
};

export const Accent: Story = {
  args: { children: 'Accent', variant: 'accent' },
};

export const Small: Story = {
  args: { children: 'Small', size: 'sm' },
};

export const Large: Story = {
  args: { children: 'Large', size: 'lg' },
};

export const Pill: Story = {
  args: { children: 'Pill Button', shape: 'pill' },
};

export const WithGlow: Story = {
  args: { children: 'Glow Button', glow: true, variant: 'accent' },
};

export const Loading: Story = {
  args: { children: 'Loading...', loading: true },
};

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
};

export const WithLeftIcon: Story = {
  args: {
    children: 'Add Item',
    leftIcon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Download',
    rightIcon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
  },
};