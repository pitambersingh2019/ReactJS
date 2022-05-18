import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { isRtl, loadStateLang } from "../../AppStart";
import { customTheme } from "../../styles/theme";

export default function useInitTheme() {
  const { i18n } = useTranslation();

  const [theme, setTheme] = useState({
    ...customTheme,
    dir: isRtl(),
    language: JSON.parse(loadStateLang()),
  });

  useEffect(() => {
    const lang = JSON.parse(loadStateLang());
    i18n.changeLanguage(lang);
    setTheme((prev) => {
      return { ...prev, language: lang, dir: isRtl() };
    });
  }, [i18n]);

  return { theme };
}
