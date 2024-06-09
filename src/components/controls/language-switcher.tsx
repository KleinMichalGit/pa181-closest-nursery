"use client";

import { languages } from "@/types/languages";
import { useLanguageContext } from "@/contexts/language-context";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguageContext();
  const currentLanguage = language || languages[0];
  const { translations } = useLanguageContext();

  return (
    <details className="collapse bg-base-200">
      <summary className="collapse-title text-xl font-medium">
        {translations.language}
      </summary>
      <div className="collapse-content">
        <ul>
          {languages.map((languageValue) => (
            <li key={languageValue}>
              <div className="flex items-center">
                <input
                  id={"default-radio-" + languageValue}
                  type="radio"
                  checked={languageValue === currentLanguage}
                  value={languageValue}
                  name="default-radio"
                  onChange={() => setLanguage(languageValue)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor={"default-radio-" + languageValue}
                  className="ml-2"
                >
                  {languageValue.replace("text-", "Text ")}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
};
