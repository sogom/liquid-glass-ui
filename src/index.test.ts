import { describe, it, expect } from 'vitest';
import * as lib from './index';

describe('liquid-glass-ui exports', () => {
  it('should export Button', () => {
    expect(lib.Button).toBeDefined();
  });

  it('should export Input', () => {
    expect(lib.Input).toBeDefined();
  });

  it('should export Badge', () => {
    expect(lib.Badge).toBeDefined();
  });

  it('should export Tabs compound components', () => {
    expect(lib.Tabs).toBeDefined();
    expect(lib.TabList).toBeDefined();
    expect(lib.Tab).toBeDefined();
    expect(lib.TabPanel).toBeDefined();
  });

  it('should export Toggle', () => {
    expect(lib.Toggle).toBeDefined();
  });

  it('should export Card compound components', () => {
    expect(lib.Card).toBeDefined();
    expect(lib.CardHeader).toBeDefined();
    expect(lib.CardBody).toBeDefined();
    expect(lib.CardFooter).toBeDefined();
  });

  it('should export Tooltip', () => {
    expect(lib.Tooltip).toBeDefined();
  });

  it('should export Modal compound components', () => {
    expect(lib.Modal).toBeDefined();
    expect(lib.ModalHeader).toBeDefined();
    expect(lib.ModalBody).toBeDefined();
    expect(lib.ModalFooter).toBeDefined();
  });

  it('should export exactly the expected number of components', () => {
    const componentExports = Object.keys(lib).filter(
      (key) => !key.endsWith('Props') && !key.endsWith('Variant') &&
               !key.endsWith('Size') && !key.endsWith('Shape') &&
               !key.endsWith('Status') && !key.endsWith('State') &&
               !key.endsWith('Placement') && !key.endsWith('Trigger')
    );
    // Button, Input, Badge, Tabs, TabList, Tab, TabPanel, Toggle,
    // Card, CardHeader, CardBody, CardFooter, Tooltip,
    // Modal, ModalHeader, ModalBody, ModalFooter = 17
    expect(componentExports.length).toBe(17);
  });
});
