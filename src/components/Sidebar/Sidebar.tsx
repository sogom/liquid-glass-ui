import React, { forwardRef, createContext, useContext } from 'react';
import styles from './Sidebar.module.css';

/* ── Context ───────────────────────────────────── */
interface SidebarCtx {
  collapsed: boolean;
}

const SidebarContext = createContext<SidebarCtx>({ collapsed: false });
const useSidebar = () => useContext(SidebarContext);

/* ── Types ─────────────────────────────────────── */
export type SidebarPosition = 'left' | 'right';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Collapsed (icon-only) mode */
  collapsed?: boolean;
  /** Sidebar width (CSS value) */
  width?: string;
  /** Collapsed width (CSS value) */
  collapsedWidth?: string;
  /** Position */
  position?: SidebarPosition;
  /** Render element */
  as?: React.ElementType;
}

export interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section title — hidden when collapsed */
  title?: string;
}

export interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Leading icon */
  icon?: React.ReactNode;
  /** Trailing badge / count */
  badge?: React.ReactNode;
  /** Active / selected state */
  active?: boolean;
  /** Disabled */
  disabled?: boolean;
}

/* ── Sidebar ───────────────────────────────────── */
export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      collapsed = false,
      width = '260px',
      collapsedWidth = '64px',
      position = 'left',
      as: Tag = 'aside',
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const cls = [
      styles.sidebar,
      collapsed && styles.collapsed,
      styles[`position-${position}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <SidebarContext.Provider value={{ collapsed }}>
        <Tag
          ref={ref}
          className={cls}
          style={{
            '--sidebar-width': width,
            '--sidebar-collapsed-width': collapsedWidth,
            ...style,
          } as React.CSSProperties}
          {...rest}
        >
          <span className={styles.glassShine} aria-hidden />
          <span className={styles.glassEdge} aria-hidden />
          <div className={styles.inner}>{children}</div>
        </Tag>
      </SidebarContext.Provider>
    );
  },
);

Sidebar.displayName = 'Sidebar';

/* ── SidebarSection ────────────────────────────── */
export const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ title, className, children, ...rest }, ref) => {
    const { collapsed } = useSidebar();

    return (
      <div
        ref={ref}
        className={[styles.section, className].filter(Boolean).join(' ')}
        {...rest}
      >
        {title && !collapsed && (
          <span className={styles.sectionTitle}>{title}</span>
        )}
        {children}
      </div>
    );
  },
);

SidebarSection.displayName = 'SidebarSection';

/* ── SidebarItem ───────────────────────────────── */
export const SidebarItem = forwardRef<HTMLDivElement, SidebarItemProps>(
  ({ icon, badge, active, disabled, className, children, onClick, ...rest }, ref) => {
    const { collapsed } = useSidebar();

    const cls = [
      styles.item,
      active && styles.active,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={cls}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        aria-current={active ? 'page' : undefined}
        onClick={disabled ? undefined : onClick}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }}
        {...rest}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        {!collapsed && <span className={styles.label}>{children}</span>}
        {!collapsed && badge && <span className={styles.badge}>{badge}</span>}
      </div>
    );
  },
);

SidebarItem.displayName = 'SidebarItem';
