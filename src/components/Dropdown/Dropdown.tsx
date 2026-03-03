import React from 'react';
import styles from './Dropdown.module.css';

// ── 타입 정의 ────────────────────────────────────
export type DropdownSize = 'sm' | 'md' | 'lg';
export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

export interface DropdownProps {
  children: React.ReactNode;
  /** 열림 상태 (controlled) */
  open?: boolean;
  /** 기본 열림 상태 (uncontrolled) */
  defaultOpen?: boolean;
  /** 열림 상태 변경 콜백 */
  onOpenChange?: (open: boolean) => void;
  /** 드롭다운 메뉴 사이즈 */
  size?: DropdownSize;
  /** 드롭다운 메뉴 위치 */
  placement?: DropdownPlacement;
  /** 비활성화 */
  disabled?: boolean;
}

export interface DropdownTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** 화살표 표시 여부 */
  showChevron?: boolean;
}

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** 글래스 효과 강도 (0~2) */
  intensity?: number;
}

export interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** 아이콘 (왼쪽) */
  icon?: React.ReactNode;
  /** 단축키 표시 (오른쪽) */
  shortcut?: string;
  /** 선택됨 (체크 표시) */
  active?: boolean;
  /** 비활성화 */
  disabled?: boolean;
  /** 위험 액션 (빨간색) */
  danger?: boolean;
  /** 클릭 콜백 */
  onSelect?: () => void;
}

export interface DropdownDividerProps {
  className?: string;
}

export interface DropdownGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 그룹 라벨 */
  label: string;
  children: React.ReactNode;
}

// ── Context ──────────────────────────────────────
interface DropdownContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  size: DropdownSize;
  placement: DropdownPlacement;
  disabled: boolean;
  triggerId: string;
  menuId: string;
}

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

function useDropdown() {
  const ctx = React.useContext(DropdownContext);
  if (!ctx) throw new Error('Dropdown 하위에서만 사용할 수 있습니다.');
  return ctx;
}

// ── Dropdown (Root) ──────────────────────────────
export const Dropdown: React.FC<DropdownProps> = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  size = 'md',
  placement = 'bottom-start',
  disabled = false,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = React.useCallback(
    (v: boolean) => {
      if (disabled && v) return;
      if (!isControlled) setInternalOpen(v);
      onOpenChange?.(v);
    },
    [disabled, isControlled, onOpenChange],
  );

  // 외부 클릭 감지
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, setOpen]);

  // ESC 키
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, setOpen]);

  const triggerId = React.useId();
  const menuId = React.useId();

  return (
    <DropdownContext.Provider value={{ open, setOpen, size, placement, disabled, triggerId, menuId }}>
      <div ref={wrapperRef} className={styles.wrapper}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};
Dropdown.displayName = 'Dropdown';

// ── DropdownTrigger ──────────────────────────────
export const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ children, showChevron = true, className, onClick, ...rest }, ref) => {
    const { open, setOpen, disabled, triggerId, menuId } = useDropdown();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(!open);
      onClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(true);
      }
    };

    const classNames = [
      styles.trigger,
      open && styles.open,
      disabled && styles.disabled,
      className,
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        id={triggerId}
        className={classNames}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        {...rest}
      >
        {children}
        {showChevron && (
          <svg
            className={styles.chevron}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    );
  },
);
DropdownTrigger.displayName = 'DropdownTrigger';

// ── DropdownMenu ─────────────────────────────────
export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  intensity = 1,
  className,
  style,
  ...rest
}) => {
  const { open, size, placement, menuId, triggerId } = useDropdown();
  const menuRef = React.useRef<HTMLDivElement>(null);

  // 열릴 때 첫 번째 아이템에 포커스
  React.useEffect(() => {
    if (open && menuRef.current) {
      const firstItem = menuRef.current.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])');
      firstItem?.focus();
    }
  }, [open]);

  if (!open) return null;

  const blurValue = `${Math.round(24 * intensity)}px`;

  const customStyle: React.CSSProperties = {
    '--dropdown-blur': blurValue,
    ...style,
  } as React.CSSProperties;

  const classNames = [
    styles.menu,
    styles[`size-${size}`],
    styles[`placement-${placement}`],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={menuRef}
      id={menuId}
      className={classNames}
      style={customStyle}
      role="menu"
      aria-labelledby={triggerId}
      {...rest}
    >
      <div className={styles.glassShine} />
      <div className={styles.glassEdge} />
      {children}
    </div>
  );
};
DropdownMenu.displayName = 'DropdownMenu';

// ── DropdownItem ─────────────────────────────────
export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  icon,
  shortcut,
  active = false,
  disabled = false,
  danger = false,
  onSelect,
  className,
  onClick,
  ...rest
}) => {
  const { setOpen } = useDropdown();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    onSelect?.();
    onClick?.(e);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.();
      setOpen(false);
    }

    // 위/아래 화살표로 이동
    const menu = (e.target as HTMLElement).closest('[role="menu"]');
    if (!menu) return;
    const items = Array.from(menu.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])'));
    const idx = items.indexOf(e.target as HTMLElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[(idx + 1) % items.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[(idx - 1 + items.length) % items.length]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      items[items.length - 1]?.focus();
    }
  };

  const classNames = [
    styles.item,
    active && styles.active,
    disabled && styles.itemDisabled,
    danger && styles.danger,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{children}</span>
      {shortcut && <span className={styles.shortcut}>{shortcut}</span>}
      {active && <span className={styles.check}>✓</span>}
    </div>
  );
};
DropdownItem.displayName = 'DropdownItem';

// ── DropdownDivider ──────────────────────────────
export const DropdownDivider: React.FC<DropdownDividerProps> = ({ className }) => {
  return <div className={`${styles.divider} ${className || ''}`} role="separator" />;
};
DropdownDivider.displayName = 'DropdownDivider';

// ── DropdownGroup ────────────────────────────────
export const DropdownGroup: React.FC<DropdownGroupProps> = ({
  label,
  children,
  className,
  ...rest
}) => {
  const groupId = React.useId();
  return (
    <div className={className} role="group" aria-labelledby={groupId} {...rest}>
      <div id={groupId} className={styles.groupLabel}>{label}</div>
      {children}
    </div>
  );
};
DropdownGroup.displayName = 'DropdownGroup';
