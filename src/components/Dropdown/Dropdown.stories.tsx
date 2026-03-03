import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownDivider,
  DropdownGroup,
} from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '40px 20px', minHeight: 350 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

// ── 기본 ──
export const Default: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>Options</DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>Copy</DropdownItem>
        <DropdownItem>Cut</DropdownItem>
        <DropdownItem>Paste</DropdownItem>
        <DropdownDivider />
        <DropdownItem danger>Delete</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};

// ── 아이콘 ──
export const WithIcons: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>Actions</DropdownTrigger>
      <DropdownMenu>
        <DropdownItem icon="📋">Copy</DropdownItem>
        <DropdownItem icon="✂️">Cut</DropdownItem>
        <DropdownItem icon="📄">Paste</DropdownItem>
        <DropdownDivider />
        <DropdownItem icon="🗑" danger>Delete</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};

// ── 단축키 ──
export const WithShortcuts: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>Edit</DropdownTrigger>
      <DropdownMenu>
        <DropdownItem shortcut="⌘Z">Undo</DropdownItem>
        <DropdownItem shortcut="⌘⇧Z">Redo</DropdownItem>
        <DropdownDivider />
        <DropdownItem shortcut="⌘X">Cut</DropdownItem>
        <DropdownItem shortcut="⌘C">Copy</DropdownItem>
        <DropdownItem shortcut="⌘V">Paste</DropdownItem>
        <DropdownDivider />
        <DropdownItem shortcut="⌘A">Select All</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};

// ── 그룹 ──
export const WithGroups: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>View</DropdownTrigger>
      <DropdownMenu>
        <DropdownGroup label="Layout">
          <DropdownItem active>Grid View</DropdownItem>
          <DropdownItem>List View</DropdownItem>
          <DropdownItem>Board View</DropdownItem>
        </DropdownGroup>
        <DropdownDivider />
        <DropdownGroup label="Display">
          <DropdownItem>Show Sidebar</DropdownItem>
          <DropdownItem disabled>Show Preview</DropdownItem>
        </DropdownGroup>
      </DropdownMenu>
    </Dropdown>
  ),
};

// ── 사이즈 비교 ──
export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <Dropdown size="sm" defaultOpen>
        <DropdownTrigger>Small</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Name</DropdownItem>
          <DropdownItem active>Date</DropdownItem>
          <DropdownItem>Size</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dropdown size="md" defaultOpen>
        <DropdownTrigger>Medium</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Name</DropdownItem>
          <DropdownItem active>Date</DropdownItem>
          <DropdownItem>Size</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dropdown size="lg" defaultOpen>
        <DropdownTrigger>Large</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Name</DropdownItem>
          <DropdownItem active>Date</DropdownItem>
          <DropdownItem>Size</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  ),
};

// ── 위치 ──
export const Placement: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, paddingTop: 200 }}>
      <Dropdown placement="bottom-start">
        <DropdownTrigger>Bottom Start</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dropdown placement="bottom-end">
        <DropdownTrigger>Bottom End</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dropdown placement="top-start">
        <DropdownTrigger>Top Start</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  ),
};

// ── Controlled ──
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Dropdown open={open} onOpenChange={setOpen}>
          <DropdownTrigger>Controlled</DropdownTrigger>
          <DropdownMenu>
            <DropdownItem onSelect={() => alert('Edit clicked')}>Edit</DropdownItem>
            <DropdownItem onSelect={() => alert('Duplicate clicked')}>Duplicate</DropdownItem>
            <DropdownDivider />
            <DropdownItem danger onSelect={() => alert('Delete clicked')}>Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <span style={{ fontSize: 13, opacity: 0.5 }}>
          {open ? 'Open' : 'Closed'}
        </span>
      </div>
    );
  },
};

// ── 비활성화 ──
export const Disabled: Story = {
  render: () => (
    <Dropdown disabled>
      <DropdownTrigger>Disabled</DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>Item 1</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};

// ── Account 메뉴 (실제 사용 예시) ──
export const AccountMenu: Story = {
  render: () => (
    <Dropdown size="lg">
      <DropdownTrigger>Account</DropdownTrigger>
      <DropdownMenu>
        <DropdownItem icon="👤">Profile</DropdownItem>
        <DropdownItem icon="⚙️">Settings</DropdownItem>
        <DropdownItem icon="💳">Billing</DropdownItem>
        <DropdownDivider />
        <DropdownItem icon="📖">Documentation</DropdownItem>
        <DropdownItem icon="💬">Support</DropdownItem>
        <DropdownDivider />
        <DropdownItem icon="🚪" danger>Sign Out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};
