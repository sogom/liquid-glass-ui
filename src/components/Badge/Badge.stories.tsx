import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
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
    status: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
    },
    intensity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
    },
    color: {
      control: 'text',
    },
    glow: {
      control: 'boolean',
    },
    dot: {
      control: 'boolean',
    },
    pulse: {
      control: 'boolean',
    },
    interactive: {
      control: 'boolean',
    },
    closable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// ── 기본 ───────────────────────────────────────
export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'solid',
    size: 'md',
    shape: 'pill',
  },
};

// ── Variants ───────────────────────────────────
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

// ── Sizes ──────────────────────────────────────
export const Small: Story = {
  args: { children: 'Small', size: 'sm' },
};

export const Large: Story = {
  args: { children: 'Large', size: 'lg' },
};

// ── Shape ──────────────────────────────────────
export const Rounded: Story = {
  args: { children: 'Rounded', shape: 'rounded' },
};

// ── Status ─────────────────────────────────────
export const Info: Story = {
  args: { children: 'Info', status: 'info', variant: 'solid' },
};

export const Success: Story = {
  args: { children: 'Success', status: 'success', variant: 'solid' },
};

export const Warning: Story = {
  args: { children: 'Warning', status: 'warning', variant: 'solid' },
};

export const Error: Story = {
  args: { children: 'Error', status: 'error', variant: 'solid' },
};

// ── Dot 표시 ───────────────────────────────────
export const WithDot: Story = {
  args: { children: 'Active', dot: true, status: 'success', variant: 'solid' },
};

export const WithPulse: Story = {
  args: { children: 'Live', dot: true, pulse: true, status: 'error', variant: 'accent' },
};

// ── Interactive ────────────────────────────────
export const Interactive: Story = {
  args: {
    children: 'Click me',
    interactive: true,
    variant: 'solid',
    onClick: () => alert('Badge clicked!'),
  },
};

export const Closable: Story = {
  args: {
    children: 'Removable',
    closable: true,
    variant: 'outline',
    onClose: () => alert('Close clicked!'),
  },
};

// ── Glow ───────────────────────────────────────
export const WithGlow: Story = {
  args: { children: 'Glow', glow: true, interactive: true, variant: 'accent' },
};

// ── Icon ───────────────────────────────────────
export const WithLeftIcon: Story = {
  args: {
    children: 'Tag',
    leftIcon: (
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
};

// ── 조합 예시 ──────────────────────────────────
export const StatusGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge status="info" dot>Info</Badge>
      <Badge status="success" dot>Success</Badge>
      <Badge status="warning" dot>Warning</Badge>
      <Badge status="error" dot pulse>Error</Badge>
    </div>
  ),
};

export const VariantGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="accent">Accent</Badge>
    </div>
  ),
};

export const SizeGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};
