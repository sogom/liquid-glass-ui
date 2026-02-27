import React, { useState, useCallback, useId } from 'react';
import styles from './Toggle.module.css';

// ── 타입 정의 ──────────────────────────────────
export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** 체크 상태 (제어) */
  checked?: boolean;
  /** 기본 체크 상태 (비제어) */
  defaultChecked?: boolean;
  /** 상태 변경 콜백 */
  onChange?: (checked: boolean) => void;
  /** 토글 크기 */
  size?: ToggleSize;
  /** 왼쪽 라벨 텍스트 */
  label?: string;
  /** 라벨 위치 */
  labelPosition?: 'left' | 'right';
  /** 유리 효과 강도 (0 ~ 1) */
  intensity?: number;
  /** 활성 시 커스텀 색상 (RGB 트리플릿 e.g. "34, 197, 94") */
  color?: string;
}

// ── 컴포넌트 ───────────────────────────────────
export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      size = 'md',
      label,
      labelPosition = 'right',
      intensity = 1,
      color,
      disabled,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : internalChecked;

    const labelId = useId();

    const handleClick = useCallback(() => {
      if (disabled) return;
      const next = !isChecked;
      if (!isControlled) setInternalChecked(next);
      onChange?.(next);
    }, [disabled, isChecked, isControlled, onChange]);

    const blurValue = `${Math.round(14 * intensity)}px`;
    const bgOpacity = 0.06 + 0.1 * intensity;

    const customStyle: React.CSSProperties = {
      '--glass-blur': blurValue,
      '--glass-bg-opacity': bgOpacity,
      ...(color ? { '--toggle-active-color': color } : {}),
      ...style,
    } as React.CSSProperties;

    const wrapperClass = [
      styles.wrapper,
      disabled ? styles.disabled : '',
      className ?? '',
    ].filter(Boolean).join(' ');

    const trackClass = [
      styles.track,
      styles[`size-${size}`],
      isChecked ? styles.checked : '',
    ].filter(Boolean).join(' ');

    const labelElement = label ? (
      <span id={labelId} className={styles.label}>
        {label}
      </span>
    ) : null;

    return (
      <div className={wrapperClass} style={customStyle}>
        {labelPosition === 'left' && labelElement}

        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={isChecked}
          aria-labelledby={label ? labelId : undefined}
          disabled={disabled}
          className={trackClass}
          onClick={handleClick}
          {...rest}
        >
          {/* 트랙 빛 반사 */}
          <span className={styles.glassShine} aria-hidden="true" />

          {/* 썸(원형 핸들) */}
          <span className={styles.thumb}>
            <span className={styles.thumbShine} aria-hidden="true" />
          </span>
        </button>

        {labelPosition === 'right' && labelElement}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';
export default Toggle;
