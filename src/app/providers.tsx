"use client";

import { ThemeProvider } from "@/contexts/theme-context";
import { type PropsWithChildren } from "react";
import { FontSizeProvider } from "@/contexts/font-size-context";
import { LanguageProvider } from "@/contexts/language-context";

export const Providers = ({ children }: PropsWithChildren) => (
  <ThemeProvider>
    <FontSizeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </FontSizeProvider>
  </ThemeProvider>
);
