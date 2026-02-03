import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getConfig } from '@/widget/config';
import enTranslations from '@/i18n/en.json';
import arTranslations from '@/i18n/ar.json';

export function initLocalization() {
  const config = getConfig();
  const browserLang = navigator.language.split('-')[0];
  const defaultLang = config.language || (browserLang === 'ar' ? 'ar' : 'en');
  
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: enTranslations },
        ar: { translation: arTranslations },
      },
      lng: defaultLang,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
  
  // Set document direction
  if (defaultLang === 'ar') {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  } else {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
  }
  
  return i18n;
}

export function changeLanguage(lang: 'en' | 'ar') {
  i18n.changeLanguage(lang);
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
}


