"use client";

import { ThemeProvider } from "@/contexts/theme-context";
import { type PropsWithChildren } from "react";

export const Providers = ({ children }: PropsWithChildren) => (
  <ThemeProvider>{children}</ThemeProvider>
);
