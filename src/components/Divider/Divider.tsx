import React from 'react';
import styles from './Divider.module.css';

// ── 타입 정의 ────────────────────────────────────
export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'gradient';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 방향 */
  orientation?: DividerOrientation;
  /** 스타일 변형 */
  variant?: DividerVariant;
  /** 라벨 (horizontal에서만 동작) */
  label?: React.ReactNode;
  /** 라벨 위치 */
  labelPosition?: 'left' | 'center' | 'right';
  /** 색상 (RGB triplet, 예: "255, 230, 0") */
  color?: string;
  /** 두께 (px) */
  thickness?: number;
  /** 마진 (px) */
  spacing?: number;
}

// ── 컴포넌트 ────────────────────────────────────
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'solid',
      label,
      labelPosition = 'center',
      color,
      thickness,
      spacing,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const customStyle: React.CSSProperties = {
      ...(color ? { '--divider-color': color } : {}),
      ...(thickness ? { '--divider-thickness': `${thickness}px` } : {}),
      ...(spacing !== undefined
        ? orientation === 'horizontal'
          ? { marginTop: `${spacing}px`, marginBottom: `${spacing}px` }
          : { marginLeft: `${spacing}px`, marginRight: `${spacing}px` }
        : {}),
      ...style,
    } as React.CSSProperties;

    // 라벨이 있는 horizontal divider
    if (label && orientation === 'horizontal') {
      const labelClassNames = [
        styles.withLabel,
        styles[`label-${labelPosition}`],
        styles[`variant-${variant}`],
        className,
      ].filter(Boolean).join(' ');

      return (
        <div
          ref={ref}
          className={labelClassNames}
          style={customStyle}
          role="separator"
          aria-orientation={orientation}
          {...rest}
        >
          <div className={styles.line} />
          <span className={styles.labelText}>{label}</span>
          <div className={styles.line} />
        </div>
      );
    }

    // 기본 divider
    const classNames = [
      styles.divider,
      styles[orientation],
      styles[`variant-${variant}`],
      className,
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        style={customStyle}
        role="separator"
        aria-orientation={orientation}
        {...rest}
      />
    );
  },
);

Divider.displayName = 'Divider';
