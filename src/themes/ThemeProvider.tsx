import React from 'react';

export type ThemeName = 'default' | 'ey';

export interface ThemeProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 적용할 테마 이름 */
  theme: ThemeName;
  children: React.ReactNode;
}

/**
 * ThemeProvider
 *
 * 하위 Liquid Glass UI 컴포넌트에 테마를 적용합니다.
 *
 * @example
 * ```tsx
 * import { ThemeProvider, Button } from 'liquid-glass-ui';
 * import 'liquid-glass-ui/themes/ey.css';
 *
 * <ThemeProvider theme="ey">
 *   <Button variant="accent">EY Style</Button>
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
  style,
  ...rest
}) => {
  return (
    <div
      data-theme={theme === 'default' ? undefined : theme}
      style={{ display: 'contents', ...style }}
      {...rest}
    >
      {children}
    </div>
  );
};

ThemeProvider.displayName = 'ThemeProvider';
