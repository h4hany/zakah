import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useTranslation } from 'react-i18next';
import { closeWidget } from '@/widget/bootstrap';

export default function AppLayout() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  return (
    <div 
      className="w-full max-w-6xl mx-auto relative"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="widget-card rounded-3xl overflow-hidden">
        <Header />
        <button
          onClick={closeWidget}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-black/20 hover:bg-black/40 flex items-center justify-center text-gray-400 hover:text-gray-200 transition-all"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

