import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getConfig } from '@/widget/config';
import enTranslations from '@/i18n/en.json';
import arTranslations from '@/i18n/ar.json';

// Store shadow root reference for widget mode
let shadowRootRef: ShadowRoot | null = null;

export function setShadowRoot(shadowRoot: ShadowRoot | null) {
  shadowRootRef = shadowRoot;
}

export function initLocalization() {
  let defaultLang = 'en';
  try {
    const config = getConfig();
    defaultLang = config.language || defaultLang;
  } catch {
    // In standalone mode, getConfig might not be available
    const browserLang = navigator.language.split('-')[0];
    defaultLang = browserLang === 'ar' ? 'ar' : 'en';
  }
  
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
  const dir = defaultLang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = defaultLang;
  
  // Also set shadow root direction if in widget mode
  if (shadowRootRef) {
    const widgetRoot = shadowRootRef.querySelector('#widget-root') as HTMLElement;
    if (widgetRoot) {
      widgetRoot.dir = dir;
      widgetRoot.lang = defaultLang;
    }
  }
  
  return i18n;
}

export function changeLanguage(lang: 'en' | 'ar') {
  i18n.changeLanguage(lang);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lang;
  
  // Also update shadow root direction if in widget mode
  if (shadowRootRef) {
    const widgetRoot = shadowRootRef.querySelector('#widget-root') as HTMLElement;
    if (widgetRoot) {
      widgetRoot.dir = dir;
      widgetRoot.lang = lang;
    }
  }
}


