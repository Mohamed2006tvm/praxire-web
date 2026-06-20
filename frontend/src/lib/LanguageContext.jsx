import { createContext, useContext, useState } from 'react';
import { translations, languages } from './translations';


const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem('praxire_lang');
    return (saved) || 'en';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('praxire_lang', newLang);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
