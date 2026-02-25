import React, { useState } from 'react';
import styles from './Input.module.css';

// ── 타입 정의 ──────────────────────────────────
export type InputVariant = 'solid' | 'outline' | 'ghost';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputState = 'default' | 'error' | 'success';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 인풋 스타일 종류 */
  variant?: InputVariant;
  /** 인풋 크기 */
  size?: InputSize;
  /** 인풋 상태 */
  state?: InputState;
  /** 위 라벨 텍스트 */
  label?: string;
  /** 아래 도움말 */
  hint?: string;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 성공 메시지 */
  successMessage?: string;
  /** 왼쪽 아이콘 */
  leftIcon?: React.ReactNode;
  /** 오른쪽 아이콘 */
  rightIcon?: React.ReactNode;
  /** 숫자만 입력 허용 */
  numeric?: boolean;
  /** 유리 효과 강도 (0 ~ 1) */
  intensity?: number;
}

// ── 컴포넌트 ───────────────────────────────────
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'solid',
      size = 'md',
      state = 'default',
      label,
      hint,
      errorMessage,
      successMessage,
      leftIcon,
      rightIcon,
      numeric = false,
      intensity = 1,
      type = 'text',
      disabled,
      className,
      style,
      onChange,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const blurValue = `${Math.round(20 * intensity)}px`;
    const customStyle = {
      '--glass-blur': blurValue,
      ...style,
    } as React.CSSProperties;

    // 숫자만 입력 허용 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (numeric) {
        const value = e.target.value;
        if (value !== '' && !/^\d*\.?\d*$/.test(value)) {
        e.target.value = value.replace(/[^\d.]/g, '');
        return;
        }
    }
    onChange?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (numeric) {
        // 허용할 키들
        const allowedKeys = [
        'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'Home', 'End', '.', 'Process'
        ];
        const isNumber = /^\d$/.test(e.key);
        const isAllowed = allowedKeys.includes(e.key);
        const isCtrl = e.ctrlKey || e.metaKey;

        if (!isNumber && !isAllowed && !isCtrl) {
        e.preventDefault();
        }
    }
    rest.onKeyDown?.(e);
    };

    const handleCompositionStart = (e: React.CompositionEvent<HTMLInputElement>) => {
    if (numeric) {
        e.currentTarget.blur();
        e.currentTarget.focus();
    }
    };

    const wrapperClass = [
      styles.wrapper,
      disabled ? styles.disabled : '',
    ].filter(Boolean).join(' ');

    const inputClass = [
      styles.input,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      state !== 'default' ? styles[`state-${state}`] : '',
      leftIcon ? styles.hasLeft : '',
      (rightIcon || isPassword) ? styles.hasRight : '',
      className ?? '',
    ].filter(Boolean).join(' ');

    // 하단 메시지
    const bottomMessage =
      state === 'error' && errorMessage ? (
        <span className={styles.errorMsg}>{errorMessage}</span>
      ) : state === 'success' && successMessage ? (
        <span className={styles.successMsg}>{successMessage}</span>
      ) : hint ? (
        <span className={styles.hint}>{hint}</span>
      ) : null;

    return (
      <div className={wrapperClass} style={customStyle}>
        {label && <label className={styles.label}>{label}</label>}

        <div className={styles.fieldWrap}>
          {leftIcon && (
            <span className={`${styles.icon} ${styles.iconLeft}`}>
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            type={inputType}
            inputMode={numeric ? 'decimal' : undefined}
            disabled={disabled}
            className={inputClass}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleCompositionStart}
            {...rest}
          />

          {isPassword && (
            <button
              type="button"
              className={`${styles.icon} ${styles.iconRight} ${styles.iconBtn}`}
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          )}

          {!isPassword && rightIcon && (
            <span className={`${styles.icon} ${styles.iconRight}`}>
              {rightIcon}
            </span>
          )}
        </div>

        {bottomMessage}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;