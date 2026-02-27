import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
    intensity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
    },
    color: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

// ── 기본 ───────────────────────────────────────
export const Default: Story = {
  args: {
    label: 'Toggle',
    size: 'md',
  },
};

// ── 사이즈 ─────────────────────────────────────
export const Small: Story = {
  args: { label: 'Small', size: 'sm' },
};

export const Large: Story = {
  args: { label: 'Large', size: 'lg' },
};

// ── 기본 체크 ──────────────────────────────────
export const DefaultChecked: Story = {
  args: { label: 'On by default', defaultChecked: true },
};

// ── Disabled ───────────────────────────────────
export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
};

export const DisabledChecked: Story = {
  args: { label: 'Disabled On', disabled: true, defaultChecked: true },
};

// ── 라벨 위치 ──────────────────────────────────
export const LabelLeft: Story = {
  args: { label: 'Label Left', labelPosition: 'left' },
};

// ── 커스텀 색상 ────────────────────────────────
export const CustomColor: Story = {
  args: {
    label: 'Green Toggle',
    defaultChecked: true,
    color: '34, 197, 94',
  },
};

export const BlueColor: Story = {
  args: {
    label: 'Blue Toggle',
    defaultChecked: true,
    color: '59, 130, 246',
  },
};

// ── 라벨 없이 ──────────────────────────────────
export const NoLabel: Story = {
  args: {},
};

// ── 제어 컴포넌트 예시 ─────────────────────────
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, color: 'rgba(255,255,255,0.8)' }}>
        <Toggle
          checked={checked}
          onChange={setChecked}
          label={checked ? '활성' : '비활성'}
        />
        <span style={{ fontSize: 13, opacity: 0.5 }}>
          상태: {checked ? 'ON' : 'OFF'}
        </span>
      </div>
    );
  },
};

// ── 사이즈 비교 ────────────────────────────────
export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Toggle size="sm" label="Small" defaultChecked />
      <Toggle size="md" label="Medium" defaultChecked />
      <Toggle size="lg" label="Large" defaultChecked />
    </div>
  ),
};

// ── 색상 비교 ──────────────────────────────────
export const ColorComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Toggle label="Default (Purple)" defaultChecked />
      <Toggle label="Green" defaultChecked color="34, 197, 94" />
      <Toggle label="Blue" defaultChecked color="59, 130, 246" />
      <Toggle label="Orange" defaultChecked color="245, 158, 11" />
      <Toggle label="Red" defaultChecked color="239, 68, 68" />
    </div>
  ),
};
