import React from 'react';
import styles from './Container.module.css';

// ── 타입 정의 ────────────────────────────────────
export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'fluid';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 최대 너비 (sm: 640, md: 768, lg: 1024, xl: 1280, fluid: 제한없음) */
  size?: ContainerSize;
  /** 가운데 정렬 */
  center?: boolean;
  /** 좌우 패딩 */
  padding?: number | string;
  /** HTML 태그 변경 (div, section, main, article 등) */
  as?: React.ElementType;
  children: React.ReactNode;
}

// ── 컴포넌트 ────────────────────────────────────
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      size = 'lg',
      center = true,
      padding,
      as: Component = 'div',
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const customStyle: React.CSSProperties = {
      ...(padding !== undefined
        ? { paddingLeft: typeof padding === 'number' ? `${padding}px` : padding,
            paddingRight: typeof padding === 'number' ? `${padding}px` : padding }
        : {}),
      ...style,
    };

    const classNames = [
      styles.container,
      styles[`size-${size}`],
      center && styles.center,
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

Container.displayName = 'Container';
