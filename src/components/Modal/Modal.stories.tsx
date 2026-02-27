import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';
import { Button } from '../Button';
import { Input } from '../Input';
import { Badge } from '../Badge';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    closeOnOverlay: {
      control: 'boolean',
    },
    closeOnEsc: {
      control: 'boolean',
    },
    intensity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// ── 기본 모달 ──────────────────────────────────
export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="solid" onClick={() => setOpen(true)}>
          모달 열기
        </Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)}>
          <ModalHeader>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.95)' }}>기본 모달</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>Modal 컴포넌트 기본 형태</p>
          </ModalHeader>
          <ModalBody>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)' }}>
              유리 효과가 적용된 모달 다이얼로그입니다. 배경이 블러 처리되고,
              모달 자체도 반투명 유리 느낌을 줍니다.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>취소</Button>
            <Button variant="accent" size="sm" onClick={() => setOpen(false)}>확인</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
  args: {
    size: 'md',
  },
};

// ── Small ──────────────────────────────────────
export const Small: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>Small 모달</Button>
        <Modal open={open} onClose={() => setOpen(false)} size="sm">
          <ModalHeader>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.95)' }}>Small Modal</h2>
          </ModalHeader>
          <ModalBody>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>작은 크기의 모달입니다.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="accent" size="sm" onClick={() => setOpen(false)}>확인</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

// ── Large ──────────────────────────────────────
export const Large: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>Large 모달</Button>
        <Modal open={open} onClose={() => setOpen(false)} size="lg">
          <ModalHeader>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.95)' }}>Large Modal</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>넓은 콘텐츠 영역</p>
          </ModalHeader>
          <ModalBody>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)' }}>
              큰 크기의 모달입니다. 테이블, 폼, 리스트 등 많은 콘텐츠를 담을 때 사용합니다.
              최대 너비가 600px로 설정되어 있어 충분한 공간을 제공합니다.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>닫기</Button>
            <Button variant="accent" size="sm" onClick={() => setOpen(false)}>저장</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

// ── 삭제 확인 (Danger) ─────────────────────────
export const DeleteConfirm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="solid" color="239, 68, 68" onClick={() => setOpen(true)}>
          삭제
        </Button>
        <Modal open={open} onClose={() => setOpen(false)} size="sm">
          <ModalHeader>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'rgba(248,113,113,0.95)' }}>
              항목을 삭제하시겠습니까?
            </h2>
          </ModalHeader>
          <ModalBody>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)' }}>
              이 작업은 되돌릴 수 없습니다. 정말 삭제하시겠습니까?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>취소</Button>
            <Button variant="accent" size="sm" color="239, 68, 68" onClick={() => setOpen(false)}>
              삭제
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

// ── 폼 모달 (Input 컴포넌트 활용) ─────────────
export const FormModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="accent" onClick={() => setOpen(true)}>
          새 프로젝트
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalHeader>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.95)' }}>새 프로젝트</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>프로젝트 정보를 입력하세요</p>
          </ModalHeader>
          <ModalBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Input
                label="프로젝트 이름"
                placeholder="예: liquid-glass-ui"
                variant="solid"
              />
              <Input
                label="설명"
                placeholder="프로젝트에 대한 간단한 설명"
                variant="solid"
              />
              <Input
                label="저장소 URL"
                placeholder="https://github.com/..."
                variant="solid"
                hint="선택 사항"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>취소</Button>
            <Button variant="accent" size="sm" onClick={() => setOpen(false)}>생성</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

// ── 안내 모달 (성공) ───────────────────────────
export const SuccessInfo: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="solid" onClick={() => setOpen(true)}>
          저장하기
        </Button>
        <Modal open={open} onClose={() => setOpen(false)} size="sm">
          <ModalBody style={{ textAlign: 'center', padding: '40px 28px 20px' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(74,222,128,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.95)', marginBottom: 8 }}>
              저장되었습니다!
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>
              변경 사항이 성공적으로 저장되었습니다.
            </p>
          </ModalBody>
          <ModalFooter align="center">
            <Button variant="accent" size="sm" onClick={() => setOpen(false)}>확인</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

// ── Badge 포함 모달 ────────────────────────────
export const WithBadge: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="solid" onClick={() => setOpen(true)}>
          알림 확인
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.95)' }}>업데이트 알림</h2>
              <Badge status="info" size="sm" dot>New</Badge>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>새로운 버전이 출시되었습니다</p>
          </ModalHeader>
          <ModalBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Badge status="success" variant="solid" size="sm">v2.1.0</Badge>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>안정 버전</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.6)' }}>
                새로운 Modal, Tooltip 컴포넌트가 추가되었습니다.
                기존 컴포넌트의 접근성도 개선되었습니다.
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <Badge variant="outline" size="sm">Modal</Badge>
                <Badge variant="outline" size="sm">Tooltip</Badge>
                <Badge variant="outline" size="sm">A11y</Badge>
                <Badge variant="outline" size="sm">Bug fix</Badge>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>나중에</Button>
            <Button variant="accent" size="sm" onClick={() => setOpen(false)}>업데이트</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

// ── 닫기 버튼 없는 모달 ────────────────────────
export const NoCloseButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          닫기 버튼 없음
        </Button>
        <Modal open={open} onClose={() => setOpen(false)} size="sm">
          <ModalHeader showClose={false}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.95)' }}>약관 동의</h2>
          </ModalHeader>
          <ModalBody>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)' }}>
              서비스 이용을 위해 약관에 동의해주세요.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>거부</Button>
            <Button variant="accent" size="sm" onClick={() => setOpen(false)}>동의</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};
