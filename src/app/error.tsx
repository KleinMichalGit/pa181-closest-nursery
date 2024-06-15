"use client";

import {useLanguageContext} from "@/contexts/language-context";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { translations } = useLanguageContext();

const RootError = () => (
  <div className="flex min-h-screen flex-col items-center justify-between p-24">
    <h1 className="text-3xl font-bold">500</h1>
    <p>{translations.unexpectedError}</p>
  </div>
);

export default RootError;
