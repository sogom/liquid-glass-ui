import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'pill'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    intensity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480, color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// ── 기본 ───────────────────────────────────────
export const Default: Story = {
  render: (args) => (
    <Tabs defaultValue="tab1" {...args}>
      <TabList>
        <Tab value="tab1">프로필</Tab>
        <Tab value="tab2">설정</Tab>
        <Tab value="tab3">알림</Tab>
      </TabList>
      <TabPanel value="tab1">
        <div style={{ padding: '16px 4px' }}>프로필 탭 내용입니다.</div>
      </TabPanel>
      <TabPanel value="tab2">
        <div style={{ padding: '16px 4px' }}>설정 탭 내용입니다.</div>
      </TabPanel>
      <TabPanel value="tab3">
        <div style={{ padding: '16px 4px' }}>알림 탭 내용입니다.</div>
      </TabPanel>
    </Tabs>
  ),
  args: {
    variant: 'solid',
    size: 'md',
    defaultValue: "abcd",
    value: "aaaa",
    intensity: 0.8
  },
};

// ── Variants ───────────────────────────────────
export const Solid: Story = {
  args: {
    intensity: 0.1
  },

  render: () => (
    <Tabs defaultValue="a" variant="solid">
      <TabList>
        <Tab value="a">대시보드</Tab>
        <Tab value="b">분석</Tab>
        <Tab value="c">리포트</Tab>
      </TabList>
      <TabPanel value="a">
        <div style={{ padding: '16px 4px' }}>대시보드 내용</div>
      </TabPanel>
      <TabPanel value="b">
        <div style={{ padding: '16px 4px' }}>분석 내용</div>
      </TabPanel>
      <TabPanel value="c">
        <div style={{ padding: '16px 4px' }}>리포트 내용</div>
      </TabPanel>
    </Tabs>
  )
};

export const Outline: Story = {
  render: () => (
    <Tabs defaultValue="a" variant="outline">
      <TabList>
        <Tab value="a">대시보드</Tab>
        <Tab value="b">분석</Tab>
        <Tab value="c">리포트</Tab>
      </TabList>
      <TabPanel value="a">
        <div style={{ padding: '16px 4px' }}>대시보드 내용</div>
      </TabPanel>
      <TabPanel value="b">
        <div style={{ padding: '16px 4px' }}>분석 내용</div>
      </TabPanel>
      <TabPanel value="c">
        <div style={{ padding: '16px 4px' }}>리포트 내용</div>
      </TabPanel>
    </Tabs>
  ),
};

export const Pill: Story = {
  render: () => (
    <Tabs defaultValue="a" variant="pill">
      <TabList>
        <Tab value="a">대시보드</Tab>
        <Tab value="b">분석</Tab>
        <Tab value="c">리포트</Tab>
      </TabList>
      <TabPanel value="a">
        <div style={{ padding: '16px 4px' }}>대시보드 내용</div>
      </TabPanel>
      <TabPanel value="b">
        <div style={{ padding: '16px 4px' }}>분석 내용</div>
      </TabPanel>
      <TabPanel value="c">
        <div style={{ padding: '16px 4px' }}>리포트 내용</div>
      </TabPanel>
    </Tabs>
  ),
};

// ── Sizes ──────────────────────────────────────
export const Small: Story = {
  render: () => (
    <Tabs defaultValue="a" size="sm">
      <TabList>
        <Tab value="a">탭 1</Tab>
        <Tab value="b">탭 2</Tab>
        <Tab value="c">탭 3</Tab>
      </TabList>
      <TabPanel value="a">
        <div style={{ padding: '12px 4px', fontSize: 13 }}>Small 크기 탭 내용</div>
      </TabPanel>
    </Tabs>
  ),
};

export const Large: Story = {
  render: () => (
    <Tabs defaultValue="a" size="lg">
      <TabList>
        <Tab value="a">탭 1</Tab>
        <Tab value="b">탭 2</Tab>
        <Tab value="c">탭 3</Tab>
      </TabList>
      <TabPanel value="a">
        <div style={{ padding: '20px 4px' }}>Large 크기 탭 내용</div>
      </TabPanel>
    </Tabs>
  ),
};

// ── Disabled Tab ───────────────────────────────
export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="a">
      <TabList>
        <Tab value="a">활성</Tab>
        <Tab value="b">활성</Tab>
        <Tab value="c" disabled>비활성</Tab>
      </TabList>
      <TabPanel value="a">
        <div style={{ padding: '16px 4px' }}>첫 번째 탭</div>
      </TabPanel>
      <TabPanel value="b">
        <div style={{ padding: '16px 4px' }}>두 번째 탭</div>
      </TabPanel>
    </Tabs>
  ),
};

// ── 아이콘 포함 ────────────────────────────────
export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="profile" variant="solid">
      <TabList>
        <Tab
          value="profile"
          leftIcon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
        >
          프로필
        </Tab>
        <Tab
          value="settings"
          leftIcon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          }
        >
          설정
        </Tab>
        <Tab
          value="notifications"
          leftIcon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          }
        >
          알림
        </Tab>
      </TabList>
      <TabPanel value="profile">
        <div style={{ padding: '16px 4px' }}>프로필 설정 화면</div>
      </TabPanel>
      <TabPanel value="settings">
        <div style={{ padding: '16px 4px' }}>일반 설정 화면</div>
      </TabPanel>
      <TabPanel value="notifications">
        <div style={{ padding: '16px 4px' }}>알림 설정 화면</div>
      </TabPanel>
    </Tabs>
  ),
};

// ── Variant 비교 ───────────────────────────────
export const VariantComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Solid</div>
        <Tabs defaultValue="a" variant="solid">
          <TabList>
            <Tab value="a">탭 1</Tab>
            <Tab value="b">탭 2</Tab>
            <Tab value="c">탭 3</Tab>
          </TabList>
        </Tabs>
      </div>
      <div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Outline</div>
        <Tabs defaultValue="a" variant="outline">
          <TabList>
            <Tab value="a">탭 1</Tab>
            <Tab value="b">탭 2</Tab>
            <Tab value="c">탭 3</Tab>
          </TabList>
        </Tabs>
      </div>
      <div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Pill</div>
        <Tabs defaultValue="a" variant="pill">
          <TabList>
            <Tab value="a">탭 1</Tab>
            <Tab value="b">탭 2</Tab>
            <Tab value="c">탭 3</Tab>
          </TabList>
        </Tabs>
      </div>
    </div>
  ),
};
