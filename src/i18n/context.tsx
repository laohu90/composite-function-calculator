import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLang, TranslationDictionary, translations } from './translations';

interface I18nContextType {
  lang: SupportedLang;
  setLang: (l: SupportedLang) => void;
  t: TranslationDictionary;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const LANG_OPTIONS: { code: SupportedLang; label: string; flag: string }[] = [
  { code: 'en', label: 'English (Default)', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'zh', label: '简体中文', flag: '🇨🇳' },
];

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default is 'en' as requested by user
  const [lang, setLangState] = useState<SupportedLang>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('app_lang_pref') as SupportedLang;
      if (saved && translations[saved]) {
        setLangState(saved);
      } else {
        // Default stays 'en'
        setLangState('en');
      }
    } catch {
      setLangState('en');
    }
  }, []);

  const setLang = (newLang: SupportedLang) => {
    setLangState(newLang);
    try {
      localStorage.setItem('app_lang_pref', newLang);
    } catch (e) {
      console.warn(e);
    }
  };

  const t = translations[lang] || translations.en;

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
}
