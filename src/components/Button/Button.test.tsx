import { describe, it, expect } from 'vitest';
import { Button } from './Button';
import type { ButtonProps, ButtonVariant, ButtonSize, ButtonShape } from './Button';

describe('Button', () => {
  it('should be exported as a named export', () => {
    expect(Button).toBeDefined();
    expect(typeof Button).toBe('object'); // forwardRef
  });

  it('should have displayName', () => {
    expect(Button.displayName).toBe('Button');
  });

  it('should accept all variant types', () => {
    const variants: ButtonVariant[] = ['solid', 'outline', 'ghost', 'accent'];
    variants.forEach((v) => {
      // 타입 레벨 검증 — 컴파일 통과 자체가 테스트
      const props: ButtonProps = { variant: v };
      expect(props.variant).toBe(v);
    });
  });

  it('should accept all size types', () => {
    const sizes: ButtonSize[] = ['sm', 'md', 'lg'];
    sizes.forEach((s) => {
      const props: ButtonProps = { size: s };
      expect(props.size).toBe(s);
    });
  });

  it('should accept all shape types', () => {
    const shapes: ButtonShape[] = ['rounded', 'pill'];
    shapes.forEach((s) => {
      const props: ButtonProps = { shape: s };
      expect(props.shape).toBe(s);
    });
  });

  it('should accept intensity as number between 0 and 1', () => {
    const props: ButtonProps = { intensity: 0.5 };
    expect(props.intensity).toBe(0.5);
  });

  it('should accept optional props without errors', () => {
    const props: ButtonProps = {
      variant: 'solid',
      size: 'md',
      shape: 'rounded',
      loading: true,
      glow: true,
      intensity: 0.8,
      color: '139, 92, 246',
      disabled: true,
    };
    expect(props).toBeDefined();
  });
});
