import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { changeLanguage } from '@/services/localizationService';
import { getConfig } from '@/widget/config';

export default function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const config = getConfig();
  const currentLang = i18n.language as 'en' | 'ar';
  const isRTL = currentLang === 'ar';
  const isHome = location.pathname === '/';
  
  const handleLanguageChange = (lang: 'en' | 'ar') => {
    changeLanguage(lang);
  };
  
  const handleBack = () => {
    navigate('/');
  };
  
  return (
    <div className="px-6 py-4 bg-gradient-to-r from-yellow-600/10 via-transparent to-yellow-600/5 border-b border-yellow-600/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {!isHome && (
            <button
              onClick={handleBack}
              className={`w-10 h-10 rounded-xl bg-black/20 hover:bg-black/40 flex items-center justify-center text-gray-400 hover:text-gray-200 transition-all ${
                isRTL ? 'ml-3' : 'mr-3'
              }`}
              aria-label="Back"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
          )}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-600 to-yellow-700 flex items-center justify-center">
            <span className="text-xl">✦</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-100">{t('header.title')}</h1>
            <p className="text-xs text-gray-500">{t('header.subtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-black/20 rounded-xl p-1">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentLang === 'en'
                ? 'bg-yellow-600 text-black'
                : 'text-gray-500 hover:bg-white/5'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => handleLanguageChange('ar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentLang === 'ar'
                ? 'bg-yellow-600 text-black'
                : 'text-gray-500 hover:bg-white/5'
            }`}
          >
            AR
          </button>
        </div>
      </div>
    </div>
  );
}

