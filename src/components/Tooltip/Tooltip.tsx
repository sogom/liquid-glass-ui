import React, { useState, useRef, useCallback, useEffect, useId } from 'react';
import styles from './Tooltip.module.css';

// ── 타입 정의 ──────────────────────────────────
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipTrigger = 'hover' | 'click';

export interface TooltipProps {
  /** 툴팁 내용 (텍스트 또는 JSX) */
  content: React.ReactNode;
  /** 표시 위치 */
  placement?: TooltipPlacement;
  /** 트리거 방식 */
  trigger?: TooltipTrigger;
  /** 화살표 표시 여부 */
  arrow?: boolean;
  /** 열림/닫힘 딜레이 (ms) */
  delay?: number;
  /** 닫힘 딜레이 (ms) */
  closeDelay?: number;
  /** 제어 모드: 열림 상태 */
  open?: boolean;
  /** 제어 모드: 변경 콜백 */
  onOpenChange?: (open: boolean) => void;
  /** 비활성화 */
  disabled?: boolean;
  /** 유리 효과 강도 (0 ~ 1) */
  intensity?: number;
  /** 트리거 요소 */
  children: React.ReactElement;
}

// ── 컴포넌트 ───────────────────────────────────
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = 'top',
  trigger = 'hover',
  arrow = true,
  delay = 200,
  closeDelay = 100,
  open: controlledOpen,
  onOpenChange,
  disabled = false,
  intensity = 1,
  children,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useId();

  const clearTimers = useCallback(() => {
    if (openTimerRef.current) { clearTimeout(openTimerRef.current); openTimerRef.current = null; }
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
  }, []);

  const show = useCallback(() => {
    if (disabled) return;
    clearTimers();
    openTimerRef.current = setTimeout(() => {
      if (!isControlled) setInternalOpen(true);
      onOpenChange?.(true);
    }, delay);
  }, [disabled, clearTimers, delay, isControlled, onOpenChange]);

  const hide = useCallback(() => {
    clearTimers();
    closeTimerRef.current = setTimeout(() => {
      if (!isControlled) setInternalOpen(false);
      onOpenChange?.(false);
    }, closeDelay);
  }, [clearTimers, closeDelay, isControlled, onOpenChange]);

  const toggle = useCallback(() => {
    if (isOpen) hide(); else show();
  }, [isOpen, show, hide]);

  // 클릭 외부 닫기 (click trigger)
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (trigger !== 'click' || !isOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        hide();
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [trigger, isOpen, hide]);

  // 언마운트 시 타이머 정리
  useEffect(() => clearTimers, [clearTimers]);

  const blurValue = `${Math.round(20 * intensity)}px`;

  const triggerProps: Record<string, unknown> = {
    'aria-describedby': isOpen ? tooltipId : undefined,
  };

  if (trigger === 'hover') {
    triggerProps.onMouseEnter = show;
    triggerProps.onMouseLeave = hide;
    triggerProps.onFocus = show;
    triggerProps.onBlur = hide;
  } else {
    triggerProps.onClick = toggle;
  }

  const tooltipClass = [
    styles.tooltip,
    styles[`placement-${placement}`],
    arrow ? styles.withArrow : '',
    isOpen ? styles.visible : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      {...(trigger === 'hover' ? { onMouseEnter: show, onMouseLeave: hide } : {})}
    >
      {React.cloneElement(children, triggerProps)}

      <div
        id={tooltipId}
        role="tooltip"
        className={tooltipClass}
        style={{ '--glass-blur': blurValue } as React.CSSProperties}
      >
        <span className={styles.glassShine} aria-hidden="true" />
        {arrow && <span className={styles.arrow} aria-hidden="true" />}
        <span className={styles.content}>{content}</span>
      </div>
    </div>
  );
};

Tooltip.displayName = 'Tooltip';
export default Tooltip;
