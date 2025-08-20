import { useState, useEffect } from 'react';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';

const messages = { en, es, fr };

export function useTranslation() {
  const [locale, setLocale] = useState(() => localStorage.getItem('locale') || 'en');
  
  useEffect(() => {
    const handleStorageChange = () => {
      setLocale(localStorage.getItem('locale') || 'en');
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  return {
    i18n: messages[locale as keyof typeof messages] || messages.en,
    locale,
    setLocale: (newLocale: string) => {
      localStorage.setItem('locale', newLocale);
      setLocale(newLocale);
      document.documentElement.lang = newLocale;
    }
  };
}

export const supportedLocales = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];