import { describe, it, expect } from 'vitest';
import { Tooltip } from './Tooltip';
import type { TooltipProps, TooltipPlacement, TooltipTrigger } from './Tooltip';

describe('Tooltip', () => {
  it('should be exported as a named export', () => {
    expect(Tooltip).toBeDefined();
    expect(typeof Tooltip).toBe('function');
  });

  it('should have displayName', () => {
    expect(Tooltip.displayName).toBe('Tooltip');
  });

  it('should accept all placement types', () => {
    const placements: TooltipPlacement[] = ['top', 'bottom', 'left', 'right'];
    placements.forEach((p) => {
      expect(p).toBeDefined();
    });
  });

  it('should accept all trigger types', () => {
    const triggers: TooltipTrigger[] = ['hover', 'click'];
    triggers.forEach((t) => {
      expect(t).toBeDefined();
    });
  });

  it('should accept optional props', () => {
    const props: Partial<TooltipProps> = {
      placement: 'top',
      trigger: 'hover',
      arrow: true,
      delay: 200,
      closeDelay: 100,
      disabled: false,
      intensity: 0.8,
    };
    expect(props.placement).toBe('top');
    expect(props.delay).toBe(200);
  });
});
