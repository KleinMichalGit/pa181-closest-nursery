"use client";

import { themes } from "@/types/themes";
import { useThemeContext } from "@/contexts/theme-context";

export const LanguageSwitcher = () => {
  const { theme, setTheme } = useThemeContext();

  return (
    <details className="collapse bg-base-200">
      <summary className="collapse-title text-xl font-medium">Language</summary>
      <div className="collapse-content">
        <ul>
          {themes.map((themeValue) => (
            <li key={themeValue}>
              <div className="flex items-center">
                {themeValue === theme ? (
                  <input
                    id={"default-radio-" + themeValue}
                    type="radio"
                    checked
                    value={themeValue}
                    name="default-radio"
                  />
                ) : (
                  <input
                    id={"default-radio-" + themeValue}
                    type="radio"
                    value={theme}
                    name="default-radio"
                    onClick={() => setTheme(themeValue)}
                  />
                )}

                <label htmlFor={"default-radio-" + themeValue}>
                  {themeValue}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
};
