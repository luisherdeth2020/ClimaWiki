/**
 * Language Selector Component
 * Allows users to change the app language
 */

import { useEffect, useRef } from "preact/hooks";
import {
  currentLanguage,
  setLanguage,
  type Language,
} from "../stores/language.store";
import { useTranslation } from "../i18n/translations";

export default function LanguageSelector() {
  const t = useTranslation();
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleLanguageChange = (e: Event) => {
    const select = e.target as HTMLSelectElement;
    const newLang = select.value as Language;
    setLanguage(newLang);
  };

  // Ensure the select stays in sync with the signal
  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.value = currentLanguage.value;
    }
  }, [currentLanguage.value]);

  return (
    <div class="p-4 border-b border-white/10">
      <div class="flex items-center justify-between">
        <div>
          <p class="font-medium">{t.settings.language}</p>
          <p class="text-sm text-gray-400">{t.settings.languageDesc}</p>
        </div>
        <select
          ref={selectRef}
          value={currentLanguage.value}
          onChange={handleLanguageChange}
          class="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="en">{t.languages.english}</option>
          <option value="es">{t.languages.spanish}</option>
        </select>
      </div>
    </div>
  );
}
