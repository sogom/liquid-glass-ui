import React, { useEffect, useCallback, useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

// ── 타입 정의 ──────────────────────────────────
export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  /** 열림 상태 */
  open: boolean;
  /** 닫기 콜백 */
  onClose: () => void;
  /** 모달 크기 */
  size?: ModalSize;
  /** Overlay 클릭으로 닫기 */
  closeOnOverlay?: boolean;
  /** ESC 키로 닫기 */
  closeOnEsc?: boolean;
  /** 유리 효과 강도 (0 ~ 1) */
  intensity?: number;
  /** 모달 본체 배경색 (CSS color 값, e.g. "rgba(20, 40, 80, 0.8)") */
  bgColor?: string;
  /** 포탈 대상 (기본: document.body) */
  portalTarget?: HTMLElement;
  /** 추가 className */
  className?: string;
  /** 추가 style */
  style?: React.CSSProperties;
  children: React.ReactNode;
}

// ── Modal (루트) ───────────────────────────────
export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  size = 'md',
  closeOnOverlay = true,
  closeOnEsc = true,
  intensity = 1,
  bgColor,
  portalTarget,
  className,
  style,
  children,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // ESC 키 닫기
  useEffect(() => {
    if (!open || !closeOnEsc) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, closeOnEsc, onClose]);

  // 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // 포커스 트랩: 열릴 때 모달로 포커스 이동
  useEffect(() => {
    if (!open || !modalRef.current) return;
    const prev = document.activeElement as HTMLElement | null;
    modalRef.current.focus();
    return () => { prev?.focus(); };
  }, [open]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (closeOnOverlay && e.target === overlayRef.current) onClose();
    },
    [closeOnOverlay, onClose]
  );

  const blurValue = `${Math.round(24 * intensity)}px`;
  const overlayBlur = `${Math.round(6 * intensity)}px`;

  const customStyle: React.CSSProperties = {
    '--modal-blur': blurValue,
    '--overlay-blur': overlayBlur,
    ...(bgColor ? { '--modal-bg': bgColor } : {}),
    ...style,
  } as React.CSSProperties;

  if (!open) return null;

  const modalContent = (
    <div
      ref={overlayRef}
      className={`${styles.overlay} ${open ? styles.open : ''}`}
      onClick={handleOverlayClick}
      aria-hidden={!open}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`${styles.modal} ${styles[`size-${size}`]} ${className ?? ''}`}
        style={customStyle}
      >
        {/* 빛 반사 레이어 */}
        <span className={styles.glassShine} aria-hidden="true" />
        <span className={styles.glassEdge} aria-hidden="true" />

        {/* titleId를 자식 ModalHeader에 전달하기 위한 Context 대신 data attribute 사용 */}
        <ModalContext.Provider value={{ titleId, onClose }}>
          {children}
        </ModalContext.Provider>
      </div>
    </div>
  );

  return createPortal(modalContent, portalTarget || document.body);
};

Modal.displayName = 'Modal';

// ── Context ────────────────────────────────────
interface ModalContextValue {
  titleId: string;
  onClose: () => void;
}

const ModalContext = React.createContext<ModalContextValue>({
  titleId: '',
  onClose: () => {},
});

const useModalContext = () => React.useContext(ModalContext);

// ── ModalHeader ────────────────────────────────
export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 닫기 버튼 표시 */
  showClose?: boolean;
}

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ showClose = true, className, children, ...rest }, ref) => {
    const { titleId, onClose } = useModalContext();

    return (
      <div ref={ref} className={`${styles.header} ${className ?? ''}`} {...rest}>
        <div id={titleId} className={styles.headerContent}>
          {children}
        </div>
        {showClose && (
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="닫기"
          >
            <svg
              width="14"
              height="14"
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
      </div>
    );
  }
);
ModalHeader.displayName = 'ModalHeader';

// ── ModalBody ──────────────────────────────────
export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={`${styles.body} ${className ?? ''}`} {...rest}>
      {children}
    </div>
  )
);
ModalBody.displayName = 'ModalBody';

// ── ModalFooter ────────────────────────────────
export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 정렬 */
  align?: 'left' | 'center' | 'right';
}

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ align = 'right', className, children, ...rest }, ref) => {
    const classNames = [
      styles.footer,
      styles[`footer-align-${align}`],
      className ?? '',
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames} {...rest}>
        {children}
      </div>
    );
  }
);
ModalFooter.displayName = 'ModalFooter';
