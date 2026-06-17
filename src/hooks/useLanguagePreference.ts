import { useEffect, useState } from "react";
import { Language } from "@/utils/translations";

const LANGUAGE_STORAGE_KEY = "denilson.me.language";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "es";
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

  return storedLanguage === "en" ? "en" : "es";
}

export function useLanguagePreference() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((previousLanguage) =>
      previousLanguage === "es" ? "en" : "es",
    );
  };

  return {
    language,
    setLanguage,
    toggleLanguage,
  };
}
