"use client";

import { themes } from "@/types/themes";
import { useThemeContext } from "@/contexts/theme-context";
import { useLanguageContext } from "@/contexts/language-context";
import Search from "@/components/navigation/search";
import { useState } from "react";
import { HiPaintBrush } from "react-icons/hi2";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeContext();
  const { translations } = useLanguageContext();
  const [filter, setFilter] = useState("");

  return (
    <details className="collapse bg-base-200">
      <summary className="collapse-title font-medium">
        <div className="flex justify-between">
          <span>{translations.colorTheme}</span>
          <HiPaintBrush className="w-5 h-5 mt-1" />
        </div>
      </summary>
      <div className="collapse-content">
        <Search setSearch={setFilter} />
        <ul className="mt-2">
          {themes.map(
            (themeValue) =>
              (themeValue.includes(filter) || filter === "") && (
                <li key={themeValue}>
                  <div className="flex items-center">
                    <input
                      id={"default-radio-" + themeValue}
                      type="radio"
                      checked={themeValue === theme}
                      value={themeValue}
                      name="theme-radio"
                      onChange={() => setTheme(themeValue)}
                      className="w-4 h-4 focus:ring-blue-500 focus:ring-2"
                    />

                    <label
                      htmlFor={"default-radio-" + themeValue}
                      className="ml-2"
                    >
                      {themeValue}
                    </label>
                  </div>
                </li>
              ),
          )}
        </ul>
      </div>
    </details>
  );
};
