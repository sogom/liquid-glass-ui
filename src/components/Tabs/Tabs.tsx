import React, { createContext, useContext, useState, useCallback, useId, useMemo } from 'react';
import styles from './Tabs.module.css';

// ── 타입 정의 ──────────────────────────────────
export type TabsVariant = 'solid' | 'outline' | 'pill';
export type TabsSize = 'sm' | 'md' | 'lg';

export interface TabsContextValue {
  /** 현재 활성 탭 value */
  activeValue: string;
  /** 탭 변경 핸들러 */
  setActiveValue: (value: string) => void;
  /** 스타일 variant */
  variant: TabsVariant;
  /** 사이즈 */
  size: TabsSize;
  /** 유리 효과 강도 */
  intensity: number;
  /** 기본 id prefix (접근성) */
  idPrefix: string;
}

// ── Context ────────────────────────────────────
const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error('Tabs 컴포넌트 안에서 사용해야 합니다.');
  }
  return ctx;
}

// ── Tabs (루트) ────────────────────────────────
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 기본 활성 탭 (비제어) */
  defaultValue?: string;
  /** 활성 탭 (제어) */
  value?: string;
  /** 탭 변경 콜백 */
  onValueChange?: (value: string) => void;
  /** 스타일 variant */
  variant?: TabsVariant;
  /** 사이즈 */
  size?: TabsSize;
  /** 유리 효과 강도 (0 ~ 1) */
  intensity?: number;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      defaultValue = '',
      value: controlledValue,
      onValueChange,
      variant = 'solid',
      size = 'md',
      intensity = 1,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const activeValue = isControlled ? controlledValue : internalValue;

    const setActiveValue = useCallback(
      (val: string) => {
        if (!isControlled) setInternalValue(val);
        onValueChange?.(val);
      },
      [isControlled, onValueChange]
    );

    const idPrefix = useId();

    const ctxValue = useMemo<TabsContextValue>(
      () => ({ activeValue, setActiveValue, variant, size, intensity, idPrefix }),
      [activeValue, setActiveValue, variant, size, intensity, idPrefix]
    );

    return (
      <TabsContext.Provider value={ctxValue}>
        <div
          ref={ref}
          className={`${styles.tabs} ${className ?? ''}`}
          {...rest}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = 'Tabs';

// ── TabList ────────────────────────────────────
export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>(
  ({ className, children, ...rest }, ref) => {
    const { variant, size, intensity } = useTabsContext();

    const blurValue = `${Math.round(18 * intensity)}px`;
    const customStyle = {
      '--glass-blur': blurValue,
      ...rest.style,
    } as React.CSSProperties;

    const classNames = [
      styles.tabList,
      styles[`list-variant-${variant}`],
      styles[`list-size-${size}`],
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        role="tablist"
        className={classNames}
        style={customStyle}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
TabList.displayName = 'TabList';

// ── Tab ────────────────────────────────────────
export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 탭 고유 식별값 */
  value: string;
  /** 왼쪽 아이콘 */
  leftIcon?: React.ReactNode;
  /** 오른쪽 아이콘 */
  rightIcon?: React.ReactNode;
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ value, leftIcon, rightIcon, disabled, className, children, ...rest }, ref) => {
    const { activeValue, setActiveValue, variant, size, idPrefix } = useTabsContext();
    const isActive = activeValue === value;

    const handleClick = () => {
      if (!disabled) setActiveValue(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      const tabList = e.currentTarget.parentElement;
      if (!tabList) return;

      const tabs = Array.from(
        tabList.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])')
      );
      const currentIndex = tabs.indexOf(e.currentTarget);

      let nextIndex = -1;
      if (e.key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft') {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        nextIndex = 0;
      } else if (e.key === 'End') {
        nextIndex = tabs.length - 1;
      }

      if (nextIndex >= 0) {
        e.preventDefault();
        tabs[nextIndex].focus();
        setActiveValue(tabs[nextIndex].dataset.value!);
      }
    };

    const classNames = [
      styles.tab,
      styles[`tab-variant-${variant}`],
      styles[`tab-size-${size}`],
      isActive ? styles.active : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        id={`${idPrefix}-tab-${value}`}
        aria-controls={`${idPrefix}-panel-${value}`}
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        data-value={value}
        disabled={disabled}
        className={classNames}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
        {children && <span className={styles.label}>{children}</span>}
        {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      </button>
    );
  }
);
Tab.displayName = 'Tab';

// ── TabPanel ───────────────────────────────────
export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 대응하는 Tab의 value */
  value: string;
  /** 비활성 시에도 DOM 유지 */
  keepMounted?: boolean;
  /** 패널 최소 높이 (CSS 값, e.g. 200, '50vh') */
  minHeight?: number | string;
}

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ value, keepMounted = false, minHeight, className, style, children, ...rest }, ref) => {
    const { activeValue, idPrefix } = useTabsContext();
    const isActive = activeValue === value;

    if (!isActive && !keepMounted) return null;

    const panelStyle: React.CSSProperties = {
      ...(minHeight !== undefined
        ? { minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }
        : {}),
      ...style,
    };

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`${idPrefix}-panel-${value}`}
        aria-labelledby={`${idPrefix}-tab-${value}`}
        hidden={!isActive}
        className={`${styles.tabPanel} ${isActive ? styles.panelActive : ''} ${className ?? ''}`}
        style={panelStyle}
        tabIndex={0}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
TabPanel.displayName = 'TabPanel';
