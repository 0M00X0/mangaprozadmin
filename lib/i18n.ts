import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useTranslation } from 'react-i18next';

import enTranslation from '../locales/en.json';
import arTranslation from '../locales/ar.json';

// تهيئة i18next
i18n.use(initReactI18next).init({
  // تحديد اللغات المدعومة
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'ar'],

  // المفاتيح المترجمة
  resources: {
    en: { translation: enTranslation },
    ar: { translation: arTranslation },
  },

  // تكوين الكاش
  interpolation: {
    escapeValue: false,
  },
});

export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  localStorage.setItem('language', lng);
};

export default i18n;
