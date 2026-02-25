import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
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
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    intensity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
    },
    numeric: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: '입력하세요...',
    variant: 'solid',
    size: 'md',
  },
};

export const Solid: Story = {
  args: { placeholder: 'Solid variant...', variant: 'solid' },
};

export const Outline: Story = {
  args: { placeholder: 'Outline variant...', variant: 'outline' },
};

export const Ghost: Story = {
  args: { placeholder: 'Ghost variant...', variant: 'ghost' },
};

export const Small: Story = {
  args: { placeholder: 'Small (36px)', size: 'sm' },
};

export const Large: Story = {
  args: { placeholder: 'Large (54px)', size: 'lg' },
};

export const WithLabel: Story = {
  args: {
    label: '이메일',
    placeholder: 'hello@example.com',
    hint: '로그인에 사용할 이메일을 입력해주세요.',
  },
};

export const WithLeftIcon: Story = {
  args: {
    placeholder: 'Search...',
    leftIcon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
};

export const WithRightIcon: Story = {
  args: {
    placeholder: '금액을 입력하세요',
    rightIcon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
};

export const Password: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
  },
};

export const Numeric: Story = {
  args: {
    label: '나이',
    placeholder: '숫자만 입력 가능해요',
    numeric: true,
    hint: '숫자만 입력할 수 있어요.',
  },
};

export const ErrorState: Story = {
  args: {
    label: '이메일',
    placeholder: 'hello@example.com',
    state: 'error',
    errorMessage: '올바른 이메일 주소를 입력해주세요.',
  },
};

export const SuccessState: Story = {
  args: {
    label: '이메일',
    placeholder: 'hello@example.com',
    state: 'success',
    successMessage: '사용 가능한 이메일이에요.',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '비활성화된 인풋',
    disabled: true,
  },
};