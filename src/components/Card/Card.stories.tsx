import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    hoverable: {
      control: 'boolean',
    },
    glow: {
      control: 'boolean',
    },
    intensity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
    },
    color: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360, color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

// ── 기본 ───────────────────────────────────────
export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: 'rgba(255,255,255,0.95)' }}>카드 제목</h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>서브 텍스트</p>
      </CardHeader>
      <CardBody>
        <p style={{ lineHeight: 1.6, color: 'rgba(255,255,255,0.7)' }}>
          카드 본문 내용이 들어갑니다. 유리 효과가 적용된 깔끔한 카드 컴포넌트입니다.
        </p>
      </CardBody>
      <CardFooter>
        <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', padding: '6px 14px', borderRadius: 10, fontSize: 13, cursor: 'pointer' }}>취소</button>
        <button style={{ background: 'rgba(139,92,246,0.35)', border: '1px solid rgba(139,92,246,0.5)', color: 'rgba(255,255,255,0.95)', padding: '6px 14px', borderRadius: 10, fontSize: 13, cursor: 'pointer' }}>확인</button>
      </CardFooter>
    </Card>
  ),
  args: {
    variant: 'solid',
    size: 'md',
  },
};

// ── Variants ───────────────────────────────────
export const Solid: Story = {
  render: () => (
    <Card variant="solid">
      <CardHeader>
        <h3 style={{ fontSize: 17, fontWeight: 600 }}>Solid</h3>
      </CardHeader>
      <CardBody>
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>반투명 배경에 블러 효과가 적용된 기본 카드입니다.</p>
      </CardBody>
    </Card>
  ),
};

export const Outline: Story = {
  render: () => (
    <Card variant="outline">
      <CardHeader>
        <h3 style={{ fontSize: 17, fontWeight: 600 }}>Outline</h3>
      </CardHeader>
      <CardBody>
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>테두리로 영역을 구분하는 가벼운 스타일입니다.</p>
      </CardBody>
    </Card>
  ),
};

export const Ghost: Story = {
  render: () => (
    <Card variant="ghost">
      <CardHeader>
        <h3 style={{ fontSize: 17, fontWeight: 600 }}>Ghost</h3>
      </CardHeader>
      <CardBody>
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>배경과 테두리가 없는 투명 카드입니다.</p>
      </CardBody>
    </Card>
  ),
};

// ── Hoverable ──────────────────────────────────
export const Hoverable: Story = {
  render: () => (
    <Card variant="solid" hoverable>
      <CardBody>
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>호버하면 살짝 올라옵니다.</p>
      </CardBody>
    </Card>
  ),
};

// ── Glow ───────────────────────────────────────
export const WithGlow: Story = {
  render: () => (
    <Card variant="solid" hoverable glow>
      <CardBody style={{ textAlign: 'center', padding: '32px 24px' }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>✨</div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Glow Card</h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>호버 시 글로우 효과</p>
      </CardBody>
    </Card>
  ),
};

export const BlueGlow: Story = {
  render: () => (
    <Card variant="solid" hoverable glow color="59, 130, 246">
      <CardBody style={{ textAlign: 'center', padding: '32px 24px' }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>💎</div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Blue Glow</h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>color prop으로 글로우 색상 변경</p>
      </CardBody>
    </Card>
  ),
};

// ── 커버 이미지 ────────────────────────────────
export const WithCoverImage: Story = {
  render: () => (
    <Card variant="solid" hoverable>
      <CardHeader cover>
        <div style={{
          width: '100%',
          height: 180,
          background: 'linear-gradient(135deg, rgba(139,92,246,0.4), rgba(59,130,246,0.4))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.3)',
          fontSize: 40,
        }}>
          🖼
        </div>
      </CardHeader>
      <CardBody>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>커버 이미지 카드</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
          CardHeader에 cover prop을 주면 이미지가 상단에 꽉 차게 들어갑니다.
        </p>
      </CardBody>
    </Card>
  ),
};

// ── 프로필 카드 ────────────────────────────────
export const ProfileCard: Story = {
  render: () => (
    <Card variant="solid">
      <CardBody style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 600, flexShrink: 0,
        }}>
          J
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Jinu</div>
          <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>Frontend Developer</div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            height: 24, padding: '0 10px', fontSize: 11.5, fontWeight: 500,
            borderRadius: 9999, background: 'rgba(34,197,94,0.15)',
            border: '1px solid rgba(34,197,94,0.3)', color: 'rgba(74,222,128,0.9)',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />
            Online
          </span>
        </div>
      </CardBody>
    </Card>
  ),
};

// ── 통계 카드 ──────────────────────────────────
export const StatCard: Story = {
  render: () => (
    <Card variant="solid">
      <CardBody style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{
          width: 44, height: 44, borderRadius: 14,
          background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1 }}>2,847</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Active Users</div>
        </div>
      </CardBody>
    </Card>
  ),
};

// ── Footer 정렬 ────────────────────────────────
export const FooterBetween: Story = {
  render: () => (
    <Card variant="solid">
      <CardBody>
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>Footer align="between" 예시</p>
      </CardBody>
      <CardFooter align="between">
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>2분 전</span>
        <button style={{ background: 'rgba(139,92,246,0.35)', border: '1px solid rgba(139,92,246,0.5)', color: 'rgba(255,255,255,0.95)', padding: '6px 14px', borderRadius: 10, fontSize: 13, cursor: 'pointer' }}>자세히</button>
      </CardFooter>
    </Card>
  ),
};

// ── 사이즈 비교 ────────────────────────────────
export const SizeComparison: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 500, color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Card variant="solid" size="sm">
        <CardHeader><h3 style={{ fontSize: 15, fontWeight: 600 }}>Small</h3></CardHeader>
        <CardBody><p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>작은 패딩의 카드</p></CardBody>
      </Card>
      <Card variant="solid" size="md">
        <CardHeader><h3 style={{ fontSize: 17, fontWeight: 600 }}>Medium</h3></CardHeader>
        <CardBody><p style={{ color: 'rgba(255,255,255,0.7)' }}>기본 패딩의 카드</p></CardBody>
      </Card>
      <Card variant="solid" size="lg">
        <CardHeader><h3 style={{ fontSize: 20, fontWeight: 600 }}>Large</h3></CardHeader>
        <CardBody><p style={{ color: 'rgba(255,255,255,0.7)' }}>넓은 패딩의 카드</p></CardBody>
      </Card>
    </div>
  ),
};

// ── Variant 비교 ───────────────────────────────
export const VariantComparison: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 500, color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {(['solid', 'outline', 'ghost'] as const).map((v) => (
        <Card key={v} variant={v} hoverable>
          <CardHeader>
            <h3 style={{ fontSize: 17, fontWeight: 600, textTransform: 'capitalize' }}>{v}</h3>
          </CardHeader>
          <CardBody>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>{v} variant 카드입니다.</p>
          </CardBody>
        </Card>
      ))}
    </div>
  ),
};
