import { describe, it, expect } from 'vitest';
import { Input } from './Input';
import type { InputProps, InputVariant, InputSize, InputState } from './Input';

describe('Input', () => {
  it('should be exported as a named export', () => {
    expect(Input).toBeDefined();
  });

  it('should have displayName', () => {
    expect(Input.displayName).toBe('Input');
  });

  it('should accept all variant types', () => {
    const variants: InputVariant[] = ['solid', 'outline', 'ghost'];
    variants.forEach((v) => {
      const props: InputProps = { variant: v };
      expect(props.variant).toBe(v);
    });
  });

  it('should accept all size types', () => {
    const sizes: InputSize[] = ['sm', 'md', 'lg'];
    sizes.forEach((s) => {
      const props: InputProps = { size: s };
      expect(props.size).toBe(s);
    });
  });

  it('should accept all state types', () => {
    const states: InputState[] = ['default', 'error', 'success'];
    states.forEach((s) => {
      const props: InputProps = { state: s };
      expect(props.state).toBe(s);
    });
  });

  it('should accept label, hint, and message props', () => {
    const props: InputProps = {
      label: '이름',
      hint: '실명을 입력하세요',
      errorMessage: '필수 항목입니다',
      successMessage: '확인되었습니다',
    };
    expect(props.label).toBe('이름');
    expect(props.hint).toBe('실명을 입력하세요');
  });

  it('should accept numeric prop', () => {
    const props: InputProps = { numeric: true };
    expect(props.numeric).toBe(true);
  });
});
