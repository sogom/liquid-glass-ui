import { describe, it, expect } from 'vitest';
import { Toggle } from './Toggle';
import type { ToggleProps, ToggleSize } from './Toggle';

describe('Toggle', () => {
  it('should be exported as a named export', () => {
    expect(Toggle).toBeDefined();
  });

  it('should have displayName', () => {
    expect(Toggle.displayName).toBe('Toggle');
  });

  it('should accept all size types', () => {
    const sizes: ToggleSize[] = ['sm', 'md', 'lg'];
    sizes.forEach((s) => {
      const props: ToggleProps = { size: s };
      expect(props.size).toBe(s);
    });
  });

  it('should accept label and labelPosition', () => {
    const props: ToggleProps = { label: 'Dark Mode', labelPosition: 'left' };
    expect(props.label).toBe('Dark Mode');
    expect(props.labelPosition).toBe('left');
  });

  it('should accept controlled props', () => {
    const props: ToggleProps = {
      checked: true,
      onChange: () => {},
    };
    expect(props.checked).toBe(true);
    expect(typeof props.onChange).toBe('function');
  });

  it('should accept color as RGB triplet', () => {
    const props: ToggleProps = { color: '34, 197, 94' };
    expect(props.color).toBe('34, 197, 94');
  });
});
