import { useEffect, useState } from "react";

export const useLocalStorage = <T extends string>(
  localStorageKey: string,
  initialValue: T,
) => {
  const [localStorageValue, setLocalStorageValue] = useState<T>(initialValue);

  useEffect(() => {
    const originalLocalStorageValue = localStorage.getItem(localStorageKey);
    if (originalLocalStorageValue) {
      setLocalStorageValue(originalLocalStorageValue as T);
    }
  }, [localStorageKey]);

  const storeToLocalStorage = (value: T) => {
    localStorage.setItem(localStorageKey, value);
    setLocalStorageValue(value);
  };

  return { localStorageValue, storeToLocalStorage };
};
