import React from 'react';
import styles from './Badge.module.css';

// ── 타입 정의 ──────────────────────────────────
export type BadgeVariant = 'solid' | 'outline' | 'ghost' | 'accent';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeShape = 'rounded' | 'pill';
export type BadgeStatus = 'default' | 'info' | 'success' | 'warning' | 'error';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 뱃지 스타일 종류 */
  variant?: BadgeVariant;
  /** 뱃지 크기 */
  size?: BadgeSize;
  /** 뱃지 모양 */
  shape?: BadgeShape;
  /** 상태별 색상 프리셋 */
  status?: BadgeStatus;
  /** 왼쪽 아이콘 */
  leftIcon?: React.ReactNode;
  /** 오른쪽 아이콘 */
  rightIcon?: React.ReactNode;
  /** 상태 표시 점 */
  dot?: boolean;
  /** dot 색상이 pulse 애니메이션 */
  pulse?: boolean;
  /** 유리 효과 강도 (0 ~ 1) */
  intensity?: number;
  /** 커스텀 색상 (CSS color 값, RGB 트리플릿 e.g. "139, 92, 246") */
  color?: string;
  /** hover 시 glow 효과 */
  glow?: boolean;
  /** 클릭 가능 여부 (인터랙티브 뱃지) */
  interactive?: boolean;
  /** 닫기 버튼 표시 */
  closable?: boolean;
  /** 닫기 버튼 클릭 핸들러 */
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// ── 상태별 RGB 색상 매핑 ─────────────────────────
const STATUS_COLORS: Record<BadgeStatus, string> = {
  default: '139, 92, 246',   // 보라
  info: '59, 130, 246',      // 파랑
  success: '34, 197, 94',    // 초록
  warning: '245, 158, 11',   // 주황
  error: '239, 68, 68',      // 빨강
};

// ── 컴포넌트 ───────────────────────────────────
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'solid',
      size = 'md',
      shape = 'pill',
      status = 'default',
      leftIcon,
      rightIcon,
      dot = false,
      pulse = false,
      intensity = 1,
      color,
      glow = false,
      interactive = false,
      closable = false,
      onClose,
      className,
      children,
      style,
      onClick,
      ...rest
    },
    ref
  ) => {
    // intensity로 blur, opacity 계산
    const blurValue = `${Math.round(16 * intensity)}px`;
    const bgOpacity = 0.06 + 0.12 * intensity;

    // 색상 결정: color prop > status 매핑
    const resolvedColor = color || STATUS_COLORS[status];

    const customStyle: React.CSSProperties = {
      '--glass-blur': blurValue,
      '--glass-bg-opacity': bgOpacity,
      '--badge-color': resolvedColor,
      ...style,
    } as React.CSSProperties;

    const isInteractive = interactive || !!onClick;

    const classNames = [
      styles.badge,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`shape-${shape}`],
      glow ? styles.glow : '',
      isInteractive ? styles.interactive : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span
        ref={ref}
        className={classNames}
        style={customStyle}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={onClick}
        onKeyDown={
          isInteractive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.(e as unknown as React.MouseEvent<HTMLSpanElement>);
                }
              }
            : undefined
        }
        {...rest}
      >
        {/* 빛 반사 레이어 */}
        <span className={styles.glassShine} aria-hidden="true" />

        {/* 상단 하이라이트 */}
        <span className={styles.glassEdge} aria-hidden="true" />

        {/* 상태 도트 */}
        {dot && (
          <span className={`${styles.dot} ${pulse ? styles.pulse : ''}`} aria-hidden="true" />
        )}

        {/* 왼쪽 아이콘 */}
        {leftIcon && (
          <span className={styles.icon}>{leftIcon}</span>
        )}

        {/* 레이블 */}
        {children && (
          <span className={styles.label}>{children}</span>
        )}

        {/* 오른쪽 아이콘 */}
        {rightIcon && !closable && (
          <span className={styles.icon}>{rightIcon}</span>
        )}

        {/* 닫기 버튼 */}
        {closable && (
          <button
            type="button"
            className={styles.closeBtn}
            onClick={(e) => {
              e.stopPropagation();
              onClose?.(e);
            }}
            tabIndex={-1}
            aria-label="닫기"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
export default Badge;
