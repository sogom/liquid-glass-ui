import React, { forwardRef } from 'react';
import styles from './AppBar.module.css';

/* ── Types ─────────────────────────────────────── */
export type AppBarVariant = 'default' | 'transparent';
export type AppBarSize = 'default' | 'compact';
export type AppBarPosition = 'fixed' | 'sticky' | 'static';

export interface AppBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual variant */
  variant?: AppBarVariant;
  /** Height size */
  size?: AppBarSize;
  /** CSS position behavior */
  position?: AppBarPosition;
  /** Left section (logo, brand) */
  leading?: React.ReactNode;
  /** Center section (navigation) */
  center?: React.ReactNode;
  /** Right section (actions, avatar) */
  trailing?: React.ReactNode;
  /** Render as a different HTML element */
  as?: React.ElementType;
}

/* ── Component ─────────────────────────────────── */
export const AppBar = forwardRef<HTMLElement, AppBarProps>(
  (
    {
      variant = 'default',
      size = 'default',
      position = 'sticky',
      leading,
      center,
      trailing,
      as: Tag = 'header',
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const cls = [
      styles.appbar,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`position-${position}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Tag ref={ref} className={cls} {...rest}>
        {/* glass effects */}
        {variant === 'default' && (
          <>
            <span className={styles.glassShine} aria-hidden />
            <span className={styles.glassEdge} aria-hidden />
          </>
        )}

        {/* slot-based layout */}
        {(leading || center || trailing) ? (
          <>
            <div className={styles.leading}>{leading}</div>
            <div className={styles.center}>{center}</div>
            <div className={styles.trailing}>{trailing}</div>
          </>
        ) : (
          /* freeform children */
          <div className={styles.content}>{children}</div>
        )}
      </Tag>
    );
  },
);

AppBar.displayName = 'AppBar';
