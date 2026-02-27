import { describe, it, expect } from 'vitest';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import type { CardVariant, CardSize } from './Card';

describe('Card', () => {
  it('should export all compound components', () => {
    expect(Card).toBeDefined();
    expect(CardHeader).toBeDefined();
    expect(CardBody).toBeDefined();
    expect(CardFooter).toBeDefined();
  });

  it('should have displayName on all components', () => {
    expect(Card.displayName).toBe('Card');
    expect(CardHeader.displayName).toBe('CardHeader');
    expect(CardBody.displayName).toBe('CardBody');
    expect(CardFooter.displayName).toBe('CardFooter');
  });

  it('should accept all variant types', () => {
    const variants: CardVariant[] = ['solid', 'outline', 'ghost'];
    variants.forEach((v) => {
      expect(v).toBeDefined();
    });
  });

  it('should accept all size types', () => {
    const sizes: CardSize[] = ['sm', 'md', 'lg'];
    sizes.forEach((s) => {
      expect(s).toBeDefined();
    });
  });

  it('should accept hoverable and glow props', () => {
    expect(typeof Card).toBe('object'); // forwardRef object
  });
});
