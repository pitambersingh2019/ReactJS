import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en/translation.json";
import heb from "./heb/translation.json";
import chn from "./chn/translation.json";
import fre from "./fre/translation.json";
import ger from "./ger/translation.json";
import hun from "./hun/translation.json";
import ita from "./ita/translation.json";
import pol from "./pol/translation.json";
import rum from "./rum/translation.json";
import spn from "./spn/translation.json";
import rus from "./rus/translation.json";
import cze from "./cze/translation.json";
import { convertLanguageJsonToObject } from "./translations";

export const translationsJson = {
  en: {
    translation: en,
  },
  heb: {
    translation: heb,
  },
  chn: {
    translation: chn,
  },
  fre: {
    translation: fre,
  },
  ger: {
    translation: ger,
  },
  hun: {
    translation: hun,
  },
  ita: {
    translation: ita,
  },
  pol: {
    translation: pol,
  },
  rum: {
    translation: rum,
  },
  spn: {
    translation: spn,
  },
  rus: {
    translation: rus,
  },
  cze: {
    translation: cze,
  },
};

// Create the 'translations' object to provide full intellisense support for the static json files.
convertLanguageJsonToObject(en);

export const i18n = i18next
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: translationsJson,
    fallbackLng: "en",
    debug:
      process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test",

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
