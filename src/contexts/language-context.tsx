import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Language } from "@/types/languages";
import { fetchTranslations } from "@/utils/translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: any; // Type it appropriately based on your translation structure
};

const LanguageContext = createContext<LanguageContextType | null>(null);

const languageLocalStorageKey = "language";

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const {
    localStorageValue: storedLanguage,
    storeToLocalStorage: setStoredLanguage,
  } = useLocalStorage<Language>(languageLocalStorageKey, "en"); // Set "en" as the default language

  const [translations, setTranslations] = useState<any>({}); // Initialize with an empty object

  useEffect(() => {
    const fetchTranslationsAndSetContext = async () => {
      try {
        const translationData = await fetchTranslations(storedLanguage);
        setTranslations(translationData);
      } catch (error) {
        console.error("Error fetching translations:", error);
      }
    };

    fetchTranslationsAndSetContext();
  }, [storedLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        language: storedLanguage,
        setLanguage: setStoredLanguage,
        translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    throw new Error("LanguageProvider not used");
  }

  return languageContext;
};
