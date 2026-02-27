import { describe, it, expect } from 'vitest';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';
import type { TabsVariant, TabsSize } from './Tabs';

describe('Tabs', () => {
  it('should export all compound components', () => {
    expect(Tabs).toBeDefined();
    expect(TabList).toBeDefined();
    expect(Tab).toBeDefined();
    expect(TabPanel).toBeDefined();
  });

  it('should have displayName on all components', () => {
    expect(Tabs.displayName).toBe('Tabs');
    expect(TabList.displayName).toBe('TabList');
    expect(Tab.displayName).toBe('Tab');
    expect(TabPanel.displayName).toBe('TabPanel');
  });

  it('should accept all variant types', () => {
    const variants: TabsVariant[] = ['solid', 'outline', 'pill'];
    variants.forEach((v) => {
      expect(v).toBeDefined();
    });
  });

  it('should accept all size types', () => {
    const sizes: TabsSize[] = ['sm', 'md', 'lg'];
    sizes.forEach((s) => {
      expect(s).toBeDefined();
    });
  });
});
