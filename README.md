# Liquid Glass UI

Apple Liquid Glass에서 영감받은 React UI 컴포넌트 라이브러리입니다.
Glassmorphism 효과(backdrop blur, 반투명 배경, 유리 광택, 글로우)를 React 컴포넌트로 제공합니다.

## Installation

```bash
npm install liquid-glass-ui
```

## Setup

CSS 파일을 프로젝트 진입점에서 import하세요:

```tsx
import 'liquid-glass-ui/dist/style.css';
```

## Components

### Button

```tsx
import { Button } from 'liquid-glass-ui';

<Button variant="accent" size="md" glow>
  Click me
</Button>
```

**Props**: `variant` (solid / outline / ghost / accent), `size` (sm / md / lg), `shape` (rounded / pill), `loading`, `glow`, `intensity`, `color`

### Input

```tsx
import { Input } from 'liquid-glass-ui';

<Input label="Email" placeholder="you@example.com" variant="solid" />
```

**Props**: `variant` (solid / outline / ghost), `size` (sm / md / lg), `state` (default / error / success), `label`, `hint`, `errorMessage`

### Badge

```tsx
import { Badge } from 'liquid-glass-ui';

<Badge status="success" dot pulse>Active</Badge>
```

**Props**: `variant` (solid / outline / ghost / accent), `size` (sm / md / lg), `shape` (rounded / pill), `status` (default / info / success / warning / error), `dot`, `pulse`, `closable`, `onClose`, `interactive`

### Tabs

Compound Component 패턴으로 구성됩니다.

```tsx
import { Tabs, TabList, Tab, TabPanel } from 'liquid-glass-ui';

<Tabs defaultValue="tab1">
  <TabList>
    <Tab value="tab1">First</Tab>
    <Tab value="tab2">Second</Tab>
  </TabList>
  <TabPanel value="tab1">First content</TabPanel>
  <TabPanel value="tab2" minHeight={200}>Second content</TabPanel>
</Tabs>
```

**Tabs Props**: `value`, `defaultValue`, `onChange`, `variant` (solid / outline / pill), `size`, `intensity`

### Toggle

```tsx
import { Toggle } from 'liquid-glass-ui';

<Toggle label="Dark mode" size="md" color="139, 92, 246" />
```

**Props**: `checked`, `defaultChecked`, `onChange`, `size` (sm / md / lg), `label`, `labelPosition` (left / right), `color`, `disabled`

### Card

```tsx
import { Card, CardHeader, CardBody, CardFooter } from 'liquid-glass-ui';

<Card variant="solid" hoverable glow>
  <CardHeader>Title</CardHeader>
  <CardBody>Content goes here</CardBody>
  <CardFooter align="right">
    <Button variant="accent">Action</Button>
  </CardFooter>
</Card>
```

**Card Props**: `variant` (solid / outline / ghost), `size` (sm / md / lg), `hoverable`, `glow`, `intensity`, `color`

### Tooltip

```tsx
import { Tooltip } from 'liquid-glass-ui';

<Tooltip content="Help text" placement="top" arrow>
  <button>Hover me</button>
</Tooltip>
```

**Props**: `content`, `placement` (top / bottom / left / right), `trigger` (hover / click), `arrow`, `delay`, `closeDelay`, `disabled`, `intensity`

### Modal

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'liquid-glass-ui';

const [open, setOpen] = useState(false);

<Modal open={open} onClose={() => setOpen(false)} size="md">
  <ModalHeader>Title</ModalHeader>
  <ModalBody>Modal content</ModalBody>
  <ModalFooter align="right">
    <Button variant="accent">Confirm</Button>
  </ModalFooter>
</Modal>
```

**Modal Props**: `open`, `onClose`, `size` (sm / md / lg), `closeOnOverlay`, `closeOnEsc`, `bgColor`, `intensity`

## Features

- React 18 / 19 지원
- TypeScript 완벽 지원 (타입 선언 포함)
- CSS Modules 기반 스타일링 (전역 스타일 오염 없음)
- 접근성 (ARIA roles, keyboard navigation, focus management)
- Controlled / Uncontrolled 패턴 지원
- Tree-shaking 지원
- forwardRef 지원

## License

MIT
