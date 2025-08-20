import { useI18n } from '@vaadin/hilla-react-i18n';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';

const messages = { en, es, fr };

export function useTranslation() {
  return useI18n({ messages });
}

export const supportedLocales = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];