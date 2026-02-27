import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click'],
    },
    arrow: {
      control: 'boolean',
    },
    delay: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
    },
    disabled: {
      control: 'boolean',
    },
    intensity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/* 데모용 버튼 스타일 */
const btnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  height: 38,
  padding: '0 18px',
  fontSize: 13.5,
  fontWeight: 500,
  fontFamily: 'inherit',
  background: 'rgba(255,255,255,0.1)',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: 12,
  color: 'rgba(255,255,255,0.8)',
  cursor: 'pointer',
  backdropFilter: 'blur(16px)',
};

const iconBtnStyle: React.CSSProperties = {
  ...btnStyle,
  width: 38,
  padding: 0,
  borderRadius: 10,
};

// ── 기본 ───────────────────────────────────────
export const Default: Story = {
  args: {
    content: '안녕하세요!',
    placement: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <button style={btnStyle}>Hover me</button>
    </Tooltip>
  ),
};

// ── Placements ─────────────────────────────────
export const Top: Story = {
  render: () => (
    <Tooltip content="Top에 표시됩니다" placement="top">
      <button style={btnStyle}>Top</button>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Tooltip content="Bottom에 표시됩니다" placement="bottom">
      <button style={btnStyle}>Bottom</button>
    </Tooltip>
  ),
};

export const Left: Story = {
  render: () => (
    <Tooltip content="Left에 표시됩니다" placement="left">
      <button style={btnStyle}>Left</button>
    </Tooltip>
  ),
};

export const Right: Story = {
  render: () => (
    <Tooltip content="Right에 표시됩니다" placement="right">
      <button style={btnStyle}>Right</button>
    </Tooltip>
  ),
};

// ── 화살표 없이 ────────────────────────────────
export const NoArrow: Story = {
  render: () => (
    <Tooltip content="화살표가 없는 툴팁" arrow={false}>
      <button style={btnStyle}>No Arrow</button>
    </Tooltip>
  ),
};

// ── Click trigger ──────────────────────────────
export const ClickTrigger: Story = {
  render: () => (
    <Tooltip content="클릭으로 열리는 툴팁" trigger="click">
      <button style={btnStyle}>Click me</button>
    </Tooltip>
  ),
};

// ── Disabled ───────────────────────────────────
export const Disabled: Story = {
  render: () => (
    <Tooltip content="이건 안 보입니다" disabled>
      <button style={btnStyle}>Disabled Tooltip</button>
    </Tooltip>
  ),
};

// ── JSX Content ────────────────────────────────
export const RichContent: Story = {
  render: () => (
    <Tooltip
      content={
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          아이콘이 포함된 툴팁
        </span>
      }
    >
      <button style={btnStyle}>Rich Content</button>
    </Tooltip>
  ),
};

// ── 아이콘 버튼 + 툴팁 ─────────────────────────
export const IconButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Tooltip content="편집">
        <button style={iconBtnStyle}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="삭제">
        <button style={iconBtnStyle}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="공유">
        <button style={iconBtnStyle}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
      </Tooltip>
    </div>
  ),
};

// ── Placement 비교 ─────────────────────────────
export const PlacementComparison: Story = {
  decorators: [
    (Story) => (
      <div style={{ padding: 120, display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, justifyItems: 'center', alignItems: 'center' }}>
      <div />
      <Tooltip content="Top" placement="top">
        <button style={{ ...btnStyle, minWidth: 80 }}>Top</button>
      </Tooltip>
      <div />
      <Tooltip content="Left" placement="left">
        <button style={{ ...btnStyle, minWidth: 80 }}>Left</button>
      </Tooltip>
      <div style={{ width: 40 }} />
      <Tooltip content="Right" placement="right">
        <button style={{ ...btnStyle, minWidth: 80 }}>Right</button>
      </Tooltip>
      <div />
      <Tooltip content="Bottom" placement="bottom">
        <button style={{ ...btnStyle, minWidth: 80 }}>Bottom</button>
      </Tooltip>
      <div />
    </div>
  ),
};
