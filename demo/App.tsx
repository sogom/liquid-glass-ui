import React, { useState } from 'react';

/* ── Import library components from source ───── */
import { Button } from '@lib/components/Button';
import { Input } from '@lib/components/Input';
import { Badge } from '@lib/components/Badge';
import { Tabs, TabList, Tab, TabPanel } from '@lib/components/Tabs';
import { Toggle } from '@lib/components/Toggle';
import { Card, CardHeader, CardBody, CardFooter } from '@lib/components/Card';
import { Tooltip } from '@lib/components/Tooltip';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@lib/components/Modal';
import {
  Dropdown, DropdownTrigger, DropdownMenu,
  DropdownItem, DropdownDivider, DropdownGroup,
} from '@lib/components/Dropdown';
import { Container } from '@lib/components/Container';
import { Stack, Spacer } from '@lib/components/Stack';
import { Divider } from '@lib/components/Divider';
import { AspectRatio } from '@lib/components/AspectRatio';
import { AppBar } from '@lib/components/AppBar';
import { Sidebar, SidebarSection, SidebarItem } from '@lib/components/Sidebar';
import { Panel, PanelHeader, PanelBody, PanelFooter } from '@lib/components/Panel';
import { ThemeProvider } from '@lib/themes';

/* ── Import component styles ─────────────────── */
import '@lib/components/Button/Button.module.css';
import '@lib/components/Input/Input.module.css';
import '@lib/components/Badge/Badge.module.css';
import '@lib/components/Tabs/Tabs.module.css';
import '@lib/components/Toggle/Toggle.module.css';
import '@lib/components/Card/Card.module.css';
import '@lib/components/Tooltip/Tooltip.module.css';
import '@lib/components/Modal/Modal.module.css';
import '@lib/components/Dropdown/Dropdown.module.css';
import '@lib/components/AppBar/AppBar.module.css';
import '@lib/components/Sidebar/Sidebar.module.css';
import '@lib/components/AspectRatio/AspectRatio.module.css';
import '@lib/components/Panel/Panel.module.css';
import '@lib/themes/ey.css';

/* ── Helpers ──────────────────────────────────── */
const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: 'rgba(255,255,255,0.3)', marginTop: 20, marginBottom: 8 }}>
    {children}
  </div>
);

/* ══════════════════════════════════════════════════
   App
   ══════════════════════════════════════════════════ */
export function App() {
  const [theme, setTheme] = useState<'default' | 'ey'>('default');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [toggleOn, setToggleOn] = useState(false);
  const [toggleLabel, setToggleLabel] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [copied, setCopied] = useState(false);
  const [closableBadge, setClosableBadge] = useState(true);
  const [aspectW, setAspectW] = useState(16);
  const [aspectH, setAspectH] = useState(9);

  // Interactive playground states
  const [btnVariant, setBtnVariant] = useState<'solid' | 'accent' | 'outline' | 'ghost'>('solid');
  const [btnSize, setBtnSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [btnShape, setBtnShape] = useState<'rounded' | 'pill'>('rounded');
  const [btnGlow, setBtnGlow] = useState(false);
  const [btnGlowIntensity, setBtnGlowIntensity] = useState(1);
  const [btnLoading, setBtnLoading] = useState(false);

  const [badgeVariant, setBadgeVariant] = useState<'solid' | 'ghost' | 'outline' | 'accent'>('solid');
  const [badgeStatus, setBadgeStatus] = useState<'default' | 'info' | 'success' | 'warning' | 'error'>('default');
  const [badgeDot, setBadgeDot] = useState(false);
  const [badgePulse, setBadgePulse] = useState(false);
  const [badgeGlow, setBadgeGlow] = useState(false);
  const [badgeGlowIntensity, setBadgeGlowIntensity] = useState(1);

  const [cardVariant, setCardVariant] = useState<'solid' | 'outline' | 'ghost'>('solid');
  const [cardSize, setCardSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [cardHoverable, setCardHoverable] = useState(true);
  const [cardGlow, setCardGlow] = useState(false);
  const [cardGlowIntensity, setCardGlowIntensity] = useState(1);

  // Toggle playground
  const [pgToggleSize, setPgToggleSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [pgToggleLabel, setPgToggleLabel] = useState('Notifications');
  const [pgToggleLabelPos, setPgToggleLabelPos] = useState<'left' | 'right'>('right');
  const [pgToggleDisabled, setPgToggleDisabled] = useState(false);
  const [pgToggleChecked, setPgToggleChecked] = useState(true);

  // Tabs playground
  const [pgTabVariant, setPgTabVariant] = useState<'solid' | 'outline' | 'pill'>('solid');
  const [pgTabSize, setPgTabSize] = useState<'sm' | 'md' | 'lg'>('md');

  // Modal playground
  const [pgModalSize, setPgModalSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [pgModalCloseOverlay, setPgModalCloseOverlay] = useState(true);
  const [pgModalCloseEsc, setPgModalCloseEsc] = useState(true);
  const [pgModalOpen, setPgModalOpen] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const themeLabel = theme === 'default' ? 'Default' : 'EY';

  return (
    <ThemeProvider theme={theme}>
      {/* ── Top Nav ────────────────────────────── */}
      <nav className="demo-nav">
        <div className="demo-nav-brand">
          <span style={{ fontSize: 20 }}>💎</span>
          Liquid Glass UI
        </div>
        <div className="demo-nav-links">
          <a href="#components">Components</a>
          <a href="#layout">Layout</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#install">Install</a>
        </div>
        <div className="demo-nav-right">
          <Badge variant="outline" size="sm">{themeLabel}</Badge>
          <Toggle
            checked={theme === 'ey'}
            onChange={(v) => setTheme(v ? 'ey' : 'default')}
            size="sm"
          />
        </div>
      </nav>

      {/* ━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ paddingTop: 120, paddingBottom: 60, textAlign: 'center' }}>
        <div style={{ marginBottom: 16 }}>
          <Badge variant="ghost">v0.4.0</Badge>
        </div>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          marginBottom: 20,
        }}>
          Liquid Glass UI
        </h1>
        <p style={{
          fontSize: 'clamp(16px, 2.5vw, 20px)',
          color: 'rgba(255,255,255,0.5)',
          maxWidth: 520,
          margin: '0 auto 36px',
        }}>
          Apple Liquid Glass inspired React components with glassmorphism effects
        </p>

        <Stack direction="horizontal" gap="sm" align="center" justify="center">
          <div
            onClick={() => handleCopy('npm i @_jinu/liquid-glass-ui')}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              padding: '12px 20px',
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              fontSize: 14,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            npm i @_jinu/liquid-glass-ui
            <span style={{ fontSize: 12, opacity: 0.4 }}>
              {copied ? '✓ Copied' : '📋'}
            </span>
          </div>
        </Stack>

        <Stack direction="horizontal" gap="sm" align="center" justify="center" style={{ marginTop: 20 }}>
          <Button variant="solid" size="md" onClick={() => document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Components
          </Button>
          <Button variant="outline" size="md" onClick={() => window.open('https://www.npmjs.com/package/@_jinu/liquid-glass-ui', '_blank')}>
            npm Package →
          </Button>
        </Stack>
      </section>

      {/* ── Theme toggle banner ──────────────── */}
      <div style={{ textAlign: 'center', padding: '16px 0 0' }}>
        <Stack direction="horizontal" gap="sm" align="center" justify="center">
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Theme:</span>
          <Button
            variant={theme === 'default' ? 'solid' : 'ghost'}
            size="sm"
            onClick={() => setTheme('default')}
          >
            Default
          </Button>
          <Button
            variant={theme === 'ey' ? 'solid' : 'ghost'}
            size="sm"
            onClick={() => setTheme('ey')}
          >
            EY Theme
          </Button>
        </Stack>
      </div>

      {/* ━━ COMPONENTS ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="components" className="demo-section">
        <h2 className="section-title">Components</h2>
        <p className="section-subtitle">Interactive demos for every component in the library</p>

        {/* ── Button ──────────────────────────── */}
        <div className="demo-card">
          <h3 className="demo-card-title">Button</h3>
          <p className="demo-card-desc">Glass-effect buttons with multiple variants, sizes, shapes, and states</p>

          <SectionLabel>Variants</SectionLabel>
          <div className="demo-row">
            <Button variant="solid">Solid</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>

          <SectionLabel>Sizes</SectionLabel>
          <div className="demo-row">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>

          <SectionLabel>Shapes</SectionLabel>
          <div className="demo-row">
            <Button shape="rounded">Rounded</Button>
            <Button shape="pill">Pill</Button>
          </div>

          <SectionLabel>States & Features</SectionLabel>
          <div className="demo-row">
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
            <Button glow variant="accent">Glow</Button>
            <Button leftIcon={<span>✨</span>}>With Icon</Button>
          </div>

          <SectionLabel>Interactive Playground</SectionLabel>
          <Stack direction="horizontal" gap="md" className="playground-row" style={{ alignItems: 'start' }}>
            <div className="playground-controls" style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: 16, minWidth: 200,
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Controls</div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {(['solid', 'accent', 'outline', 'ghost'] as const).map(v => (
                  <button key={v} onClick={() => setBtnVariant(v)} style={{
                    padding: '3px 8px', borderRadius: 5, fontSize: 10, fontWeight: 600, cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: btnVariant === v ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
                    color: btnVariant === v ? '#fff' : 'rgba(255,255,255,0.5)',
                  }}>{v}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {(['sm', 'md', 'lg'] as const).map(s => (
                  <button key={s} onClick={() => setBtnSize(s)} style={{
                    padding: '3px 8px', borderRadius: 5, fontSize: 10, fontWeight: 600, cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: btnSize === s ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
                    color: btnSize === s ? '#fff' : 'rgba(255,255,255,0.5)',
                  }}>{s}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {(['rounded', 'pill'] as const).map(s => (
                  <button key={s} onClick={() => setBtnShape(s)} style={{
                    padding: '3px 8px', borderRadius: 5, fontSize: 10, fontWeight: 600, cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: btnShape === s ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
                    color: btnShape === s ? '#fff' : 'rgba(255,255,255,0.5)',
                  }}>{s}</button>
                ))}
              </div>
              <Toggle checked={btnGlow} onChange={setBtnGlow} size="sm" label="Glow" />
              {btnGlow && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <label style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', minWidth: 50 }}>Intensity</label>
                  <input
                    type="range" min={0} max={1} step={0.1} value={btnGlowIntensity}
                    onChange={(e) => setBtnGlowIntensity(Number(e.target.value))}
                    style={{ flex: 1, accentColor: theme === 'ey' ? '#FFE600' : '#a78bfa' }}
                  />
                  <span style={{ fontSize: 11, fontWeight: 700, width: 28, textAlign: 'right', color: 'rgba(255,255,255,0.6)' }}>{btnGlowIntensity}</span>
                </div>
              )}
              <Toggle checked={btnLoading} onChange={setBtnLoading} size="sm" label="Loading" />
            </div>
            <div className="playground-preview" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 80, gap: 12 }}>
              <Button variant={btnVariant} size={btnSize} shape={btnShape} glow={btnGlow} glowIntensity={btnGlowIntensity} loading={btnLoading}>
                Button Preview
              </Button>
              <div className="code-block" style={{ width: '100%', marginTop: 8 }}>
{`<Button variant="${btnVariant}" size="${btnSize}" shape="${btnShape}"${btnGlow ? ` glow glowIntensity={${btnGlowIntensity}}` : ''}${btnLoading ? ' loading' : ''}>
  Button Preview
</Button>`}
              </div>
            </div>
          </Stack>
        </div>

        {/* ── Input ───────────────────────────── */}
        <div className="demo-card">
          <h3 className="demo-card-title">Input</h3>
          <p className="demo-card-desc">Glass text inputs with variants, sizes, labels, hints, and validation states</p>

          <SectionLabel>Variants</SectionLabel>
          <Stack direction="horizontal" gap="sm" wrap style={{ maxWidth: 600 }}>
            <Input placeholder="Solid" variant="solid" style={{ flex: 1, minWidth: 160 }} />
            <Input placeholder="Outline" variant="outline" style={{ flex: 1, minWidth: 160 }} />
            <Input placeholder="Ghost" variant="ghost" style={{ flex: 1, minWidth: 160 }} />
          </Stack>

          <SectionLabel>Sizes</SectionLabel>
          <Stack direction="horizontal" gap="sm" wrap style={{ maxWidth: 600 }}>
            <Input placeholder="Small" size="sm" style={{ flex: 1, minWidth: 140 }} />
            <Input placeholder="Medium" size="md" style={{ flex: 1, minWidth: 140 }} />
            <Input placeholder="Large" size="lg" style={{ flex: 1, minWidth: 140 }} />
          </Stack>

          <SectionLabel>Label, Hint & Validation</SectionLabel>
          <Stack direction="vertical" gap="sm" style={{ maxWidth: 360 }}>
            <Input label="Email" placeholder="you@example.com" hint="We won't share your email" />
            <Input label="Password" placeholder="Enter password" type="password" hint="Min 8 characters" />
            <Input label="Username" placeholder="taken_name" state="error" errorMessage="This username is already taken" />
            <Input label="Verified" placeholder="correct_input" state="success" successMessage="Looks good!" />
          </Stack>

          <SectionLabel>With Icons & Numeric</SectionLabel>
          <Stack direction="horizontal" gap="sm" wrap style={{ maxWidth: 500 }}>
            <Input placeholder="Search..." leftIcon={<span>🔍</span>} style={{ flex: 1, minWidth: 180 }} />
            <Input placeholder="0" label="Amount" numeric rightIcon={<span>$</span>} style={{ flex: 1, minWidth: 140 }} />
          </Stack>

          <div className="code-block">
{`<Input label="Email" placeholder="you@example.com"
  hint="We won't share your email" />
<Input state="error" errorMessage="Required" />
<Input leftIcon={<SearchIcon />} numeric />`}
          </div>
        </div>

        {/* ── Badge ───────────────────────────── */}
        <div className="demo-card">
          <h3 className="demo-card-title">Badge</h3>
          <p className="demo-card-desc">Status indicators with variants, sizes, shapes, dot indicators, and interactive states</p>

          <SectionLabel>Variants</SectionLabel>
          <div className="demo-row">
            <Badge variant="solid">Solid</Badge>
            <Badge variant="ghost">Ghost</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="accent">Accent</Badge>
          </div>

          <SectionLabel>Status Colors</SectionLabel>
          <div className="demo-row">
            <Badge status="default">Default</Badge>
            <Badge status="info">Info</Badge>
            <Badge status="success">Success</Badge>
            <Badge status="warning">Warning</Badge>
            <Badge status="error">Error</Badge>
          </div>

          <SectionLabel>Sizes & Shapes</SectionLabel>
          <div className="demo-row">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
            <Badge shape="rounded">Rounded</Badge>
            <Badge shape="pill">Pill</Badge>
          </div>

          <SectionLabel>Dot, Pulse & Glow</SectionLabel>
          <div className="demo-row">
            <Badge dot status="success">Online</Badge>
            <Badge dot pulse status="error">Live</Badge>
            <Badge glow variant="accent">Glowing</Badge>
          </div>

          <SectionLabel>Interactive & Closable</SectionLabel>
          <div className="demo-row">
            <Badge interactive onClick={() => alert('Clicked!')}>Clickable</Badge>
            {closableBadge && (
              <Badge closable onClose={() => setClosableBadge(false)}>Closable</Badge>
            )}
            {!closableBadge && (
              <Button size="sm" variant="ghost" onClick={() => setClosableBadge(true)}>Reset</Button>
            )}
            <Badge leftIcon={<span>⭐</span>}>With Icon</Badge>
          </div>

          <SectionLabel>Interactive Playground</SectionLabel>
          <Stack direction="horizontal" gap="md" className="playground-row" style={{ alignItems: 'start' }}>
            <div className="playground-controls" style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: 16, minWidth: 200,
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Controls</div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {(['solid', 'ghost', 'outline', 'accent'] as const).map(v => (
                  <button key={v} onClick={() => setBadgeVariant(v)} style={{
                    padding: '3px 8px', borderRadius: 5, fontSize: 10, fontWeight: 600, cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: badgeVariant === v ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
                    color: badgeVariant === v ? '#fff' : 'rgba(255,255,255,0.5)',
                  }}>{v}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {(['default', 'info', 'success', 'warning', 'error'] as const).map(s => (
                  <button key={s} onClick={() => setBadgeStatus(s)} style={{
                    padding: '3px 8px', borderRadius: 5, fontSize: 10, fontWeight: 600, cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: badgeStatus === s ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
                    color: badgeStatus === s ? '#fff' : 'rgba(255,255,255,0.5)',
                  }}>{s}</button>
                ))}
              </div>
              <Toggle checked={badgeDot} onChange={setBadgeDot} size="sm" label="Dot" />
              <Toggle checked={badgePulse} onChange={setBadgePulse} size="sm" label="Pulse" />
              <Toggle checked={badgeGlow} onChange={setBadgeGlow} size="sm" label="Glow" />
              {badgeGlow && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <label style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', minWidth: 50 }}>Intensity</label>
                  <input
                    type="range" min={0} max={1} step={0.1} value={badgeGlowIntensity}
                    onChange={(e) => setBadgeGlowIntensity(Number(e.target.value))}
                    style={{ flex: 1, accentColor: theme === 'ey' ? '#FFE600' : '#a78bfa' }}
                  />
                  <span style={{ fontSize: 11, fontWeight: 700, width: 28, textAlign: 'right', color: 'rgba(255,255,255,0.6)' }}>{badgeGlowIntensity}</span>
                </div>
              )}
            </div>
            <div className="playground-preview" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 80, gap: 12 }}>
              <Badge variant={badgeVariant} status={badgeStatus} dot={badgeDot} pulse={badgePulse} glow={badgeGlow} glowIntensity={badgeGlowIntensity} interactive>
                Badge Preview
              </Badge>
              <div className="code-block" style={{ width: '100%', marginTop: 8 }}>
{`<Badge variant="${badgeVariant}" status="${badgeStatus}"${badgeDot ? ' dot' : ''}${badgePulse ? ' pulse' : ''}${badgeGlow ? ` glow glowIntensity={${badgeGlowIntensity}}` : ''} interactive>
  Badge Preview
</Badge>`}
              </div>
            </div>
          </Stack>
        </div>

        {/* ── Toggle ──────────────────────────── */}
        <div className="demo-card">
          <h3 className="demo-card-title">Toggle</h3>
          <p className="demo-card-desc">Smooth animated switches with sizes, labels, and disabled states</p>

          <SectionLabel>Sizes</SectionLabel>
          <div className="demo-row">
            <Toggle checked={toggleOn} onChange={setToggleOn} size="sm" />
            <Toggle checked={toggleOn} onChange={setToggleOn} size="md" />
            <Toggle checked={toggleOn} onChange={setToggleOn} size="lg" />
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
              {toggleOn ? 'ON' : 'OFF'}
            </span>
          </div>

          <SectionLabel>With Labels</SectionLabel>
          <Stack direction="vertical" gap="sm">
            <Toggle checked={toggleLabel} onChange={setToggleLabel} label="Notifications" labelPosition="right" />
            <Toggle checked={toggleLabel} onChange={setToggleLabel} label="Dark mode" labelPosition="left" />
          </Stack>

          <SectionLabel>Disabled</SectionLabel>
          <div className="demo-row">
            <Toggle checked={false} disabled size="md" label="Off (disabled)" />
            <Toggle checked={true} disabled size="md" label="On (disabled)" />
          </div>

          <SectionLabel>Interactive Playground</SectionLabel>
          <Stack direction="horizontal" gap="md" className="playground-row" style={{ alignItems: 'start' }}>
            <div className="playground-controls" style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: 16, minWidth: 200,
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Controls</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {(['sm', 'md', 'lg'] as const).map(s => (
                  <button key={s} onClick={() => setPgToggleSize(s)} style={{
                    padding: '3px 8px', borderRadius: 5, fontSize: 10, fontWeight: 600, cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: pgToggleSize === s ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
                    color: pgToggleSize === s ? '#fff' : 'rgba(255,255,255,0.5)',
                  }}>{s}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {(['left', 'right'] as const).map(p => (
                  <button key={p} onClick={() => setPgToggleLabelPos(p)} style={{
                    padding: '3px 8px', borderRadius: 5, fontSize: 10, fontWeight: 600, cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: pgToggleLabelPos === p ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
                    color: pgToggleLabelPos === p ? '#fff' : 'rgba(255,255,255,0.5)',
                  }}>label: {p}</button>
                ))}
              </div>
              <Toggle checked={pgToggleDisabled} onChange={setPgToggleDisabled} size="sm" label="Disabled" />
            </div>
            <div className="playground-preview" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 80, gap: 12 }}>
              <Toggle
                checked={pgToggleChecked}
                onChange={setPgToggleChecked}
                size={pgToggleSize}
                label={pgToggleLabel}
                labelPosition={pgToggleLabelPos}
                disabled={pgToggleDisabled}
              />
              <div className="code-block" style={{ width: '100%', marginTop: 8 }}>
{`<Toggle checked={${pgToggleChecked}} onChange={setOn}
  size="${pgToggleSize}" label="${pgToggleLabel}"
  labelPosition="${pgToggleLabelPos}"${pgToggleDisabled ? ' disabled' : ''} />`}
              </div>
            </div>
          </Stack>
        </div>

        {/* ── Tabs ────────────────────────────── */}
        <div className="demo-card">
          <h3 className="demo-card-title">Tabs</h3>
          <p className="demo-card-desc">Tab navigation with three visual variants and multiple sizes</p>

          <SectionLabel>All Variants</SectionLabel>
          <Stack direction="vertical" gap="md">
            <Tabs defaultValue="s1" variant="solid">
              <TabList>
                <Tab value="s1">Overview</Tab>
                <Tab value="s2">Features</Tab>
                <Tab value="s3" disabled>Disabled</Tab>
              </TabList>
              <TabPanel value="s1">
                <div style={{ padding: '12px 0', color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
                  Solid tab — active highlight with background.
                </div>
              </TabPanel>
              <TabPanel value="s2">
                <div style={{ padding: '12px 0', color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
                  18 components, theme system, fully typed with TypeScript.
                </div>
              </TabPanel>
            </Tabs>
            <Tabs defaultValue="o1" variant="outline">
              <TabList>
                <Tab value="o1">Design</Tab>
                <Tab value="o2">Code</Tab>
                <Tab value="o3">Preview</Tab>
              </TabList>
              <TabPanel value="o1">
                <div style={{ padding: '12px 0', color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
                  Outline — underline border-bottom indicator.
                </div>
              </TabPanel>
            </Tabs>
            <Tabs defaultValue="p1" variant="pill">
              <TabList>
                <Tab value="p1">All</Tab>
                <Tab value="p2">Active</Tab>
                <Tab value="p3">Archived</Tab>
              </TabList>
              <TabPanel value="p1">
                <div style={{ padding: '12px 0', color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
                  Pill — rounded pill-shaped tabs.
                </div>
              </TabPanel>
            </Tabs>
          </Stack>

          <SectionLabel>Interactive Playground</SectionLabel>
          <Stack direction="horizontal" gap="md" className="playground-row" style={{ alignItems: 'start' }}>
            <div className="playground-controls" style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: 16, minWidth: 200,
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Controls</div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {(['solid', 'outline', 'pill'] as const).map(v => (
                  <button key={v} onClick={() => setPgTabVariant(v)} style={{
                    padding: '3px 8px', borderRadius: 5, fontSize: 10, fontWeight: 600, cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: pgTabVariant === v ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
                    color: pgTabVariant === v ? '#fff' : 'rgba(255,255,255,0.5)',
                  }}>{v}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {(['sm', 'md', 'lg'] as const).map(s => (
                  <button key={s} onClick={() => setPgTabSize(s)} style={{
                    padding: '3px 8px', borderRadius: 5, fontSize: 10, fontWeight: 600, cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: pgTabSize === s ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
                    color: pgTabSize === s ? '#fff' : 'rgba(255,255,255,0.5)',
                  }}>{s}</button>
                ))}
              </div>
            </div>
            <div className="playground-preview" style={{ flex: 1 }}>
              <Tabs defaultValue="pg1" variant={pgTabVariant} size={pgTabSize}>
                <TabList>
                  <Tab value="pg1">Overview</Tab>
                  <Tab value="pg2">Features</Tab>
                  <Tab value="pg3" disabled>Disabled</Tab>
                </TabList>
                <TabPanel value="pg1">
                  <div style={{ padding: '12px 0', color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
                    Tab content for Overview.
                  </div>
                </TabPanel>
                <TabPanel value="pg2">
                  <div style={{ padding: '12px 0', color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
                    Tab content for Features.
                  </div>
                </TabPanel>
              </Tabs>
              <div className="code-block" style={{ marginTop: 12 }}>
{`<Tabs defaultValue="tab1" variant="${pgTabVariant}" size="${pgTabSize}">
  <TabList>
    <Tab value="tab1">Overview</Tab>
    <Tab value="tab2" disabled>Disabled</Tab>
  </TabList>
  <TabPanel value="tab1">Content</TabPanel>
</Tabs>`}
              </div>
            </div>
          </Stack>
        </div>

        {/* ── Card ────────────────────────────── */}
        <div className="demo-card">
          <h3 className="demo-card-title">Card</h3>
          <p className="demo-card-desc">Glass card container with variants, sizes, hover effects, and glow</p>

          <SectionLabel>Variants</SectionLabel>
          <div className="demo-row" style={{ alignItems: 'stretch' }}>
            <Card hoverable style={{ flex: 1, maxWidth: 220 }}>
              <CardBody>
                <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Solid</h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Default glass card</p>
              </CardBody>
            </Card>
            <Card variant="outline" hoverable style={{ flex: 1, maxWidth: 220 }}>
              <CardBody>
                <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Outline</h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Border-only variant</p>
              </CardBody>
            </Card>
            <Card variant="ghost" hoverable style={{ flex: 1, maxWidth: 220 }}>
              <CardBody>
                <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Ghost</h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Minimal background</p>
              </CardBody>
            </Card>
          </div>

          <SectionLabel>Sizes</SectionLabel>
          <div className="demo-row" style={{ alignItems: 'stretch' }}>
            <Card size="sm" style={{ flex: 1, maxWidth: 180 }}>
              <CardBody>
                <div style={{ fontSize: 12 }}>Small</div>
              </CardBody>
            </Card>
            <Card size="md" style={{ flex: 1, maxWidth: 200 }}>
              <CardBody>
                <div style={{ fontSize: 13 }}>Medium</div>
              </CardBody>
            </Card>
            <Card size="lg" style={{ flex: 1, maxWidth: 220 }}>
              <CardBody>
                <div style={{ fontSize: 14 }}>Large</div>
              </CardBody>
            </Card>
          </div>

          <SectionLabel>Hoverable + Glow Effect</SectionLabel>
          <div className="demo-row" style={{ alignItems: 'stretch' }}>
            <Card hoverable glow style={{ flex: 1, maxWidth: 300 }}>
              <CardHeader>
                <h4 style={{ fontSize: 16, fontWeight: 600 }}>Glow Card</h4>
              </CardHeader>
              <CardBody>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
                  Hover me to see the glow effect and lift animation!
                </p>
              </CardBody>
              <CardFooter>
                <Button size="sm" variant="ghost">Cancel</Button>
                <Button size="sm" variant="solid">Action</Button>
              </CardFooter>
            </Card>
          </div>

          <SectionLabel>Interactive Playground</SectionLabel>
          <Stack direction="horizontal" gap="md" className="playground-row" style={{ alignItems: 'start' }}>
            <div className="playground-controls" style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: 16, minWidth: 200,
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Controls</div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {(['solid', 'outline', 'ghost'] as const).map(v => (
                  <button key={v} onClick={() => setCardVariant(v)} style={{
                    padding: '3px 8px', borderRadius: 5, fontSize: 10, fontWeight: 600, cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: cardVariant === v ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
                    color: cardVariant === v ? '#fff' : 'rgba(255,255,255,0.5)',
                  }}>{v}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {(['sm', 'md', 'lg'] as const).map(s => (
                  <button key={s} onClick={() => setCardSize(s)} style={{
                    padding: '3px 8px', borderRadius: 5, fontSize: 10, fontWeight: 600, cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: cardSize === s ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
                    color: cardSize === s ? '#fff' : 'rgba(255,255,255,0.5)',
                  }}>{s}</button>
                ))}
              </div>
              <Toggle checked={cardHoverable} onChange={setCardHoverable} size="sm" label="Hoverable" />
              <Toggle checked={cardGlow} onChange={setCardGlow} size="sm" label="Glow" />
              {cardGlow && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <label style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', minWidth: 50 }}>Intensity</label>
                  <input
                    type="range" min={0} max={1} step={0.1} value={cardGlowIntensity}
                    onChange={(e) => setCardGlowIntensity(Number(e.target.value))}
                    style={{ flex: 1, accentColor: theme === 'ey' ? '#FFE600' : '#a78bfa' }}
                  />
                  <span style={{ fontSize: 11, fontWeight: 700, width: 28, textAlign: 'right', color: 'rgba(255,255,255,0.6)' }}>{cardGlowIntensity}</span>
                </div>
              )}
            </div>
            <div className="playground-preview" style={{ flex: 1, maxWidth: 320 }}>
              <Card variant={cardVariant} size={cardSize} hoverable={cardHoverable} glow={cardGlow} glowIntensity={cardGlowIntensity}>
                <CardHeader>
                  <h4 style={{ fontSize: 15, fontWeight: 600 }}>Card Preview</h4>
                </CardHeader>
                <CardBody>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                    Adjust the controls to preview different card configurations.
                  </p>
                </CardBody>
                <CardFooter>
                  <Button size="sm" variant="ghost">Cancel</Button>
                  <Button size="sm" variant="solid">Action</Button>
                </CardFooter>
              </Card>
              <div className="code-block" style={{ marginTop: 12 }}>
{`<Card variant="${cardVariant}" size="${cardSize}"${cardHoverable ? ' hoverable' : ''}${cardGlow ? ` glow glowIntensity={${cardGlowIntensity}}` : ''}>
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
</Card>`}
              </div>
            </div>
          </Stack>
        </div>

        {/* ── Tooltip ─────────────────────────── */}
        <div className="demo-card">
          <h3 className="demo-card-title">Tooltip</h3>
          <p className="demo-card-desc">Glass tooltips with placement options, arrow control, and trigger modes</p>

          <SectionLabel>Placements</SectionLabel>
          <div className="demo-row">
            <Tooltip content="Top tooltip" placement="top">
              <Button variant="outline" size="sm">Top</Button>
            </Tooltip>
            <Tooltip content="Bottom tooltip" placement="bottom">
              <Button variant="outline" size="sm">Bottom</Button>
            </Tooltip>
            <Tooltip content="Left tooltip" placement="left">
              <Button variant="outline" size="sm">Left</Button>
            </Tooltip>
            <Tooltip content="Right tooltip" placement="right">
              <Button variant="outline" size="sm">Right</Button>
            </Tooltip>
          </div>

          <SectionLabel>Arrow & Trigger</SectionLabel>
          <div className="demo-row">
            <Tooltip content="With arrow" placement="top" arrow>
              <Button variant="outline" size="sm">Arrow: On</Button>
            </Tooltip>
            <Tooltip content="No arrow" placement="top" arrow={false}>
              <Button variant="outline" size="sm">Arrow: Off</Button>
            </Tooltip>
            <Tooltip content="Click to show this tooltip!" placement="top" trigger="click">
              <Button variant="accent" size="sm">Click Trigger</Button>
            </Tooltip>
          </div>

          <SectionLabel>Rich Content</SectionLabel>
          <div className="demo-row">
            <Tooltip
              content={
                <div style={{ maxWidth: 200 }}>
                  <strong style={{ display: 'block', marginBottom: 4 }}>Rich Tooltip</strong>
                  <span style={{ fontSize: 11, opacity: 0.7 }}>Tooltips can contain any React node including formatted text.</span>
                </div>
              }
              placement="top"
            >
              <Button variant="outline" size="sm">Rich Content</Button>
            </Tooltip>
            <Tooltip content="Disabled tooltip won't show" placement="top" disabled>
              <Button variant="ghost" size="sm">Disabled</Button>
            </Tooltip>
          </div>

          <div className="code-block">
{`<Tooltip content="Hello!" placement="top" trigger="hover">
  <Button>Hover me</Button>
</Tooltip>
<Tooltip content={<RichContent />} trigger="click">
  <Button>Click me</Button>
</Tooltip>`}
          </div>
        </div>

        {/* ── Modal ───────────────────────────── */}
        <div className="demo-card">
          <h3 className="demo-card-title">Modal</h3>
          <p className="demo-card-desc">Glass overlay dialogs with three sizes, animations, and keyboard support</p>

          <SectionLabel>Quick Open</SectionLabel>
          <div className="demo-row">
            <Button variant="outline" size="sm" onClick={() => { setModalSize('sm'); setModalOpen(true); }}>
              Small
            </Button>
            <Button variant="solid" size="sm" onClick={() => { setModalSize('md'); setModalOpen(true); }}>
              Medium
            </Button>
            <Button variant="outline" size="sm" onClick={() => { setModalSize('lg'); setModalOpen(true); }}>
              Large
            </Button>
          </div>

          <Modal open={modalOpen} onClose={() => setModalOpen(false)} size={modalSize}>
            <ModalHeader showClose>
              <h3 style={{ fontSize: 18, fontWeight: 600 }}>
                Glass Modal ({modalSize.toUpperCase()})
              </h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>
                This is a {modalSize === 'sm' ? 'compact' : modalSize === 'md' ? 'standard' : 'wide'} modal with glass effects
              </p>
            </ModalHeader>
            <ModalBody>
              <Stack direction="vertical" gap="sm">
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
                  The modal supports keyboard navigation (ESC to close), focus trapping,
                  and smooth entry animations. Try the EY theme toggle to see it adapt!
                </p>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                  Features: closeOnOverlay, closeOnEsc, intensity control, custom bgColor, portal target
                </div>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button variant="solid" size="sm" onClick={() => setModalOpen(false)}>Confirm</Button>
            </ModalFooter>
          </Modal>

          <SectionLabel>Interactive Playground</SectionLabel>
          <Stack direction="horizontal" gap="md" className="playground-row" style={{ alignItems: 'start' }}>
            <div className="playground-controls" style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: 16, minWidth: 200,
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Controls</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {(['sm', 'md', 'lg'] as const).map(s => (
                  <button key={s} onClick={() => setPgModalSize(s)} style={{
                    padding: '3px 8px', borderRadius: 5, fontSize: 10, fontWeight: 600, cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: pgModalSize === s ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
                    color: pgModalSize === s ? '#fff' : 'rgba(255,255,255,0.5)',
                  }}>{s}</button>
                ))}
              </div>
              <Toggle checked={pgModalCloseOverlay} onChange={setPgModalCloseOverlay} size="sm" label="closeOnOverlay" />
              <Toggle checked={pgModalCloseEsc} onChange={setPgModalCloseEsc} size="sm" label="closeOnEsc" />
              <Button size="sm" variant="accent" onClick={() => setPgModalOpen(true)} style={{ marginTop: 4 }}>
                Open Modal
              </Button>
            </div>
            <div className="playground-preview" style={{ flex: 1 }}>
              <div className="code-block" style={{ marginTop: 0 }}>
{`<Modal open={open} onClose={onClose}
  size="${pgModalSize}"
  closeOnOverlay={${pgModalCloseOverlay}}
  closeOnEsc={${pgModalCloseEsc}}>
  <ModalHeader showClose>Title</ModalHeader>
  <ModalBody>Content</ModalBody>
  <ModalFooter>
    <Button onClick={onClose}>OK</Button>
  </ModalFooter>
</Modal>`}
              </div>
            </div>
          </Stack>

          <Modal
            open={pgModalOpen}
            onClose={() => setPgModalOpen(false)}
            size={pgModalSize}
            closeOnOverlay={pgModalCloseOverlay}
            closeOnEsc={pgModalCloseEsc}
          >
            <ModalHeader showClose>
              <h3 style={{ fontSize: 18, fontWeight: 600 }}>Playground Modal ({pgModalSize.toUpperCase()})</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>
                closeOnOverlay: {String(pgModalCloseOverlay)} · closeOnEsc: {String(pgModalCloseEsc)}
              </p>
            </ModalHeader>
            <ModalBody>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
                This modal was opened from the interactive playground.
                Adjust the controls and open again to see different configurations!
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" size="sm" onClick={() => setPgModalOpen(false)}>Close</Button>
              <Button variant="solid" size="sm" onClick={() => setPgModalOpen(false)}>Confirm</Button>
            </ModalFooter>
          </Modal>
        </div>

        {/* ── Dropdown ────────────────────────── */}
        <div className="demo-card">
          <h3 className="demo-card-title">Dropdown</h3>
          <p className="demo-card-desc">Glass dropdown menus with groups, shortcuts, active states, danger items, and keyboard navigation</p>

          <SectionLabel>Full Featured</SectionLabel>
          <div className="demo-row">
            <Dropdown>
              <DropdownTrigger>Options</DropdownTrigger>
              <DropdownMenu>
                <DropdownGroup label="File">
                  <DropdownItem icon={<span>📄</span>} shortcut="⌘N">New File</DropdownItem>
                  <DropdownItem icon={<span>📂</span>} shortcut="⌘O">Open Project</DropdownItem>
                  <DropdownItem icon={<span>💾</span>} shortcut="⌘S">Save All</DropdownItem>
                </DropdownGroup>
                <DropdownDivider />
                <DropdownGroup label="View">
                  <DropdownItem active>Grid View</DropdownItem>
                  <DropdownItem>List View</DropdownItem>
                </DropdownGroup>
                <DropdownDivider />
                <DropdownItem disabled>Disabled Item</DropdownItem>
                <DropdownItem icon={<span>⚙️</span>}>Settings</DropdownItem>
                <DropdownItem danger icon={<span>🗑️</span>}>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown placement="bottom-end">
              <DropdownTrigger>Edit</DropdownTrigger>
              <DropdownMenu>
                <DropdownItem shortcut="⌘Z">Undo</DropdownItem>
                <DropdownItem shortcut="⌘⇧Z">Redo</DropdownItem>
                <DropdownDivider />
                <DropdownItem shortcut="⌘X">Cut</DropdownItem>
                <DropdownItem shortcut="⌘C">Copy</DropdownItem>
                <DropdownItem shortcut="⌘V">Paste</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>Sort By</DropdownTrigger>
              <DropdownMenu>
                <DropdownItem active>Date</DropdownItem>
                <DropdownItem>Name</DropdownItem>
                <DropdownItem>Size</DropdownItem>
                <DropdownItem>Type</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <SectionLabel>Placements & Sizes</SectionLabel>
          <div className="demo-row">
            <Dropdown placement="bottom-start" size="sm">
              <DropdownTrigger>Small (bottom-start)</DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Item 1</DropdownItem>
                <DropdownItem>Item 2</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-end" size="lg">
              <DropdownTrigger>Large (bottom-end)</DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Item 1</DropdownItem>
                <DropdownItem>Item 2</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="code-block">
{`<Dropdown placement="bottom-start" size="md">
  <DropdownTrigger>Options</DropdownTrigger>
  <DropdownMenu>
    <DropdownGroup label="File">
      <DropdownItem icon={<Icon />} shortcut="⌘N">
        New File
      </DropdownItem>
    </DropdownGroup>
    <DropdownDivider />
    <DropdownItem active>Selected</DropdownItem>
    <DropdownItem danger>Delete</DropdownItem>
  </DropdownMenu>
</Dropdown>`}
          </div>
        </div>
      </section>

      {/* ━━ LAYOUT COMPONENTS ━━━━━━━━━━━━━━━━━━━ */}
      <section id="layout" className="demo-section">
        <h2 className="section-title">Layout</h2>
        <p className="section-subtitle">Structural and glass layout primitives</p>

        {/* ── Container & Stack ───────────────── */}
        <div className="demo-card">
          <h3 className="demo-card-title">Container & Stack</h3>
          <p className="demo-card-desc">Responsive container with flexible stack layout, spacers, and wrap</p>

          <SectionLabel>Horizontal + Spacer</SectionLabel>
          <Stack direction="horizontal" gap="sm" wrap>
            <div style={{ background: 'rgba(255,255,255,0.06)', padding: '12px 20px', borderRadius: 8, fontSize: 13 }}>Item 1</div>
            <div style={{ background: 'rgba(255,255,255,0.06)', padding: '12px 20px', borderRadius: 8, fontSize: 13 }}>Item 2</div>
            <div style={{ background: 'rgba(255,255,255,0.06)', padding: '12px 20px', borderRadius: 8, fontSize: 13 }}>Item 3</div>
            <Spacer />
            <div style={{ background: 'rgba(255,255,255,0.06)', padding: '12px 20px', borderRadius: 8, fontSize: 13 }}>Pushed Right</div>
          </Stack>

          <SectionLabel>Vertical + Alignment</SectionLabel>
          <Stack direction="vertical" gap="sm">
            <Stack direction="horizontal" gap="sm" align="center">
              <Badge>React</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="ghost">Glass UI</Badge>
              <Spacer />
              <Button size="sm" variant="ghost">Action</Button>
            </Stack>
          </Stack>

          <div className="code-block">
{`<Stack direction="horizontal" gap="sm" wrap>
  <Item /><Item />
  <Spacer />
  <Item />
</Stack>`}
          </div>
        </div>

        {/* ── Divider ─────────────────────────── */}
        <div className="demo-card">
          <h3 className="demo-card-title">Divider</h3>
          <p className="demo-card-desc">Solid, dashed, and gradient separator variants with optional labels</p>
          <Stack direction="vertical" gap="lg">
            <div>
              <SectionLabel>Solid (default)</SectionLabel>
              <Divider />
            </div>
            <div>
              <SectionLabel>Dashed</SectionLabel>
              <Divider variant="dashed" />
            </div>
            <div>
              <SectionLabel>Gradient</SectionLabel>
              <Divider variant="gradient" />
            </div>
            <div>
              <SectionLabel>With Label</SectionLabel>
              <Stack direction="vertical" gap="md">
                <Divider label="OR" labelPosition="center" />
                <Divider label="Section" labelPosition="left" />
                <Divider label="End" labelPosition="right" />
              </Stack>
            </div>
          </Stack>
        </div>

        {/* ── AspectRatio ─────────────────────── */}
        <div className="demo-card">
          <h3 className="demo-card-title">AspectRatio</h3>
          <p className="demo-card-desc">Maintain consistent aspect ratios for media, video, avatars, and more</p>

          <SectionLabel>Ratio Variants</SectionLabel>
          <div className="demo-row" style={{ alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 200 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>16:9 (Video)</span>
              <AspectRatio ratio={16 / 9} maxWidth="200px">
                <div style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(16px)', borderRadius: 12,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
                }}>
                  <span style={{ fontSize: 20, fontWeight: 700 }}>16:9</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>56.25%</span>
                </div>
              </AspectRatio>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 180 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>4:3 (Photo)</span>
              <AspectRatio ratio={4 / 3} maxWidth="180px">
                <div style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(16px)', borderRadius: 12,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
                }}>
                  <span style={{ fontSize: 20, fontWeight: 700 }}>4:3</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>75%</span>
                </div>
              </AspectRatio>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 120 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>1:1 (Square)</span>
              <AspectRatio ratio={1} maxWidth="120px">
                <div style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(16px)', borderRadius: 12,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
                }}>
                  <span style={{ fontSize: 20, fontWeight: 700 }}>1:1</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>100%</span>
                </div>
              </AspectRatio>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 70 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>9:16 (Story)</span>
              <AspectRatio ratio={9 / 16} maxWidth="70px">
                <div style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(16px)', borderRadius: 12,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
                }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>9:16</span>
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>177.8%</span>
                </div>
              </AspectRatio>
            </div>
          </div>

          <SectionLabel>Use Cases</SectionLabel>
          <div className="demo-row" style={{ alignItems: 'start' }}>
            {/* Video embed */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 300 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>Video Embed (16:9)</span>
              <AspectRatio ratio={16 / 9} maxWidth="300px">
                <div style={{
                  background: 'rgba(0,0,0,0.4)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, cursor: 'pointer', backdropFilter: 'blur(12px)',
                  }}>
                    ▶
                  </div>
                </div>
              </AspectRatio>
            </div>

            {/* Image thumbnail */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 180 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>Image (4:3)</span>
              <AspectRatio ratio={4 / 3} maxWidth="180px">
                <div style={{
                  background: 'linear-gradient(135deg, rgba(140,130,255,0.15), rgba(60,120,200,0.2))',
                  borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}>
                  <span style={{ fontSize: 28, opacity: 0.5 }}>🏞️</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Image placeholder</span>
                </div>
              </AspectRatio>
            </div>

            {/* Avatar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 90 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>Avatar (1:1)</span>
              <AspectRatio ratio={1} maxWidth="90px">
                <div style={{
                  background: 'linear-gradient(135deg, rgba(140,130,255,0.2), rgba(100,80,200,0.3))',
                  borderRadius: '50%', border: '2px solid rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 32,
                }}>
                  👤
                </div>
              </AspectRatio>
            </div>
          </div>

          {/* Wide banner */}
          <div style={{ marginTop: 16 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Map / Wide Banner (21:9)</span>
            <AspectRatio ratio={21 / 9} maxWidth="560px">
              <div style={{
                background: `
                  linear-gradient(rgba(30,25,55,0.3), rgba(30,25,55,0.3)),
                  repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.03) 30px, rgba(255,255,255,0.03) 31px),
                  repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,255,255,0.03) 30px, rgba(255,255,255,0.03) 31px)
                `,
                borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, color: 'rgba(255,255,255,0.4)',
              }}>
                📍 Map area · 21:9 ultra-wide
              </div>
            </AspectRatio>
          </div>

          <SectionLabel>Interactive Playground</SectionLabel>
          <Stack direction="horizontal" gap="md" style={{ alignItems: 'start' }}>
            {/* Controls */}
            <div style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: 16, minWidth: 200,
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Adjust Ratio</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', width: 20 }}>W</label>
                <input
                  type="range" min={1} max={21} value={aspectW}
                  onChange={(e) => setAspectW(Number(e.target.value))}
                  style={{ flex: 1, accentColor: theme === 'ey' ? '#FFE600' : '#a78bfa' }}
                />
                <span style={{ fontSize: 13, fontWeight: 700, width: 24, textAlign: 'right' }}>{aspectW}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', width: 20 }}>H</label>
                <input
                  type="range" min={1} max={21} value={aspectH}
                  onChange={(e) => setAspectH(Number(e.target.value))}
                  style={{ flex: 1, accentColor: theme === 'ey' ? '#FFE600' : '#a78bfa' }}
                />
                <span style={{ fontSize: 13, fontWeight: 700, width: 24, textAlign: 'right' }}>{aspectH}</span>
              </div>

              {/* Presets */}
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>Presets</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {[
                  { label: '16:9', w: 16, h: 9 },
                  { label: '4:3', w: 4, h: 3 },
                  { label: '1:1', w: 1, h: 1 },
                  { label: '9:16', w: 9, h: 16 },
                  { label: '21:9', w: 21, h: 9 },
                ].map((p) => (
                  <button
                    key={p.label}
                    onClick={() => { setAspectW(p.w); setAspectH(p.h); }}
                    style={{
                      padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                      cursor: 'pointer', border: '1px solid rgba(255,255,255,0.12)',
                      background: aspectW === p.w && aspectH === p.h ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                      color: aspectW === p.w && aspectH === p.h ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div style={{
                marginTop: 8, padding: '8px 12px', borderRadius: 8,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 11,
                color: 'rgba(255,255,255,0.5)',
              }}>
                ratio={`{${aspectW} / ${aspectH}}`} → {((1 / (aspectW / aspectH)) * 100).toFixed(2)}%
              </div>
            </div>

            {/* Live preview */}
            <div style={{ flex: 1, maxWidth: 360 }}>
              <AspectRatio ratio={aspectW / aspectH} maxWidth="360px">
                <div style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(16px)', borderRadius: 12,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}>
                  <span style={{ fontSize: 28, fontWeight: 800 }}>{aspectW}:{aspectH}</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                    padding-top: {((1 / (aspectW / aspectH)) * 100).toFixed(2)}%
                  </span>
                </div>
              </AspectRatio>
            </div>
          </Stack>

          <div className="code-block">
{`<AspectRatio ratio={${aspectW} / ${aspectH}} maxWidth="400px">
  <img src="thumbnail.jpg" alt="Media" />
</AspectRatio>`}
          </div>
        </div>

        {/* ── Panel ───────────────────────────── */}
        <div className="demo-card">
          <h3 className="demo-card-title">Panel</h3>
          <p className="demo-card-desc">Glass panels with variants, header actions, scrollable body, and footer alignment</p>

          <SectionLabel>Variants</SectionLabel>
          <Stack direction="horizontal" gap="md" style={{ alignItems: 'stretch' }}>
            <Panel style={{ flex: 1 }}>
              <PanelHeader actions={<Badge size="sm" status="success">3 items</Badge>}>
                <strong style={{ fontSize: 15 }}>Default Panel</strong>
              </PanelHeader>
              <PanelBody>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                  Glass effect panel with backdrop blur and subtle borders.
                </p>
              </PanelBody>
              <PanelFooter>
                <Button size="sm" variant="ghost">Cancel</Button>
                <Button size="sm" variant="solid">Save</Button>
              </PanelFooter>
            </Panel>
            <Panel variant="flat" style={{ flex: 1 }}>
              <PanelHeader actions={<Badge size="sm" variant="outline">Flat</Badge>}>
                <strong style={{ fontSize: 15 }}>Flat Panel</strong>
              </PanelHeader>
              <PanelBody>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                  Minimal variant without blur, good for nested content.
                </p>
              </PanelBody>
            </Panel>
          </Stack>

          <SectionLabel>Scrollable Body</SectionLabel>
          <Panel style={{ maxHeight: 200 }}>
            <PanelHeader>
              <strong style={{ fontSize: 14 }}>Scroll Demo</strong>
            </PanelHeader>
            <PanelBody scroll>
              <Stack direction="vertical" gap="sm">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    Scrollable item #{i + 1} — Panel body with scroll overflow enabled
                  </div>
                ))}
              </Stack>
            </PanelBody>
          </Panel>

          <div className="code-block">
{`<Panel variant="default" size="md">
  <PanelHeader actions={<Badge>3</Badge>}>
    Title
  </PanelHeader>
  <PanelBody scroll>Scrollable content</PanelBody>
  <PanelFooter align="right">
    <Button>Save</Button>
  </PanelFooter>
</Panel>`}
          </div>
        </div>
      </section>

      {/* ━━ DASHBOARD DEMO ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="dashboard" className="demo-section">
        <h2 className="section-title">Dashboard Layout</h2>
        <p className="section-subtitle">AppBar + Sidebar + Panel composing a full application layout</p>

        <div style={{ marginBottom: 16, textAlign: 'center' }}>
          <Button
            variant="accent"
            size="sm"
            glow
            onClick={() => { window.location.hash = '#/dashboard'; }}
          >
            Open Standalone Dashboard →
          </Button>
        </div>

        <div className="dashboard-container" style={{
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          overflow: 'hidden',
          height: 520,
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(0,0,0,0.2)',
        }}>
          {/* AppBar */}
          <AppBar
            position="static"
            size="compact"
            leading={
              <Stack direction="horizontal" gap="sm" align="center">
                <span style={{ fontSize: 16 }}>💎</span>
                <strong style={{ fontSize: 14 }}>Dashboard</strong>
              </Stack>
            }
            trailing={
              <Stack direction="horizontal" gap="sm" align="center">
                <Input placeholder="Search..." size="sm" className="dashboard-appbar-search" style={{ width: 180 }} />
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12,
                }}>
                  J
                </div>
              </Stack>
            }
          />

          <div className="dashboard-body" style={{ display: 'flex', flex: 1, minHeight: 0 }}>
            {/* Sidebar */}
            <Sidebar collapsed={sidebarCollapsed} collapsedWidth="52px" width="200px">
              <SidebarSection title="Menu">
                <SidebarItem
                  icon="📊"
                  active={activeNav === 'dashboard'}
                  onClick={() => setActiveNav('dashboard')}
                >
                  Dashboard
                </SidebarItem>
                <SidebarItem
                  icon="👥"
                  active={activeNav === 'users'}
                  onClick={() => setActiveNav('users')}
                >
                  Users
                </SidebarItem>
                <SidebarItem
                  icon="📦"
                  active={activeNav === 'products'}
                  onClick={() => setActiveNav('products')}
                >
                  Products
                </SidebarItem>
                <SidebarItem
                  icon="📈"
                  active={activeNav === 'analytics'}
                  onClick={() => setActiveNav('analytics')}
                  badge="New"
                >
                  Analytics
                </SidebarItem>
              </SidebarSection>
              <SidebarSection title="Settings">
                <SidebarItem icon="⚙️">Settings</SidebarItem>
              </SidebarSection>
            </Sidebar>

            {/* Main content */}
            <div className="dashboard-main" style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Stack direction="horizontal" gap="sm" align="center">
                <Button size="sm" variant="ghost" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                  {sidebarCollapsed ? '☰ Expand' : '☰ Collapse'}
                </Button>
                <Spacer />
                <Badge variant="ghost" status="success" dot>Online</Badge>
              </Stack>

              <Stack direction="horizontal" gap="sm" wrap style={{ flex: 1, minHeight: 0 }} className="dashboard-panels">
                <Panel fill style={{ flex: 2 }}>
                  <PanelHeader>
                    <strong style={{ fontSize: 14 }}>Overview</strong>
                  </PanelHeader>
                  <PanelBody>
                    <Stack direction="horizontal" gap="sm" wrap>
                      {[
                        { label: 'Users', value: '12,489', change: '+12%' },
                        { label: 'Revenue', value: '$48.2K', change: '+8%' },
                        { label: 'Orders', value: '1,249', change: '+24%' },
                      ].map((stat) => (
                        <Card key={stat.label} size="sm" style={{ flex: 1, minWidth: 100 }}>
                          <CardBody>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
                            <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>{stat.value}</div>
                            <Badge size="sm" status="success" variant="ghost" style={{ marginTop: 6 }}>
                              {stat.change}
                            </Badge>
                          </CardBody>
                        </Card>
                      ))}
                    </Stack>
                  </PanelBody>
                </Panel>
                <Panel fill style={{ flex: 1 }}>
                  <PanelHeader>
                    <strong style={{ fontSize: 14 }}>Activity</strong>
                  </PanelHeader>
                  <PanelBody scroll>
                    <Stack direction="vertical" gap="sm">
                      {['New user registered', 'Order #1249 completed', 'Payment received', 'Report generated', 'User feedback received'].map(
                        (item, i) => (
                          <div key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            {item}
                          </div>
                        ),
                      )}
                    </Stack>
                  </PanelBody>
                </Panel>
              </Stack>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ INSTALLATION ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="install" className="demo-section" style={{ paddingBottom: 120 }}>
        <h2 className="section-title">Quick Start</h2>
        <p className="section-subtitle">Get up and running in under a minute</p>

        <Stack direction="vertical" gap="md" style={{ maxWidth: 600 }}>
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>1. Install</h4>
            <div className="code-block">npm install @_jinu/liquid-glass-ui</div>
          </div>
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>2. Import styles</h4>
            <div className="code-block">
{`import '@_jinu/liquid-glass-ui/dist/style.css';

// Optional: EY theme
import '@_jinu/liquid-glass-ui/themes/ey.css';`}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>3. Use components</h4>
            <div className="code-block">
{`import { Button, Card, Modal, ThemeProvider } from '@_jinu/liquid-glass-ui';

function App() {
  return (
    <ThemeProvider theme="ey">
      <Button variant="solid">Hello Glass!</Button>
    </ThemeProvider>
  );
}`}
            </div>
          </div>
        </Stack>
      </section>

      {/* ━━ FOOTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer style={{
        textAlign: 'center',
        padding: '32px 24px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        color: 'rgba(255,255,255,0.3)',
        fontSize: 13,
      }}>
        <p>Liquid Glass UI — Built by Jinu</p>
        <p style={{ marginTop: 4 }}>MIT License · npm: @_jinu/liquid-glass-ui</p>
      </footer>
    </ThemeProvider>
  );
}
