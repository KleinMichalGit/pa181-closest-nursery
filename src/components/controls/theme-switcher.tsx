"use client";

import { themes } from "@/types/themes";
import { useThemeContext } from "@/contexts/theme-context";
import { useLanguageContext } from "@/contexts/language-context";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeContext();
  const { translations } = useLanguageContext();
  return (
    <details className="collapse bg-base-200">
      <summary className="collapse-title text-xl font-medium">
        {translations.colorTheme}
      </summary>
      <div className="collapse-content">
        <ul>
          {themes.map((themeValue) => (
            <li key={themeValue}>
              <div className="flex items-center">
                <input
                  id={"default-radio-" + themeValue}
                  type="radio"
                  checked={themeValue === theme}
                  value={themeValue}
                  name="default-radio"
                  onChange={() => setTheme(themeValue)}
                  className="w-4 h-4 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />

                <label htmlFor={"default-radio-" + themeValue} className="ml-2">
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
