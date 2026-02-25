import React from 'react';
import styles from './Button.module.css';

// ── 타입 정의 ──────────────────────────────────
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'accent';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonShape = 'rounded' | 'pill';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 스타일 종류 */
  variant?: ButtonVariant;
  /** 버튼 크기 */
  size?: ButtonSize;
  /** 버튼 모양 */
  shape?: ButtonShape;
  /** 로딩 상태 */
  loading?: boolean;
  /** 왼쪽 아이콘 */
  leftIcon?: React.ReactNode;
  /** 오른쪽 아이콘 */
  rightIcon?: React.ReactNode;
  /** 유리 효과 강도 (0 ~ 1) */
  intensity?: number;
  /** 커스텀 색상 (CSS color 값) */
  color?: string;
  /** hover 시 glow 효과 */
  glow?: boolean;
}

// ── 컴포넌트 ───────────────────────────────────
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      size = 'md',
      shape = 'rounded',
      loading = false,
      leftIcon,
      rightIcon,
      intensity = 1,
      color,
      glow = false,
      disabled,
      className,
      children,
      style,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // intensity로 blur, opacity 계산
    const blurValue = `${Math.round(20 * intensity)}px`;
    const bgOpacity = 0.08 + 0.14 * intensity;

    const customStyle: React.CSSProperties = {
      '--glass-blur': blurValue,
      '--glass-bg-opacity': bgOpacity,
      ...(color ? { '--glass-accent-color': color } : {}),
      ...style,
    } as React.CSSProperties;

    const classNames = [
      styles.btn,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`shape-${shape}`],
      glow ? styles.glow : '',
      loading ? styles.loading : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={isDisabled}
        style={customStyle}
        {...rest}
      >
        {/* 빛 반사 레이어 */}
        <span className={styles.glassShine} aria-hidden="true" />

        {/* 상단 하이라이트 */}
        <span className={styles.glassEdge} aria-hidden="true" />

        {/* 콘텐츠 */}
        {loading && (
          <span className={styles.spinner} aria-hidden="true" />
        )}
        {!loading && leftIcon && (
          <span className={styles.icon}>{leftIcon}</span>
        )}
        {children && (
          <span className={styles.label}>{children}</span>
        )}
        {!loading && rightIcon && (
          <span className={styles.icon}>{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;