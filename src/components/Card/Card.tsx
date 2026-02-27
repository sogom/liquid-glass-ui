import React, { createContext, useContext, useMemo } from 'react';
import styles from './Card.module.css';

// ── 타입 정의 ──────────────────────────────────
export type CardVariant = 'solid' | 'outline' | 'ghost';
export type CardSize = 'sm' | 'md' | 'lg';

export interface CardContextValue {
  variant: CardVariant;
  size: CardSize;
}

// ── Context ────────────────────────────────────
const CardContext = createContext<CardContextValue>({ variant: 'solid', size: 'md' });
const useCardContext = () => useContext(CardContext);

// ── Card (루트) ────────────────────────────────
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 카드 스타일 종류 */
  variant?: CardVariant;
  /** 카드 크기 (패딩, 간격) */
  size?: CardSize;
  /** hover 시 올라오는 효과 */
  hoverable?: boolean;
  /** hover 시 glow 효과 */
  glow?: boolean;
  /** 유리 효과 강도 (0 ~ 1) */
  intensity?: number;
  /** glow 커스텀 색상 (RGB 트리플릿) */
  color?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'solid',
      size = 'md',
      hoverable = false,
      glow = false,
      intensity = 1,
      color,
      className,
      children,
      style,
      ...rest
    },
    ref
  ) => {
    const blurValue = `${Math.round(20 * intensity)}px`;
    const bgOpacity = 0.04 + 0.1 * intensity;

    const customStyle: React.CSSProperties = {
      '--glass-blur': blurValue,
      '--glass-bg-opacity': bgOpacity,
      ...(color ? { '--card-glow-color': color } : {}),
      ...style,
    } as React.CSSProperties;

    const classNames = [
      styles.card,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      hoverable ? styles.hoverable : '',
      glow ? styles.glow : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    const ctxValue = useMemo<CardContextValue>(
      () => ({ variant, size }),
      [variant, size]
    );

    return (
      <CardContext.Provider value={ctxValue}>
        <div ref={ref} className={classNames} style={customStyle} {...rest}>
          {/* 빛 반사 레이어 */}
          {variant !== 'ghost' && (
            <>
              <span className={styles.glassShine} aria-hidden="true" />
              <span className={styles.glassEdge} aria-hidden="true" />
            </>
          )}
          {children}
        </div>
      </CardContext.Provider>
    );
  }
);
Card.displayName = 'Card';

// ── CardHeader ─────────────────────────────────
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 커버 이미지 모드 (패딩 제거, 상단 라운드) */
  cover?: boolean;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ cover = false, className, children, ...rest }, ref) => {
    const classNames = [
      styles.header,
      cover ? styles.headerCover : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...rest}>
        {children}
      </div>
    );
  }
);
CardHeader.displayName = 'CardHeader';

// ── CardBody ───────────────────────────────────
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div ref={ref} className={`${styles.body} ${className ?? ''}`} {...rest}>
        {children}
      </div>
    );
  }
);
CardBody.displayName = 'CardBody';

// ── CardFooter ─────────────────────────────────
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 정렬 방향 */
  align?: 'left' | 'center' | 'right' | 'between';
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ align = 'right', className, children, ...rest }, ref) => {
    const classNames = [
      styles.footer,
      styles[`footer-align-${align}`],
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...rest}>
        {children}
      </div>
    );
  }
);
CardFooter.displayName = 'CardFooter';
