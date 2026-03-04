import React, { useState } from 'react';

import { Button } from '@lib/components/Button';
import { Input } from '@lib/components/Input';
import { Badge } from '@lib/components/Badge';
import { Card, CardBody } from '@lib/components/Card';
import { Toggle } from '@lib/components/Toggle';
import { Stack, Spacer } from '@lib/components/Stack';
import { AppBar } from '@lib/components/AppBar';
import { Sidebar, SidebarSection, SidebarItem } from '@lib/components/Sidebar';
import { Panel, PanelHeader, PanelBody, PanelFooter } from '@lib/components/Panel';
import { Divider } from '@lib/components/Divider';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@lib/components/Modal';
import { Tabs, TabList, Tab, TabPanel } from '@lib/components/Tabs';
import {
  Dropdown, DropdownTrigger, DropdownMenu,
  DropdownItem, DropdownDivider,
} from '@lib/components/Dropdown';
import { ThemeProvider } from '@lib/themes';

import '@lib/components/Button/Button.module.css';
import '@lib/components/Input/Input.module.css';
import '@lib/components/Badge/Badge.module.css';
import '@lib/components/Card/Card.module.css';
import '@lib/components/Toggle/Toggle.module.css';
import '@lib/components/AppBar/AppBar.module.css';
import '@lib/components/Sidebar/Sidebar.module.css';
import '@lib/components/Panel/Panel.module.css';
import '@lib/components/Divider/Divider.module.css';
import '@lib/components/Modal/Modal.module.css';
import '@lib/components/Tabs/Tabs.module.css';
import '@lib/components/Dropdown/Dropdown.module.css';
import '@lib/themes/ey.css';

/* ── Page data ────────────────────────────── */
const stats = [
  { label: 'Total Users', value: '12,489', change: '+12.5%', trend: 'up' },
  { label: 'Revenue', value: '$48.2K', change: '+8.3%', trend: 'up' },
  { label: 'Active Orders', value: '1,249', change: '+24.1%', trend: 'up' },
  { label: 'Conversion', value: '3.24%', change: '-0.8%', trend: 'down' },
];

const activities = [
  { icon: '👤', text: 'New user registered', detail: 'sarah@example.com', time: '2 min ago' },
  { icon: '📦', text: 'Order #1249 completed', detail: 'Premium Plan', time: '5 min ago' },
  { icon: '💰', text: 'Payment received', detail: '$2,450.00', time: '12 min ago' },
  { icon: '📊', text: 'Report generated', detail: 'Q4 Analytics', time: '28 min ago' },
  { icon: '💬', text: 'User feedback received', detail: '5-star rating', time: '45 min ago' },
  { icon: '🔔', text: 'System alert resolved', detail: 'CPU usage normal', time: '1 hr ago' },
  { icon: '👥', text: 'Team member joined', detail: 'dev@company.com', time: '2 hr ago' },
  { icon: '📈', text: 'Traffic spike detected', detail: '+340% visitors', time: '3 hr ago' },
];

const teamMembers = [
  { name: 'Sarah Kim', role: 'Frontend Dev', status: 'online', avatar: 'S' },
  { name: 'Mike Chen', role: 'Backend Dev', status: 'online', avatar: 'M' },
  { name: 'Jess Park', role: 'Designer', status: 'away', avatar: 'J' },
  { name: 'Tom Lee', role: 'PM', status: 'offline', avatar: 'T' },
];

const projects = [
  { name: 'Website Redesign', progress: 75, status: 'In Progress', dueDate: 'Mar 15' },
  { name: 'Mobile App v2', progress: 40, status: 'In Progress', dueDate: 'Apr 1' },
  { name: 'API Migration', progress: 95, status: 'Review', dueDate: 'Mar 8' },
  { name: 'Design System', progress: 60, status: 'In Progress', dueDate: 'Mar 20' },
];

/* ── Component ──────────────────────────── */
export function DashboardPage() {
  const [theme, setTheme] = useState<'default' | 'ey'>('default');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const accentColor = theme === 'ey' ? '#FFE600' : '#a78bfa';

  return (
    <ThemeProvider theme={theme}>
      <div style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        background: theme === 'ey'
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          : 'linear-gradient(135deg, #0f0a1e 0%, #1a1035 50%, #0d1b2a 100%)',
        color: '#fff',
        fontFamily: "'Inter', -apple-system, sans-serif",
        overflow: 'hidden',
      }}>
        {/* ── AppBar ──────────────────────────── */}
        <AppBar
          position="static"
          size="compact"
          leading={
            <Stack direction="horizontal" gap="sm" align="center">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                style={{
                  background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer', fontSize: 18, padding: '4px 8px', borderRadius: 6,
                }}
              >
                ☰
              </button>
              <span style={{ fontSize: 18 }}>💎</span>
              <strong style={{ fontSize: 15, letterSpacing: '-0.02em' }}>Liquid Glass</strong>
              <Badge variant="ghost" size="sm" style={{ opacity: 0.5 }}>v0.4.0</Badge>
            </Stack>
          }
          trailing={
            <Stack direction="horizontal" gap="sm" align="center">
              <Input
                placeholder="Search..."
                size="sm"
                leftIcon={<span style={{ fontSize: 12 }}>🔍</span>}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: 220 }}
              />

              <Dropdown placement="bottom-end">
                <DropdownTrigger
                  showChevron={false}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 16, padding: '4px 8px', color: 'rgba(255,255,255,0.6)',
                    position: 'relative', boxShadow: 'none', backdropFilter: 'none',
                  }}
                >
                  🔔
                  <span style={{
                    position: 'absolute', top: 2, right: 4,
                    width: 8, height: 8, borderRadius: '50%',
                    background: '#ef4444',
                  }} />
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem icon={<span>👤</span>}>New user signed up</DropdownItem>
                  <DropdownItem icon={<span>📦</span>}>Order completed</DropdownItem>
                  <DropdownDivider />
                  <DropdownItem>View all notifications</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Stack direction="horizontal" gap="sm" align="center" style={{
                padding: '4px 8px', borderRadius: 8,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Theme</span>
                <Toggle
                  checked={theme === 'ey'}
                  onChange={(v) => setTheme(v ? 'ey' : 'default')}
                  size="sm"
                />
              </Stack>

              <button
                onClick={() => setSettingsOpen(true)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 16, padding: '4px 8px', color: 'rgba(255,255,255,0.6)',
                }}
              >
                ⚙️
              </button>

              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}20)`,
                border: `1.5px solid ${accentColor}60`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, cursor: 'pointer',
              }}>
                J
              </div>
            </Stack>
          }
        />

        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          {/* ── Sidebar ──────────────────────── */}
          <Sidebar
            collapsed={sidebarCollapsed}
            collapsedWidth="60px"
            width="220px"
          >
            <SidebarSection title="Main">
              <SidebarItem icon="📊" active={activeNav === 'dashboard'} onClick={() => setActiveNav('dashboard')}>
                Dashboard
              </SidebarItem>
              <SidebarItem icon="👥" active={activeNav === 'users'} onClick={() => setActiveNav('users')}>
                Users
              </SidebarItem>
              <SidebarItem icon="📦" active={activeNav === 'products'} onClick={() => setActiveNav('products')}>
                Products
              </SidebarItem>
              <SidebarItem icon="📈" active={activeNav === 'analytics'} onClick={() => setActiveNav('analytics')} badge="New">
                Analytics
              </SidebarItem>
              <SidebarItem icon="💬" active={activeNav === 'messages'} onClick={() => setActiveNav('messages')} badge="3">
                Messages
              </SidebarItem>
            </SidebarSection>
            <SidebarSection title="System">
              <SidebarItem icon="⚙️" active={activeNav === 'settings'} onClick={() => setActiveNav('settings')}>
                Settings
              </SidebarItem>
              <SidebarItem icon="❓" active={activeNav === 'help'} onClick={() => setActiveNav('help')}>
                Help
              </SidebarItem>
            </SidebarSection>

            {!sidebarCollapsed && (
              <div style={{ padding: '16px 12px', marginTop: 'auto' }}>
                <Card size="sm" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <CardBody>
                    <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>Free Plan</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
                      3 of 5 projects used
                    </div>
                    <div style={{
                      height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.06)',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: '60%', height: '100%', borderRadius: 2,
                        background: accentColor,
                      }} />
                    </div>
                    <Button size="sm" variant="ghost" style={{ marginTop: 8, width: '100%', fontSize: 11 }}>
                      Upgrade Plan
                    </Button>
                  </CardBody>
                </Card>
              </div>
            )}
          </Sidebar>

          {/* ── Main Content ─────────────────── */}
          <div style={{
            flex: 1, padding: 20, overflow: 'auto',
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            {/* Header row */}
            <Stack direction="horizontal" align="center">
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>
                  {activeNav === 'dashboard' ? 'Dashboard' :
                   activeNav === 'users' ? 'Users' :
                   activeNav === 'products' ? 'Products' :
                   activeNav === 'analytics' ? 'Analytics' :
                   activeNav === 'messages' ? 'Messages' :
                   activeNav === 'settings' ? 'Settings' : 'Help'}
                </h1>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>
                  Welcome back, Jinu. Here's what's happening today.
                </p>
              </div>
              <Spacer />
              <Stack direction="horizontal" gap="sm" align="center">
                <Badge variant="ghost" status="success" dot>Online</Badge>
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>Export</DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem icon={<span>📄</span>}>Export as CSV</DropdownItem>
                    <DropdownItem icon={<span>📊</span>}>Export as Excel</DropdownItem>
                    <DropdownItem icon={<span>📋</span>}>Export as PDF</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Button variant="solid" size="sm">+ Add New</Button>
              </Stack>
            </Stack>

            {/* Stat cards */}
            <Stack direction="horizontal" gap="sm" wrap>
              {stats.map((stat) => (
                <Card key={stat.label} hoverable size="sm" style={{ flex: 1, minWidth: 180 }}>
                  <CardBody>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>
                      {stat.label}
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6, letterSpacing: '-0.03em' }}>
                      {stat.value}
                    </div>
                    <Badge
                      size="sm"
                      status={stat.trend === 'up' ? 'success' : 'error'}
                      variant="ghost"
                      style={{ marginTop: 8 }}
                    >
                      {stat.change}
                    </Badge>
                  </CardBody>
                </Card>
              ))}
            </Stack>

            {/* Main panels */}
            <Stack direction="horizontal" gap="md" style={{ flex: 1, minHeight: 0, alignItems: 'stretch' }}>
              {/* Overview Panel */}
              <Panel fill style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
                <PanelHeader actions={
                  <Tabs defaultValue="week" variant="pill" size="sm">
                    <TabList>
                      <Tab value="day">Day</Tab>
                      <Tab value="week">Week</Tab>
                      <Tab value="month">Month</Tab>
                    </TabList>
                  </Tabs>
                }>
                  <strong style={{ fontSize: 15 }}>Overview</strong>
                </PanelHeader>
                <PanelBody>
                  {/* Chart placeholder */}
                  <div style={{
                    height: 200,
                    background: `linear-gradient(180deg, ${accentColor}08 0%, transparent 100%)`,
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '0 16px 16px',
                    gap: 8,
                  }}>
                    {[35, 55, 40, 70, 65, 85, 60, 90, 75, 95, 80, 100].map((h, i) => (
                      <div key={i} style={{
                        flex: 1,
                        height: `${h}%`,
                        borderRadius: '4px 4px 0 0',
                        background: `linear-gradient(180deg, ${accentColor}${i === 11 ? '80' : '30'} 0%, ${accentColor}10 100%)`,
                        border: `1px solid ${accentColor}${i === 11 ? '40' : '15'}`,
                        transition: 'all 0.3s',
                      }} />
                    ))}
                  </div>

                  <Divider style={{ margin: '16px 0' }} />

                  {/* Projects table */}
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Active Projects</div>
                  <Stack direction="vertical" gap="sm">
                    {projects.map((project) => (
                      <div key={project.name} style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '10px 12px', borderRadius: 10,
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.04)',
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>{project.name}</div>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                            Due: {project.dueDate}
                          </div>
                        </div>
                        <Badge
                          size="sm"
                          variant="ghost"
                          status={project.status === 'Review' ? 'warning' : 'info'}
                        >
                          {project.status}
                        </Badge>
                        <div style={{ width: 80 }}>
                          <div style={{
                            height: 6, borderRadius: 3,
                            background: 'rgba(255,255,255,0.06)',
                            overflow: 'hidden',
                          }}>
                            <div style={{
                              width: `${project.progress}%`,
                              height: '100%',
                              borderRadius: 3,
                              background: project.progress > 90 ? '#22c55e' : accentColor,
                              transition: 'width 0.5s ease',
                            }} />
                          </div>
                          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 3, textAlign: 'right' }}>
                            {project.progress}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </Stack>
                </PanelBody>
              </Panel>

              {/* Right column */}
              <Stack direction="vertical" gap="md" style={{ flex: 1, minWidth: 260 }}>
                {/* Activity Feed */}
                <Panel fill style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <PanelHeader actions={<Badge size="sm" status="info" variant="ghost">Live</Badge>}>
                    <strong style={{ fontSize: 14 }}>Activity</strong>
                  </PanelHeader>
                  <PanelBody scroll>
                    <Stack direction="vertical" gap="xs">
                      {activities.map((item, i) => (
                        <div key={i} style={{
                          display: 'flex', gap: 10, padding: '10px 0',
                          borderBottom: i < activities.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                        }}>
                          <span style={{ fontSize: 16, lineHeight: 1 }}>{item.icon}</span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 12, fontWeight: 500 }}>{item.text}</div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                              {item.detail}
                            </div>
                          </div>
                          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>
                            {item.time}
                          </div>
                        </div>
                      ))}
                    </Stack>
                  </PanelBody>
                </Panel>

                {/* Team Members */}
                <Panel fill>
                  <PanelHeader actions={<Button size="sm" variant="ghost" style={{ fontSize: 11 }}>View All</Button>}>
                    <strong style={{ fontSize: 14 }}>Team</strong>
                  </PanelHeader>
                  <PanelBody>
                    <Stack direction="vertical" gap="sm">
                      {teamMembers.map((member) => (
                        <div key={member.name} style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                        }}>
                          <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: `linear-gradient(135deg, ${accentColor}30, ${accentColor}10)`,
                            border: `1.5px solid ${accentColor}40`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 12, fontWeight: 700, position: 'relative',
                          }}>
                            {member.avatar}
                            <span style={{
                              position: 'absolute', bottom: -1, right: -1,
                              width: 9, height: 9, borderRadius: '50%',
                              border: '2px solid #1a1035',
                              background: member.status === 'online' ? '#22c55e' :
                                         member.status === 'away' ? '#eab308' : '#6b7280',
                            }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, fontWeight: 600 }}>{member.name}</div>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{member.role}</div>
                          </div>
                        </div>
                      ))}
                    </Stack>
                  </PanelBody>
                </Panel>
              </Stack>
            </Stack>
          </div>
        </div>

        {/* ── Settings Modal ──────────────── */}
        <Modal open={settingsOpen} onClose={() => setSettingsOpen(false)} size="md">
          <ModalHeader showClose>
            <h3 style={{ fontSize: 18, fontWeight: 600 }}>Settings</h3>
          </ModalHeader>
          <ModalBody>
            <Stack direction="vertical" gap="md">
              <Input label="Display Name" placeholder="Jinu" />
              <Input label="Email" placeholder="yjw5615@gmail.com" />
              <Divider />
              <Stack direction="horizontal" align="center">
                <span style={{ fontSize: 13 }}>Dark Mode</span>
                <Spacer />
                <Toggle checked={true} onChange={() => {}} size="sm" />
              </Stack>
              <Stack direction="horizontal" align="center">
                <span style={{ fontSize: 13 }}>Notifications</span>
                <Spacer />
                <Toggle checked={true} onChange={() => {}} size="sm" />
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" size="sm" onClick={() => setSettingsOpen(false)}>Cancel</Button>
            <Button variant="solid" size="sm" onClick={() => setSettingsOpen(false)}>Save</Button>
          </ModalFooter>
        </Modal>

        {/* ── Back to demo link ──────────────── */}
        <a
          href="#/"
          onClick={() => window.location.hash = '#/'}
          style={{
            position: 'fixed', bottom: 16, right: 16,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(16px)',
            borderRadius: 10,
            padding: '8px 16px',
            fontSize: 12,
            color: 'rgba(255,255,255,0.5)',
            textDecoration: 'none',
            zIndex: 100,
            transition: 'all 0.2s',
          }}
        >
          ← Back to Demo
        </a>
      </div>
    </ThemeProvider>
  );
}
