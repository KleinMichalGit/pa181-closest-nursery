"use client";

import { languages } from "@/types/languages";
import { useLanguageContext } from "@/contexts/language-context";
import { CZ, DE, ES, FR, US } from "country-flag-icons/react/3x2";
import { HiLanguage } from "react-icons/hi2";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguageContext();
  const currentLanguage = language || languages[0];
  const { translations } = useLanguageContext();

  return (
    <details className="collapse bg-base-200">
      <summary className="collapse-title font-medium">
        <div className="flex justify-between">
          <span>{translations.language}</span>
          <HiLanguage className="w-5 h-5 mt-1" />
        </div>
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
                  name="language-radio"
                  onChange={() => setLanguage(languageValue)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  alt={languageValue}
                />
                <label
                  htmlFor={"default-radio-" + languageValue}
                  className="ml-2 flex"
                >
                  {languageValue === "en" && (
                    <US title="United States" className="w-5 mr-1" />
                  )}
                  {languageValue === "fr" && (
                    <FR title="France" className="w-5 mr-1" />
                  )}
                  {languageValue === "es" && (
                    <ES title="Spain" className="w-5 mr-1" />
                  )}
                  {languageValue === "de" && (
                    <DE title="Germany" className="w-5 mr-1" />
                  )}
                  {languageValue === "cz" && (
                    <CZ title="Czech Republic" className="w-5 mr-1" />
                  )}
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
