import React from 'react';

export type ThemeName = 'default' | 'ey' | 'light';

export interface ThemeProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 적용할 테마 이름 */
  theme: ThemeName;
  children: React.ReactNode;
}

// ── Theme Context ────────────────────────────────
const ThemeContext = React.createContext<ThemeName>('default');

/**
 * useTheme
 *
 * 현재 활성 테마 이름을 반환합니다.
 * Portal을 사용하는 컴포넌트(Modal 등)가 테마를 유지할 수 있도록 합니다.
 */
export const useTheme = (): ThemeName => React.useContext(ThemeContext);

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
    <ThemeContext.Provider value={theme}>
      {theme === 'default' ? (
        children
      ) : (
        <div
          data-theme={theme}
          style={{ display: 'contents', ...style }}
          {...rest}
        >
          {children}
        </div>
      )}
    </ThemeContext.Provider>
  );
};

ThemeProvider.displayName = 'ThemeProvider';
