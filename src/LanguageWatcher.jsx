import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "./i18n"; // Ensure the correct import path to your i18n configuration

import useUserStore from "./stores/useUserStore";

const LanguageWatcher = () => {
  const language = useUserStore((state) => state.language);
  console.log(language);
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return null; // This component doesn't render anything
};

export default LanguageWatcher;
