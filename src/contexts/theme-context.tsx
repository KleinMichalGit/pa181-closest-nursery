import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PropsWithChildren, createContext, useContext } from "react";
import { Theme } from "@/types/themes";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const themeLocalStorageKey = "color-theme";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { localStorageValue: theme, storeToLocalStorage: setTheme } =
    useLocalStorage<Theme>(themeLocalStorageKey, "black");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeProvider not used");
  }

  return themeContext;
};
