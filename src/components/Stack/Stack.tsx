import React from 'react';
import styles from './Stack.module.css';

// ── 타입 정의 ────────────────────────────────────
export type StackDirection = 'vertical' | 'horizontal';
export type StackGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 배치 방향 */
  direction?: StackDirection;
  /** 아이템 간격 */
  gap?: StackGap;
  /** 교차축 정렬 (align-items) */
  align?: StackAlign;
  /** 주축 정렬 (justify-content) */
  justify?: StackJustify;
  /** 줄바꿈 허용 */
  wrap?: boolean;
  /** HTML 태그 변경 */
  as?: React.ElementType;
  children: React.ReactNode;
}

// ── 컴포넌트 ────────────────────────────────────
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'vertical',
      gap = 'md',
      align,
      justify,
      wrap = false,
      as: Component = 'div',
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    // gap이 number면 커스텀 값
    const isCustomGap = typeof gap === 'number';

    const customStyle: React.CSSProperties = {
      ...(isCustomGap ? { gap: `${gap}px` } : {}),
      ...style,
    };

    const classNames = [
      styles.stack,
      styles[direction],
      !isCustomGap && styles[`gap-${gap}`],
      align && styles[`align-${align}`],
      justify && styles[`justify-${justify}`],
      wrap && styles.wrap,
      className,
    ].filter(Boolean).join(' ');

    return (
      <Component
        ref={ref}
        className={classNames}
        style={customStyle}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Stack.displayName = 'Stack';

// ── Spacer (Stack 내부에서 빈 공간 채우기) ────────
export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 고정 크기 (px). 지정하지 않으면 flex: 1로 남은 공간 채움 */
  size?: number;
}

export const Spacer: React.FC<SpacerProps> = ({
  size,
  style,
  ...rest
}) => {
  const spacerStyle: React.CSSProperties = size !== undefined
    ? { flexShrink: 0, width: `${size}px`, height: `${size}px`, ...style }
    : { flex: 1, ...style };

  return <div style={spacerStyle} {...rest} />;
};

Spacer.displayName = 'Spacer';
