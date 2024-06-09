"use client";

import { useFontSizeContext } from "@/contexts/font-size-context";
import { fontSizes } from "@/types/font-sizes";

export const FontSizeSwitcher = () => {
  const { fontSize, setFontSize } = useFontSizeContext();
  const currentFontSize = fontSize || fontSizes[0]; // Use a default value if fontSize is undefined

  return (
    <details className="collapse bg-base-200">
      <summary className="collapse-title text-xl font-medium">
        Font Size
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
                  name="default-radio"
                  onChange={() => setFontSize(fontSizeValue)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor={"default-radio-" + fontSizeValue}
                  className="ml-2"
                >
                  {fontSizeValue.replace("text-", "Text ")}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
};
