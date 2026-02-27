import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';
import type { BadgeProps, BadgeVariant, BadgeSize, BadgeShape, BadgeStatus } from './Badge';

describe('Badge', () => {
  it('should be exported as a named export', () => {
    expect(Badge).toBeDefined();
  });

  it('should have displayName', () => {
    expect(Badge.displayName).toBe('Badge');
  });

  it('should accept all variant types', () => {
    const variants: BadgeVariant[] = ['solid', 'outline', 'ghost', 'accent'];
    variants.forEach((v) => {
      const props: BadgeProps = { variant: v };
      expect(props.variant).toBe(v);
    });
  });

  it('should accept all size types', () => {
    const sizes: BadgeSize[] = ['sm', 'md', 'lg'];
    sizes.forEach((s) => {
      const props: BadgeProps = { size: s };
      expect(props.size).toBe(s);
    });
  });

  it('should accept all shape types', () => {
    const shapes: BadgeShape[] = ['rounded', 'pill'];
    shapes.forEach((s) => {
      const props: BadgeProps = { shape: s };
      expect(props.shape).toBe(s);
    });
  });

  it('should accept all status types', () => {
    const statuses: BadgeStatus[] = ['default', 'info', 'success', 'warning', 'error'];
    statuses.forEach((s) => {
      const props: BadgeProps = { status: s };
      expect(props.status).toBe(s);
    });
  });

  it('should accept dot and pulse props', () => {
    const props: BadgeProps = { dot: true, pulse: true };
    expect(props.dot).toBe(true);
    expect(props.pulse).toBe(true);
  });

  it('should accept closable and interactive props', () => {
    const props: BadgeProps = { closable: true, interactive: true };
    expect(props.closable).toBe(true);
    expect(props.interactive).toBe(true);
  });
});
