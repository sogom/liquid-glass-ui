# Liquid Glass UI

Apple Liquid Glass에서 영감받은 React UI 컴포넌트 라이브러리입니다.
Glassmorphism 효과(backdrop blur, 반투명 배경, 유리 광택, 글로우)를 간단한 React 컴포넌트로 제공합니다.

[![npm](https://img.shields.io/npm/v/@_jinu/liquid-glass-ui)](https://www.npmjs.com/package/@_jinu/liquid-glass-ui)
[![license](https://img.shields.io/npm/l/@_jinu/liquid-glass-ui)](LICENSE)

**[라이브 데모](https://sogom.github.io/liquid-glass-ui/)** · **[대시보드 데모](https://sogom.github.io/liquid-glass-ui/#/dashboard)**

## 설치

```bash
npm install @_jinu/liquid-glass-ui
```

## 빠른 시작

```tsx
// 1. 스타일 임포트
import '@_jinu/liquid-glass-ui/style.css';

// 2. (선택) 테마 임포트
import '@_jinu/liquid-glass-ui/themes/ey.css';    // EY 다크 테마
import '@_jinu/liquid-glass-ui/themes/light.css';  // 라이트 테마

// 3. 컴포넌트 사용
import { Button, Card, Modal, ThemeProvider } from '@_jinu/liquid-glass-ui';

function App() {
  return (
    <ThemeProvider theme="default">
      <Button variant="accent" glow>Hello Glass!</Button>
    </ThemeProvider>
  );
}
```

## 컴포넌트

### Button

```tsx
import { Button } from '@_jinu/liquid-glass-ui';

<Button variant="accent" size="md" glow glowIntensity={0.8}>
  Click me
</Button>
```

**Props**: `variant` (solid / outline / ghost / accent), `size` (sm / md / lg), `shape` (rounded / pill), `loading`, `glow`, `glowIntensity` (0–1), `leftIcon`, `rightIcon`, `disabled`

### Input

```tsx
import { Input } from '@_jinu/liquid-glass-ui';

<Input label="Email" placeholder="you@example.com" variant="solid" />
<Input state="error" errorMessage="필수 입력 항목입니다" />
<Input leftIcon={<SearchIcon />} numeric />
```

**Props**: `variant` (solid / outline / ghost), `size` (sm / md / lg), `state` (default / error / success), `label`, `hint`, `errorMessage`, `successMessage`, `leftIcon`, `rightIcon`, `numeric`

### Badge

```tsx
import { Badge } from '@_jinu/liquid-glass-ui';

<Badge status="success" dot pulse>Active</Badge>
<Badge variant="accent" glow glowIntensity={0.6} interactive>Glowing</Badge>
```

**Props**: `variant` (solid / outline / ghost / accent), `size` (sm / md / lg), `shape` (rounded / pill), `status` (default / info / success / warning / error), `dot`, `pulse`, `glow`, `glowIntensity` (0–1), `closable`, `onClose`, `interactive`, `leftIcon`

### Toggle

```tsx
import { Toggle } from '@_jinu/liquid-glass-ui';

<Toggle checked={on} onChange={setOn} label="다크 모드" size="md" />
```

**Props**: `checked`, `defaultChecked`, `onChange`, `size` (sm / md / lg), `label`, `labelPosition` (left / right), `color`, `disabled`

### Tabs

Compound Component 패턴으로 구성됩니다.

```tsx
import { Tabs, TabList, Tab, TabPanel } from '@_jinu/liquid-glass-ui';

<Tabs defaultValue="tab1" variant="pill" size="md">
  <TabList>
    <Tab value="tab1">Overview</Tab>
    <Tab value="tab2">Features</Tab>
    <Tab value="tab3" disabled>Disabled</Tab>
  </TabList>
  <TabPanel value="tab1">첫 번째 탭 내용</TabPanel>
  <TabPanel value="tab2">두 번째 탭 내용</TabPanel>
</Tabs>
```

**Props**: `value`, `defaultValue`, `onChange`, `variant` (solid / outline / pill), `size` (sm / md / lg), `intensity`

### Card

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@_jinu/liquid-glass-ui';

<Card variant="solid" hoverable glow glowIntensity={0.7}>
  <CardHeader>제목</CardHeader>
  <CardBody>카드 내용</CardBody>
  <CardFooter>
    <Button variant="accent">확인</Button>
  </CardFooter>
</Card>
```

**Props**: `variant` (solid / outline / ghost), `size` (sm / md / lg), `hoverable`, `glow`, `glowIntensity` (0–1), `intensity`, `color`

### Tooltip

```tsx
import { Tooltip } from '@_jinu/liquid-glass-ui';

<Tooltip content="도움말 텍스트" placement="top" arrow>
  <button>마우스를 올려보세요</button>
</Tooltip>
```

**Props**: `content`, `placement` (top / bottom / left / right), `trigger` (hover / click), `arrow`, `delay`, `closeDelay`, `disabled`, `intensity`

### Modal

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@_jinu/liquid-glass-ui';

<Modal open={open} onClose={() => setOpen(false)} size="md">
  <ModalHeader showClose>제목</ModalHeader>
  <ModalBody>모달 내용</ModalBody>
  <ModalFooter>
    <Button onClick={() => setOpen(false)}>확인</Button>
  </ModalFooter>
</Modal>
```

**Props**: `open`, `onClose`, `size` (sm / md / lg), `closeOnOverlay`, `closeOnEsc`, `bgColor`, `intensity`

### Dropdown

```tsx
import {
  Dropdown, DropdownTrigger, DropdownMenu,
  DropdownItem, DropdownDivider, DropdownGroup,
} from '@_jinu/liquid-glass-ui';

<Dropdown placement="bottom-start" size="md">
  <DropdownTrigger>옵션</DropdownTrigger>
  <DropdownMenu>
    <DropdownGroup label="파일">
      <DropdownItem icon={<FileIcon />} shortcut="⌘N">새 파일</DropdownItem>
    </DropdownGroup>
    <DropdownDivider />
    <DropdownItem active>선택된 항목</DropdownItem>
    <DropdownItem danger>삭제</DropdownItem>
  </DropdownMenu>
</Dropdown>
```

**Dropdown Props**: `placement` (bottom-start / bottom-end / top-start / top-end), `size` (sm / md / lg), `disabled`

**DropdownItem Props**: `icon`, `shortcut`, `active`, `disabled`, `danger`, `onSelect`

## 레이아웃 컴포넌트

### Container & Stack

```tsx
import { Container } from '@_jinu/liquid-glass-ui';
import { Stack, Spacer } from '@_jinu/liquid-glass-ui';

<Container maxWidth="lg" padding="md">
  <Stack direction="horizontal" gap="sm" wrap align="center">
    <div>아이템 1</div>
    <div>아이템 2</div>
    <Spacer />
    <div>오른쪽으로 밀림</div>
  </Stack>
</Container>
```

**Stack Props**: `direction` (horizontal / vertical), `gap` (xs / sm / md / lg / xl), `wrap`, `align`, `justify`

### Divider

```tsx
import { Divider } from '@_jinu/liquid-glass-ui';

<Divider variant="solid" />
<Divider variant="dashed" />
<Divider variant="gradient" label="또는" labelPosition="center" />
```

**Props**: `variant` (solid / dashed / gradient), `label`, `labelPosition` (left / center / right)

### AspectRatio

```tsx
import { AspectRatio } from '@_jinu/liquid-glass-ui';

<AspectRatio ratio={16 / 9} maxWidth="400px">
  <img src="thumbnail.jpg" alt="비디오" />
</AspectRatio>
```

**Props**: `ratio`, `maxWidth`

### AppBar

```tsx
import { AppBar } from '@_jinu/liquid-glass-ui';

<AppBar
  position="fixed"
  size="compact"
  leading={<Logo />}
  trailing={<Avatar />}
/>
```

**Props**: `position` (fixed / sticky / static), `size` (compact / default), `leading`, `trailing`, `intensity`

### Sidebar

```tsx
import { Sidebar, SidebarSection, SidebarItem } from '@_jinu/liquid-glass-ui';

<Sidebar collapsed={false} width="220px" collapsedWidth="60px">
  <SidebarSection title="메뉴">
    <SidebarItem icon="📊" active>대시보드</SidebarItem>
    <SidebarItem icon="👥" badge="New">사용자</SidebarItem>
  </SidebarSection>
</Sidebar>
```

**Props**: `collapsed`, `width`, `collapsedWidth`

**SidebarItem Props**: `icon`, `active`, `badge`, `onClick`

### Panel

```tsx
import { Panel, PanelHeader, PanelBody, PanelFooter } from '@_jinu/liquid-glass-ui';

<Panel variant="default" fill>
  <PanelHeader actions={<Badge>3</Badge>}>제목</PanelHeader>
  <PanelBody scroll>스크롤 가능한 내용</PanelBody>
  <PanelFooter>
    <Button>저장</Button>
  </PanelFooter>
</Panel>
```

**Props**: `variant` (default / flat), `size` (sm / md / lg), `fill`

## 테마

```tsx
import { ThemeProvider } from '@_jinu/liquid-glass-ui';

// 다크 테마 (EY 브랜드)
import '@_jinu/liquid-glass-ui/themes/ey.css';
<ThemeProvider theme="ey">
  <App />
</ThemeProvider>

// 라이트 테마 (AG Grid alpine 등 라이트 UI와 호환)
import '@_jinu/liquid-glass-ui/themes/light.css';
<ThemeProvider theme="light">
  <App />
</ThemeProvider>
```

사용 가능한 테마: `default` (다크 퍼플), `ey` (다크 옐로), `light` (라이트)

## 주요 특징

- React 18 / 19 지원
- TypeScript 완벽 지원 (타입 선언 포함)
- CSS Modules 기반 스타일링 (전역 스타일 오염 없음)
- 접근성 지원 (ARIA roles, 키보드 네비게이션, 포커스 관리)
- Controlled / Uncontrolled 패턴 지원
- Tree-shaking 지원
- forwardRef 지원
- Glow 강도 조절 (0–1) — Button, Badge, Card
- 테마 시스템 (EY 다크, Light 테마 내장)
- UI, 레이아웃, 네비게이션을 포함한 18개 컴포넌트

## 라이선스

MIT
