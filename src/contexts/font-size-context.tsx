import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PropsWithChildren, createContext, useContext } from "react";
import { Language, fontSizes } from "@/types/font-sizes";

type FontSizeContextType = {
  fontSize: Language;
  setFontSize: (fontSize: Language) => void;
};

const FontSizeContext = createContext<FontSizeContextType | null>(null);

const fontSizeLocalStorageKey = "font-size";

export const FontSizeProvider = ({ children }: PropsWithChildren) => {
  const { localStorageValue: fontSize, storeToLocalStorage: setFontSize } =
    useLocalStorage<Language>(fontSizeLocalStorageKey, fontSizes[0]);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      <div className={fontSize}>{children}</div>
    </FontSizeContext.Provider>
  );
};

export const useFontSizeContext = () => {
  const fontSizeContext = useContext(FontSizeContext);

  if (!fontSizeContext) {
    throw new Error("FontSizeProvider not used");
  }

  return fontSizeContext;
};
