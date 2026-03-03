import React from 'react';
import styles from './AspectRatio.module.css';

// ── 타입 정의 ────────────────────────────────────
export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 가로/세로 비율 (예: 16/9, 4/3, 1) */
  ratio?: number;
  /** 최대 너비 */
  maxWidth?: number | string;
  children: React.ReactNode;
}

// ── 컴포넌트 ────────────────────────────────────
export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  (
    {
      ratio = 16 / 9,
      maxWidth,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const paddingTop = `${(1 / ratio) * 100}%`;

    const customStyle: React.CSSProperties = {
      '--aspect-padding': paddingTop,
      ...(maxWidth !== undefined
        ? { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }
        : {}),
      ...style,
    } as React.CSSProperties;

    const classNames = [
      styles.wrapper,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames} style={customStyle} {...rest}>
        <div className={styles.spacer} />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    );
  },
);

AspectRatio.displayName = 'AspectRatio';
