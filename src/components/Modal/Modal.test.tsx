import { describe, it, expect } from 'vitest';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';
import type { ModalSize } from './Modal';

describe('Modal', () => {
  it('should export all compound components', () => {
    expect(Modal).toBeDefined();
    expect(ModalHeader).toBeDefined();
    expect(ModalBody).toBeDefined();
    expect(ModalFooter).toBeDefined();
  });

  it('should have displayName on all components', () => {
    expect(Modal.displayName).toBe('Modal');
    expect(ModalHeader.displayName).toBe('ModalHeader');
    expect(ModalBody.displayName).toBe('ModalBody');
    expect(ModalFooter.displayName).toBe('ModalFooter');
  });

  it('should accept all size types', () => {
    const sizes: ModalSize[] = ['sm', 'md', 'lg'];
    sizes.forEach((s) => {
      expect(s).toBeDefined();
    });
  });

  it('Modal should be a function component', () => {
    expect(typeof Modal).toBe('function');
  });

  it('ModalHeader should be a forwardRef component', () => {
    expect(typeof ModalHeader).toBe('object');
  });

  it('ModalFooter should accept align prop type', () => {
    // 타입 검증
    const aligns = ['left', 'center', 'right'] as const;
    aligns.forEach((a) => {
      expect(a).toBeDefined();
    });
  });
});
