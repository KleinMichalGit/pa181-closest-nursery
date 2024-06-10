"use client";

import { useFontSizeContext } from "@/contexts/font-size-context";
import { fontSizes } from "@/types/font-sizes";
import { useLanguageContext } from "@/contexts/language-context";
import { HiArrowsUpDown } from "react-icons/hi2";
export const FontSizeSwitcher = () => {
  const { fontSize, setFontSize } = useFontSizeContext();
  const currentFontSize = fontSize || fontSizes[0]; // Use a default value if fontSize is undefined
  const { translations } = useLanguageContext();

  return (
    <details className="collapse bg-base-200">
      <summary className="collapse-title font-medium">
        <div className="flex justify-between">
          <span>{translations.fontSize}</span>
          <HiArrowsUpDown className="w-5 h-5 mt-1" />
        </div>
      </summary>
      <div className="collapse-content">
        <ul>
          {fontSizes.map((fontSizeValue) => (
            <li key={fontSizeValue}>
              <div className="flex items-center">
                <input
                  id={"default-radio-" + fontSizeValue}
                  type="radio"
                  checked={fontSizeValue === currentFontSize}
                  value={fontSizeValue}
                  name="font-radio"
                  onChange={() => setFontSize(fontSizeValue)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor={"default-radio-" + fontSizeValue}
                  className="ml-2"
                >
                  {fontSizeValue === "text-base" && translations.small}
                  {fontSizeValue === "text-lg" && translations.medium}
                  {fontSizeValue === "text-xl" && translations.large}
                  {fontSizeValue === "text-3xl" && translations.extraLarge}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
};
