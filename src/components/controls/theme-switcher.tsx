"use client";

import { themes } from "@/types/themes";
import { useThemeContext } from "@/contexts/theme-context";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeContext();

  return (
    <details className="collapse bg-base-200">
      <summary className="collapse-title text-xl font-medium">
        Color Theme
      </summary>
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
                    className="w-4 h-4 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                ) : (
                  <input
                    id={"default-radio-" + themeValue}
                    type="radio"
                    value={theme}
                    name="default-radio"
                    onClick={() => setTheme(themeValue)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                )}

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
