import React, { forwardRef } from 'react';
import styles from './Panel.module.css';

/* ── Types ─────────────────────────────────────── */
export type PanelVariant = 'default' | 'flat';
export type PanelSize = 'sm' | 'md' | 'lg';

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: PanelVariant;
  /** Padding size */
  size?: PanelSize;
  /** Optional fixed width (CSS value) */
  width?: string;
  /** Fill available height */
  fill?: boolean;
}

export interface PanelHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Actions slot (right side) */
  actions?: React.ReactNode;
}

export interface PanelBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Enable scroll overflow */
  scroll?: boolean;
}

export interface PanelFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alignment */
  align?: 'left' | 'center' | 'right';
}

/* ── Panel ─────────────────────────────────────── */
export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  (
    {
      variant = 'default',
      size = 'md',
      width,
      fill = false,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const cls = [
      styles.panel,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      fill && styles.fill,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={cls}
        style={{ ...(width ? { width } : {}), ...style }}
        {...rest}
      >
        {variant === 'default' && (
          <>
            <span className={styles.glassShine} aria-hidden />
            <span className={styles.glassEdge} aria-hidden />
          </>
        )}
        {children}
      </div>
    );
  },
);

Panel.displayName = 'Panel';

/* ── PanelHeader ───────────────────────────────── */
export const PanelHeader = forwardRef<HTMLDivElement, PanelHeaderProps>(
  ({ actions, className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={[styles.header, className].filter(Boolean).join(' ')}
      {...rest}
    >
      <div className={styles.headerContent}>{children}</div>
      {actions && <div className={styles.headerActions}>{actions}</div>}
    </div>
  ),
);

PanelHeader.displayName = 'PanelHeader';

/* ── PanelBody ─────────────────────────────────── */
export const PanelBody = forwardRef<HTMLDivElement, PanelBodyProps>(
  ({ scroll = false, className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={[styles.body, scroll && styles.bodyScroll, className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  ),
);

PanelBody.displayName = 'PanelBody';

/* ── PanelFooter ───────────────────────────────── */
export const PanelFooter = forwardRef<HTMLDivElement, PanelFooterProps>(
  ({ align = 'right', className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={[styles.footer, styles[`footer-${align}`], className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  ),
);

PanelFooter.displayName = 'PanelFooter';
